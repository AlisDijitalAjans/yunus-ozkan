"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Trash2, Search, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { galleryItems, galleryCategories } from "@/data/gallery";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";

export default function AdminGaleriPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("tumu");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");

  const filtered = galleryItems.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "tumu" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
          <p className="text-gray-500 text-sm mt-1">
            Galeri görsellerinizi yönetin.
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="btn-primary inline-flex items-center gap-2 text-sm shrink-0 self-start"
        >
          <Plus className="size-4" />
          Görsel Ekle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary-gold text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="group relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:border-primary-gold/30 hover:shadow-md transition-all duration-300"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-white text-xs font-medium line-clamp-1">
                {item.title}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white/60 text-[10px]">
                  {
                    galleryCategories.find((c) => c.id === item.category)
                      ?.label
                  }
                </span>
                <button
                  onClick={() => alert(`Silme: ${item.title}`)}
                  className="p-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">Görsel bulunamadı.</p>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setUploadOpen(false);
                setUploadUrl("");
              }}
              className="absolute inset-0 bg-black/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-semibold">Görsel Yükle</h3>
                <button
                  onClick={() => {
                    setUploadOpen(false);
                    setUploadUrl("");
                  }}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <CloudinaryUpload
                value={uploadUrl}
                onChange={setUploadUrl}
                accept="image"
                folder="gallery"
                label="Galeri Görseli"
                maxSizeMB={10}
              />

              {uploadUrl && (
                <button
                  onClick={() => {
                    alert(`Görsel yüklendi: ${uploadUrl}`);
                    setUploadOpen(false);
                    setUploadUrl("");
                  }}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm mt-4"
                >
                  Kaydet
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
