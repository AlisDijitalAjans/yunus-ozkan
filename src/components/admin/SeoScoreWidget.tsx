"use client";

import { useMemo, useDeferredValue } from "react";
import { motion } from "framer-motion";
import { Target, Check, X, Sparkles, Loader2 } from "lucide-react";
import {
  analyzeSeo,
  type SeoFields,
  type SeoCheckResult,
} from "@/lib/seo-utils";

interface SeoScoreWidgetProps {
  focusKeyword: string;
  onFocusKeywordChange: (value: string) => void;
  title: string;
  content: string;
  seo: SeoFields;
  hasMedia?: boolean;
  onAiSeoOptimize?: () => void;
  seoOptimizing?: boolean;
}

// ── Score Gauge ─────────────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 86
      ? "text-emerald-500"
      : score >= 71
        ? "text-green-500"
        : score >= 41
          ? "text-amber-500"
          : "text-red-500";

  const label =
    score >= 86
      ? "Mükemmel"
      : score >= 71
        ? "İyi"
        : score >= 41
          ? "Orta"
          : "Zayıf";

  return (
    <div className="flex flex-col items-center gap-1.5 py-3">
      <div className="relative size-20">
        <svg className="size-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            className="stroke-gray-100"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            className={`${color} transition-all duration-700`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{score}</span>
        </div>
      </div>
      <span className={`text-xs font-semibold ${color}`}>{label}</span>
    </div>
  );
}

// ── Check Item ──────────────────────────────────────────────────────

function CheckItem({ label, passed, detail }: SeoCheckResult) {
  return (
    <div className="flex items-start gap-2 py-1.5">
      <div
        className={`size-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          passed
            ? "bg-emerald-100 text-emerald-600"
            : "bg-red-100 text-red-500"
        }`}
      >
        {passed ? <Check className="size-2.5" /> : <X className="size-2.5" />}
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs leading-tight ${passed ? "text-gray-600" : "text-gray-900 font-medium"}`}
        >
          {label}
        </p>
        {detail && (
          <p className="text-[11px] text-gray-400 mt-0.5">{detail}</p>
        )}
      </div>
    </div>
  );
}

// ── Density Bar ─────────────────────────────────────────────────────

function DensityBar({
  word,
  density,
  maxDensity,
}: {
  word: string;
  density: number;
  maxDensity: number;
}) {
  const pct = maxDensity > 0 ? (density / maxDensity) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 truncate text-gray-700 font-medium">{word}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-gold/60 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 text-right text-gray-400 tabular-nums">
        %{density.toFixed(1)}
      </span>
    </div>
  );
}

// ── Main Widget ─────────────────────────────────────────────────────

export default function SeoScoreWidget({
  focusKeyword,
  onFocusKeywordChange,
  title,
  content,
  seo,
  hasMedia,
  onAiSeoOptimize,
  seoOptimizing,
}: SeoScoreWidgetProps) {
  const deferredContent = useDeferredValue(content);

  const analysis = useMemo(
    () =>
      analyzeSeo({
        focusKeyword,
        title,
        content: deferredContent,
        seo,
        hasMedia,
      }),
    [focusKeyword, title, deferredContent, seo, hasMedia]
  );

  const maxDensity = analysis.topWords[0]?.density ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4"
    >
      {/* Header + Score Gauge */}
      <div className="flex items-center gap-2">
        <Target className="size-4 text-primary-gold" />
        <h3 className="text-gray-900 font-semibold text-sm">SEO Analizi</h3>
      </div>

      {focusKeyword.trim() && <ScoreGauge score={analysis.score} />}

      {/* AI SEO Optimize Button */}
      {onAiSeoOptimize && (
        <button
          type="button"
          onClick={onAiSeoOptimize}
          disabled={seoOptimizing}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {seoOptimizing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              SEO İyileştiriliyor...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              AI ile SEO İyileştir
            </>
          )}
        </button>
      )}

      {/* Focus Keyword Input */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1.5">
          Odak Anahtar Kelime
        </label>
        <input
          type="text"
          value={focusKeyword}
          onChange={(e) => onFocusKeywordChange(e.target.value)}
          placeholder="örn. istinat duvarı"
          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
        />
      </div>

      {/* Empty state */}
      {!focusKeyword.trim() ? (
        <div className="text-center py-4">
          <p className="text-gray-400 text-xs">
            Analiz için bir odak anahtar kelime girin.
          </p>
        </div>
      ) : (
        <>
          {/* Checklist */}
          <div className="border-t border-gray-100 pt-3 space-y-0.5">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">
              Kontrol Listesi
            </p>
            {analysis.checks.map((check, i) => (
              <CheckItem key={i} {...check} />
            ))}
          </div>

          {/* Top Words */}
          {analysis.topWords.length > 0 && (
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                Kelime Yoğunluğu
              </p>
              {analysis.topWords.map((tw) => (
                <DensityBar
                  key={tw.word}
                  word={tw.word}
                  density={tw.density}
                  maxDensity={maxDensity}
                />
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
