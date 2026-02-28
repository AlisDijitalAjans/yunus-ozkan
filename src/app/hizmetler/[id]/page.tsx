import type { Metadata } from "next";
import { notFound } from "next/navigation";
import db, { rowToService, type DbService } from "@/lib/db";
import ServiceDetailContent from "@/components/ServiceDetailContent";
import { getSettings } from "@/lib/settings";

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getService(id: string): Promise<DbService | null> {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM services WHERE id = ? AND status = 'published'",
      args: [id],
    });
    if (result.rows.length === 0) return null;
    return rowToService(result.rows[0]);
  } catch {
    return null;
  }
}

async function getRelatedServices(currentId: string): Promise<DbService[]> {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM services WHERE id != ? AND status = 'published' ORDER BY sort_order ASC LIMIT 3",
      args: [currentId],
    });
    return result.rows.map(rowToService);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id);
  if (!service) {
    return { title: "Hizmet Bulunamadı | Yunus Özkan İnşaat" };
  }
  return {
    title: service.metaTitle || `${service.title} | Yunus Özkan İnşaat`,
    description: service.metaDescription || service.desc,
    openGraph: {
      title: service.title,
      description: service.desc,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    notFound();
  }

  const relatedServices = await getRelatedServices(id);
  const settings = await getSettings();

  return (
    <ServiceDetailContent service={service} relatedServices={relatedServices} settings={settings} />
  );
}
