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

export default function Gallery() {
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
    // slides dizisi çoğaltılmış, orijinal index'i bul
    const realIndex = index % galleryItems.length;
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
      <div className="container-custom relative" style={{ zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "48rem",
            marginBottom: "2.5rem",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span
            className="inline-block glass rounded-full text-[#d5b36b] font-semibold"
            style={{
              padding: "0.375rem 1rem",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            Galeri
          </span>
          <h2
            className="font-bold text-white"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              marginBottom: "1.25rem",
            }}
          >
            Projelerimizden <span className="text-gradient-gold">Kareler</span>
          </h2>
          <p className="text-gray-300 leading-relaxed" style={{ fontSize: "1.125rem" }}>
            Tamamladığımız projelerden fotoğraf galerisi
          </p>
        </motion.div>

        {/* Keen Slider Carousel */}
        <div style={{ position: "relative" }}>
          {/* Prev Arrow */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="hidden md:flex glass text-white hover:text-[#d5b36b] hover:bg-white/10 transition-all duration-300"
            style={{
              position: "absolute",
              left: "-1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Önceki"
          >
            <ChevronLeft style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>

          {/* Next Arrow */}
          <button
            onClick={() => instanceRef.current?.next()}
            className="hidden md:flex glass text-white hover:text-[#d5b36b] hover:bg-white/10 transition-all duration-300"
            style={{
              position: "absolute",
              right: "-1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Sonraki"
          >
            <ChevronRight style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>

          {/* Slider */}
          <div ref={sliderRef} className="keen-slider">
            {slides.map((item, index) => (
              <div key={`${item.src}-${index}`} className="keen-slider__slide">
                <div
                  className="group cursor-pointer overflow-hidden"
                  style={{ borderRadius: "0.75rem", position: "relative" }}
                  onClick={() => openLightbox(index)}
                >
                  <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    {/* Hover Overlay */}
                    <div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "0.875rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          className="font-semibold"
                          style={{ fontSize: "0.8rem", color: "#ffffff" }}
                        >
                          {item.title}
                        </span>
                        <ZoomIn style={{ width: "1.125rem", height: "1.125rem", color: "#d5b36b", flexShrink: 0 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeLightbox}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.9)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 20,
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
              className="hover:bg-white/20 transition-colors duration-300"
              aria-label="Kapat"
            >
              <X style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>

            {/* Prev Arrow */}
            <button
              onClick={goPrev}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
              className="hover:bg-white/20 transition-colors duration-300"
              aria-label="Önceki"
            >
              <ChevronLeft style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>

            {/* Next Arrow */}
            <button
              onClick={goNext}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
              className="hover:bg-white/20 transition-colors duration-300"
              aria-label="Sonraki"
            >
              <ChevronRight style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "relative",
                zIndex: 10,
                maxWidth: "90vw",
                maxHeight: "85vh",
                width: "auto",
                height: "auto",
              }}
            >
              <Image
                src={galleryItems[activeIndex].src}
                alt={galleryItems[activeIndex].title}
                width={1200}
                height={1200}
                className="object-contain"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "85vh",
                  width: "auto",
                  height: "auto",
                  borderRadius: "0.75rem",
                }}
              />
              {/* Title Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1rem 1.25rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  borderRadius: "0 0 0.75rem 0.75rem",
                }}
              >
                <p className="font-semibold" style={{ color: "#ffffff", fontSize: "1rem" }}>
                  {galleryItems[activeIndex].title}
                </p>
                <p style={{ color: "#d5b36b", fontSize: "0.875rem" }}>
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
