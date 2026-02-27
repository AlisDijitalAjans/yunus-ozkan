import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BlogContent from "@/components/BlogContent";

export const metadata: Metadata = {
  title: "Blog | Yunus Özkan İnşaat",
  description: "İnşaat sektöründen güncel bilgiler, projelerimizden haberler ve profesyonel ipuçları.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        badge="Blog"
        title="Sektörden"
        highlight="Haberler"
        description="İnşaat sektöründen güncel bilgiler, projelerimizden haberler ve profesyonel ipuçları."
      />
      <BlogContent />
    </>
  );
}
