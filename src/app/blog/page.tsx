import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BlogContent from "@/components/BlogContent";
import db, { rowToBlogPost } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog | Yunus Özkan İnşaat",
  description: "İnşaat sektöründen güncel bilgiler, projelerimizden haberler ve profesyonel ipuçları.",
};

async function getPublishedPosts() {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC",
      args: [],
    });
    return result.rows.map(rowToBlogPost);
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHeader
        badge="Blog"
        title="Sektörden"
        highlight="Haberler"
        description="İnşaat sektöründen güncel bilgiler, projelerimizden haberler ve profesyonel ipuçları."
      />
      <BlogContent posts={posts} />
    </>
  );
}
