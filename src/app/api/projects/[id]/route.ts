import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db, { rowToProject } from "@/lib/db";
import type { InValue } from "@libsql/client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const result = await db.execute({ sql: "SELECT * FROM projects WHERE id = ?", args: [id] });
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ project: rowToProject(result.rows[0]) });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const fields: string[] = [];
    const args: InValue[] = [];

    const map: Record<string, string> = {
      title: "title", video: "video", image: "image", description: "description",
      category: "category", location: "location",
      htmlContent: "html_content", focusKeyword: "focus_keyword",
      status: "status", metaTitle: "meta_title", metaDescription: "meta_description",
      slug: "slug",
    };

    for (const [jsKey, dbCol] of Object.entries(map)) {
      if (body[jsKey] !== undefined) {
        fields.push(`${dbCol} = ?`);
        args.push(body[jsKey]);
      }
    }

    const jsonMap: Record<string, string> = { faqs: "faqs" };
    for (const [jsKey, dbCol] of Object.entries(jsonMap)) {
      if (body[jsKey] !== undefined) {
        fields.push(`${dbCol} = ?`);
        args.push(JSON.stringify(body[jsKey]));
      }
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    fields.push("updated_at = datetime('now')");
    args.push(id);

    await db.execute({
      sql: `UPDATE projects SET ${fields.join(", ")} WHERE id = ?`,
      args,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await db.execute({ sql: "DELETE FROM projects WHERE id = ?", args: [id] });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
