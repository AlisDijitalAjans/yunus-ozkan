import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db, { rowToGalleryItem } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute("SELECT * FROM gallery ORDER BY sort_order ASC");
    const items = result.rows.map(rowToGalleryItem);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const id = body.id || crypto.randomUUID().slice(0, 8);
    const { src, title, category } = body;

    if (!src || !title) return NextResponse.json({ error: "src and title are required" }, { status: 400 });

    const maxOrder = await db.execute("SELECT COALESCE(MAX(sort_order), -1) as m FROM gallery");
    const sortOrder = Number(maxOrder.rows[0].m) + 1;

    await db.execute({
      sql: "INSERT INTO gallery (id, src, title, category, sort_order) VALUES (?, ?, ?, ?, ?)",
      args: [id, src, title, category || "diger", sortOrder],
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
