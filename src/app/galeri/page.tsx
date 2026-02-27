import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GaleriContent from "@/components/GaleriContent";

export const metadata: Metadata = {
  title: "Galeri | Yunus Özkan İnşaat",
  description: "Yunus Özkan İnşaat projelerinden fotoğraf galerisi. İstinat duvarı, hafriyat ve arazi düzenleme çalışmalarımız.",
};

export default function GaleriPage() {
  return (
    <>
      <PageHeader
        badge="Galeri"
        title="Projelerimizden"
        highlight="Kareler"
        description="Tamamladığımız projelerden fotoğraf galerisi."
      />
      <GaleriContent />
    </>
  );
}
