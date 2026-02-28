"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Phone,
  MapPin,
  FolderOpen,
  Calendar,
  ChevronDown,
  Play,
  X,
} from "lucide-react";
import type { DbProject } from "@/lib/db";
import type { SiteSettings } from "@/lib/settings";

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

interface ProjectDetailContentProps {
  project: DbProject;
  relatedProjects: DbProject[];
  settings: SiteSettings;
}

export default function ProjectDetailContent({
  project,
  relatedProjects,
  settings,
}: ProjectDetailContentProps) {
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [htmlHeadings, setHtmlHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [sidebarMuted, setSidebarMuted] = useState(true);
  const [modalMuted, setModalMuted] = useState(true);
  const sidebarVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Parse headings from htmlContent
  useEffect(() => {
    if (project.htmlContent) {
      const article = document.querySelector("article .prose");
      if (!article) return;
      const headings = article.querySelectorAll("h2, h3");
      const parsed: { id: string; text: string; level: number }[] = [];
      headings.forEach((el, i) => {
        const id = el.id || `heading-${i}`;
        el.id = id;
        parsed.push({
          id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      });
      setHtmlHeadings(parsed);
    }
  }, [project.htmlContent]);

  // IntersectionObserver for active heading tracking
  useEffect(() => {
    const headingElements = htmlHeadings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [htmlHeadings]);

  const scrollToHeading = useCallback((headingId: string) => {
    document.getElementById(headingId)?.scrollIntoView({ behavior: "smooth" });
    setTocOpen(false);
  }, []);


  const openVideoModal = () => {
    setModalMuted(true);
    setVideoModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    document.body.style.overflow = "";
  };

  const toggleSidebarMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSidebarMuted((prev) => !prev);
    if (sidebarVideoRef.current) {
      sidebarVideoRef.current.muted = !sidebarVideoRef.current.muted;
    }
  };

  const toggleModalMute = () => {
    setModalMuted((prev) => !prev);
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalVideoRef.current.muted;
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hasToc = htmlHeadings.length > 0;
  const hasFaqs = project.faqs && project.faqs.length > 0;

  // --- TOC Component ---
  const TocContent = () => (
    <nav className="flex flex-col gap-1">
      {htmlHeadings.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToHeading(item.id)}
          className={`text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-300 ${
            item.level === 3 ? "pl-6" : ""
          } ${
            activeHeadingId === item.id
              ? "text-primary-gold font-semibold bg-primary-gold/10 border-l-2 border-primary-gold"
              : "text-theme-text-muted hover:text-theme-text hover:bg-theme-glass-bg"
          }`}
        >
          {item.text}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* ===== COVER SECTION ===== */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end">
        {project.video ? (
          <video
            src={project.video}
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full pb-10 pt-32 md:pb-14"
        >
          <div className="container-custom">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm">
                <MapPin className="size-3.5" />
                {project.location}
              </span>
            </div>
            <h1 className="text-fluid-hero font-bold text-white max-w-4xl leading-tight">
              {project.title}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mt-4">
              {project.description}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== MOBILE TOC ===== */}
      {hasToc && (
        <div className="lg:hidden section-padding pb-0">
          <div className="container-custom">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="glass w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-theme-text font-semibold text-sm"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="size-4 text-primary-gold" />
                İçindekiler
              </span>
              <ChevronDown
                className={`size-4 text-primary-gold transition-transform duration-300 ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {tocOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="glass rounded-2xl rounded-t-none p-4 -mt-2 border-t-0">
                    <TocContent />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ===== MOBILE VIDEO PREVIEW ===== */}
      {project.video && (
        <div className="lg:hidden section-padding pb-0 pt-4">
          <div className="container-custom">
            <h3 className="flex items-center gap-2 text-theme-text font-semibold text-sm mb-3">
              <Play className="size-4 text-primary-gold" />
              Proje Videosu
            </h3>
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={openVideoModal}
            >
              <div className="aspect-[4/5] max-w-[280px] mx-auto">
                <video
                  src={project.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="gold-gradient size-14 rounded-full flex items-center justify-center shadow-lg mb-2">
                  <Play className="text-black size-6 ml-0.5" />
                </div>
                <span className="text-white text-sm font-semibold">Tıkla İzle</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* ===== 3-COLUMN LAYOUT ===== */}
      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] xl:grid-cols-[240px_1fr_280px] gap-6 lg:gap-8">
            {/* --- LEFT SIDEBAR --- */}
            <aside className="hidden lg:block">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Video Preview — 4:5 */}
                {project.video && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="flex items-center gap-2 text-theme-text font-semibold text-sm mb-3">
                      <Play className="size-4 text-primary-gold" />
                      Proje Videosu
                    </h3>
                    <div
                      className="relative rounded-2xl overflow-hidden cursor-pointer group"
                      onClick={openVideoModal}
                    >
                      <div className="aspect-[4/5]">
                        <video
                          ref={sidebarVideoRef}
                          src={project.video}
                          muted
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Sound Toggle */}
                      <button
                        onClick={toggleSidebarMute}
                        className="glass hover:bg-white/20 transition-all duration-300 absolute bottom-3 right-3 z-10 size-8 rounded-full flex items-center justify-center text-white cursor-pointer"
                        aria-label={sidebarMuted ? "Sesi Aç" : "Sesi Kapat"}
                      >
                        {sidebarMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
                      </button>
                      {/* Tıkla İzle Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="gold-gradient size-12 rounded-full flex items-center justify-center shadow-lg mb-2">
                          <Play className="text-black size-5 ml-0.5" />
                        </div>
                        <span className="text-white text-sm font-semibold">Tıkla İzle</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                )}

                {/* TOC */}
                {hasToc && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="glass rounded-2xl p-5"
                  >
                    <h3 className="flex items-center gap-2 text-theme-text font-semibold text-sm mb-4">
                      <BookOpen className="size-4 text-primary-gold" />
                      İçindekiler
                    </h3>
                    <TocContent />
                  </motion.div>
                )}

              </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <article className="min-w-0">
              {/* HTML Content */}
              {project.htmlContent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="prose prose-lg max-w-none
                    prose-headings:text-theme-text prose-headings:font-bold prose-headings:scroll-mt-28
                    prose-h2:text-fluid-subsection prose-h2:mb-4 prose-h2:mt-10
                    prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8
                    prose-p:text-theme-text-secondary prose-p:leading-relaxed prose-p:mb-4
                    prose-strong:text-theme-text prose-strong:font-semibold
                    prose-a:text-primary-gold prose-a:no-underline hover:prose-a:underline
                    prose-ul:my-5 prose-li:text-theme-text-secondary
                    prose-blockquote:border-l-4 prose-blockquote:border-primary-gold prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-theme-text-secondary
                    prose-img:rounded-2xl prose-img:my-6"
                  dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-theme-text-secondary leading-relaxed text-lg">
                    {project.description}
                  </p>
                </motion.div>
              )}

              {/* FAQs */}
              {hasFaqs && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-10"
                >
                  <h2 className="font-bold text-theme-text text-fluid-subsection mb-6">
                    Sıkça Sorulan{" "}
                    <span className="text-gradient-gold">Sorular</span>
                  </h2>
                  <div className="flex flex-col gap-3">
                    {project.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="glass rounded-2xl overflow-hidden border border-transparent hover:border-primary-gold/20 transition-all duration-300"
                      >
                        <button
                          onClick={() =>
                            setFaqOpen(faqOpen === index ? null : index)
                          }
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-semibold text-theme-text text-sm pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`size-5 text-primary-gold shrink-0 transition-transform duration-300 ${
                              faqOpen === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {faqOpen === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 text-theme-text-secondary text-sm leading-relaxed border-t border-theme-border pt-4">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Back Link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-theme-border"
              >
                <Link
                  href="/projeler"
                  className="inline-flex items-center gap-2 text-primary-gold font-semibold hover:gap-3 transition-all duration-300"
                >
                  <ArrowLeft className="size-4" />
                  Tüm Projelere Dön
                </Link>
              </motion.div>
            </article>

            {/* --- RIGHT SIDEBAR --- */}
            <aside className="space-y-6 lg:space-y-0">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Project Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 to-transparent pointer-events-none" />
                  <div className="relative">
                    <h3 className="font-bold text-theme-text text-lg mb-4">
                      Proje Bilgileri
                    </h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="gold-gradient p-2 rounded-lg">
                          <FolderOpen className="size-4 text-white" />
                        </div>
                        <div>
                          <p className="text-theme-text-muted text-xs">
                            Kategori
                          </p>
                          <p className="text-theme-text font-semibold text-sm">
                            {project.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="gold-gradient p-2 rounded-lg">
                          <MapPin className="size-4 text-white" />
                        </div>
                        <div>
                          <p className="text-theme-text-muted text-xs">Konum</p>
                          <p className="text-theme-text font-semibold text-sm">
                            {project.location}
                          </p>
                        </div>
                      </div>
                      {project.createdAt && (
                        <div className="flex items-center gap-3">
                          <div className="gold-gradient p-2 rounded-lg">
                            <Calendar className="size-4 text-white" />
                          </div>
                          <div>
                            <p className="text-theme-text-muted text-xs">
                              Tarih
                            </p>
                            <p className="text-theme-text font-semibold text-sm">
                              {project.createdAt.slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Contact / CTA Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="font-bold text-theme-text text-lg mb-2">
                    Benzer Proje mi İstiyorsunuz?
                  </h3>
                  <p className="text-theme-text-muted text-sm leading-relaxed mb-5">
                    Projeniz için ücretsiz keşif ve teklif almak ister misiniz?
                  </p>

                  <a
                    href={`https://wa.me/${settings.phoneRaw}?text=Merhaba,%20projeleriniz%20hakkında%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp ile Ulaşın
                  </a>

                  <a
                    href={`tel:+${settings.phoneRaw}`}
                    className="flex items-center justify-center gap-2 mt-3 text-primary-gold font-semibold text-sm hover:underline"
                  >
                    <Phone className="size-4" />
                    {settings.phone}
                  </a>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== VIDEO MODAL ===== */}
      <AnimatePresence>
        {videoModalOpen && project.video && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeVideoModal}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-20 bg-white/10 rounded-full size-11 flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors duration-300"
              aria-label="Kapat"
            >
              <X className="size-5" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 glass rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Video — Left */}
              <div className="relative w-full md:w-1/2 shrink-0 overflow-hidden">
                <div className="aspect-[9/16]">
                  <video
                    ref={modalVideoRef}
                    src={project.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Sound Toggle */}
                <button
                  onClick={toggleModalMute}
                  className="glass hover:bg-white/20 transition-all duration-300 absolute bottom-4 right-4 z-10 size-10 rounded-full flex items-center justify-center text-white cursor-pointer"
                  aria-label={modalMuted ? "Sesi Aç" : "Sesi Kapat"}
                >
                  {modalMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
                </button>
              </div>

              {/* Info — Right */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                {/* Category & Location */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-theme-text-muted text-sm">
                    <MapPin className="size-3.5" />
                    {project.location}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-theme-text text-2xl mb-4">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-theme-text-secondary leading-relaxed text-base mb-8">
                  {project.description}
                </p>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/${settings.phoneRaw}?text=${encodeURIComponent(`Merhaba, "${project.title}" projesi hakkında teklif almak istiyorum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <MessageCircle className="size-5" />
                  <span>Teklif Al</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== RELATED PROJECTS ===== */}
      {relatedProjects.length > 0 && (
        <section className="section-padding border-t border-theme-border">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-fluid-section font-bold text-theme-text">
                Diğer <span className="text-gradient-gold">Projelerimiz</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((rel, index) => (
                <Link key={rel.id} href={`/projeler/${rel.id}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="glass group overflow-hidden border border-transparent hover:border-primary-gold/50 transition-[border-color] duration-500 cursor-pointer rounded-2xl h-full"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      {rel.video ? (
                        <video
                          src={rel.video}
                          muted
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : rel.image ? (
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800" />
                      )}
                      <div className="absolute top-3 left-3 z-10 flex gap-2">
                        <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                          {rel.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-theme-text-muted text-sm mb-3">
                        <MapPin className="size-4" />
                        <span>{rel.location}</span>
                      </div>
                      <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-lg mb-2.5">
                        {rel.title}
                      </h3>
                      <p className="text-theme-text-muted leading-relaxed text-sm mb-4 line-clamp-3">
                        {rel.description}
                      </p>
                      <span className="text-primary-gold font-semibold group-hover:translate-x-1 transition-transform duration-300 text-sm inline-flex items-center gap-1.5">
                        Detaylı Bilgi
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
