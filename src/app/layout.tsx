import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Yunus Özkan İnşaat | Güvenilir İnşaat Hizmetleri",
  description:
    "Yunus Özkan İnşaat - 2015'ten beri güvenilir inşaat hizmetleri. Konut, ticari ve endüstriyel projeler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-theme="dark">
      <body className={`${poppins.variable} font-[family-name:var(--font-poppins)] antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
