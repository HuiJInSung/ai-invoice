import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "開始諮詢",
};

export default function ConsultLayout({ children }: LayoutProps<"/consult">) {
  return children;
}
