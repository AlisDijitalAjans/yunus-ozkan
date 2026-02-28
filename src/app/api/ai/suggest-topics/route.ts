import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getTextModel,
  parseAiResponse,
  buildTopicSuggestionPrompt,
  EXISTING_CONTENT,
  type TopicSuggestion,
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
    const body = await request.json();
    const { entityType, batch = 1 } = body as {
      entityType: "blog" | "service";
      batch?: number;
    };

    if (!entityType || !["blog", "service"].includes(entityType)) {
      return NextResponse.json(
        { error: "entityType blog veya service olmalıdır" },
        { status: 400 }
      );
    }

    // Mevcut başlıkları topla
    const existingTitles =
      entityType === "blog"
        ? EXISTING_CONTENT.blogs
        : EXISTING_CONTENT.services;

    const prompt = buildTopicSuggestionPrompt(entityType, existingTitles, batch);

    const model = getTextModel();
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // JSON parse
    let topics: TopicSuggestion[];
    try {
      const parsed = parseAiResponse(responseText);
      // parseAiResponse returns object, but here we expect an array
      topics = Array.isArray(parsed) ? parsed : [];
    } catch {
      // Gemini bazen farklı format döner, tekrar dene
      try {
        let cleaned = responseText.trim();
        if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
        else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
        if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
        topics = JSON.parse(cleaned.trim());
      } catch {
        return NextResponse.json(
          { error: "AI yanıtı parse edilemedi" },
          { status: 500 }
        );
      }
    }

    // ID ata (batch'e göre offset)
    const offset = (batch - 1) * 10;
    const topicsWithIds = topics.map((t: TopicSuggestion, i: number) => ({
      ...t,
      id: offset + i + 1,
      seoScore: Math.min(100, Math.max(40, t.seoScore || 70)),
    }));

    return NextResponse.json({ topics: topicsWithIds });
  } catch (error) {
    console.error("AI Topic Suggest Error:", error);
    const message =
      error instanceof Error ? error.message : "Bilinmeyen hata";
    return NextResponse.json(
      { error: `Konu önerileri oluşturulamadı: ${message}` },
      { status: 500 }
    );
  }
}
