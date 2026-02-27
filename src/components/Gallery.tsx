"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const galleryItems = [
  { src: "/galeri-1.jpg", title: "İstinat Duvarı Projesi" },
  { src: "/galeri-2.jpg", title: "Hafriyat Çalışması" },
  { src: "/galeri-3.jpg", title: "Arazi Düzenleme" },
  { src: "/galeri-4.jpg", title: "Tesviye İşleri" },
  { src: "/galeri-5.jpg", title: "Kazı Çalışması" },
  { src: "/galeri-6.jpg", title: "İstinat Duvarı" },
  { src: "/galeri-7.jpg", title: "Drenaj Sistemi" },
  { src: "/galeri-8.jpg", title: "Hafriyat Projesi" },
  { src: "/galeri-9.jpg", title: "Toprak Taşıma" },
  { src: "/galeri-10.jpg", title: "Arazi Tesviye" },
  { src: "/galeri-11.jpg", title: "Dolgu İşleri" },
  { src: "/galeri-12.jpg", title: "İnşaat Projesi" },
  { src: "/galeri-13.jpg", title: "Tamamlanan Proje" },
];

// Smooth loop için görselleri çoğalt
const slides = [...galleryItems, ...galleryItems];

interface GalleryProps {
  showHeader?: boolean;
  variant?: "slider" | "grid";
}

export default function Gallery({ showHeader = true, variant = "slider" }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 2,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 12 },
      },
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 14 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 16 },
      },
    },
  });

  const openLightbox = (index: number) => {
    const realIndex = variant === "slider" ? index % galleryItems.length : index;
    setActiveIndex(realIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  return (
    <section id="galeri" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-10 text-center mx-auto"
          >
            <span className="inline-block glass rounded-full text-primary-gold font-semibold py-1.5 px-4 text-sm mb-4">
              Galeri
            </span>
            <h2 className="font-bold text-theme-text text-fluid-section mb-5">
              Projelerimizden <span className="text-gradient-gold">Kareler</span>
            </h2>
            <p className="text-theme-text-secondary leading-relaxed text-lg">
              Tamamladığımız projelerden fotoğraf galerisi
            </p>
          </motion.div>
        )}

        {/* Grid Layout */}
        {variant === "grid" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
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
          </div>
        )}

        {/* Slider Layout */}
        {variant === "slider" && (
          <div className="relative">
            {/* Prev Arrow */}
            <button
              onClick={() => instanceRef.current?.prev()}
              className="hidden md:flex glass text-white hover:text-primary-gold hover:bg-white/10 transition-all duration-300 absolute -left-6 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full items-center justify-center"
              aria-label="Önceki"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={() => instanceRef.current?.next()}
              className="hidden md:flex glass text-white hover:text-primary-gold hover:bg-white/10 transition-all duration-300 absolute -right-6 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full items-center justify-center"
              aria-label="Sonraki"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">
              {slides.map((item, index) => (
                <div key={`${item.src}-${index}`} className="keen-slider__slide">
                  <div
                    className="group cursor-pointer overflow-hidden rounded-xl relative"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
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
                src={galleryItems[activeIndex].src}
                alt={galleryItems[activeIndex].title}
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
                  {galleryItems[activeIndex].title}
                </p>
                <p className="text-primary-gold text-sm">
                  {activeIndex + 1} / {galleryItems.length}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
