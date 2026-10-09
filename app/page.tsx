import Link from "next/link";
import {
  type Advice,
  AdviceReceipt,
  ArrowDot,
  ClerkAvatar,
  PAPER_SHADOW,
  Stamp,
  pillButton,
} from "./_components/ui";

const SCENARIOS = [
  "統一編號誤載",
  "空白發票遺失",
  "發票跳號",
  "跨期作廢",
  "銷貨折讓",
  "電子發票開錯",
  "金額誤植",
  "空白未使用發票",
  "買受人退貨",
  "中獎發票領獎",
];

const FEATURES = [
  {
    en: "Expert",
    title: "像資深承辦人一樣思考",
    body: "熟悉營業稅法與統一發票使用辦法，從作廢、折讓到遺失、跳號，都能用實務角度判斷。",
    className: "md:col-span-2",
  },
  {
    en: "Ask Anything",
    title: "想問就問，問到懂為止",
    body: "不限提問次數，有新的疑問就繼續追問，承辦人會一直回答。",
  },
  {
    en: "Clear Answers",
    title: "看得懂的處理方式",
    body: "處理步驟、需準備文件、注意事項與罰則提醒，整理得清清楚楚。",
  },
  {
    en: "Anytime",
    title: "不用排隊，隨時開問",
    body: "半夜發現發票開錯也沒關係，打開網頁就能開始諮詢，免註冊、免下載。",
    className: "md:col-span-2",
  },
];

const STEPS = [
  { title: "描述問題", body: "用你自己的話寫下狀況，或直接挑一個常見案例。" },
  { title: "持續提問", body: "承辦人回答後，有任何疑問都可以繼續追問，想問幾題都行。" },
  { title: "問題解決", body: "都清楚了就回答「好的，我都了解了。」，結束這次諮詢。" },
];

const FAQ = [
  {
    q: "需要註冊或付費嗎？",
    a: "不需要註冊。本站採自備金鑰（BYOK）模式：先在「設定」頁輸入你自己的 OpenAI API Key，Key 只存在你的瀏覽器，使用費用由你的 OpenAI 帳戶計算。",
  },
  {
    q: "AI 給的建議可以直接當作正式依據嗎？",
    a: "建議單由 AI 模擬產生，適合用來快速理解處理方向與準備資料；實際處理仍請以國稅局或主管機關的說明為準。",
  },
  {
    q: "我的問題描述會被保存嗎？",
    a: "諮詢內容只在當次對話中使用，重新整理或按下「重新開始」後頁面上的紀錄就會清除。",
  },
  {
    q: "適合哪些人使用？",
    a: "小店老闆、會計新手、記帳士事務所，或任何遇到發票狀況、想先釐清方向的人。",
  },
];

const SAMPLE: Advice = {
  summary:
    "已開立的三聯式發票統一編號誤載，且買受人已持發票入帳。屬開立錯誤，需收回原發票作廢後重新開立正確發票。",
  steps: [
    "聯繫買受人收回原發票第二、三聯",
    "於原發票註明「作廢」並保存各聯",
    "依正確統一編號重新開立發票",
    "若已跨期申報，於當期申報時一併更正",
  ],
  documents: ["原發票各聯", "重新開立之發票", "買受人往來證明"],
  notes: ["若無法收回原發票，應取得買受人證明並妥善保存", "未依規定處理可能涉及營業稅法罰則"],
};

