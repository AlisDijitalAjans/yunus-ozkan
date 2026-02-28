"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Share2,
  MessageCircle,
  Phone,
  CheckCircle,
  ChevronDown,
  Link2,
} from "lucide-react";
import type { DbService } from "@/lib/db";
import type { SiteSettings } from "@/lib/settings";

interface ServiceDetailContentProps {
  service: DbService;
  relatedServices: DbService[];
  settings: SiteSettings;
}

export default function ServiceDetailContent({
  service,
  relatedServices,
  settings,
}: ServiceDetailContentProps) {
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [htmlHeadings, setHtmlHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  // Parse headings from htmlContent
  useEffect(() => {
    if (service.htmlContent) {
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
  }, [service.htmlContent]);

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

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = service.title;

  const hasToc = htmlHeadings.length > 0;
  const hasFaqs = service.faqs && service.faqs.length > 0;

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

  // --- Share Buttons ---
  const ShareButtons = ({ vertical = true }: { vertical?: boolean }) => (
    <div
      className={`flex gap-2 ${vertical ? "flex-col" : "flex-row flex-wrap"}`}
    >
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
        {service.mediaType === "video" ? (
          <video
            src={service.image}
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full pb-10 pt-32 md:pb-14"
        >
          <div className="container-custom">
            <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full mb-4 inline-block">
              Hizmetlerimiz
            </span>
            <h1 className="text-fluid-hero font-bold text-white max-w-4xl leading-tight">
              {service.title}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mt-4">
              {service.desc}
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
            <div className="mt-4">
              <ShareButtons vertical={false} />
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
                {hasToc && (
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
                )}

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

            {/* --- MAIN CONTENT --- */}
            <article className="min-w-0">
              {/* Features List */}
              {service.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-2xl p-6 mb-8"
                >
                  <h2 className="font-bold text-theme-text text-xl mb-4">
                    Hizmet Özellikleri
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle className="text-primary-gold shrink-0 size-5 mt-0.5" />
                        <span className="text-theme-text-secondary text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* HTML Content */}
              {service.htmlContent ? (
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
                  dangerouslySetInnerHTML={{ __html: service.htmlContent }}
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
                    {service.desc}
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
                    Sıkça Sorulan <span className="text-gradient-gold">Sorular</span>
                  </h2>
                  <div className="flex flex-col gap-3">
                    {service.faqs.map((faq, index) => (
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
                  href="/hizmetler"
                  className="inline-flex items-center gap-2 text-primary-gold font-semibold hover:gap-3 transition-all duration-300"
                >
                  <ArrowLeft className="size-4" />
                  Tüm Hizmetlere Dön
                </Link>
              </motion.div>
            </article>

            {/* --- RIGHT SIDEBAR --- */}
            <aside className="space-y-6 lg:space-y-0">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Quick Info Card */}
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
                      Hızlı Bilgi
                    </h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="gold-gradient p-2 rounded-lg">
                          <CheckCircle className="size-4 text-white" />
                        </div>
                        <div>
                          <p className="text-theme-text-muted text-xs">Özellik Sayısı</p>
                          <p className="text-theme-text font-semibold text-sm">
                            {service.features.length} özellik
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="gold-gradient p-2 rounded-lg">
                          <CheckCircle className="size-4 text-white" />
                        </div>
                        <div>
                          <p className="text-theme-text-muted text-xs">Garanti</p>
                          <p className="text-theme-text font-semibold text-sm">
                            Profesyonel hizmet garantisi
                          </p>
                        </div>
                      </div>
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
                    Teklif Alın
                  </h3>
                  <p className="text-theme-text-muted text-sm leading-relaxed mb-5">
                    Bu hizmet hakkında detaylı bilgi ve ücretsiz keşif için bize
                    ulaşın.
                  </p>

                  <a
                    href={`https://wa.me/${settings.phoneRaw}?text=Merhaba,%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.`}
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

      {/* ===== RELATED SERVICES ===== */}
      {relatedServices.length > 0 && (
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
                Diğer <span className="text-gradient-gold">Hizmetlerimiz</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((rel, index) => (
                <Link key={rel.id} href={`/hizmetler/${rel.id}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="glass group overflow-hidden border border-transparent hover:border-primary-gold/50 transition-[border-color] duration-500 cursor-pointer rounded-2xl h-full"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      {rel.mediaType === "video" ? (
                        <video
                          src={rel.image}
                          muted
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-lg mb-2.5">
                        {rel.title}
                      </h3>
                      <p className="text-theme-text-muted leading-relaxed text-sm mb-4 line-clamp-3">
                        {rel.desc}
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
