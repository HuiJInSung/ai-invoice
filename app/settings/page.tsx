"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { PAPER_SHADOW, PrimaryButton } from "../_components/ui";
import {
  clearApiKey,
  getApiKey,
  maskApiKey,
  setApiKey,
  subscribeApiKey,
} from "../_components/api-key";

export default function SettingsPage() {
  const savedKey = useSyncExternalStore(subscribeApiKey, getApiKey, () => null);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const trimmed = input.trim();

  function save() {
    if (!trimmed) return;
    if (setApiKey(trimmed)) {
      setInput("");
      setStatus({ ok: true, text: "已儲存，現在可以開始諮詢了。" });
    } else {
      setStatus({ ok: false, text: "瀏覽器不允許儲存資料（可能是無痕模式），請換一般視窗再試。" });
    }
  }

  function remove() {
    clearApiKey();
    setStatus({ ok: true, text: "已從這個瀏覽器移除 API Key。" });
  }

  return (
    <div className="flex-1 px-5 pb-20 pt-10 text-ink sm:pt-14">
      <main className="mx-auto w-full max-w-2xl">
        <p className="font-display text-sm italic text-stamp">— settings</p>
        <h1 className="mt-3 font-serif text-4xl font-black tracking-wide sm:text-5xl">設定</h1>
        <p className="mt-5 leading-8 text-ink-soft">
          發票諮詢室使用你自己的 OpenAI API Key 呼叫 AI 承辦人。Key 只會儲存在這個瀏覽器的
          localStorage，每次提問時隨請求送出，伺服器不會保存。
        </p>

        <section className={`mt-10 rounded-sm bg-paper p-6 sm:p-8 ${PAPER_SHADOW}`}>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-lg font-semibold">OpenAI API Key</h2>
            <span className={`text-sm ${savedKey ? "text-sage-dark" : "text-ink-soft"}`}>
              {savedKey ? `已設定 · ${maskApiKey(savedKey)}` : "尚未設定"}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3 border-b border-line pb-2">
            <input
              type={visible ? "text" : "password"}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setStatus(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
              }}
              placeholder={savedKey ? "輸入新的 Key 以取代目前的設定" : "sk-..."}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent font-mono text-sm leading-8 text-ink placeholder:font-sans placeholder:text-ink-soft/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="shrink-0 text-xs text-ink-soft underline-offset-4 hover:text-stamp hover:underline"
            >
              {visible ? "隱藏" : "顯示"}
            </button>
          </div>
          {trimmed && !trimmed.startsWith("sk-") && (
            <p className="mt-2 text-xs text-stamp">OpenAI API Key 通常以「sk-」開頭，請確認是否貼錯。</p>
          )}

          {status && (
            <p className={`mt-4 text-sm ${status.ok ? "text-sage-dark" : "text-stamp"}`}>
              {status.text}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-end gap-5">
            {savedKey && (
              <button
                type="button"
                onClick={remove}
                className="text-sm text-ink-soft underline-offset-4 hover:text-stamp hover:underline"
              >
                移除 Key
              </button>
            )}
            <PrimaryButton onClick={save} disabled={!trimmed}>
              儲存
            </PrimaryButton>
          </div>
        </section>

        <ul className="mt-8 space-y-2 text-sm leading-7 text-ink-soft">
          <li>
            · 還沒有 Key？到{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noreferrer"
              className="text-stamp underline-offset-4 hover:underline"
            >
              OpenAI 平台
            </a>{" "}
            建立一組，使用費用會計入你自己的 OpenAI 帳戶。
          </li>
          <li>· 在共用電腦上使用完畢，記得按「移除 Key」。</li>
        </ul>

        {savedKey && (
          <div className="mt-10">
            <Link href="/consult" className="text-stamp underline-offset-4 hover:underline">
              前往開始諮詢 →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
