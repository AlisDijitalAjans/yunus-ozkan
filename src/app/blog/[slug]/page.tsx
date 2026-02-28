import type { Metadata } from "next";
import { notFound } from "next/navigation";
import db, { rowToBlogPost } from "@/lib/db";
import BlogDetailContent from "@/components/BlogDetailContent";
import type { BlogPost } from "@/data/blogPosts";
import { getSettings } from "@/lib/settings";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'",
      args: [slug],
    });
    if (result.rows.length === 0) return null;
    return rowToBlogPost(result.rows[0]);
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string) {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM blog_posts WHERE slug != ? AND status = 'published' ORDER BY created_at DESC LIMIT 3",
      args: [currentSlug],
    });
    return result.rows.map(rowToBlogPost);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Yazı Bulunamadı | Yunus Özkan İnşaat" };
  }
  return {
    title: post.metaTitle || `${post.title} | Yunus Özkan İnşaat Blog`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug);

  // Map DB format to the BlogPost type expected by BlogDetailContent
  const blogPost: BlogPost = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    date: post.date,
    category: post.category,
    readingTime: post.readingTime,
    author: post.author,
    sections: post.sections as BlogPost["sections"],
    aiAnalysis: post.aiAnalysis as BlogPost["aiAnalysis"],
    faqs: post.faqs,
    htmlContent: post.htmlContent,
  };

  const relatedBlogPosts: BlogPost[] = relatedPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
    date: p.date,
    category: p.category,
    readingTime: p.readingTime,
    author: p.author,
    sections: p.sections as BlogPost["sections"],
    aiAnalysis: p.aiAnalysis as BlogPost["aiAnalysis"],
    faqs: p.faqs,
    htmlContent: p.htmlContent,
  }));

  const settings = await getSettings();

  return <BlogDetailContent post={blogPost} relatedPosts={relatedBlogPosts} settings={settings} />;
}
