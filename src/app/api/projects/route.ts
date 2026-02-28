import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db, { rowToProject } from "@/lib/db";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  try {
    const result = status
      ? await db.execute({ sql: `SELECT * FROM projects WHERE status = ? ORDER BY sort_order ASC`, args: [status] })
      : await db.execute(`SELECT * FROM projects ORDER BY sort_order ASC`);
    const projects = result.rows.map(rowToProject);
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const id = body.id || crypto.randomUUID().slice(0, 8);
    const { title, video, image, description, category, location, htmlContent, faqs, focusKeyword, status, metaTitle, metaDescription, slug } = body;

    if (!title) return NextResponse.json({ error: "title is required" }, { status: 400 });

    const maxOrder = await db.execute("SELECT COALESCE(MAX(sort_order), -1) as m FROM projects");
    const sortOrder = Number(maxOrder.rows[0].m) + 1;

    await db.execute({
      sql: `INSERT INTO projects (id, title, video, image, description, category, location, html_content, faqs, focus_keyword, status, meta_title, meta_description, slug, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, title, video || "", image || "", description || "",
        category || "", location || "Kayseri", htmlContent || "",
        JSON.stringify(faqs || []), focusKeyword || "", status || "draft",
        metaTitle || "", metaDescription || "", slug || "", sortOrder,
      ],
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create project" }, { status: 500 });
  }
}
