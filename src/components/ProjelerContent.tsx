"use client";

import { useRef, useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, ArrowRight } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

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

export default function ProjelerContent({ settings }: { settings: SiteSettings }) {
  const [mutedStates, setMutedStates] = useState<boolean[]>(projects.map(() => true));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMutedStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
    const video = videoRefs.current[index];
    if (video) video.muted = !video.muted;
  }, []);

  return (
    <>
      {/* Projects Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/projeler/${index + 1}`} className="block h-full">
                  <article className="glass group rounded-2xl overflow-hidden border border-transparent hover:border-primary-gold/50 transition-[border-color] duration-500 h-full flex flex-col">
                    {/* Video */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <video
                        ref={(el) => { videoRefs.current[index] = el; }}
                        src={project.video}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Sound Toggle */}
                      <button
                        onClick={(e) => toggleMute(index, e)}
                        className="glass hover:bg-white/20 transition-all duration-300 absolute top-3 right-3 z-10 size-9 rounded-full flex items-center justify-center text-white cursor-pointer"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-theme-text-muted text-sm mb-2">
                        <MapPin className="size-3.5" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="font-bold text-theme-text text-lg group-hover:text-primary-gold transition-colors duration-300 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-theme-text-muted text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                        {project.description}
                      </p>

                      <span className="text-primary-gold font-semibold text-sm inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                        Detayları Gör
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </article>
                </Link>
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
                href={`https://wa.me/${settings.phoneRaw}`}
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
    </>
  );
}
