"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, MessageCircle, Camera, FolderOpen, ImageIcon } from "lucide-react";

const categories = [
  { id: "all", label: "Tümü" },
  { id: "istinat", label: "İstinat Duvarı" },
  { id: "hafriyat", label: "Hafriyat" },
  { id: "arazi", label: "Arazi Düzenleme" },
  { id: "drenaj", label: "Drenaj" },
  { id: "diger", label: "Diğer" },
];

const galleryItems = [
  { src: "/galeri-1.jpg", title: "İstinat Duvarı Projesi", category: "istinat" },
  { src: "/galeri-2.jpg", title: "Hafriyat Çalışması", category: "hafriyat" },
  { src: "/galeri-3.jpg", title: "Arazi Düzenleme", category: "arazi" },
  { src: "/galeri-4.jpg", title: "Tesviye İşleri", category: "arazi" },
  { src: "/galeri-5.jpg", title: "Kazı Çalışması", category: "hafriyat" },
  { src: "/galeri-6.jpg", title: "İstinat Duvarı", category: "istinat" },
  { src: "/galeri-7.jpg", title: "Drenaj Sistemi", category: "drenaj" },
  { src: "/galeri-8.jpg", title: "Hafriyat Projesi", category: "hafriyat" },
  { src: "/galeri-9.jpg", title: "Toprak Taşıma", category: "diger" },
  { src: "/galeri-10.jpg", title: "Arazi Tesviye", category: "arazi" },
  { src: "/galeri-11.jpg", title: "Dolgu İşleri", category: "diger" },
  { src: "/galeri-12.jpg", title: "İnşaat Projesi", category: "istinat" },
  { src: "/galeri-13.jpg", title: "Tamamlanan Proje", category: "diger" },
];

const stats = [
  { icon: Camera, value: "13+", label: "Proje Fotoğrafı" },
  { icon: FolderOpen, value: "5", label: "Kategori" },
  { icon: ImageIcon, value: "500+", label: "Tamamlanan Proje" },
];

export default function GaleriContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  return (
    <>
      {/* Stats Bar */}
      <section className="section-padding pt-0 pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-5 text-center border border-transparent hover:border-primary-gold/30 transition-all duration-300"
                >
                  <div className="gold-gradient size-10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="text-black size-5" />
                  </div>
                  <div className="font-bold text-gradient-gold text-2xl mb-1">{stat.value}</div>
                  <p className="text-theme-text-secondary font-medium text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding pt-0 pb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIndex(0);
                }}
                className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "gold-gradient text-black"
                    : "glass text-theme-text-secondary hover:text-primary-gold hover:border-primary-gold/30 border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="group cursor-pointer overflow-hidden rounded-xl relative"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    {/* Hover Overlay */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white">
                          {item.title}
                        </span>
                        <ZoomIn className="size-[1.125rem] text-primary-gold shrink-0" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-theme-text-secondary text-lg">Bu kategoride henüz fotoğraf bulunmuyor.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="glass relative overflow-hidden rounded-3xl py-10 px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d5b36b]/20 to-transparent" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="font-bold text-theme-text text-[2rem] mb-4">
                Projenizi de{" "}
                <span className="text-gradient-gold">Galerimize Ekleyelim</span>
              </h3>
              <p className="text-theme-text-secondary text-lg mb-8">
                Profesyonel ekibimizle projelerinizi hayata geçiriyoruz.
              </p>
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2.5"
              >
                <MessageCircle className="size-5" />
                <span>WhatsApp ile İletişime Geç</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredItems[activeIndex] && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-black/90 backdrop-blur"
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 bg-white/10 rounded-full size-12 flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors duration-300"
              aria-label="Kapat"
            >
              <X className="size-6" />
            </button>

            {/* Prev Arrow */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 rounded-full size-12 flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors duration-300"
              aria-label="Önceki"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 rounded-full size-12 flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors duration-300"
              aria-label="Sonraki"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-[90vw] max-h-[85vh] w-auto h-auto"
            >
              <Image
                src={filteredItems[activeIndex].src}
                alt={filteredItems[activeIndex].title}
                width={1200}
                height={1200}
                className="object-contain max-w-[90vw] max-h-[85vh] w-auto h-auto rounded-xl"
              />
              {/* Title Bar */}
              <div
                className="absolute bottom-0 inset-x-0 px-5 py-4 rounded-b-xl"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
              >
                <p className="font-semibold text-white text-base">
                  {filteredItems[activeIndex].title}
                </p>
                <p className="text-primary-gold text-sm">
                  {activeIndex + 1} / {filteredItems.length}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
