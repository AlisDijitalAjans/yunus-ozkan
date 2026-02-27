import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSignedUploadParams } from "@/lib/cloudinary";

const ALLOWED_FOLDERS = [
  "blog",
  "projects",
  "services",
  "gallery",
  "blog-content",
  "uploads",
];

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const folder = body.folder || "uploads";

  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  const params = generateSignedUploadParams(`yunus-ozkan/${folder}`);

  return NextResponse.json(params);
}
