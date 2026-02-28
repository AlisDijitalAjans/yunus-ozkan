import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getTextModel = () =>
  genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

/* ── Ortak tipler ── */
export interface AiGeneratedContent {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  faqs: { question: string; answer: string }[];
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  features?: string[];
  location?: string;
  image?: string;
}

interface PromptParams {
  title: string;
  keywords: string[];
  localSeo: boolean;
  extraNote: string;
}

/* ── İç link havuzu ── */
const INTERNAL_LINKS = {
  pages: [
    { href: "/hizmetler", text: "hizmetlerimiz" },
    { href: "/projeler", text: "projelerimiz" },
    { href: "/galeri", text: "galeri" },
    { href: "/hakkimizda", text: "hakkımızda" },
  ],
  blogs: [
    { href: "/blog/istinat-duvari-yapiminda-dikkat-edilmesi-gerekenler", text: "İstinat Duvarı Yapımında Dikkat Edilmesi Gerekenler" },
    { href: "/blog/hafriyat-islerinde-guvenlik-onlemleri", text: "Hafriyat İşlerinde Güvenlik Önlemleri" },
    { href: "/blog/arazi-duzenleme-ve-tesviye-islerinin-onemi", text: "Arazi Düzenleme ve Tesviye İşlerinin Önemi" },
    { href: "/blog/drenaj-sistemleri-dogru-planlama-ve-uygulama", text: "Drenaj Sistemleri: Doğru Planlama ve Uygulama" },
    { href: "/blog/tas-ev-yapimi-gelenekselden-moderne", text: "Taş Ev Yapımı: Gelenekselden Moderne" },
    { href: "/blog/parke-tasi-doseme-dogru-teknikler", text: "Parke Taşı Döşeme: Doğru Teknikler" },
  ],
};

function formatInternalLinks(): string {
  const pageLinks = INTERNAL_LINKS.pages
    .map((l) => `   - <a href="${l.href}">${l.text}</a>`)
    .join("\n");
  const blogLinks = INTERNAL_LINKS.blogs
    .map((l) => `   - <a href="${l.href}">${l.text}</a>`)
    .join("\n");
  return `Sayfa linkleri:\n${pageLinks}\n   Blog linkleri:\n${blogLinks}`;
}

