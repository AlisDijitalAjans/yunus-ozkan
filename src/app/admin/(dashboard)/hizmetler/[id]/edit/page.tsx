"use client";

import { useParams } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import { services } from "@/data/services";

export default function EditServicePage() {
  const params = useParams();
  const id = params.id as string;
  const service = services.find((s) => s.id === id);

  if (!service) {
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
        title: service.title,
        desc: service.desc,
        image: service.image,
        features: service.features,
        mediaType: service.mediaType,
        content: service.htmlContent || "",
        faqs: service.faqs,
      }}
    />
  );
}
