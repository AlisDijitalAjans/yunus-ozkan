import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getTextModel,
  parseAiResponse,
  buildSeoOptimizePrompt,
  type SeoOptimizeParams,
} from "@/lib/gemini";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY tanımlanmamış" },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as SeoOptimizeParams;

    if (!body.focusKeyword || !body.content) {
      return NextResponse.json(
        { error: "focusKeyword ve content zorunludur" },
        { status: 400 }
      );
    }

    const prompt = buildSeoOptimizePrompt(body);
    const model = getTextModel();
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const parsed = parseAiResponse(responseText);

    return NextResponse.json({
      title: parsed.title || body.title,
      content: parsed.content || body.content,
      metaTitle: parsed.metaTitle || body.metaTitle,
      metaDescription: parsed.metaDescription || body.metaDescription,
      slug: parsed.slug || body.slug,
    });
  } catch (error) {
    console.error("AI SEO Optimize Error:", error);
    const message =
      error instanceof Error ? error.message : "Bilinmeyen hata";
    return NextResponse.json(
      { error: `SEO iyileştirme başarısız: ${message}` },
      { status: 500 }
    );
  }
}
