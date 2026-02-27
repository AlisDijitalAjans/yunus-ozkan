import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import HakkimizdaContent from "@/components/HakkimizdaContent";

export const metadata: Metadata = {
  title: "Hakkımızda | Yunus Özkan İnşaat",
  description: "Yunus Özkan İnşaat - 2015'ten beri profesyonel inşaat, hafriyat ve arazi düzenleme hizmetleri.",
};

export default function HakkimizdaPage() {
  return (
    <>
      <PageHeader
        badge="Hakkımızda"
        title="Kesintisiz Hizmet"
        highlight="Garantili İşçilik"
        description="Profesyonel ekibimiz ve modern ekipmanlarımız ile projelerinizi baştan sona kesintisiz ve garantili bir şekilde tamamlıyoruz."
      />
      <HakkimizdaContent />
    </>
  );
}
