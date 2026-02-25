"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const projects = [
  {
    title: "Dora Sitesi – İstinat Duvarı",
    video: "/dora-dikey.mp4",
    description:
      "Dora Sitesi projemizde sağlam ve dayanıklı istinat duvarları inşa ettik. Profesyonel ekibimiz ve modern ekipmanlarımızla, arazinin stabilitesini sağlayarak güvenli bir yaşam alanı oluşturduk.",
  },
  {
    title: "HIS Dora – Tesviye İşleri",
    video: "/his-dora-dikey.mp4",
    description:
      "HIS Dora projesinde kapsamlı tesviye ve arazi düzenleme çalışmaları gerçekleştirdik. Hassas ölçümler ve profesyonel iş makinelerimizle, projenin temelini sağlam bir şekilde hazırladık.",
  },
  {
    title: "Okandan – Arazi Düzenleme",
    video: "/okandan-dikey.mp4",
    description:
      "Okandan projesinde geniş çaplı arazi düzenleme ve hafriyat işleri yürüttük. Doğal yapıyı koruyarak, modern yaşam alanları için ideal bir zemin hazırladık.",
  },
  {
    title: "Hafriyat ve Toprak Taşıma",
    video: "/hafriyat-dikey.mp4",
    description:
      "Profesyonel hafriyat ve toprak taşıma hizmetlerimizle, büyük ölçekli projelerde güvenilir çözümler sunuyoruz. Kamyon filomuz ve iş makinelerimizle hızlı ve verimli hizmet sağlıyoruz.",
  },
];

function VolumeOnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

// Sonsuz loop için videoları 2 kat çoğalt
const slides = [...projects, ...projects];

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const [mutedStates, setMutedStates] = useState<boolean[]>(
    slides.map(() => true)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = useCallback((index: number) => {
    setMutedStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
    }
  }, []);

  const openModal = (project: (typeof projects)[0]) => {
    setActiveProject(project);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveProject(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="projeler" className="section-padding relative overflow-hidden">
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
            Projelerimiz
          </span>
          <h2
            className="font-bold text-white"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              marginBottom: "1.25rem",
            }}
          >
            Tamamlanan{" "}
            <span className="text-gradient-gold">Projeler</span>
          </h2>
          <p
            className="text-gray-300 leading-relaxed"
            style={{ fontSize: "1.125rem" }}
          >
            Profesyonel ekibimiz ve modern ekipmanlarımız ile tamamladığımız
            projelerden bazıları.
          </p>
        </motion.div>

        {/* Keen Slider */}
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
            {slides.map((project, index) => (
              <div key={`${project.title}-${index}`} className="keen-slider__slide">
                <div
                  className="glass group border border-transparent hover:border-[#d5b36b]/50 transition-all duration-500"
                  style={{
                    borderRadius: "1rem",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "9/16",
                      overflow: "hidden",
                    }}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={project.video}
                      muted
                      autoPlay
                      loop
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Sound Toggle */}
                    <button
                      onClick={() => toggleMute(index)}
                      className="glass hover:bg-white/20 transition-all duration-300"
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                        zIndex: 10,
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        cursor: "pointer",
                        border: "none",
                      }}
                      aria-label={mutedStates[index] ? "Sesi Aç" : "Sesi Kapat"}
                    >
                      {mutedStates[index] ? <VolumeOffIcon /> : <VolumeOnIcon />}
                    </button>

                    {/* Video Info */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "1.25rem",
                        zIndex: 10,
                      }}
                    >
                      <h3
                        className="font-bold"
                        style={{
                          fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
                          marginBottom: "0.625rem",
                          color: "#ffffff",
                        }}
                      >
                        {project.title}
                      </h3>
                      <button
                        onClick={() => openModal(project)}
                        className="btn-primary text-sm"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          border: "none",
                        }}
                      >
                        <span>Detayları Gör</span>
                        <ChevronRight style={{ width: "1rem", height: "1rem" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalOpen && activeProject && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(8px)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass"
              style={{
                position: "relative",
                zIndex: 10,
                maxWidth: "32rem",
                width: "100%",
                borderRadius: "1.5rem",
                padding: "2rem",
                border: "1px solid rgba(213, 179, 107, 0.3)",
              }}
            >
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Kapat"
              >
                <X style={{ width: "1.5rem", height: "1.5rem" }} />
              </button>

              <div
                className="gold-gradient"
                style={{
                  width: "3rem",
                  height: "0.25rem",
                  borderRadius: "9999px",
                  marginBottom: "1.25rem",
                }}
              />

              <h3
                className="font-bold text-white"
                style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
              >
                {activeProject.title}
              </h3>

              <p
                className="text-gray-300 leading-relaxed"
                style={{ fontSize: "1rem", marginBottom: "1.75rem" }}
              >
                {activeProject.description}
              </p>

              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                }}
              >
                <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                <span>Teklif Al</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