/* ── Ortak SEO talimatları ── */
function seoInstructions(params: PromptParams, entityContext: string): string {
  const kw = params.keywords[0];
  return `
⚠️ SEO KRİTİK KURALLAR — BUNLARA UYMAYAN İÇERİK REDDEDİLECEKTİR:

A) İÇERİK UZUNLUĞU (EN ÖNEMLİ KURAL):
   - İçerik MUTLAKA en az 1500 kelime olmalı. 1500 kelimeden kısa içerik KABUL EDİLMEZ.
   - Hedef 1800-2200 kelime arası. Detaylı, kapsamlı ve bilgilendirici yaz.
   - Her bölümü en az 3-4 paragraf ile ayrıntılı anlat. Kısa ve yüzeysel bölümler olmasın.
   - Pratik örnekler, karşılaştırmalar, ipuçları ve detaylı açıklamalar ekle.
   - Kelime sayısını kontrol et: content alanındaki düz metin (HTML tag'ları hariç) EN AZ 1500 kelime olmalı.

B) ANAHTAR KELİME YOĞUNLUĞU (%1.5-2.5):
   - Odak anahtar kelime "${kw}" içerikte EN AZ 30 kez geçmeli (2000 kelimede ~%1.5)
   - İlk paragrafın ilk 2 cümlesinde mutlaka kullanılmalı
   - Son paragrafta da mutlaka kullanılmalı
   - Doğal ve akıcı şekilde dağıtılmalı, spam gibi olmamalı

C) BAŞLIKLARDA ANAHTAR KELİME (ÇOK ÖNEMLİ):
   - EN AZ 4 farklı <h2> başlığında odak anahtar kelime "${kw}" tam olarak geçmeli
   - EN AZ 2 farklı <h3> başlığında da odak anahtar kelime geçmeli
   - Toplam en az 7-8 tane <h2> alt başlık kullan
   - Her 150-200 kelimede yeni bir bölüm/başlık olmalı
   - Başlık örnekleri: "${kw} Nedir?", "${kw} Nasıl Yapılır?", "${kw} İçin Dikkat Edilmesi Gerekenler", "${kw} Maliyeti ve Fiyatları", "${kw} Avantajları"

D) META TITLE (ZORUNLU: TAM 50-60 KARAKTER):
   - Karakter sayısını DİKKATLİCE say! 50'den az veya 60'dan fazla OLMAMALI.
   - Odak anahtar kelime "${kw}" en başta olmalı
   - Format: "${kw}: Kapsamlı Rehber ve Fiyatlar 2026" veya "${kw} | Profesyonel Uygulama Kılavuzu 2026"
   - ÖNEMLİ: Oluşturduğun metaTitle'ın karakter sayısını say ve 50-60 arasında olduğundan emin ol!

E) META DESCRIPTION (ZORUNLU: TAM 130-155 KARAKTER):
   - Karakter sayısını DİKKATLİCE say! 130'dan az veya 155'den fazla OLMAMALI.
   - Odak anahtar kelime "${kw}" içermeli
   - CTA (harekete geçirici ifade) içermeli: "Hemen öğrenin", "Detaylı bilgi için okuyun", "Uzman rehberimizi inceleyin" gibi
   - ÖNEMLİ: Oluşturduğun metaDescription'ın karakter sayısını say ve 130-155 arasında olduğundan emin ol!

F) SLUG:
   - Odak anahtar kelime "${kw}" slug'da MUTLAKA yer almalı
   - kebab-case formatında, Türkçe karakterleri dönüştür: ı→i, ö→o, ü→u, ş→s, ç→c, ğ→g
   - Kısa ve öz olmalı, gereksiz kelimeler çıkarılmalı

G) TITLE (BAŞLIK):
   - Odak anahtar kelime "${kw}" başlıkta mutlaka geçmeli
   - İlgi çekici, güçlü ve tıklanabilir olmalı

H) İÇERİK FORMATI:
   - Türkçe, profesyonel ${entityContext} ton
   - HTML formatında: <h2>, <h3>, <p>, <ul>, <li>, <ol>, <strong>, <em>, <blockquote>
   - <strong> ile önemli terimleri vurgula (her paragrafta en az 1 strong)
   - <ul> ve <ol> listeler kullan — her bölümde en az bir liste olmalı
   - <blockquote> ile önemli uyarı veya ipuçları vurgula (en az 2 tane)

I) LİNKLER:
   - İÇ LİNKLER — en az 4 tane doğal şekilde yerleştir:
${formatInternalLinks()}
   - DIŞ LİNKLER — en az 2 adet güvenilir kaynak (resmi kurumlar, mevzuat, üniversiteler). target="_blank" rel="noopener noreferrer"

J) SSS: En az 10 adet soru-cevap. Sorular odak anahtar kelimeyi doğal şekilde içermeli. Cevaplar en az 2-3 cümle olmalı.

K) EXCERPT: 2-3 cümlelik özet, odak anahtar kelime içermeli.
${params.localSeo ? `\nL) YEREL SEO: İçerikte "Kayseri", "Kayseri bölgesi", "Kayseri ${entityContext}" gibi yerel referanslar kullan (en az 5 kez)` : ""}
${params.extraNote ? `\nEKSTRA NOT: ${params.extraNote}` : ""}

⚠️ SON KONTROL — JSON'u döndürmeden önce şunları doğrula:
1. content alanı en az 1500 kelime mi? (Değilse daha fazla detay ekle)
2. metaTitle tam olarak 50-60 karakter mi? (Karakter say!)
3. metaDescription tam olarak 130-155 karakter mi? (Karakter say!)
4. En az 4 <h2> başlığında "${kw}" geçiyor mu?
5. "${kw}" içerikte en az 30 kez geçiyor mu?`;
}

