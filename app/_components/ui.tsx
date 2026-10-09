import type { ButtonHTMLAttributes } from "react";

export type Advice = {
  summary: string;
  steps: string[];
  documents: string[];
  notes: string[];
};

export const PAPER_SHADOW =
  "shadow-[0_1px_0_var(--color-line),0_18px_40px_-24px_rgb(63_53_48/0.35)]";

export const pillButton =
  "group inline-flex items-center gap-3 rounded-full bg-ink text-paper transition hover:bg-stamp disabled:cursor-not-allowed disabled:bg-kraft";

export function ArrowDot() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full bg-paper text-ink transition group-hover:translate-x-0.5 group-disabled:translate-x-0">
      →
    </span>
  );
}

export function PrimaryButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${pillButton} py-2.5 pl-6 pr-2.5`}>
      {children}
      <ArrowDot />
    </button>
  );
}

export function AdviceReceipt({ advice, date }: { advice: Advice; date?: string }) {
  return (
    <section className="rise relative mx-auto w-full max-w-xl">
      <div className="drop-shadow-[0_18px_24px_rgb(63_53_48/0.18)]">
        <div className="receipt bg-paper px-7 sm:px-10">
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-ink-soft">
              AI Invoice Consulting Room
            </p>
            <h2 className="mt-2 font-serif text-2xl font-black tracking-[0.3em]">處理建議單</h2>
            <div className="mt-4 flex justify-between font-display text-xs text-ink-soft">
              <span>{date ?? new Date().toLocaleDateString("zh-TW")}</span>
              <span>No. {String(advice.summary.length * 37).padStart(6, "0")}</span>
            </div>
          </div>

          <p className="mt-4 border-y border-dashed border-ink/40 py-5 leading-8">
            {advice.summary}
          </p>

          <AdviceList title="處理步驟" en="Steps" items={advice.steps} ordered />
          <AdviceList title="需準備文件" en="Documents" items={advice.documents} />
          <AdviceList title="注意事項" en="Notes" items={advice.notes} />

          <div className="mt-8 border-t border-dashed border-ink/40 pt-6">
            <div className="barcode" />
            <p className="mt-3 text-center text-xs leading-5 text-ink-soft">
              ※ 本建議由 AI 模擬產生，僅供參考
              <br />
              實際處理請以國稅局或主管機關說明為準
            </p>
          </div>
        </div>
      </div>

      <Stamp className="absolute right-3 top-16 sm:-right-8" />
    </section>
  );
}

export function Stamp({ className = "", label = ["諮詢", "完成"] }: { className?: string; label?: string[] }) {
  return (
    <div
      className={`stamp pointer-events-none grid h-24 w-24 rotate-12 place-items-center rounded-full border-[3px] border-stamp text-stamp opacity-90 ${className}`}
    >
      <div className="grid h-[82px] w-[82px] place-items-center rounded-full border border-stamp text-center">
        <span className="font-serif text-lg font-black leading-tight tracking-widest">
          {label[0]}
          <br />
          {label[1]}
        </span>
      </div>
    </div>
  );
}

function AdviceList({
  title,
  en,
  items,
  ordered = false,
}: {
  title: string;
  en: string;
  items?: string[];
  ordered?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <div className="mt-6">
      <h3 className="flex items-baseline justify-between border-b border-ink/15 pb-1">
        <span className="font-serif font-semibold">{title}</span>
        <span className="font-display text-xs italic text-ink-soft">{en}</span>
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 leading-7">
            <span className="w-6 shrink-0 pt-px font-display text-sm italic text-stamp">
              {ordered ? String(i + 1).padStart(2, "0") : "—"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ClerkAvatar({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`shrink-0 ${className}`} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="var(--color-sage-light)" />
      <ellipse cx="14" cy="10" rx="3.2" ry="7.5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.2" />
      <ellipse cx="26" cy="10" rx="3.2" ry="7.5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.2" />
      <circle cx="20" cy="25" r="10" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.2" />
      <circle cx="16.5" cy="24" r="1.1" fill="var(--color-ink)" />
      <circle cx="23.5" cy="24" r="1.1" fill="var(--color-ink)" />
      <ellipse cx="14" cy="28" rx="2" ry="1.2" fill="var(--color-stamp-light)" />
      <ellipse cx="26" cy="28" rx="2" ry="1.2" fill="var(--color-stamp-light)" />
      <path d="M18.5 27.5 Q20 29 21.5 27.5" fill="none" stroke="var(--color-ink)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function ReceiptIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 164" className={className} aria-hidden>
      <path
        d="M14 8 H106 V148 l-7.67 8 -7.67 -8 -7.67 8 -7.67 -8 -7.67 8 -7.67 -8 -7.67 8 -7.67 -8 -7.67 8 -7.67 -8 -7.67 8 -7.67 -8 Z"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="30" y="20" width="60" height="7" rx="1" fill="var(--color-ink)" />
      {[40, 52, 64, 76].map((y, i) => (
        <g key={y} stroke="var(--color-kraft)" strokeWidth="3" strokeLinecap="round">
          <line x1="26" x2={i % 2 ? 60 : 70} y1={y} y2={y} />
          <line x1="84" x2="94" y1={y} y2={y} />
        </g>
      ))}
      <line x1="24" x2="96" y1="90" y2="90" stroke="var(--color-ink)" strokeDasharray="3 3" />
      <g stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round">
        <line x1="26" x2="54" y1="102" y2="102" />
        <line x1="78" x2="94" y1="102" y2="102" />
      </g>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={28 + i * 5.5} y="116" width={i % 3 ? 2 : 3.5} height="18" fill="var(--color-ink)" />
      ))}
      <g transform="rotate(-14 84 62)" opacity="0.85">
        <circle cx="84" cy="62" r="16" fill="none" stroke="var(--color-stamp)" strokeWidth="2" />
        <text x="84" y="66" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-stamp)">
          OK
        </text>
      </g>
    </svg>
  );
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="var(--color-ink)" />
      <path
        d="M10 7 H22 V24 l-2 2 -2 -2 -2 2 -2 -2 -2 2 -2 -2 Z"
        fill="var(--color-paper)"
      />
      <line x1="12.5" x2="19.5" y1="12" y2="12" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12.5" x2="17" y1="16" y2="16" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="21.5" cy="21" r="4" fill="var(--color-stamp)" />
    </svg>
  );
}
