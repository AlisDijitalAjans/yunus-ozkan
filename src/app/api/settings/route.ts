import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute("SELECT key, value FROM site_settings");
    const settings: Record<string, string> = {};
    for (const row of result.rows) {
      settings[String(row.key)] = String(row.value);
    }
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const allowed = ["company_name", "phone", "phone_raw", "email", "address"];
    const statements = [];

    for (const key of allowed) {
      if (body[key] !== undefined) {
        statements.push({
          sql: "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)",
          args: [key, String(body[key])],
        });
      }
    }

    if (statements.length > 0) {
      await db.batch(statements);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
