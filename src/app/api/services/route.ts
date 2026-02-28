import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db, { rowToService } from "@/lib/db";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  try {
    const result = status
      ? await db.execute({ sql: `SELECT * FROM services WHERE status = ? ORDER BY sort_order ASC`, args: [status] })
      : await db.execute(`SELECT * FROM services ORDER BY sort_order ASC`);
    const services = result.rows.map(rowToService);
    return NextResponse.json({ services });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const id = body.id || crypto.randomUUID().slice(0, 8);
    const { title, desc, image, features, mediaType, htmlContent, faqs, focusKeyword, status, metaTitle, metaDescription, slug } = body;

    if (!title) return NextResponse.json({ error: "title is required" }, { status: 400 });

    // Get next sort_order
    const maxOrder = await db.execute("SELECT COALESCE(MAX(sort_order), -1) as m FROM services");
    const sortOrder = Number(maxOrder.rows[0].m) + 1;

    await db.execute({
      sql: `INSERT INTO services (id, title, "desc", image, features, media_type, html_content, faqs, focus_keyword, status, meta_title, meta_description, slug, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, title, desc || "", image || "", JSON.stringify(features || []),
        mediaType || null, htmlContent || "", JSON.stringify(faqs || []),
        focusKeyword || "", status || "draft", metaTitle || "", metaDescription || "",
        slug || "", sortOrder,
      ],
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create service" }, { status: 500 });
  }
}
