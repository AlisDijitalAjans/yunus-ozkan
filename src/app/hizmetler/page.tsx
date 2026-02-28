import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import HizmetlerContent from "@/components/HizmetlerContent";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Yunus Özkan İnşaat",
  description: "İstinat duvarları, arazi düzenleme, kazı & hafriyat, drenaj sistemleri, dolgu işleri ve daha fazlası.",
};

export default async function HizmetlerPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        badge="Hizmetlerimiz"
        title="Profesyonel"
        highlight="İnşaat Çözümleri"
        description="Kendi ekipmanlarımızla sunduğumuz geniş hizmet yelpazesi."
      />
      <HizmetlerContent settings={settings} />
    </>
  );
}