/* ── Blog Prompt ── */
export function buildBlogPrompt(params: PromptParams): string {
  return `Sen profesyonel bir SEO içerik yazarısın. Yunus Özkan İnşaat firması için SEO-optimize bir blog yazısı oluştur.

KONU: ${params.title}
ANAHTAR KELİMELER: ${params.keywords.join(", ")}
ODAK ANAHTAR KELİME: ${params.keywords[0]}
${seoInstructions(params, "bilgilendirici")}

KATEGORİ: Şu seçeneklerden birini seç: İnşaat, İş Güvenliği, Arazi, Altyapı, Peyzaj

SADECE aşağıdaki JSON formatında yanıt ver, başka hiçbir şey yazma:

{
  "title": "Odak anahtar kelimeyi içeren başlık",
  "excerpt": "2-3 cümlelik özet, odak AK içermeli",
  "category": "İnşaat|İş Güvenliği|Arazi|Altyapı|Peyzaj",
  "content": "<h2>AK içeren başlık</h2><p>İlk paragrafta AK...</p>...",
  "faqs": [{"question": "AK ile ilgili soru", "answer": "Detaylı cevap"}, ...],
  "focusKeyword": "${params.keywords[0]}",
  "metaTitle": "50-60 karakter, AK başta",
  "metaDescription": "130-155 karakter, AK + CTA",
  "slug": "ak-iceren-kebab-case-slug"
}`;
}

/* ── Hizmet Prompt ── */
export function buildServicePrompt(params: PromptParams): string {
  return `Sen profesyonel bir SEO içerik yazarısın. Yunus Özkan İnşaat firması için detaylı bir hizmet sayfası içeriği oluştur.

HİZMET ADI: ${params.title}
ANAHTAR KELİMELER: ${params.keywords.join(", ")}
ODAK ANAHTAR KELİME: ${params.keywords[0]}
${seoInstructions(params, "güven veren")}

EK: Hizmetin kapsamını, avantajlarını, sürecini ve neden Yunus Özkan İnşaat'ı tercih etmeleri gerektiğini anlat.
KATEGORİ: İnşaat, Altyapı, Arazi veya Peyzaj
FEATURES: 5-8 adet kısa özellik/hizmet maddesi (string dizisi)

SADECE aşağıdaki JSON formatında yanıt ver:

{
  "title": "Odak AK içeren başlık",
  "excerpt": "2-3 cümlelik açıklama, AK içermeli",
  "category": "İnşaat|Altyapı|Arazi|Peyzaj",
  "content": "<h2>AK içeren başlık</h2><p>İlk paragrafta AK...</p>...",
  "features": ["özellik 1", "özellik 2", ...],
  "faqs": [{"question": "AK ile ilgili soru", "answer": "Detaylı cevap"}, ...],
  "focusKeyword": "${params.keywords[0]}",
  "metaTitle": "50-60 karakter, AK başta",
  "metaDescription": "130-155 karakter, AK + CTA",
  "slug": "ak-iceren-kebab-case-slug"
}`;
}

/* ── Proje Prompt ── */
export function buildProjectPrompt(params: PromptParams): string {
  return `Sen profesyonel bir SEO içerik yazarısın. Yunus Özkan İnşaat firması için detaylı bir proje sayfası içeriği oluştur.

PROJE ADI: ${params.title}
ANAHTAR KELİMELER: ${params.keywords.join(", ")}
ODAK ANAHTAR KELİME: ${params.keywords[0]}
${seoInstructions(params, "profesyonel")}

EK: Projenin kapsamını, sürecini, kullanılan teknikleri ve sonuçları detaylı anlat.
KATEGORİ: İstinat Duvarı, Tesviye, Hafriyat, Drenaj, Peyzaj veya Diğer
KONUM: Kayseri veya çevresi (ilçe de belirtebilirsin)

SADECE aşağıdaki JSON formatında yanıt ver:

{
  "title": "Odak AK içeren başlık",
  "excerpt": "2-3 cümlelik açıklama, AK içermeli",
  "category": "İstinat Duvarı|Tesviye|Hafriyat|Drenaj|Peyzaj|Diğer",
  "location": "Kayseri, ...",
  "content": "<h2>AK içeren başlık</h2><p>İlk paragrafta AK...</p>...",
  "faqs": [{"question": "AK ile ilgili soru", "answer": "Detaylı cevap"}, ...],
  "focusKeyword": "${params.keywords[0]}",
  "metaTitle": "50-60 karakter, AK başta",
  "metaDescription": "130-155 karakter, AK + CTA",
  "slug": "ak-iceren-kebab-case-slug"
}`;
}

