"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Share2,
  Sparkles,
  MessageCircle,
  Phone,
  CheckCircle,
  ChevronDown,
  Link2,
  User,
} from "lucide-react";
import { BlogPost, blogPosts } from "@/data/blogPosts";

interface BlogDetailContentProps {
  post: BlogPost;
}

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // IntersectionObserver for active heading tracking
  useEffect(() => {
    const headingElements = post.sections
      .map((s) => document.getElementById(s.headingId))
      .filter(Boolean) as HTMLElement[];

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
  }, [post.sections]);

  const scrollToHeading = useCallback((headingId: string) => {
    document.getElementById(headingId)?.scrollIntoView({ behavior: "smooth" });
    setTocOpen(false);
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = post.title;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // --- TOC Component ---
  const TocContent = () => (
    <nav className="flex flex-col gap-1">
      {post.sections.map((section) => (
        <button
          key={section.headingId}
          onClick={() => scrollToHeading(section.headingId)}
          className={`text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-300 ${
            section.headingLevel === 3 ? "pl-6" : ""
          } ${
            activeHeadingId === section.headingId
              ? "text-primary-gold font-semibold bg-primary-gold/10 border-l-2 border-primary-gold"
              : "text-theme-text-muted hover:text-theme-text hover:bg-theme-glass-bg"
          }`}
        >
          {section.headingText}
        </button>
      ))}
    </nav>
  );

  // --- Share Buttons ---
  const ShareButtons = ({ vertical = true }: { vertical?: boolean }) => (
    <div
      className={`flex gap-2 ${vertical ? "flex-col" : "flex-row flex-wrap"}`}
    >
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="glass flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-theme-text-muted hover:text-theme-text hover:bg-primary-gold/10 hover:border-primary-gold/30 transition-all duration-300"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {vertical && <span>X (Twitter)</span>}
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="glass flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-theme-text-muted hover:text-theme-text hover:bg-primary-gold/10 hover:border-primary-gold/30 transition-all duration-300"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        {vertical && <span>LinkedIn</span>}
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="glass flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-theme-text-muted hover:text-theme-text hover:bg-primary-gold/10 hover:border-primary-gold/30 transition-all duration-300"
      >
        <MessageCircle className="size-4" />
        {vertical && <span>WhatsApp</span>}
      </a>
      <button
        onClick={handleCopyLink}
        className="glass flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-theme-text-muted hover:text-theme-text hover:bg-primary-gold/10 hover:border-primary-gold/30 transition-all duration-300"
      >
        <Link2 className="size-4" />
        {vertical && <span>{copied ? "Kopyalandı!" : "Linki Kopyala"}</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* ===== COVER SECTION ===== */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full pb-10 pt-32 md:pb-14"
        >
          <div className="container-custom">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm">
                <Calendar className="size-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm">
                <Clock className="size-3.5" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm">
                <User className="size-3.5" />
                {post.author}
              </span>
            </div>
            {/* Title */}
            <h1 className="text-fluid-hero font-bold text-white max-w-4xl leading-tight">
              {post.title}
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ===== MOBILE/TABLET TOC (collapsible) ===== */}
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

          {/* Mobile Share */}
          <div className="mt-4">
            <ShareButtons vertical={false} />
          </div>
        </div>
      </div>

      {/* ===== 3-COLUMN LAYOUT ===== */}
      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] xl:grid-cols-[240px_1fr_280px] gap-6 lg:gap-8">
            {/* --- LEFT SIDEBAR (desktop only) --- */}
            <aside className="hidden lg:block">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* TOC */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass rounded-2xl p-5"
                >
                  <h3 className="flex items-center gap-2 text-theme-text font-semibold text-sm mb-4">
                    <BookOpen className="size-4 text-primary-gold" />
                    İçindekiler
                  </h3>
                  <TocContent />
                </motion.div>

                {/* Share */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass rounded-2xl p-5"
                >
                  <h3 className="flex items-center gap-2 text-theme-text font-semibold text-sm mb-4">
                    <Share2 className="size-4 text-primary-gold" />
                    Paylaş
                  </h3>
                  <ShareButtons vertical />
                </motion.div>
              </div>
            </aside>

            {/* --- MAIN CONTENT (center) --- */}
            <article className="min-w-0">
              {post.sections.map((section, index) => (
                <motion.div
                  key={section.headingId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="mb-10"
                >
                  {/* Heading */}
                  {section.headingLevel === 2 ? (
                    <h2
                      id={section.headingId}
                      className="font-bold text-theme-text text-fluid-subsection mb-4 scroll-mt-28"
                    >
                      {section.headingText}
                    </h2>
                  ) : (
                    <h3
                      id={section.headingId}
                      className="font-semibold text-theme-text text-xl mb-3 scroll-mt-28"
                    >
                      {section.headingText}
                    </h3>
                  )}

                  {/* Paragraphs */}
                  {section.content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-theme-text-secondary leading-relaxed text-base mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Blockquote */}
                  {section.blockquote && (
                    <blockquote className="border-l-4 border-primary-gold pl-5 my-6 italic text-theme-text-secondary text-lg leading-relaxed">
                      &ldquo;{section.blockquote}&rdquo;
                    </blockquote>
                  )}

                  {/* List */}
                  {section.list && (
                    <ul className="flex flex-col gap-2.5 my-5">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle className="text-primary-gold shrink-0 size-5 mt-0.5" />
                          <span className="text-theme-text-secondary text-sm">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* In-article Image */}
                  {section.image && (
                    <figure className="my-6 rounded-2xl overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      </div>
                      {section.image.caption && (
                        <figcaption className="text-theme-text-faint text-sm mt-2 text-center">
                          {section.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </motion.div>
              ))}

              {/* Back to blog link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-theme-border"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary-gold font-semibold hover:gap-3 transition-all duration-300"
                >
                  <ArrowLeft className="size-4" />
                  Tüm Yazılara Dön
                </Link>
              </motion.div>
            </article>

            {/* --- RIGHT SIDEBAR --- */}
            <aside className="space-y-6 lg:space-y-0">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* AI Analysis Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 to-transparent pointer-events-none" />
                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="gold-gradient p-2 rounded-xl">
                        <Sparkles className="size-4 text-white" />
                      </div>
                      <h3 className="font-bold text-theme-text text-sm">
                        Yapay Zeka Analizi
                      </h3>
                    </div>

                    {/* Summary */}
                    <p className="text-theme-text-secondary text-sm leading-relaxed mb-5">
                      {post.aiAnalysis.summary}
                    </p>

                    {/* Key Points */}
                    <h4 className="text-theme-text font-semibold text-xs uppercase tracking-wider mb-3">
                      Temel Noktalar
                    </h4>
                    <ul className="flex flex-col gap-2 mb-5">
                      {post.aiAnalysis.keyPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="text-primary-gold shrink-0 size-4 mt-0.5" />
                          <span className="text-theme-text-muted text-xs leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Related Topics */}
                    <h4 className="text-theme-text font-semibold text-xs uppercase tracking-wider mb-3">
                      İlgili Konular
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.aiAnalysis.relatedTopics.map((topic) => (
                        <span
                          key={topic}
                          className="glass text-primary-gold text-xs py-1 px-3 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
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
                    Projeniz mi Var?
                  </h3>
                  <p className="text-theme-text-muted text-sm leading-relaxed mb-5">
                    Bu konuda profesyonel destek almak ister misiniz? Ücretsiz
                    keşif ve danışmanlık için bize ulaşın.
                  </p>

                  <a
                    href="https://wa.me/905551234567?text=Merhaba,%20blog%20yazınızı%20okudum.%20Bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp ile Ulaşın
                  </a>

                  <a
                    href="tel:+905551234567"
                    className="flex items-center justify-center gap-2 mt-3 text-primary-gold font-semibold text-sm hover:underline"
                  >
                    <Phone className="size-4" />
                    0555 123 45 67
                  </a>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== RELATED POSTS ===== */}
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
              Diğer <span className="text-gradient-gold">Yazılar</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relPost, index) => (
              <Link key={relPost.slug} href={`/blog/${relPost.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="glass group overflow-hidden border border-transparent hover:border-primary-gold/50 transition-all duration-500 cursor-pointer rounded-2xl h-full"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <Image
                      src={relPost.image}
                      alt={relPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                        {relPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-theme-text-muted text-sm mb-3">
                      <Calendar className="size-4" />
                      <span>{relPost.date}</span>
                    </div>
                    <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-lg mb-2.5 line-clamp-2">
                      {relPost.title}
                    </h3>
                    <p className="text-theme-text-muted leading-relaxed text-sm mb-4 line-clamp-3">
                      {relPost.excerpt}
                    </p>
                    <span className="text-primary-gold font-semibold group-hover:translate-x-1 transition-transform duration-300 text-sm inline-flex items-center gap-1.5">
                      Devamını Oku
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
