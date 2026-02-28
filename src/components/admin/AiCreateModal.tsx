"use client";

import { useState, useEffect, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  MapPin,
  MessageSquare,
  Tag,
  Type,
  Lightbulb,
  CheckCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

/* ── Topic Data ── */
interface TopicSuggestion {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  focusKeyword: string;
  keywords: string[];
  seoScore: number;
}

function getSeoColor(score: number) {
  if (score >= 86) return "text-emerald-700 bg-emerald-100";
  if (score >= 71) return "text-green-700 bg-green-100";
  if (score >= 41) return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
}

/* ── entityLabel → entityType mapping ── */
function getEntityType(label: string): "blog" | "service" | "project" {
  if (label === "Hizmet") return "service";
  if (label === "Proje") return "project";
  return "blog";
}

function getEntityFolder(label: string): string {
  if (label === "Hizmet") return "services";
  if (label === "Proje") return "projects";
  return "blog";
}

/* ── Modal Props ── */
interface AiCreateModalProps {
  open: boolean;
  onClose: () => void;
  entityLabel: string;
  onGenerated?: (entityType: string) => void;
}

export default function AiCreateModal({
  open,
  onClose,
  entityLabel,
  onGenerated,
}: AiCreateModalProps) {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [localSeo, setLocalSeo] = useState(false);
  const [extraNote, setExtraNote] = useState("");

  // Topic panel state
  const [showTopics, setShowTopics] = useState(false);
  const [topicPhase, setTopicPhase] = useState<"loading" | "suggestions">("loading");
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [topics, setTopics] = useState<TopicSuggestion[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [batch, setBatch] = useState(0);

  // Generating state
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const addKeyword = useCallback(() => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 10) {
      setKeywords((prev) => [...prev, trimmed]);
      setKeywordInput("");
    }
  }, [keywordInput, keywords]);

  const removeKeyword = (kw: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kw));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
    if (e.key === "Backspace" && !keywordInput && keywords.length > 0) {
      setKeywords((prev) => prev.slice(0, -1));
    }
  };

  const handleClose = () => {
    setTitle("");
    setKeywords([]);
    setKeywordInput("");
    setLocalSeo(false);
    setExtraNote("");
    setShowTopics(false);
    setSelectedTopicId(null);
    setGenerating(false);
    setGenerateError(null);
    setTopicError(null);
    setTopics([]);
    setBatch(0);
    setLoadingMore(false);
    onClose();
  };

  // entityLabel'a göre topic verisini seç
  const isService = entityLabel === "Hizmet";
  const showTopicButton = entityLabel !== "Proje";
  const [topicError, setTopicError] = useState<string | null>(null);

  // Topic panel açılınca → AI API ile gerçek öneriler getir
  useEffect(() => {
    if (showTopics) {
      setTopicPhase("loading");
      setSelectedTopicId(null);
      setTopics([]);
      setBatch(0);
      setTopicError(null);

      const entityType = isService ? "service" : "blog";
      let cancelled = false;

      fetch("/api/ai/suggest-topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entityType, batch: 1 }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("API hatası");
          return res.json();
        })
        .then((data) => {
          if (cancelled) return;
          setTopics(data.topics || []);
          setBatch(1);
          setTopicPhase("suggestions");
        })
        .catch((err) => {
          if (cancelled) return;
          setTopicError(err.message || "Öneriler yüklenemedi");
          setTopicPhase("suggestions");
        });

      return () => { cancelled = true; };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTopics, isService]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTopicError(null);

    const entityType = isService ? "service" : "blog";

    fetch("/api/ai/suggest-topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entityType, batch: 2 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("API hatası");
        return res.json();
      })
      .then((data) => {
        setTopics((prev) => [...prev, ...(data.topics || [])]);
        setBatch(2);
        setLoadingMore(false);
      })
      .catch(() => {
        setLoadingMore(false);
      });
  };

  const handleTopicSelect = (topic: TopicSuggestion) => {
    setSelectedTopicId(topic.id);
    setTitle(topic.title);
    setKeywords(topic.keywords);
    setKeywordInput("");
  };

  const handleGenerate = async () => {
    setShowTopics(false);
    setGenerating(true);
    setGenerateError(null);

    const entityType = getEntityType(entityLabel);
    const folder = getEntityFolder(entityLabel);

    try {
      // Metin ve görsel üretimini paralel başlat
      const [contentRes, imageRes] = await Promise.all([
        fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entityType,
            title,
            keywords,
            localSeo,
            extraNote,
          }),
        }),
        fetch("/api/ai/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, entityType, folder }),
        }),
      ]);

      if (!contentRes.ok) {
        const err = await contentRes.json();
        throw new Error(err.error || "İçerik üretilemedi");
      }

      const contentData = await contentRes.json();
      const imageData = await imageRes.json();

      // Görseli içerik verisine ekle
      if (imageData.url) {
        contentData.image = imageData.url;
      }

      // sessionStorage'a kaydet
      const storageKey = `ai-generated-${entityType}`;
      sessionStorage.setItem(storageKey, JSON.stringify(contentData));

      // Callback ile form sayfasına yönlendir
      setGenerating(false);
      handleClose();
      onGenerated?.(entityType);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
      setGenerateError(message);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Generating Modal */}
          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative z-10 flex flex-col items-center gap-5 bg-white rounded-2xl px-10 py-10 max-w-sm w-full mx-4"
              >
                {generateError ? (
                  <>
                    <div className="p-4 rounded-2xl bg-red-50">
                      <AlertCircle className="size-8 text-red-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-gray-900 font-semibold text-base">
                        İçerik üretilemedi
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 max-w-xs">
                        {generateError}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setGenerating(false);
                          setGenerateError(null);
                        }}
                        className="h-9 px-4 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Geri Dön
                      </button>
                      <button
                        onClick={() => {
                          setGenerateError(null);
                          handleGenerate();
                        }}
                        className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer"
                      >
                        <RefreshCw className="size-3.5" />
                        Tekrar Dene
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100"
                    >
                      <Sparkles className="size-8 text-violet-600" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-gray-900 font-semibold text-base">
                        AI sizin için {entityLabel.toLowerCase()} oluşturuyor...
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Bu işlem 15-30 saniye sürebilir.
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full w-1/3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Modal Container */}
          {!generating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative bg-white rounded-2xl w-full mx-4 overflow-hidden flex max-h-[85vh]"
              style={{ maxWidth: showTopics ? "56rem" : "32rem" }}
            >
              {/* ── LEFT: Form ── */}
              <div
                className="shrink-0 flex flex-col overflow-hidden transition-all duration-300"
                style={{ width: showTopics ? "50%" : "100%" }}
              >
                {/* Header */}
                <div className="px-6 pt-6 pb-4 shrink-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100">
                        <Sparkles className="size-5 text-violet-600" />
                      </div>
                      <div>
                        <h2 className="text-gray-900 font-semibold text-base">
                          AI ile {entityLabel} Oluştur
                        </h2>
                        <p className="text-gray-400 text-xs mt-0.5">
                          Bilgileri doldurun, AI sizin için içerik üretsin.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 pb-2 space-y-5 overflow-y-auto flex-1 sidebar-scroll">
                  {/* AI Konu Öner Button — Proje hariç */}
                  {showTopicButton && (
                    <button
                      type="button"
                      onClick={() => setShowTopics(!showTopics)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 transition-all cursor-pointer ${
                        showTopics
                          ? "border-violet-300 bg-violet-50"
                          : "border-gray-200 bg-gray-50 hover:border-violet-300 hover:bg-violet-50/50"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg transition-colors ${showTopics ? "bg-violet-200" : "bg-gray-200"}`}>
                        <Lightbulb className={`size-4 ${showTopics ? "text-violet-700" : "text-gray-500"}`} />
                      </div>
                      <div className="text-left flex-1">
                        <p className={`text-sm font-medium ${showTopics ? "text-violet-700" : "text-gray-700"}`}>
                          {isService ? "AI ile Hizmet Öner" : "AI ile Konu Öner"}
                        </p>
                        <p className="text-gray-400 text-[11px] mt-0.5">
                          {isService
                            ? "Mevcut hizmetlerinize göre yeni hizmet önerileri"
                            : "SEO analizi ile duplicate olmayan konu önerileri"}
                        </p>
                      </div>
                      <Sparkles className={`size-4 ${showTopics ? "text-violet-500" : "text-gray-400"}`} />
                    </button>
                  )}

                  {/* Title */}
                  <div>
                    <label className="flex items-center gap-1.5 text-gray-700 text-sm font-medium mb-2">
                      <Type className="size-3.5 text-gray-400" />
                      {entityLabel} İsmi
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={`Örn: İstinat Duvarı Yapımı`}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition-all"
                    />
                  </div>

                  {/* Keywords */}
                  <div>
                    <label className="flex items-center gap-1.5 text-gray-700 text-sm font-medium mb-2">
                      <Tag className="size-3.5 text-gray-400" />
                      Anahtar Kelimeler
                      <span className="text-gray-400 font-normal text-xs ml-auto">
                        {keywords.length}/10
                      </span>
                    </label>
                    <div className="rounded-xl bg-gray-50 border border-gray-200 focus-within:border-violet-400 focus-within:ring-1 focus-within:ring-violet-200 transition-all p-2 min-h-[44px]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {keywords.map((kw, i) => (
                          <span
                            key={kw}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                              i === 0
                                ? "bg-violet-100 text-violet-700 border border-violet-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {i === 0 && (
                              <span className="size-1.5 rounded-full bg-violet-500 shrink-0" />
                            )}
                            {kw}
                            <button
                              type="button"
                              onClick={() => removeKeyword(kw)}
                              className="p-0.5 rounded hover:bg-black/10 transition-colors cursor-pointer"
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                        {keywords.length < 10 && (
                          <input
                            type="text"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                              keywords.length === 0
                                ? "Kelime yazıp Enter'a basın..."
                                : ""
                            }
                            className="flex-1 min-w-[120px] bg-transparent text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none py-1 px-1"
                          />
                        )}
                      </div>
                    </div>
                    {keywords.length > 0 && (
                      <p className="text-[11px] text-gray-400 mt-1.5">
                        <span className="inline-flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-violet-500" />
                          İlk eklenen kelime odak anahtar kelime olarak kullanılır.
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Local SEO Toggle */}
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <MapPin className={`size-4 ${localSeo ? "text-violet-600" : "text-gray-400"} transition-colors`} />
                      <div>
                        <p className="text-gray-700 text-sm font-medium">
                          Yerel SEO
                        </p>
                        <p className="text-gray-400 text-[11px] mt-0.5">
                          {localSeo
                            ? "Kayseri bölgesine özel SEO optimizasyonu"
                            : "Tüm Türkiye geneli SEO optimizasyonu"}
                        </p>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={localSeo}
                      onClick={() => setLocalSeo(!localSeo)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer ${
                        localSeo ? "bg-violet-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          localSeo ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Extra Note */}
                  <div>
                    <label className="flex items-center gap-1.5 text-gray-700 text-sm font-medium mb-2">
                      <MessageSquare className="size-3.5 text-gray-400" />
                      Ekstra Notunuz
                      <span className="text-gray-400 font-normal text-xs">(Opsiyonel)</span>
                    </label>
                    <textarea
                      value={extraNote}
                      onChange={(e) => setExtraNote(e.target.value)}
                      placeholder="AI'ya vermek istediğiniz ek bilgi veya yönergeler..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center justify-end gap-2 border-t border-gray-100 mt-2 shrink-0">
                  <button
                    onClick={handleClose}
                    className="h-9 px-4 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={!title.trim() || keywords.length === 0}
                    className="inline-flex items-center gap-2 h-9 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:from-violet-700 hover:to-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Sparkles className="size-4" />
                    Oluştur
                  </button>
                </div>
              </div>

              {/* ── RIGHT: Topic Suggestions Panel ── */}
              <AnimatePresence>
                {showTopics && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "50%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="border-l border-gray-100 flex flex-col overflow-hidden"
                  >
                    {topicPhase === "loading" ? (
                      <TopicLoadingState isService={isService} />
                    ) : topicError ? (
                      <div className="flex-1 flex flex-col items-center justify-center px-5">
                        <div className="p-4 rounded-2xl bg-red-50 mb-4">
                          <AlertCircle className="size-6 text-red-500" />
                        </div>
                        <h3 className="text-gray-900 font-semibold text-sm mb-1">
                          Öneriler yüklenemedi
                        </h3>
                        <p className="text-gray-400 text-xs mb-4 text-center">
                          {topicError}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setShowTopics(false);
                            setTimeout(() => setShowTopics(true), 100);
                          }}
                          className="inline-flex items-center gap-2 h-8 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer"
                        >
                          <RefreshCw className="size-3.5" />
                          Tekrar Dene
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Topic Header */}
                        <div className="px-5 pt-5 pb-3 shrink-0">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100">
                              <Lightbulb className="size-4 text-violet-600" />
                            </div>
                            <div>
                              <h3 className="text-gray-900 font-semibold text-sm">
                                {isService ? "Hizmet Önerileri" : "Konu Önerileri"}
                              </h3>
                              <p className="text-gray-400 text-[11px] mt-0.5">
                                AI tarafından {topics.length} öneri oluşturuldu
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Topic List */}
                        <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-2.5 sidebar-scroll">
                          {topics.map((topic, i) => {
                            const isSelected = selectedTopicId === topic.id;
                            return (
                              <motion.button
                                key={topic.id}
                                type="button"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: (i % 10) * 0.03 }}
                                onClick={() => handleTopicSelect(topic)}
                                className={`relative w-full text-left rounded-xl border p-3.5 transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200"
                                    : "border-gray-100 bg-white hover:border-gray-300"
                                }`}
                              >
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-3 right-3"
                                  >
                                    <CheckCircle className="size-4 text-violet-600" />
                                  </motion.div>
                                )}

                                <h4
                                  className={`text-xs font-medium pr-6 leading-snug ${
                                    isSelected ? "text-violet-900" : "text-gray-900"
                                  }`}
                                >
                                  {topic.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                  {topic.excerpt}
                                </p>

                                <div className="flex items-center gap-1.5 mt-2">
                                  <span className="text-primary-gold text-[10px] font-medium bg-primary-gold/10 px-1.5 py-0.5 rounded-full">
                                    {topic.category}
                                  </span>
                                  <span className="inline-flex items-center gap-0.5 text-violet-600 text-[10px] font-medium bg-violet-100 px-1.5 py-0.5 rounded-full">
                                    <Tag className="size-2.5" />
                                    {topic.focusKeyword}
                                  </span>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto ${getSeoColor(topic.seoScore)}`}>
                                    SEO {topic.seoScore}
                                  </span>
                                </div>
                              </motion.button>
                            );
                          })}

                          {/* Load More Button */}
                          {batch < 2 && (
                            <button
                              type="button"
                              onClick={handleLoadMore}
                              disabled={loadingMore}
                              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-gray-200 text-gray-500 text-xs font-medium hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/30 transition-all cursor-pointer disabled:opacity-60"
                            >
                              <RefreshCw className={`size-3.5 ${loadingMore ? "animate-spin" : ""}`} />
                              {loadingMore ? "AI üretiyor..." : "10 Öneri Daha Oluştur"}
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── Loading State ── */
function TopicLoadingState({ isService }: { isService: boolean }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="p-3.5 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 mb-5"
      >
        <Sparkles className="size-6 text-violet-600" />
      </motion.div>

      <h3 className="text-gray-900 font-semibold text-sm mb-1">
        {isService ? "AI hizmet fikirleri araştırıyor" : "AI SEO konuları araştırıyor"}
      </h3>
      <p className="text-gray-400 text-xs mb-6">Mevcut içerikler analiz ediliyor...</p>

      <div className="w-full space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-100 p-3.5 space-y-2"
          >
            <div className="h-3 bg-gray-100 rounded-lg animate-pulse w-4/5" />
            <div className="h-2.5 bg-gray-50 rounded-lg animate-pulse w-full" />
            <div className="h-2.5 bg-gray-50 rounded-lg animate-pulse w-3/5" />
            <div className="flex gap-1.5 mt-1">
              <div className="h-4 w-14 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
