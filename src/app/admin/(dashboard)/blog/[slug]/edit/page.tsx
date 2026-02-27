"use client";

import { useParams } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { getBlogPostBySlug } from "@/data/blogPosts";

export default function EditBlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPostBySlug(slug);

  if (!post) {
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
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        image: post.image,
        content: post.htmlContent || "",
        faqs: post.faqs,
      }}
    />
  );
}
