import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定",
};

export default function SettingsLayout({ children }: LayoutProps<"/settings">) {
  return children;
}
