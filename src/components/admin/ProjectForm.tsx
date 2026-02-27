"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import EditorLayout from "@/components/admin/EditorLayout";
import { type SeoData } from "@/components/admin/FormSidebar";

interface FaqItem {
  question: string;
  answer: string;
}

interface ProjectFormProps {
  initialData?: {
    title: string;
    description: string;
    category: string;
    location: string;
    video: string;
    content?: string;
    faqs?: FaqItem[];
  };
  isEdit?: boolean;
}

const categories = [
  "İstinat Duvarı",
  "Tesviye",
  "Hafriyat",
  "Drenaj",
  "Peyzaj",
  "Diğer",
];

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || categories[0]);
  const [location, setLocation] = useState(initialData?.location || "");
  const [video, setVideo] = useState(initialData?.video || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [faqs, setFaqs] = useState<FaqItem[]>(initialData?.faqs || []);
  const [focusKeyword, setFocusKeyword] = useState("");
  const [status, setStatus] = useState<"draft" | "published">(
    isEdit ? "published" : "draft"
  );
  const [seo, setSeo] = useState<SeoData>({
    metaTitle: initialData?.title || "",
    metaDescription: initialData?.description || "",
    slug: "",
  });
  const handleSeoChange = (field: keyof SeoData, value: string) =>
    setSeo((prev) => ({ ...prev, [field]: value }));

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

  const handleSaveDraft = () => {
    setStatus("draft");
    alert("Taslak olarak kaydedildi!");
  };

  const handlePublish = () => {
    setStatus("published");
    alert(isEdit ? "Proje güncellendi!" : "Proje oluşturuldu!");
    router.push("/admin/projeler");
  };

  const handleAiSeoOptimize = () => {
    alert("AI SEO iyileştirme yakında aktif olacak!");
  };

  return (
    <EditorLayout
      backHref="/admin/projeler"
      headerTitle={isEdit ? "Projeyi Düzenle" : "Yeni Proje"}
      subtitle={
        isEdit
          ? "Proje bilgilerini düzenleyin ve kaydedin."
          : "Yeni bir proje oluşturun."
      }
      status={status}
      onStatusChange={setStatus}
      isEdit={!!isEdit}
      onSaveDraft={handleSaveDraft}
      onPublish={handlePublish}
      sidebarTitle="Proje Bilgileri"
      seo={seo}
      onSeoChange={handleSeoChange}
      focusKeyword={focusKeyword}
      onFocusKeywordChange={setFocusKeyword}
      content={content}
      postTitle={title}
      hasMedia={!!video}
      onAiSeoOptimize={handleAiSeoOptimize}
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

          {/* Location */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Konum
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Kayseri"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
            />
          </div>

          {/* Media */}
          <CloudinaryUpload
            value={video}
            onChange={setVideo}
            accept="both"
            folder="projects"
            label="Proje Medyası"
            maxSizeMB={100}
          />

          {/* Description */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Kısa Açıklama
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Proje açıklaması..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors resize-none"
            />
          </div>
        </>
      }
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
      >
        <label className="block text-gray-700 text-sm font-medium mb-1.5">
          Proje Adı
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Proje adı..."
          required
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
        />
      </motion.div>

      {/* Tiptap Editor */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
      >
        <label className="block text-gray-700 text-sm font-medium mb-3">
          İçerik
        </label>
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <SimpleEditor content={initialData?.content} onChange={setContent} />
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-semibold text-sm">
              Sık Sorulan Sorular (SSS)
            </h3>
            <p className="text-gray-400 text-xs mt-0.5">
              Projeye SSS ekleyin. Schema markup olarak da kullanılır.
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
