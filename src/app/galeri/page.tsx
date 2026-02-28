import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GaleriContent from "@/components/GaleriContent";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Galeri | Yunus Özkan İnşaat",
  description: "Yunus Özkan İnşaat projelerinden fotoğraf galerisi. İstinat duvarı, hafriyat ve arazi düzenleme çalışmalarımız.",
};

export default async function GaleriPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        badge="Galeri"
        title="Projelerimizden"
        highlight="Kareler"
        description="Tamamladığımız projelerden fotoğraf galerisi."
      />
      <GaleriContent settings={settings} />
    </>
  );
}
