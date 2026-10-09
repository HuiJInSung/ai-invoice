const CLOSING_PHRASE = "好的，我都了解了";
const CLOSING_REPLY = "很高興幫助你解決問題，祝美好順安";

const MODEL = "gpt-4o-mini";

type ChatMessage = { role: "clerk" | "user"; content: string };

type OpenAIMessage = { role: "system" | "user" | "assistant"; content: string };

class OpenAIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// 忽略空白與標點，讓「好的我都了解了」「好的，我都瞭解了。」等寫法都能結束對話
function isClosingPhrase(text: string) {
  const normalize = (t: string) => t.replace(/[\s\p{P}]/gu, "").replace(/瞭/g, "了");
  return normalize(text) === normalize(CLOSING_PHRASE);
}

async function callOpenAI(apiKey: string, messages: OpenAIMessage[]) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.5,
    }),
  });

  if (!res.ok) {
    throw new OpenAIError(res.status, `OpenAI API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return data.choices[0].message.content as string;
}

function toOpenAIMessages(history: ChatMessage[]): OpenAIMessage[] {
  return history.map((m) => ({
    role: m.role === "clerk" ? "assistant" : "user",
    content: m.content,
  }));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const description: unknown = body?.description;
  const history: unknown = body?.messages ?? [];

  if (typeof description !== "string" || !description.trim()) {
    return Response.json({ error: "請描述你遇到的統一發票問題" }, { status: 400 });
  }
  if (
    !Array.isArray(history) ||
    !history.every(
      (m) => (m?.role === "clerk" || m?.role === "user") && typeof m?.content === "string",
    )
  ) {
    return Response.json({ error: "對話格式錯誤" }, { status: 400 });
  }

  const messages = history as ChatMessage[];
  const last = messages[messages.length - 1];

  if (last?.role === "user" && isClosingPhrase(last.content)) {
    return Response.json({ type: "closing", content: CLOSING_REPLY });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return Response.json(
      { error: "伺服器未設定 OPENAI_API_KEY，請在 .env.local 加入後重新啟動" },
      { status: 500 },
    );
  }

  const system = `你是台灣國稅局負責統一發票業務的資深承辦人，態度專業、親切，熟悉加值型及非加值型營業稅法、統一發票使用辦法（如發票開立錯誤、作廢、折讓、遺失、跳號、空白未使用、電子發票、統一編號誤載、中獎發票等實務）。
民眾或營業人一開始描述的統一發票問題：
"""
${description}
"""

規則：
- 這是一段可以持續進行的諮詢，民眾可能會一直追問或提出新的問題，請針對最新的訊息回答。
- ${
    messages.length === 0
      ? "這是第一次回覆：請先簡短問候，再針對上述問題回答。"
      : "請直接回答民眾最新的問題，不需要再重複問候。"
  }
- 資訊足夠時，直接給出具體的處理方式，可條列處理步驟、需準備的文件與注意事項（含可能的罰則）。
- 若缺少關鍵資訊而無法判斷（例如發票種類、開立期別、是否已申報、買受人是否為營業人），請先提出 1 個最關鍵的釐清問題。
- 使用繁體中文、純文字（不要使用 Markdown 符號），簡潔清楚。
- 不要主動結束對話；民眾若回覆「${CLOSING_PHRASE}」，系統會自動結束諮詢。`;

  try {
    const reply = await callOpenAI(apiKey, [
      { role: "system", content: system },
      ...toOpenAIMessages(messages),
    ]);

    // 頁面以純文字顯示，移除模型偶爾仍會輸出的 Markdown 粗體符號
    return Response.json({ type: "answer", content: reply.replace(/\*\*/g, "") });
  } catch (err) {
    console.error(err);
    if (err instanceof OpenAIError && err.status === 401) {
      return Response.json({ error: "OpenAI API Key 無效，請檢查 .env.local" }, { status: 401 });
    }
    if (err instanceof OpenAIError && err.status === 429) {
      return Response.json(
        { error: "OpenAI 額度不足或請求太頻繁，請確認帳戶餘額後再試" },
        { status: 429 },
      );
    }
    return Response.json({ error: "AI 承辦人暫時無法回應，請稍後再試" }, { status: 502 });
  }
}
