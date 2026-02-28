import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getTextModel,
  buildBlogPrompt,
  buildServicePrompt,
  buildProjectPrompt,
  parseAiResponse,
} from "@/lib/gemini";

export async function POST(request: NextRequest) {
  // Auth kontrolü
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
    const { entityType, title, keywords, localSeo, extraNote } = body;

    if (!entityType || !title || !keywords?.length) {
      return NextResponse.json(
        { error: "entityType, title ve keywords zorunludur" },
        { status: 400 }
      );
    }

    // Entity tipine göre prompt seç
    let prompt: string;
    switch (entityType) {
      case "blog":
        prompt = buildBlogPrompt({ title, keywords, localSeo, extraNote });
        break;
      case "service":
        prompt = buildServicePrompt({ title, keywords, localSeo, extraNote });
        break;
      case "project":
        prompt = buildProjectPrompt({ title, keywords, localSeo, extraNote });
        break;
      default:
        return NextResponse.json(
          { error: "Geçersiz entityType" },
          { status: 400 }
        );
    }

    const model = getTextModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // JSON parse (1 yeniden deneme ile)
    let parsed;
    try {
      parsed = parseAiResponse(text);
    } catch {
      // İlk parse başarısızsa tekrar dene
      const retryResult = await model.generateContent(
        prompt + "\n\nÖNEMLİ: Yanıtın SADECE geçerli JSON olmalı, başka hiçbir metin olmamalı."
      );
      const retryText = retryResult.response.text();
      parsed = parseAiResponse(retryText);
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI Generate Error:", error);

    const message =
      error instanceof Error ? error.message : "Bilinmeyen hata";

    if (message.includes("429") || message.includes("RATE_LIMIT")) {
      return NextResponse.json(
        { error: "API istek limiti aşıldı. Lütfen biraz bekleyip tekrar deneyin." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: `İçerik üretilemedi: ${message}` },
      { status: 500 }
    );
  }
}
