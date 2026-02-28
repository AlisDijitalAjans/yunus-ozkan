"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import BlogForm from "@/components/admin/BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setPost(data.post))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Yazı bulunamadı.</p>
      </div>
    );
  }

  return (
    <BlogForm
      isEdit
      initialData={{
        slug: String(post.slug || ""),
        title: String(post.title || ""),
        excerpt: String(post.excerpt || ""),
        category: String(post.category || ""),
        image: String(post.image || ""),
        content: String(post.htmlContent || ""),
        faqs: Array.isArray(post.faqs) ? post.faqs as { question: string; answer: string }[] : [],
        focusKeyword: String(post.focusKeyword || ""),
        metaTitle: String(post.metaTitle || ""),
        metaDescription: String(post.metaDescription || ""),
        seoSlug: String(post.slug || ""),
      }}
    />
  );
}