/* ── Görsel prompt ── */
export function buildImagePrompt(title: string, entityType: string): string {
  const context =
    entityType === "blog"
      ? "blog article cover"
      : entityType === "service"
        ? "service page hero"
        : "project showcase";

  return `Professional high-quality photograph for a ${context}. Topic: "${title}". Turkish construction company setting. Realistic, editorial style, warm natural lighting, 16:9 landscape aspect ratio. No text or watermarks.`;
}

/* ── Konu Öneri Prompt ── */
export interface TopicSuggestion {
  title: string;
  excerpt: string;
  category: string;
  focusKeyword: string;
  keywords: string[];
  seoScore: number;
}

// Mevcut içeriklerin başlıkları (duplicate önleme)
export const EXISTING_CONTENT = {
  blogs: [
    "İstinat Duvarı Yapımında Dikkat Edilmesi Gerekenler",
    "Hafriyat İşlerinde Güvenlik Önlemleri",
    "Arazi Düzenleme ve Tesviye İşlerinin Önemi",
    "Drenaj Sistemleri: Doğru Planlama ve Uygulama",
    "Taş Ev Yapımı: Gelenekselden Moderne",
    "Parke Taşı Döşeme: Doğru Teknikler",
  ],
  services: [
    "İstinat Duvarları",
    "Arazi Düzenleme & Tesviye",
    "Kazı & Hafriyat",
    "Drenaj Sistemleri",
    "Dolgu & Stabilizasyon",
    "Taş Ev Yapımı",
    "Parke Taşı Döşeme",
  ],
};

export function buildTopicSuggestionPrompt(
  entityType: "blog" | "service",
  existingTitles: string[],
  batchNumber: number
): string {
  const isBlog = entityType === "blog";
  const label = isBlog ? "blog yazısı" : "hizmet";
  const categories = isBlog
    ? "İnşaat, İş Güvenliği, Arazi, Altyapı, Peyzaj"
    : "İnşaat, Altyapı, Arazi, Peyzaj";

  return `Sen SEO uzmanı bir dijital pazarlama danışmanısın. Türkiye'deki bir inşaat firması (Yunus Özkan İnşaat — hafriyat, istinat duvarı, arazi tesviye, drenaj, taş ev, parke taşı) için ${isBlog ? "yüksek trafik potansiyeli olan blog konuları" : "sunulabilecek yeni hizmet fikirleri"} öner.

FİRMA HAKKINDA:
- Kayseri merkezli inşaat firması
- Ana hizmetler: hafriyat, istinat duvarı, arazi tesviye, drenaj, taş ev yapımı, parke taşı döşeme
- Hedef kitle: Kayseri ve çevresinde inşaat yaptıracak kişiler, müteahhitler, belediyeler

MEVCUT İÇERİKLER (BUNLARI ÖNERİLERDE TEKRARLAMA):
${existingTitles.map((t) => `- ${t}`).join("\n")}

KURALLAR:
1. Tam olarak 10 adet ${label} önerisi oluştur
2. Her önerinin Google'da arama hacmi yüksek, rekabeti orta-düşük anahtar kelimeleri olsun
3. Konu başlıkları SEO-dostu olsun (güçlü, ilgi çekici, anahtar kelime içeren)
4. seoScore: 0-100 arası gerçekçi bir SEO potansiyel puanı ver:
   - 90+: Yüksek arama hacmi + düşük rekabet + çok alakalı
   - 80-89: İyi arama hacmi + orta rekabet
   - 70-79: Orta arama hacmi veya yüksek rekabet
   - 60-69: Düşük hacim veya çok yüksek rekabet
5. Kategoriler: ${categories}
6. Anahtar kelimeler Türkçe olsun ve gerçek arama terimlerini yansıtsın
7. ${batchNumber === 2 ? "Daha niş ve spesifik konular öner (long-tail keywords)" : "Genel ve yüksek hacimli konular öner"}
8. Mevcut içeriklerle örtüşmeyen, tamamen farklı konular öner
${isBlog ? "9. Başlıklar bilgilendirici, rehber niteliğinde olsun (nasıl yapılır, rehber, dikkat edilecekler gibi)" : "9. Hizmet isimleri profesyonel ve sektörel terimlerle olsun"}

SADECE aşağıdaki JSON formatında yanıt ver, başka hiçbir şey yazma:

[
  {
    "title": "...",
    "excerpt": "2-3 cümlelik açıklama",
    "category": "...",
    "focusKeyword": "ana anahtar kelime",
    "keywords": ["anahtar1", "anahtar2", "anahtar3", "anahtar4"],
    "seoScore": 85
  }
]`;
}

