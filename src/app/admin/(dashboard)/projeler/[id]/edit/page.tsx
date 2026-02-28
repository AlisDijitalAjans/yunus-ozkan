"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setProject(data.project))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !project) {
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
        id: String(project.id || ""),
        title: String(project.title || ""),
        description: String(project.description || ""),
        category: String(project.category || ""),
        location: String(project.location || ""),
        video: String(project.video || ""),
        image: String(project.image || ""),
        content: String(project.htmlContent || ""),
        faqs: Array.isArray(project.faqs) ? project.faqs as { question: string; answer: string }[] : [],
        focusKeyword: String(project.focusKeyword || ""),
        metaTitle: String(project.metaTitle || ""),
        metaDescription: String(project.metaDescription || ""),
        slug: String(project.slug || ""),
      }}
    />
  );
}
