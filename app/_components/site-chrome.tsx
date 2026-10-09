import Link from "next/link";
import { ArrowDot, LogoMark, pillButton } from "./ui";

const NAV = [
  { href: "/#features", label: "功能" },
  { href: "/#how", label: "使用流程" },
  { href: "/#sample", label: "建議單範例" },
  { href: "/#faq", label: "常見問題" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="leading-none">
            <span className="block font-serif text-[17px] font-black tracking-wider">發票諮詢室</span>
            <span className="block font-display text-[10px] uppercase tracking-[0.25em] text-ink-soft">
              Invoice Room
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/consult" className={`${pillButton} py-1.5 pl-4 pr-1.5 text-sm`}>
          開始諮詢
          <ArrowDot />
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper/80">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-paper">
              <LogoMark className="h-9 w-9 [&>rect]:fill-paper/10" />
              <span className="font-serif text-lg font-black tracking-wider">發票諮詢室</span>
            </Link>
            <p className="mt-5 max-w-xs font-serif text-2xl font-semibold leading-snug text-paper">
              讓每一張發票，
              <br />
              都有好好被處理。
            </p>
          </div>

          <FooterCol
            title="產品"
            links={[
              { href: "/consult", label: "開始諮詢" },
              { href: "/#features", label: "功能介紹" },
              { href: "/#sample", label: "建議單範例" },
            ]}
          />
          <FooterCol
            title="常見情境"
            links={[
              { href: "/consult", label: "統一編號誤載" },
              { href: "/consult", label: "空白發票遺失" },
              { href: "/consult", label: "跨期作廢與折讓" },
            ]}
          />
          <FooterCol
            title="說明"
            links={[
              { href: "/#how", label: "使用流程" },
              { href: "/#faq", label: "常見問題" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 發票諮詢室 · AI Invoice Consulting Room</p>
          <p>本服務由 AI 模擬產生建議，僅供參考，實際處理請以國稅局或主管機關說明為準。</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="font-display text-xs uppercase tracking-[0.25em] text-paper/45">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
