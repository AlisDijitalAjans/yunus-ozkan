// ── SEO Analysis Utilities ──────────────────────────────────────────

export interface SeoFields {
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

export interface SeoCheckResult {
  label: string;
  passed: boolean;
  detail?: string;
}

export interface SeoAnalysis {
  score: number;
  checks: SeoCheckResult[];
  keywordDensity: number;
  topWords: { word: string; count: number; density: number }[];
}

// ── Helpers ─────────────────────────────────────────────────────────

export function stripHtml(html: string): string {
  if (typeof document !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function extractHeadings(html: string): string[] {
  const regex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi;
  const headings: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push(match[1].replace(/<[^>]*>/g, "").trim());
  }
  return headings;
}

const TURKISH_STOP_WORDS = new Set([
  // Türkçe
  "bir", "ve", "bu", "da", "de", "ile", "için", "olan", "den", "dan",
  "dir", "dır", "ama", "ancak", "veya", "gibi", "kadar", "sonra",
  "önce", "daha", "en", "çok", "her", "tüm", "şu", "ne", "mi",
  "mu", "mı", "mü", "ya", "ki", "ise", "hem", "bile", "hep", "bazı",
  "olan", "olarak", "olup", "iken", "böyle", "nasıl", "neden", "hangi",
  "biz", "siz", "ben", "sen", "bunun", "bunu", "buna", "onun", "onu",
  "ona", "kendi", "aynı", "diğer", "başka",
  // İngilizce
  "the", "a", "an", "is", "are", "was", "were", "in", "on", "at",
  "to", "for", "of", "and", "or", "but", "not", "with", "from",
  "by", "this", "that", "it", "its", "as", "be", "has", "have",
]);

// ── Main Analyzer ───────────────────────────────────────────────────

export function analyzeSeo(params: {
  focusKeyword: string;
  title: string;
  content: string;
  seo: SeoFields;
  hasMedia?: boolean;
}): SeoAnalysis {
  const { focusKeyword, title, content, seo, hasMedia } = params;

  if (!focusKeyword.trim()) {
    return { score: 0, checks: [], keywordDensity: 0, topWords: [] };
  }

  const keyword = focusKeyword.toLowerCase().trim();
  const plainText = stripHtml(content);
  const words = plainText
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const wordCount = words.length;
  const headings = extractHeadings(content);

  // Keyword occurrences
  const keywordWords = keyword.split(/\s+/);
  let keywordOccurrences = 0;
  if (keywordWords.length === 1) {
    keywordOccurrences = words.filter((w) => w.includes(keyword)).length;
  } else {
    const plainLower = plainText.toLowerCase();
    let pos = 0;
    while ((pos = plainLower.indexOf(keyword, pos)) !== -1) {
      keywordOccurrences++;
      pos += keyword.length;
    }
  }
  const keywordDensity =
    wordCount > 0 ? (keywordOccurrences / wordCount) * 100 : 0;

  type Check = SeoCheckResult & { weight: number };
  const checks: Check[] = [];

  // 1. Keyword in title (15 pts)
  const titleHas = title.toLowerCase().includes(keyword);
  checks.push({
    label: "Başlıkta anahtar kelime",
    passed: titleHas,
    detail: titleHas
      ? "Başlık anahtar kelimeyi içeriyor"
      : "Başlığa anahtar kelimeyi ekleyin",
    weight: 15,
  });

  // 2. Keyword in meta title (10 pts)
  const metaTitleHas = seo.metaTitle.toLowerCase().includes(keyword);
  checks.push({
    label: "Meta başlıkta anahtar kelime",
    passed: metaTitleHas,
    detail: metaTitleHas
      ? "Meta başlık anahtar kelimeyi içeriyor"
      : "Meta başlığa anahtar kelimeyi ekleyin",
    weight: 10,
  });

  // 3. Keyword in meta description (10 pts)
  const metaDescHas = seo.metaDescription.toLowerCase().includes(keyword);
  checks.push({
    label: "Meta açıklamada anahtar kelime",
    passed: metaDescHas,
    detail: metaDescHas
      ? "Meta açıklama anahtar kelimeyi içeriyor"
      : "Meta açıklamaya anahtar kelimeyi ekleyin",
    weight: 10,
  });

  // 4. Keyword in slug (10 pts)
  const slugKeyword = keyword.replace(/\s+/g, "-");
  const slugHas = seo.slug.toLowerCase().includes(slugKeyword);
  checks.push({
    label: "URL (slug) anahtar kelime içeriyor",
    passed: slugHas,
    detail: slugHas
      ? "Slug anahtar kelimeyi içeriyor"
      : `Slug'a "${slugKeyword}" ekleyin`,
    weight: 10,
  });

  // 5. Keyword density 1-3% (10 pts)
  const densityOk = keywordDensity >= 1 && keywordDensity <= 3;
  checks.push({
    label: "Anahtar kelime yoğunluğu (1-3%)",
    passed: densityOk,
    detail: `%${keywordDensity.toFixed(1)} yoğunluk${
      keywordDensity < 1
        ? " — çok düşük"
        : keywordDensity > 3
          ? " — çok yüksek"
          : " — ideal"
    }`,
    weight: 10,
  });

  // 6. Meta title length 50-60 (10 pts)
  const mtLen = seo.metaTitle.length;
  const mtOk = mtLen >= 50 && mtLen <= 60;
  checks.push({
    label: "Meta başlık uzunluğu (50-60 karakter)",
    passed: mtOk,
    detail: `${mtLen}/60 karakter${
      mtLen < 50 ? " — çok kısa" : mtLen > 60 ? " — çok uzun" : ""
    }`,
    weight: 10,
  });

  // 7. Meta description length 120-160 (10 pts)
  const mdLen = seo.metaDescription.length;
  const mdOk = mdLen >= 120 && mdLen <= 160;
  checks.push({
    label: "Meta açıklama uzunluğu (120-160 karakter)",
    passed: mdOk,
    detail: `${mdLen}/160 karakter${
      mdLen < 120 ? " — çok kısa" : mdLen > 160 ? " — çok uzun" : ""
    }`,
    weight: 10,
  });

  // 8. Content length >= 300 words (5 pts)
  const contentOk = wordCount >= 300;
  checks.push({
    label: "İçerik uzunluğu (min. 300 kelime)",
    passed: contentOk,
    detail: `${wordCount} kelime${
      wordCount < 300 ? " — daha fazla içerik ekleyin" : ""
    }`,
    weight: 5,
  });

  // 9. Headings contain keyword (10 pts)
  const headingsHas = headings.some((h) => h.toLowerCase().includes(keyword));
  checks.push({
    label: "Başlıklarda anahtar kelime (H1-H6)",
    passed: headingsHas,
    detail: headingsHas
      ? `${headings.filter((h) => h.toLowerCase().includes(keyword)).length} başlıkta bulundu`
      : "Hiçbir başlıkta anahtar kelime yok",
    weight: 10,
  });

  // 10. Has media (image/video) (10 pts)
  const contentHasImage = /<img\s/i.test(content);
  const mediaOk = !!hasMedia || contentHasImage;
  checks.push({
    label: "Görsel veya video eklenmiş",
    passed: mediaOk,
    detail: mediaOk
      ? "Medya içeriği mevcut"
      : "Kapak görseli veya içerik görseli ekleyin",
    weight: 10,
  });

  // Score
  const score = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0);

  // Top words (filtered)
  const wordFreq: Record<string, number> = {};
  for (const w of words) {
    if (w.length < 3 || TURKISH_STOP_WORDS.has(w)) continue;
    wordFreq[w] = (wordFreq[w] || 0) + 1;
  }
  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      density: wordCount > 0 ? (count / wordCount) * 100 : 0,
    }));

  return {
    score,
    checks: checks.map(({ weight: _, ...rest }) => rest),
    keywordDensity,
    topWords,
  };
}