export default function LandingPage() {
  return (
    <main className="flex-1 text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_1fr] md:items-center md:pt-24">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/70 py-1 pl-1 pr-3 text-xs text-ink-soft">
              <span className="rounded-full bg-stamp px-2 py-0.5 font-display text-[10px] uppercase tracking-wider text-paper">
                New
              </span>
              AI 承辦人，陪你處理發票異常
            </span>
            <h1 className="mt-6 font-serif text-5xl font-black leading-[1.12] tracking-wide sm:text-7xl">
              發票出錯，
              <br />
              <span className="relative inline-block">
                <span className="absolute -inset-x-1 bottom-2 h-5 -rotate-1 rounded-sm bg-stamp-light sm:h-7" />
                <span className="relative">不必慌張</span>
              </span>
              。
            </h1>
            <p className="mt-7 max-w-md text-lg leading-9 text-ink-soft">
              統編寫錯、發票遺失、跨期作廢⋯⋯
              告訴 AI 承辦人發生了什麼，想問幾個問題都可以，承辦人會一直回答到你清楚為止。
            </p>
            <p className="mt-5 max-w-md border-l-2 border-stamp bg-stamp-light/50 px-4 py-3 leading-7 text-ink">
              若您的問題都幫您順利解決了，請回答：
              <span className="font-semibold text-stamp">「好的，我都了解了。」</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/consult" className={`${pillButton} py-3 pl-7 pr-3 text-lg`}>
                免費開始諮詢
                <ArrowDot />
              </Link>
              <Link
                href="#how"
                className="font-display text-sm uppercase tracking-[0.2em] text-ink-soft underline-offset-8 hover:text-ink hover:underline"
              >
                How it works
              </Link>
            </div>
            <dl className="mt-12 flex gap-10 border-t border-ink/15 pt-6">
              {[
                ["∞", "次提問"],
                ["24", "小時開放"],
                ["0", "註冊步驟"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dt className="font-display text-4xl italic text-stamp">{n}</dt>
                  <dd className="mt-1 text-sm text-ink-soft">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroMockup />
        </div>
      </section>

      {/* 情境跑馬燈 */}
      <section className="border-y border-ink/15 bg-paper/60 py-5" aria-label="支援的發票情境">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="marquee flex w-max gap-10">
            {[...SCENARIOS, ...SCENARIOS].map((s, i) => (
              <span
                key={i}
                aria-hidden={i >= SCENARIOS.length}
                className="flex items-center gap-10 whitespace-nowrap font-serif text-lg font-semibold text-ink/70"
              >
                {s}
                <span className="text-stamp">✻</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 功能 */}
      <section id="features" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle en="Features" title="把複雜的規定，變成簡單的下一步" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className={`group relative overflow-hidden rounded-sm bg-paper p-8 transition hover:-translate-y-1 ${PAPER_SHADOW} ${f.className ?? ""}`}
              >
                <span className="font-display text-xs uppercase tracking-[0.25em] text-stamp">
                  0{i + 1} · {f.en}
                </span>
                <h3 className="mt-5 font-serif text-2xl font-black">{f.title}</h3>
                <p className="mt-3 max-w-md leading-8 text-ink-soft">{f.body}</p>
                <span className="pointer-events-none absolute -bottom-8 -right-2 font-display text-[9rem] italic leading-none text-cream transition group-hover:text-stamp-light">
                  {i + 1}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section id="how" className="scroll-mt-20 bg-paper/60">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle en="How it works" title="三個步驟，五分鐘搞定" />
          <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-ink/30 md:block"
            />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-ink bg-background font-display text-2xl italic">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-xl font-black">{s.title}</h3>
                <p className="mt-2 max-w-xs leading-8 text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 建議單範例 */}
      <section id="sample" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 py-24 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <SectionTitle en="Sample" title="承辦人會幫你整理出這些重點" align="left" />
            <p className="mt-6 max-w-md leading-8 text-ink-soft">
              不是一大段難懂的法條，而是像店家收據一樣，一條一條列好：先做什麼、準備什麼、要注意什麼。印出來、截圖給會計，都很方便。
            </p>
            <ul className="mt-8 space-y-3">
              {["判斷摘要", "處理步驟", "需準備文件", "注意事項與罰則提醒"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-sage text-[11px] text-white">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:rotate-1">
            <AdviceReceipt advice={SAMPLE} date="範例 Sample" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-paper/60">
        <div className="mx-auto max-w-3xl px-5 py-24">
          <SectionTitle en="FAQ" title="常見問題" />
          <div className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 font-display text-lg transition group-open:rotate-45 group-open:border-stamp group-open:text-stamp">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-8 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-sm bg-stamp px-8 py-16 text-center text-paper sm:px-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-16 font-display text-[16rem] italic leading-none text-paper/10"
          >
            ✻
          </span>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-paper/70">Get started</p>
          <h2 className="mt-4 font-serif text-4xl font-black leading-tight sm:text-5xl">
            手上那張發票，
            <br />
            現在就來處理吧。
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-8 text-paper/80">
            免註冊、免下載，想問什麼就問，問到清楚為止。
          </p>
          <Link
            href="/consult"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-paper py-3 pl-7 pr-3 text-lg text-ink transition hover:bg-ink hover:text-paper"
          >
            免費開始諮詢
            <span className="grid h-7 w-7 place-items-center rounded-full bg-stamp text-paper transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({
  en,
  title,
  align = "center",
}: {
  en: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="font-display text-sm italic text-stamp">— {en}</p>
      <h2 className="mt-3 font-serif text-3xl font-black leading-tight tracking-wide sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="rise relative mx-auto w-full max-w-md [animation-delay:150ms] md:max-w-none">
      {/* 背後的建議單 */}
      <div className="absolute -right-2 -top-8 hidden w-56 rotate-6 sm:block">
        <div className="receipt bg-paper px-6 shadow-sm [--zig:7px]">
          <p className="text-center font-serif text-sm font-black tracking-[0.3em]">處理建議單</p>
          <div className="mt-3 space-y-2 border-t border-dashed border-ink/30 pt-3">
            {[80, 64, 72, 50].map((w) => (
              <div key={w} className="h-1.5 rounded-full bg-kraft" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="barcode mt-4 h-6!" />
        </div>
        <Stamp className="absolute -bottom-6 -left-8 scale-75" />
      </div>

      {/* App 視窗 */}
      <div className={`relative mt-10 rounded-xl border border-ink/10 bg-paper ${PAPER_SHADOW}`}>
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-stamp/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-kraft" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/70" />
          <span className="ml-3 rounded-full bg-cream px-3 py-0.5 font-display text-[11px] text-ink-soft">
            invoice-room / consult
          </span>
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <p className="border-b border-line pb-3 text-sm text-ink-soft">
            <span className="font-display italic text-stamp">Your case · </span>
            發票統一編號打錯了，客戶已經拿去報帳⋯
          </p>
          <div className="flex gap-3">
            <ClerkAvatar />
            <div>
              <p className="font-display text-xs italic text-sage-dark">承辦人</p>
              <p className="mt-1 text-sm leading-7">
                您好！想先確認一下，這張發票是三聯式還是電子發票？開立的期別是否已經申報了呢？
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <p className="rounded-2xl rounded-tr-sm bg-sage px-4 py-2 text-sm leading-6 text-white">
              三聯式，上一期已經申報了
            </p>
          </div>
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
          </div>
        </div>
      </div>

      {/* 浮動小卡 */}
      <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-full border border-ink/10 bg-paper py-2 pl-2 pr-5 text-sm shadow-[0_12px_30px_-12px_rgb(63_53_48/0.4)] sm:-left-8">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-sage text-white">✓</span>
        已整理 4 個處理步驟
      </div>
    </div>
  );
}
