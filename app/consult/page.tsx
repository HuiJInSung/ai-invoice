"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { API_KEY_HEADER, getApiKey, subscribeApiKey } from "../_components/api-key";
import {
  ClerkAvatar,
  PAPER_SHADOW,
  PrimaryButton,
  ReceiptIllustration,
} from "../_components/ui";

const CLOSING_PHRASE = "好的，我都了解了";

type ChatMessage = { role: "clerk" | "user"; content: string };

const EXAMPLES = [
  "我上個月開給客戶的發票，統一編號打錯了，客戶已經拿去報帳了，該怎麼辦？",
  "店裡有一本空白的二聯式發票不見了，找不到，需要做什麼處理？",
  "電子發票開立後發現金額多打一個 0，已經過了跨期，要怎麼作廢或折讓？",
];

export default function ConsultPage() {
  const [description, setDescription] = useState("");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answer, setAnswer] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keyError, setKeyError] = useState(false);
  const apiKey = useSyncExternalStore(subscribeApiKey, getApiKey, () => null);

  async function ask(history: ChatMessage[]) {
    setLoading(true);
    setError("");
    setKeyError(false);
    try {
      const key = getApiKey();
      const res = await fetch("/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(key && { [API_KEY_HEADER]: key }),
        },
        body: JSON.stringify({ description, messages: history }),
      });
      const data = await res.json();
      if (!res.ok) {
        setKeyError(data.code === "missing_key" || data.code === "invalid_key");
        throw new Error(data.error ?? "發生錯誤");
      }

      setMessages([...history, { role: "clerk", content: data.content }]);
      if (data.type === "closing") setFinished(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生錯誤");
    } finally {
      setLoading(false);
    }
  }

  function start() {
    if (!description.trim()) return;
    setStarted(true);
    ask([]);
  }

  function submitAnswer() {
    if (!answer.trim()) return;
    const history: ChatMessage[] = [...messages, { role: "user", content: answer.trim() }];
    setMessages(history);
    setAnswer("");
    ask(history);
  }

  function retry() {
    ask(messages[messages.length - 1]?.role === "clerk" ? messages.slice(0, -1) : messages);
  }

  function reset() {
    setDescription("");
    setStarted(false);
    setMessages([]);
    setAnswer("");
    setFinished(false);
    setError("");
    setKeyError(false);
  }

  const waitingForAnswer =
    started && !finished && !loading && messages[messages.length - 1]?.role === "clerk";

  const stage = finished ? 2 : started ? 1 : 0;

  return (
    <div className="flex-1 px-5 pb-20 pt-10 text-ink sm:pt-14">
      <main className="mx-auto w-full max-w-3xl">
        <header className="mt-2 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-display text-sm italic text-stamp">
              — a little help for your receipts
            </p>
            <h1 className="mt-3 font-serif text-[2.6rem] font-black leading-[1.15] tracking-wide sm:text-6xl">
              統一發票
              <br />
              <span className="relative inline-block">
                <span className="absolute -inset-x-1 bottom-1.5 h-4 -rotate-1 rounded-sm bg-stamp-light sm:h-5" />
                <span className="relative">諮詢室</span>
              </span>
              <span className="ml-2 align-top font-display text-lg font-normal italic text-ink-soft">
                AI
              </span>
            </h1>
            <p className="mt-5 max-w-md leading-8 text-ink-soft">
              開錯、遺失、跳號、統編寫錯——寫下你的發票小麻煩，想問幾個問題都可以，承辦人會一直陪你問到清楚為止。
            </p>
            <ClosingHint className="mt-5 max-w-md border-l-2 border-stamp bg-stamp-light/50 px-4 py-3 text-ink!" />
          </div>
          <ReceiptIllustration className="hidden w-36 -rotate-6 sm:block" />
        </header>

        {/* 步驟 */}
        <ol className="mt-12 grid grid-cols-3 border-t border-ink/80">
          {["描述問題", "持續提問", "問題解決"].map((label, i) => (
            <li
              key={label}
              className={`border-t-4 pt-3 transition-colors ${
                i <= stage ? "border-stamp text-ink" : "border-transparent text-ink-soft/60"
              }`}
            >
              <span className="font-display text-2xl italic">0{i + 1}</span>
              <span className="ml-2 text-sm">{label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 space-y-12">
          {!started ? (
            <section className="rise space-y-10">
              {!apiKey && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-l-2 border-stamp bg-stamp-light/60 px-4 py-3 text-sm text-stamp">
                  <span>開始諮詢前，請先設定你自己的 OpenAI API Key。</span>
                  <Link href="/settings" className="font-medium underline-offset-4 hover:underline">
                    前往設定 →
                  </Link>
                </div>
              )}
              <div className={`rounded-sm bg-paper p-6 sm:p-8 ${PAPER_SHADOW}`}>
                <label
                  htmlFor="description"
                  className="flex items-baseline justify-between font-serif text-lg font-semibold"
                >
                  你遇到了什麼狀況？
                  <span className="font-display text-xs font-normal italic text-ink-soft">
                    {description.length} chars
                  </span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="例如：發票開錯金額、統一編號誤載、發票遺失、跳號…"
                  className="ruled mt-4 w-full resize-none bg-transparent leading-8 text-ink placeholder:text-ink-soft/50 focus:outline-none"
                />
                <div className="mt-6 flex justify-end">
                  <PrimaryButton onClick={start} disabled={!description.trim() || !apiKey}>
                    開始諮詢
                  </PrimaryButton>
                </div>
              </div>

              <div>
                <p className="mb-4 font-display text-xs uppercase tracking-[0.25em] text-ink-soft">
                  Or try a case
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {EXAMPLES.map((ex, i) => (
                    <button
                      key={ex}
                      onClick={() => setDescription(ex)}
                      className={`group flex flex-col rounded-sm border bg-paper/60 p-4 text-left transition hover:-translate-y-1 hover:bg-paper hover:shadow-[0_14px_30px_-20px_rgb(63_53_48/0.5)] ${
                        description === ex ? "border-stamp" : "border-line"
                      }`}
                    >
                      <span className="font-display text-3xl italic text-stamp/80">0{i + 1}</span>
                      <span className="mt-2 text-sm leading-6 text-ink">{ex}</span>
                      <span className="mt-auto pt-3 text-xs text-ink-soft opacity-0 transition group-hover:opacity-100">
                        使用這個案例 →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className={`rise rounded-sm bg-paper p-6 sm:p-8 ${PAPER_SHADOW}`}>
              <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                <p className="text-sm text-ink-soft">
                  <span className="font-display italic text-stamp">Your case · </span>
                  {description}
                </p>
                <button
                  onClick={reset}
                  className="shrink-0 font-display text-xs uppercase tracking-[0.2em] text-ink-soft underline-offset-4 hover:text-stamp hover:underline"
                >
                  Restart
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {messages.map((m, i) =>
                  m.role === "clerk" ? (
                    <div key={i} className="rise flex gap-3">
                      <ClerkAvatar />
                      <div className="max-w-[85%]">
                        <p className="font-display text-xs italic text-sage-dark">
                          承辦人
                        </p>
                        <p className="mt-1 whitespace-pre-wrap leading-8 text-ink">{m.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="rise flex justify-end">
                      <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-sage px-4 py-2.5 leading-7 text-white">
                        {m.content}
                      </p>
                    </div>
                  ),
                )}
                {loading && (
                  <div className="flex items-center gap-3 text-sm text-ink-soft">
                    <ClerkAvatar />
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft"
                          style={{ animationDelay: `${d * 150}ms` }}
                        />
                      ))}
                    </span>
                    翻翻法規中⋯
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-6 flex items-center justify-between border-l-2 border-stamp bg-stamp-light/60 px-4 py-3 text-sm text-stamp">
                  <span>{error}</span>
                  <span className="flex shrink-0 gap-4">
                    {keyError && (
                      <Link href="/settings" className="font-medium underline-offset-4 hover:underline">
                        前往設定
                      </Link>
                    )}
                    <button onClick={retry} className="font-medium underline-offset-4 hover:underline">
                      重試
                    </button>
                  </span>
                </div>
              )}

              {waitingForAnswer && (
                <div className="mt-8 border-t border-dashed border-line pt-6">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        submitAnswer();
                      }
                    }}
                    rows={3}
                    autoFocus
                    placeholder="繼續提問或回答承辦人⋯（Enter 送出，Shift+Enter 換行）"
                    className="ruled w-full resize-none bg-transparent leading-8 text-ink placeholder:text-ink-soft/50 focus:outline-none"
                  />
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <ClosingHint onPick={() => setAnswer(CLOSING_PHRASE)} />
                    <PrimaryButton onClick={submitAnswer} disabled={!answer.trim()}>
                      送出
                    </PrimaryButton>
                  </div>
                </div>
              )}

              {finished && (
                <div className="mt-8 flex justify-center border-t border-dashed border-line pt-6">
                  <PrimaryButton onClick={reset}>開始新的諮詢</PrimaryButton>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function ClosingHint({ className = "", onPick }: { className?: string; onPick?: () => void }) {
  const phrase = `「${CLOSING_PHRASE}。」`;
  return (
    <p className={`text-sm leading-7 text-ink-soft ${className}`}>
      若您的問題都幫您順利解決了，請回答：
      {onPick ? (
        <button
          type="button"
          onClick={onPick}
          className="font-semibold text-stamp underline-offset-4 hover:underline"
        >
          {phrase}
        </button>
      ) : (
        <span className="font-semibold text-stamp">{phrase}</span>
      )}
    </p>
  );
}
