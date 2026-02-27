"use client";

import { useParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { projects } from "@/data/projects";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Proje bulunamadı.</p>
      </div>
    );
  }

  return (
    <ProjectForm
      isEdit
      initialData={{
        title: project.title,
        description: project.description,
        category: project.category,
        location: project.location,
        video: project.video,
        content: project.htmlContent || "",
        faqs: project.faqs,
      }}
    />
  );
}
