import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db, { rowToBlogPost } from "@/lib/db";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  try {
    const result = status
      ? await db.execute({ sql: "SELECT * FROM blog_posts WHERE status = ? ORDER BY created_at DESC", args: [status] })
      : await db.execute("SELECT * FROM blog_posts ORDER BY created_at DESC");
    const posts = result.rows.map(rowToBlogPost);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { slug, title, excerpt, image, date, category, readingTime, author, sections, aiAnalysis, faqs, htmlContent, focusKeyword, status, metaTitle, metaDescription } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
    }

    await db.execute({
      sql: `INSERT INTO blog_posts (slug, title, excerpt, image, date, category, reading_time, author, sections, ai_analysis, faqs, html_content, focus_keyword, status, meta_title, meta_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        slug,
        title,
        excerpt || "",
        image || "",
        date || new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
        category || "",
        readingTime || "5 dk okuma",
        author || "Yunus Özkan İnşaat Ekibi",
        JSON.stringify(sections || []),
        JSON.stringify(aiAnalysis || { summary: "", keyPoints: [], relatedTopics: [] }),
        JSON.stringify(faqs || []),
        htmlContent || "",
        focusKeyword || "",
        status || "draft",
        metaTitle || "",
        metaDescription || "",
      ],
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create blog post" }, { status: 500 });
  }
}
