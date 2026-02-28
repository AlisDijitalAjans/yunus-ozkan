"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import SeoScoreWidget from "@/components/admin/SeoScoreWidget";

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

interface FormSidebarProps {
  title: string;
  children: React.ReactNode;
  seo: SeoData;
  onSeoChange: (field: keyof SeoData, value: string) => void;
  focusKeyword: string;
  onFocusKeywordChange: (value: string) => void;
  content: string;
  postTitle: string;
  hasMedia?: boolean;
  onAiSeoOptimize?: () => void;
  seoOptimizing?: boolean;
}

export default function FormSidebar({
  title,
  children,
  seo,
  onSeoChange,
  focusKeyword,
  onFocusKeywordChange,
  content,
  postTitle,
  hasMedia,
  onAiSeoOptimize,
  seoOptimizing,
}: FormSidebarProps) {
  return (
    <div className="space-y-5 sticky top-[7.5rem] lg:top-[4rem] self-start max-h-[calc(100vh-8.5rem)] lg:max-h-[calc(100vh-5rem)] overflow-y-auto sidebar-scroll">
      {/* Form-specific fields */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4"
      >
        <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
        {children}
      </motion.div>

      {/* SEO Score Widget */}
      <SeoScoreWidget
        focusKeyword={focusKeyword}
        onFocusKeywordChange={onFocusKeywordChange}
        title={postTitle}
        content={content}
        seo={seo}
        hasMedia={hasMedia}
        onAiSeoOptimize={onAiSeoOptimize}
        seoOptimizing={seoOptimizing}
      />

      {/* SEO Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Search className="size-4 text-primary-gold" />
          <h3 className="text-gray-900 font-semibold text-sm">SEO Ayarları</h3>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            URL (Slug)
          </label>
          <div className="flex items-center rounded-xl bg-gray-50 border border-gray-200 overflow-hidden focus-within:border-primary-gold/50 focus-within:ring-1 focus-within:ring-primary-gold/20 transition-colors">
            <span className="pl-3 text-gray-400 text-sm select-none">/</span>
            <input
              type="text"
              value={seo.slug}
              onChange={(e) => onSeoChange("slug", e.target.value)}
              placeholder="sayfa-url-yolu"
              className="flex-1 px-2 py-2.5 bg-transparent text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Meta Başlık
          </label>
          <input
            type="text"
            value={seo.metaTitle}
            onChange={(e) => onSeoChange("metaTitle", e.target.value)}
            placeholder="Sayfa başlığı (Google'da görünür)"
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
          />
          <p
            className={`text-[11px] mt-1 ${seo.metaTitle.length > 60 ? "text-red-500" : "text-gray-400"}`}
          >
            {seo.metaTitle.length}/60 karakter
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Meta Açıklama
          </label>
          <textarea
            value={seo.metaDescription}
            onChange={(e) => onSeoChange("metaDescription", e.target.value)}
            placeholder="Sayfanın kısa açıklaması (Google'da görünür)"
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors resize-none"
          />
          <p
            className={`text-[11px] mt-1 ${seo.metaDescription.length > 160 ? "text-red-500" : "text-gray-400"}`}
          >
            {seo.metaDescription.length}/160 karakter
          </p>
        </div>

        {/* Google Preview */}
        {(seo.metaTitle || seo.metaDescription) && (
          <div className="rounded-lg border border-gray-200 p-3 bg-gray-50/50">
            <p className="text-[11px] text-gray-400 mb-1.5">Google Önizleme</p>
            <p className="text-sm text-blue-700 font-medium leading-tight line-clamp-1">
              {seo.metaTitle || "Sayfa Başlığı"}
            </p>
            <p className="text-xs text-green-700 mt-0.5 line-clamp-1">
              yunusozkaninsaat.com/{seo.slug || "..."}
            </p>
            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
              {seo.metaDescription || "Meta açıklama buraya gelecek..."}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
