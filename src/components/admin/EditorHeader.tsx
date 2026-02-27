"use client";

import Link from "next/link";
import { ArrowLeft, Save, FileText, Loader2 } from "lucide-react";

type PostStatus = "draft" | "published";

interface EditorHeaderProps {
  backHref: string;
  title: string;
  subtitle: string;
  status: PostStatus;
  onStatusChange: (status: PostStatus) => void;
  isEdit: boolean;
  isSaving?: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export default function EditorHeader({
  backHref,
  title,
  subtitle,
  status,
  onStatusChange,
  isEdit,
  isSaving,
  onSaveDraft,
  onPublish,
}: EditorHeaderProps) {
  const isPublished = status === "published";

  return (
    <div className="sticky top-14 lg:top-0 z-20 -mx-5 lg:-mx-8 px-5 lg:px-8 py-3 bg-[#f5f3ef]/80 backdrop-blur-xl border-b border-gray-200/60 mb-6">
      <div className="flex items-center gap-3">
        {/* Left: Back + Title */}
        <Link
          href={backHref}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors shrink-0"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
          <p className="text-gray-500 text-xs mt-0.5 truncate hidden sm:block">{subtitle}</p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-200 shrink-0" />

        {/* Status Toggle */}
        <button
          type="button"
          onClick={() => onStatusChange(isPublished ? "draft" : "published")}
          className="hidden sm:flex items-center gap-2.5 shrink-0 cursor-pointer"
        >
          <span className={`text-xs font-medium transition-colors ${!isPublished ? "text-gray-700" : "text-gray-400"}`}>
            Taslak
          </span>
          <div
            className={`relative w-9 h-5 rounded-full transition-colors ${
              isPublished ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${
                isPublished ? "translate-x-[18px]" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className={`text-xs font-medium transition-colors ${isPublished ? "text-emerald-700" : "text-gray-400"}`}>
            Yayında
          </span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-200 shrink-0" />

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Save Draft */}
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSaving}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            <FileText className="size-4" />
            <span className="hidden lg:inline">Taslak Kaydet</span>
          </button>

          {/* Publish / Update */}
          <button
            type="button"
            onClick={onPublish}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {isEdit ? "Güncelle" : "Yayınla"}
          </button>
        </div>
      </div>
    </div>
  );
}
