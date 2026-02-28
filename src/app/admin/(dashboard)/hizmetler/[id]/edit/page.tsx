"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import ServiceForm from "@/components/admin/ServiceForm";

export default function EditServicePage() {
  const params = useParams();
  const id = params.id as string;
  const [service, setService] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setService(data.service))
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

  if (error || !service) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Hizmet bulunamadı.</p>
      </div>
    );
  }

  return (
    <ServiceForm
      isEdit
      initialData={{
        id: String(service.id || ""),
        title: String(service.title || ""),
        desc: String(service.desc || ""),
        image: String(service.image || ""),
        features: Array.isArray(service.features) ? service.features as string[] : [],
        mediaType: service.mediaType === "video" ? "video" : undefined,
        content: String(service.htmlContent || ""),
        faqs: Array.isArray(service.faqs) ? service.faqs as { question: string; answer: string }[] : [],
        focusKeyword: String(service.focusKeyword || ""),
        metaTitle: String(service.metaTitle || ""),
        metaDescription: String(service.metaDescription || ""),
        slug: String(service.slug || ""),
      }}
    />
  );
}
