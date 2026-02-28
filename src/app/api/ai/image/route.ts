import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenAI } from "@google/genai";
import { buildImagePrompt } from "@/lib/gemini";
import { cloudinary } from "@/lib/cloudinary";

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
    const { title, entityType, folder } = body;

    if (!title || !folder) {
      return NextResponse.json(
        { error: "title ve folder zorunludur" },
        { status: 400 }
      );
    }

    const imagePrompt = buildImagePrompt(title, entityType || "blog");

    // @google/genai ile görsel üret
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: imagePrompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    // Response'dan image data al
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      return NextResponse.json(
        { error: "Görsel üretilemedi — response boş" },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imagePart = (parts as any[]).find(
      (p) =>
        p.inlineData &&
        typeof p.inlineData.mimeType === "string" &&
        p.inlineData.mimeType.startsWith("image/")
    );

    if (!imagePart?.inlineData) {
      return NextResponse.json(
        { error: "Görsel verisi alınamadı — inlineData yok" },
        { status: 500 }
      );
    }

    const { data: base64Data, mimeType } = imagePart.inlineData as {
      data: string;
      mimeType: string;
    };

    // Cloudinary'ye yükle
    const uploadResult = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64Data}`,
      {
        folder: `yunus-ozkan/${folder}`,
        resource_type: "image",
      }
    );

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("AI Image Error:", error);

    const message =
      error instanceof Error ? error.message : "Bilinmeyen hata";

    // Görsel üretim başarısız olursa URL boş döndür (içerik yine de kullanılabilir)
    return NextResponse.json(
      { url: "", error: `Görsel üretilemedi: ${message}` },
      { status: 200 }
    );
  }
}
