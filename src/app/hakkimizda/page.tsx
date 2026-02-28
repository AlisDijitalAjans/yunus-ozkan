import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import HakkimizdaContent from "@/components/HakkimizdaContent";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Hakkımızda | Yunus Özkan İnşaat",
  description: "Yunus Özkan İnşaat - Profesyonel inşaat, hafriyat ve arazi düzenleme hizmetleri. Kayseri ve çevresinde güvenilir çözümler.",
};

export default async function HakkimizdaPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        badge="Hakkımızda"
        title="Kesintisiz Hizmet"
        highlight="Garantili İşçilik"
        description="Profesyonel ekibimiz ve modern ekipmanlarımız ile projelerinizi baştan sona kesintisiz ve garantili bir şekilde tamamlıyoruz."
      />
      <HakkimizdaContent settings={settings} />
    </>
  );
}
