import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db, { rowToBlogPost } from "@/lib/db";
import type { InValue } from "@libsql/client";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  try {
    const result = await db.execute({ sql: "SELECT * FROM blog_posts WHERE slug = ?", args: [slug] });
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post: rowToBlogPost(result.rows[0]) });
  } catch (error) {
    console.error("GET /api/blog/[slug] error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  try {
    const body = await req.json();
    const fields: string[] = [];
    const args: InValue[] = [];

    const map: Record<string, string> = {
      title: "title", excerpt: "excerpt", image: "image", date: "date",
      category: "category", readingTime: "reading_time", author: "author",
      htmlContent: "html_content", focusKeyword: "focus_keyword",
      status: "status", metaTitle: "meta_title", metaDescription: "meta_description",
    };

    for (const [jsKey, dbCol] of Object.entries(map)) {
      if (body[jsKey] !== undefined) {
        fields.push(`${dbCol} = ?`);
        args.push(body[jsKey]);
      }
    }

    // JSON fields
    const jsonMap: Record<string, string> = {
      sections: "sections", aiAnalysis: "ai_analysis", faqs: "faqs",
    };
    for (const [jsKey, dbCol] of Object.entries(jsonMap)) {
      if (body[jsKey] !== undefined) {
        fields.push(`${dbCol} = ?`);
        args.push(JSON.stringify(body[jsKey]));
      }
    }

    // New slug
    if (body.newSlug && body.newSlug !== slug) {
      fields.push("slug = ?");
      args.push(body.newSlug);
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    fields.push("updated_at = datetime('now')");
    args.push(slug);

    await db.execute({
      sql: `UPDATE blog_posts SET ${fields.join(", ")} WHERE slug = ?`,
      args,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/blog/[slug] error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  try {
    await db.execute({ sql: "DELETE FROM blog_posts WHERE slug = ?", args: [slug] });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/blog/[slug] error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
