import type { Metadata } from "next";
import { notFound } from "next/navigation";
import db, { rowToProject, type DbProject } from "@/lib/db";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { getSettings } from "@/lib/settings";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getProject(id: string): Promise<DbProject | null> {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM projects WHERE id = ? AND status = 'published'",
      args: [id],
    });
    if (result.rows.length === 0) return null;
    return rowToProject(result.rows[0]);
  } catch {
    return null;
  }
}

async function getRelatedProjects(currentId: string): Promise<DbProject[]> {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM projects WHERE id != ? AND status = 'published' ORDER BY sort_order ASC LIMIT 3",
      args: [currentId],
    });
    return result.rows.map(rowToProject);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) {
    return { title: "Proje Bulunamadı | Yunus Özkan İnşaat" };
  }
  return {
    title: project.metaTitle || `${project.title} | Yunus Özkan İnşaat`,
    description: project.metaDescription || project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(id);
  const settings = await getSettings();

  return (
    <ProjectDetailContent project={project} relatedProjects={relatedProjects} settings={settings} />
  );
}
