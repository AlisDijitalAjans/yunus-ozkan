import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutShell from "@/components/LayoutShell";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Yunus Özkan İnşaat | Güvenilir İnşaat Hizmetleri",
  description:
    "Yunus Özkan İnşaat - Güvenilir inşaat, hafriyat ve arazi düzenleme hizmetleri. Kayseri ve çevresinde profesyonel çözümler.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="tr" data-theme="dark">
      <body className={`${poppins.variable} font-[family-name:var(--font-poppins)] antialiased`}>
        <ThemeProvider>
          <LayoutShell settings={settings}>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
