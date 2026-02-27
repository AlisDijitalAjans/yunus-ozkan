"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronRight, Play, Eye } from "lucide-react";

const projects = [
  {
    title: "Dora Sitesi – İstinat Duvarı",
    video: "/dora-dikey.mp4",
    description:
      "Dora Sitesi projemizde sağlam ve dayanıklı istinat duvarları inşa ettik. Profesyonel ekibimiz ve modern ekipmanlarımızla, arazinin stabilitesini sağlayarak güvenli bir yaşam alanı oluşturduk.",
    category: "İstinat Duvarı",
    location: "Kayseri",
  },
  {
    title: "HIS Dora – Tesviye İşleri",
    video: "/his-dora-dikey.mp4",
    description:
      "HIS Dora projesinde kapsamlı tesviye ve arazi düzenleme çalışmaları gerçekleştirdik. Hassas ölçümler ve profesyonel iş makinelerimizle, projenin temelini sağlam bir şekilde hazırladık.",
    category: "Tesviye",
    location: "Kayseri",
  },
  {
    title: "Okandan – Arazi Düzenleme",
    video: "/okandan-dikey.mp4",
    description:
      "Okandan projesinde geniş çaplı arazi düzenleme ve hafriyat işleri yürüttük. Doğal yapıyı koruyarak, modern yaşam alanları için ideal bir zemin hazırladık.",
    category: "Arazi Düzenleme",
    location: "Kayseri",
  },
  {
    title: "Hafriyat ve Toprak Taşıma",
    video: "/hafriyat-dikey.mp4",
    description:
      "Profesyonel hafriyat ve toprak taşıma hizmetlerimizle, büyük ölçekli projelerde güvenilir çözümler sunuyoruz. Kamyon filomuz ve iş makinelerimizle hızlı ve verimli hizmet sağlıyoruz.",
    category: "Hafriyat",
    location: "Kayseri",
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

export default function ProjelerContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);
  const [mutedStates, setMutedStates] = useState<boolean[]>(projects.map(() => true));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = useCallback((index: number) => {
    setMutedStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
    const video = videoRefs.current[index];
    if (video) video.muted = !video.muted;
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
    <>
      {/* Stats Bar */}
      <section className="section-padding pt-0 pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: "4+", label: "Aktif Proje" },
              { value: "500+", label: "Tamamlanan Proje" },
              { value: "10+", label: "Yıllık Tecrübe" },
              { value: "%100", label: "Zamanında Teslimat" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-5 text-center border border-transparent hover:border-primary-gold/30 transition-all duration-300"
              >
                <div className="font-bold text-gradient-gold text-fluid-stat-lg mb-1">{stat.value}</div>
                <p className="text-theme-text-secondary font-medium text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-3xl overflow-hidden border border-transparent hover:border-primary-gold/30 transition-all duration-500"
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${
                  index % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}>
                  {/* Video */}
                  <div
                    className="relative aspect-[5/4] overflow-hidden md:[direction:ltr] cursor-pointer"
                    onClick={() => openModal(project)}
                  >
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={project.video}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Sound Toggle */}
                    <button
                      onClick={() => toggleMute(index)}
                      className="glass hover:bg-white/20 transition-all duration-300 absolute top-3 right-3 z-10 size-10 rounded-full flex items-center justify-center text-white cursor-pointer"
                      aria-label={mutedStates[index] ? "Sesi Aç" : "Sesi Kapat"}
                    >
                      {mutedStates[index] ? <VolumeOffIcon /> : <VolumeOnIcon />}
                    </button>
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center md:[direction:ltr]">
                    <div className="flex items-center gap-2 text-theme-text-muted text-sm mb-3">
                      <Eye className="size-4" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-bold text-theme-text text-fluid-subsection mb-4">
                      {project.title}
                    </h3>
                    <p className="text-theme-text-secondary leading-relaxed text-base mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => openModal(project)}
                        className="btn-primary inline-flex items-center gap-1.5 text-sm"
                        style={{ padding: "0.5rem 1rem" }}
                      >
                        <span>Detayları Gör</span>
                        <ChevronRight className="size-4" />
                      </button>
                      <a
                        href="https://wa.me/905337711182"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-gold font-semibold text-sm hover:underline"
                      >
                        <MessageCircle className="size-4" />
                        <span>Teklif Al</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="glass relative overflow-hidden rounded-3xl py-10 px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d5b36b]/20 to-transparent" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="font-bold text-theme-text text-[2rem] mb-4">
                Sizin Projeniz de{" "}
                <span className="text-gradient-gold">Burada Olsun</span>
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

      {/* Detail Modal — 2 column: video + description */}
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
              className="glass relative z-10 max-w-4xl w-full rounded-3xl overflow-hidden border border-primary-gold/30"
            >
              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white transition-colors duration-300 absolute top-4 right-4 z-20"
                aria-label="Kapat"
              >
                <X className="size-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Video */}
                <div className="relative aspect-[5/4] md:aspect-auto md:min-h-[360px] overflow-hidden">
                  <video
                    src={activeProject.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                      {activeProject.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-theme-text-muted text-sm mb-3">
                    <Eye className="size-4" />
                    <span>{activeProject.location}</span>
                  </div>
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
                    className="btn-primary inline-flex items-center gap-2 w-fit"
                  >
                    <MessageCircle className="size-5" />
                    <span>Teklif Al</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