/* ── SEO Optimize Prompt ── */
export interface SeoOptimizeParams {
  title: string;
  content: string;
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  failingChecks: string[];
}

export function buildSeoOptimizePrompt(params: SeoOptimizeParams): string {
  const kw = params.focusKeyword;
  return `Sen SEO uzmanısın. Aşağıdaki içeriği düzenle ve SEO skorunu 100'e çıkar.

ODAK ANAHTAR KELİME: "${kw}"

MEVCUT BAŞLIK: ${params.title}
MEVCUT META TITLE (${params.metaTitle.length} karakter): ${params.metaTitle}
MEVCUT META DESCRIPTION (${params.metaDescription.length} karakter): ${params.metaDescription}
MEVCUT SLUG: ${params.slug}

BAŞARISIZ KONTROLLER (BUNLARI DÜZELTMELİSİN):
${params.failingChecks.map((c) => `❌ ${c}`).join("\n")}

DÜZELTME KURALLARI:
1. META TITLE: Tam olarak 50-60 karakter olmalı (şu an ${params.metaTitle.length}). Odak anahtar kelime "${kw}" başta olmalı. Karakter sayısını DİKKATLİCE say!
2. META DESCRIPTION: Tam olarak 130-155 karakter olmalı (şu an ${params.metaDescription.length}). Odak AK içermeli + CTA ifade. Karakter sayısını DİKKATLİCE say!
3. SLUG: Odak AK içermeli, kebab-case, Türkçe→ASCII: ı→i, ö→o, ü→u, ş→s, ç→c, ğ→g
4. İÇERİK: En az 1500 kelime. Odak AK en az 30 kez doğal şekilde geçmeli. En az 4 <h2> başlığında AK geçmeli.
5. BAŞLIK: Odak AK içermeli.
6. İçerik zaten mevcutsa sadece gerekli kısımları düzenle, gereksiz yere tamamen yeniden yazma.

MEVCUT İÇERİK:
${params.content}

SADECE aşağıdaki JSON formatında yanıt ver, başka hiçbir şey yazma:

{
  "title": "düzenlenmiş başlık",
  "content": "düzenlenmiş HTML içerik",
  "metaTitle": "tam 50-60 karakter",
  "metaDescription": "tam 130-155 karakter",
  "slug": "duzeltilmis-slug"
}

⚠️ JSON döndürmeden önce MUTLAKA kontrol et:
- metaTitle tam 50-60 karakter mi? (Say!)
- metaDescription tam 130-155 karakter mi? (Say!)
- content en az 1500 kelime mi?
- "${kw}" content'te en az 30 kez geçiyor mu?
- En az 4 <h2>'de "${kw}" var mı?`;
}

/* ── JSON parse helper ── */
export function parseAiResponse(text: string): AiGeneratedContent {
  // Gemini bazen ```json ... ``` ile sarabilir, temizle
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  return JSON.parse(cleaned);
}
