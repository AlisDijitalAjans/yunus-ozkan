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

interface ProjectsProps {
  showHeader?: boolean;
}

export default function Projects({ showHeader = true }: ProjectsProps) {
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
              Projelerimiz
            </span>
            <h2 className="font-bold text-theme-text text-fluid-section mb-5">
              Tamamlanan{" "}
              <span className="text-gradient-gold">Projeler</span>
            </h2>
            <p className="text-theme-text-secondary leading-relaxed text-lg">
              Profesyonel ekibimiz ve modern ekipmanlarımız ile tamamladığımız
              projelerden bazıları.
            </p>
          </motion.div>
        )}

        {/* Keen Slider */}
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
            {slides.map((project, index) => (
              <div key={`${project.title}-${index}`} className="keen-slider__slide">
                <div className="glass group border border-transparent hover:border-primary-gold/50 transition-all duration-500 rounded-2xl overflow-hidden relative">
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={project.video}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
                      }}
                    />

                    {/* Sound Toggle */}
                    <button
                      onClick={() => toggleMute(index)}
                      className="glass hover:bg-white/20 transition-all duration-300 absolute top-3 right-3 z-10 size-10 rounded-full flex items-center justify-center text-white cursor-pointer"
                      aria-label={mutedStates[index] ? "Sesi Aç" : "Sesi Kapat"}
                    >
                      {mutedStates[index] ? <VolumeOffIcon /> : <VolumeOnIcon />}
                    </button>

                    {/* Video Info */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                      <h3 className="font-bold text-fluid-card-title mb-2.5 text-white">
                        {project.title}
                      </h3>
                      <button
                        onClick={() => openModal(project)}
                        className="btn-primary text-sm inline-flex items-center gap-1.5"
                        style={{ padding: "0.5rem 1rem" }}
                      >
                        <span>Detayları Gör</span>
                        <ChevronRight className="size-4" />
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
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass relative z-10 max-w-lg w-full rounded-3xl p-8 border border-primary-gold/30"
            >
              <button
                onClick={closeModal}
                className="text-theme-text-muted hover:text-theme-text transition-colors duration-300 absolute top-4 right-4"
                aria-label="Kapat"
              >
                <X className="size-6" />
              </button>

              <div className="gold-gradient w-12 h-1 rounded-full mb-5" />

              <h3 className="font-bold text-theme-text text-2xl mb-4">
                {activeProject.title}
              </h3>

              <p className="text-theme-text-secondary leading-relaxed text-base mb-7">
                {activeProject.description}
              </p>

              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <MessageCircle className="size-5" />
                <span>Teklif Al</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
