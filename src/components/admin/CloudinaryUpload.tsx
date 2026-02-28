"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Eye,
  Image as ImageIcon,
  Film,
  Loader2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

type AcceptType = "image" | "video" | "both";

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: AcceptType;
  folder?: string;
  label?: string;
  maxSizeMB?: number;
  onMediaTypeChange?: (type: "image" | "video") => void;
  aiGenerating?: boolean;
  onAiGenerate?: () => void;
}

const ACCEPT_MAP: Record<AcceptType, string> = {
  image: "image/jpeg,image/png,image/webp,image/gif",
  video: "video/mp4,video/webm,video/quicktime",
  both: "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime",
};

export default function CloudinaryUpload({
  value,
  onChange,
  accept = "image",
  folder = "uploads",
  label,
  maxSizeMB = 50,
  onMediaTypeChange,
  aiGenerating,
  onAiGenerate,
}: CloudinaryUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const isVideo = useCallback((url: string) => {
    return /\.(mp4|webm|mov|avi)$/i.test(url) || url.includes("/video/");
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);
      setIsUploading(true);
      setProgress(0);

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Dosya boyutu ${maxSizeMB}MB'dan büyük olamaz.`);
        setIsUploading(false);
        return;
      }

      const isVideoFile = file.type.startsWith("video/");
      const isImageFile = file.type.startsWith("image/");

      if (accept === "image" && !isImageFile) {
        setError("Sadece görsel dosyaları yükleyebilirsiniz.");
        setIsUploading(false);
        return;
      }
      if (accept === "video" && !isVideoFile) {
        setError("Sadece video dosyaları yükleyebilirsiniz.");
        setIsUploading(false);
        return;
      }

      try {
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });

        if (!signRes.ok) {
          throw new Error("İmza alınamadı. Oturum süresi dolmuş olabilir.");
        }

        const {
          signature,
          timestamp,
          folder: signedFolder,
          apiKey,
          cloudName,
        } = await signRes.json();

        const resourceType = isVideoFile ? "video" : "image";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        formData.append("folder", signedFolder);

        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const url = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhrRef.current = xhr;

          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const data = JSON.parse(xhr.responseText);
              resolve(data.secure_url);
            } else {
              reject(new Error(`Yükleme başarısız: ${xhr.status}`));
            }
          });

          xhr.addEventListener("error", () => reject(new Error("Ağ hatası")));
          xhr.addEventListener("abort", () =>
            reject(new Error("İptal edildi"))
          );

          xhr.open("POST", uploadUrl);
          xhr.send(formData);
        });

        onChange(url);
        onMediaTypeChange?.(isVideoFile ? "video" : "image");
      } catch (err) {
        if (err instanceof Error && err.message !== "İptal edildi") {
          setError(err.message);
        }
      } finally {
        setIsUploading(false);
        setProgress(0);
        xhrRef.current = null;
      }
    },
    [accept, folder, maxSizeMB, onChange, onMediaTypeChange]
  );

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) uploadFile(files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) uploadFile(files[0]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = () => {
    if (xhrRef.current) xhrRef.current.abort();
    onChange("");
    setIsUploading(false);
    setProgress(0);
    setError(null);
  };

  const hasValue = value.length > 0;
  const showVideo = hasValue && isVideo(value);

  return (
    <div>
      {label && (
        <label className="block text-gray-700 text-sm font-medium mb-1.5">
          {label}
        </label>
      )}

      <AnimatePresence mode="wait">
        {aiGenerating && !hasValue ? (
          <motion.div
            key="ai-generating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative overflow-hidden rounded-xl border border-violet-300/50 p-6 text-center"
            style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #f5f3ff 100%)" }}
          >
            {/* Animated shimmer */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.15) 50%, transparent 100%)",
                animation: "shimmer 2s infinite",
              }}
            />
            <div className="relative flex flex-col items-center gap-3">
              <div
                className="size-12 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)" }}
              >
                <Sparkles className="size-5 text-white animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-700">
                  AI görsel oluşturuyor...
                </p>
                <p className="text-xs text-violet-400 mt-1">
                  Bu işlem 15-30 saniye sürebilir
                </p>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="size-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        ) : hasValue && !isUploading ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group"
          >
            {showVideo ? (
              <video
                src={value}
                className="w-full aspect-video object-cover"
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="relative w-full aspect-video">
                <Image
                  src={value}
                  alt="Önizleme"
                  fill
                  className="object-cover"
                  sizes="320px"
                  unoptimized
                />
              </div>
            )}
            {/* Eye preview button */}
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="size-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <Eye className="size-5 text-white" />
              </div>
            </button>
            {/* Remove button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer z-10"
            >
              <X className="size-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <p className="text-white text-[10px] truncate">{value}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !isUploading && inputRef.current?.click()}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 p-6 text-center ${
              isDragging
                ? "border-primary-gold bg-primary-gold/5"
                : "border-gray-200 hover:border-gray-300 bg-gray-50"
            } ${isUploading ? "pointer-events-none" : ""}`}
          >
            {isUploading && (
              <div
                className="absolute inset-y-0 left-0 bg-primary-gold/10 transition-all duration-300 rounded-xl"
                style={{ width: `${progress}%` }}
              />
            )}

            <div className="relative flex flex-col items-center gap-2">
              {isUploading ? (
                <>
                  <Loader2 className="size-8 text-primary-gold animate-spin" />
                  <p className="text-sm text-gray-600 font-medium">
                    Yükleniyor... %{progress}
                  </p>
                </>
              ) : (
                <>
                  <div className="size-10 rounded-xl bg-primary-gold/10 flex items-center justify-center">
                    {accept === "video" ? (
                      <Film className="size-5 text-primary-gold" />
                    ) : accept === "both" ? (
                      <Upload className="size-5 text-primary-gold" />
                    ) : (
                      <ImageIcon className="size-5 text-primary-gold" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="text-primary-gold font-medium">
                        Dosya seçin
                      </span>{" "}
                      veya sürükleyip bırakın
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Maks. {maxSizeMB}MB
                      {accept === "image" && " — JPG, PNG, WebP"}
                      {accept === "video" && " — MP4, WebM"}
                      {accept === "both" && " — Görsel veya Video"}
                    </p>
                  </div>
                  {onAiGenerate && (
                    <>
                      <div className="w-full border-t border-gray-200 my-1" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAiGenerate();
                        }}
                        className="group/ai relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)" }}
                      >
                        <span
                          className="absolute inset-0 opacity-0 group-hover/ai:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)" }}
                        />
                        <Sparkles className="size-3.5 relative z-10" />
                        <span className="relative z-10">AI ile Görsel Oluştur</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT_MAP[accept]}
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewOpen && hasValue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setPreviewOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative z-10 w-full max-w-3xl mx-4"
            >
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="absolute -top-3 -right-3 z-20 p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
                {showVideo ? (
                  <video
                    src={value}
                    className="w-full max-h-[80vh] object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <div className="relative w-full" style={{ maxHeight: "80vh" }}>
                    <Image
                      src={value}
                      alt="Önizleme"
                      width={1200}
                      height={800}
                      className="w-full h-auto max-h-[80vh] object-contain"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
