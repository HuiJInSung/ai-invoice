import type { Metadata } from "next";
import { Fraunces, LXGW_WenKai_TC, Noto_Serif_TC } from "next/font/google";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import "./globals.css";

// 中文字型檔很大，交給 Google Fonts 依 unicode-range 分段載入，不預載
const wenkai = LXGW_WenKai_TC({
  variable: "--font-wenkai",
  weight: ["400", "700"],
  preload: false,
});

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  weight: ["600", "900"],
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "發票諮詢室 — AI 統一發票問答",
    template: "%s · 發票諮詢室",
  },
  description: "描述統一發票異常問題，可持續向 AI 承辦人提問，直到問題解決",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${wenkai.variable} ${notoSerif.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
