import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjelerContent from "@/components/ProjelerContent";

export const metadata: Metadata = {
  title: "Projeler | Yunus Özkan İnşaat",
  description: "Yunus Özkan İnşaat tarafından tamamlanan projeler. İstinat duvarı, hafriyat, arazi düzenleme ve tesviye projeleri.",
};

export default function ProjelerPage() {
  return (
    <>
      <PageHeader
        badge="Projelerimiz"
        title="Tamamlanan"
        highlight="Projeler"
        description="Profesyonel ekibimiz ve modern ekipmanlarımız ile tamamladığımız projelerden bazıları."
      />
      <ProjelerContent />
    </>
  );
}
