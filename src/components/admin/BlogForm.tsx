"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import EditorLayout from "@/components/admin/EditorLayout";
import { type SeoData } from "@/components/admin/FormSidebar";
import { useToast } from "@/components/admin/Toast";
import { analyzeSeo } from "@/lib/seo-utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface BlogFormProps {
  initialData?: {
    slug?: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    content: string;
    faqs?: FaqItem[];
    focusKeyword?: string;
    metaTitle?: string;
    metaDescription?: string;
    seoSlug?: string;
  };
  isEdit?: boolean;
}

const categories = [
  "İnşaat",
  "İş Güvenliği",
  "Arazi",
  "Altyapı",
  "Peyzaj",
];

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [category, setCategory] = useState(initialData?.category || categories[0]);
  const [image, setImage] = useState(initialData?.image || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [faqs, setFaqs] = useState<FaqItem[]>(
    initialData?.faqs || []
  );
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focusKeyword || "");
  const [status, setStatus] = useState<"draft" | "published">(
    isEdit ? "published" : "draft"
  );
  const [seo, setSeo] = useState<SeoData>({
    metaTitle: initialData?.metaTitle || initialData?.title || "",
    metaDescription: initialData?.metaDescription || initialData?.excerpt || "",
    slug: initialData?.seoSlug || initialData?.slug || "",
  });
  const [saving, setSaving] = useState(false);
  const handleSeoChange = (field: keyof SeoData, value: string) =>
    setSeo((prev) => ({ ...prev, [field]: value }));

  // AI verisini form render'dan ÖNCE yükle (SimpleEditor content'i sadece mount'ta okuyor)
  const [ready, setReady] = useState(!!isEdit);
  const [imageGenerating, setImageGenerating] = useState(false);
  const [seoOptimizing, setSeoOptimizing] = useState(false);
  useEffect(() => {
    const stored = sessionStorage.getItem("ai-generated-blog");
    if (stored) {
      sessionStorage.removeItem("ai-generated-blog");
      try {
        const data = JSON.parse(stored);
        if (data.title) setTitle(data.title);
        if (data.excerpt) setExcerpt(data.excerpt);
        if (data.category && categories.includes(data.category)) setCategory(data.category);
        if (data.content) setContent(data.content);
        if (data.faqs?.length) setFaqs(data.faqs);
        if (data.focusKeyword) setFocusKeyword(data.focusKeyword);
        if (data.image) {
          setImage(data.image);
        }
        setSeo({
          metaTitle: data.metaTitle || data.title || "",
          metaDescription: data.metaDescription || data.excerpt || "",
          slug: data.slug || "",
        });
        toast("AI içerik başarıyla oluşturuldu!", "success");

        // Görsel yoksa otomatik üret
        if (!data.image && data.title) {
          setImageGenerating(true);
          fetch("/api/ai/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: data.title, entityType: "blog", folder: "blog" }),
          })
            .then((res) => res.json())
            .then((imgData) => {
              if (imgData.url) {
                setImage(imgData.url);
                toast("AI kapak görseli oluşturuldu!", "success");
              } else {
                toast("AI görsel oluşturulamadı. Manuel olarak ekleyebilirsiniz.", "error");
              }
            })
            .catch(() => toast("AI görsel oluşturulurken hata oluştu.", "error"))
            .finally(() => setImageGenerating(false));
        }
      } catch {
        // JSON parse hatası — sessizce geç
      }
    }
    setReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));
  const updateFaq = (i: number, field: keyof FaqItem, val: string) =>
    setFaqs(faqs.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)));
  const moveFaq = (i: number, dir: -1 | 1) => {
    const next = [...faqs];
    const target = i + dir;
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]];
    setFaqs(next);
  };

  const buildPayload = (targetStatus: "draft" | "published") => ({
    slug: seo.slug || title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"),
    title,
    excerpt,
    image,
    date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
    category,
    readingTime: `${Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200))} dk okuma`,
    author: "Yunus Özkan İnşaat Ekibi",
    htmlContent: content,
    faqs,
    focusKeyword,
    status: targetStatus,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
  });

  const saveToDb = async (targetStatus: "draft" | "published") => {
    if (!title.trim()) { toast("Başlık gerekli.", "error"); return; }
    if (saving) return;
    setSaving(true);
    try {
      const payload = buildPayload(targetStatus);
      const isUpdate = isEdit && initialData?.slug;
      const url = isUpdate ? `/api/blog/${initialData.slug}` : "/api/blog";
      const method = isUpdate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isUpdate ? { ...payload, newSlug: payload.slug !== initialData.slug ? payload.slug : undefined } : payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Bilinmeyen hata" }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      setStatus(targetStatus);
      toast(
        targetStatus === "draft"
          ? "Taslak olarak kaydedildi."
          : isEdit ? "Yazı güncellendi." : "Yazı yayınlandı.",
        "success"
      );
      router.push("/admin/blog");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
      toast(`Kaydetme hatası: ${msg}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = () => saveToDb("draft");
  const handlePublish = () => saveToDb("published");

  const handleAiSeoOptimize = async () => {
    if (!focusKeyword.trim()) {
      toast("Önce bir odak anahtar kelime girin.", "error");
      return;
    }
    if (seoOptimizing) return;
    setSeoOptimizing(true);

    let currentTitle = title;
    let currentContent = content;
    let currentSeo = { ...seo };
    const MAX_ATTEMPTS = 3;

    try {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        const analysis = analyzeSeo({
          focusKeyword,
          title: currentTitle,
          content: currentContent,
          seo: currentSeo,
          hasMedia: !!image,
        });

        if (analysis.score >= 100) {
          toast(`SEO skoru 100! (${attempt > 1 ? `${attempt - 1} deneme ile` : "zaten"} tamamlandı)`, "success");
          break;
        }

        const failingChecks = analysis.checks
          .filter((c) => !c.passed)
          .map((c) => `${c.label}${c.detail ? ` (${c.detail})` : ""}`);

        toast(`Deneme ${attempt}/${MAX_ATTEMPTS} — Skor: ${analysis.score}, ${failingChecks.length} sorun düzeltiliyor...`, "info");

        const res = await fetch("/api/ai/seo-optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: currentTitle,
            content: currentContent,
            focusKeyword,
            metaTitle: currentSeo.metaTitle,
            metaDescription: currentSeo.metaDescription,
            slug: currentSeo.slug,
            failingChecks,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Bilinmeyen hata" }));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const data = await res.json();

        if (data.title) {
          currentTitle = data.title;
          setTitle(data.title);
        }
        if (data.content) {
          currentContent = data.content;
          setContent(data.content);
        }
        const newSeo = {
          metaTitle: data.metaTitle || currentSeo.metaTitle,
          metaDescription: data.metaDescription || currentSeo.metaDescription,
          slug: data.slug || currentSeo.slug,
        };
        currentSeo = newSeo;
        setSeo(newSeo);

        // Final check after applying
        const finalAnalysis = analyzeSeo({
          focusKeyword,
          title: currentTitle,
          content: currentContent,
          seo: currentSeo,
          hasMedia: !!image,
        });

        if (finalAnalysis.score >= 100) {
          toast(`SEO skoru 100'e ulaştı! (${attempt} deneme)`, "success");
          break;
        }

        if (attempt === MAX_ATTEMPTS) {
          toast(`SEO skoru ${finalAnalysis.score}'a yükseltildi. (${MAX_ATTEMPTS} deneme tamamlandı)`, "info");
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
      toast(`SEO iyileştirme hatası: ${msg}`, "error");
    } finally {
      setSeoOptimizing(false);
    }
  };

  const handleAiImage = () => {
    if (!title.trim()) {
      toast("Önce bir başlık girin.", "error");
      return;
    }
    if (imageGenerating) return;
    setImageGenerating(true);
    fetch("/api/ai/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, entityType: "blog", folder: "blog" }),
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.url) {
          setImage(imgData.url);
          toast("AI kapak görseli oluşturuldu!", "success");
        } else {
          toast(imgData.error || "Görsel oluşturulamadı.", "error");
        }
      })
      .catch(() => toast("Görsel oluşturulurken hata oluştu.", "error"))
      .finally(() => setImageGenerating(false));
  };

  if (!ready) return null;

  return (
    <EditorLayout
      backHref="/admin/blog"
      headerTitle={isEdit ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}
      subtitle={
        isEdit
          ? "Blog yazısını düzenleyin ve kaydedin."
          : "Yeni bir blog yazısı oluşturun."
      }
      status={status}
      onStatusChange={setStatus}
      isEdit={!!isEdit}
      onSaveDraft={handleSaveDraft}
      onPublish={handlePublish}
      sidebarTitle="Yazı Bilgileri"
      seo={seo}
      onSeoChange={handleSeoChange}
      focusKeyword={focusKeyword}
      onFocusKeywordChange={setFocusKeyword}
      content={content}
      postTitle={title}
      hasMedia={!!image}
      onAiSeoOptimize={handleAiSeoOptimize}
      seoOptimizing={seoOptimizing}
      sidebarChildren={
        <>
          {/* Category */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Özet
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Kısa özet..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors resize-none"
            />
          </div>

          {/* Cover Image */}
          <CloudinaryUpload
            value={image}
            onChange={setImage}
            accept="image"
            folder="blog"
            label="Kapak Görseli"
            maxSizeMB={10}
            aiGenerating={imageGenerating}
            onAiGenerate={handleAiImage}
          />
        </>
      }
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-5 border border-gray-100"
      >
        <label className="block text-gray-700 text-sm font-medium mb-1.5">
          Başlık
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yazı başlığı..."
          required
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
        />
      </motion.div>

      {/* Tiptap Editor */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="bg-white rounded-2xl p-5 border border-gray-100"
      >
        <label className="block text-gray-700 text-sm font-medium mb-3">
          İçerik
        </label>
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <SimpleEditor content={content} onChange={setContent} />
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-2xl p-5 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-semibold text-sm">
              Sık Sorulan Sorular (SSS)
            </h3>
            <p className="text-gray-400 text-xs mt-0.5">
              Blog yazısına SSS ekleyin. Schema markup olarak da kullanılır.
            </p>
          </div>
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-gold/10 text-primary-gold text-xs font-medium hover:bg-primary-gold/20 transition-colors"
          >
            <Plus className="size-3.5" />
            Soru Ekle
          </button>
        </div>

        {faqs.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-400 text-sm">Henüz SSS eklenmedi.</p>
            <button
              type="button"
              onClick={addFaq}
              className="mt-2 text-primary-gold text-xs font-medium hover:underline"
            >
              İlk soruyu ekle
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="group rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-colors hover:border-gray-300"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 size-6 rounded-lg bg-primary-gold/10 text-primary-gold text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaq(i, "question", e.target.value)}
                      placeholder="Soru..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(i, "answer", e.target.value)}
                      placeholder="Cevap..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveFaq(i, -1)}
                      disabled={i === 0}
                      className="p-1 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFaq(i, 1)}
                      disabled={i === faqs.length - 1}
                      className="p-1 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </EditorLayout>
  );
}
