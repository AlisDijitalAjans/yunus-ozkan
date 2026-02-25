"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, ChevronDown } from "lucide-react";

const features = [
  "Profesyonel Ekip ve Kaliteli İşçilik",
  "Zamanında Teslimat Garantisi",
  "Ücretsiz Keşif Hizmetimiz Vardır",
];

const stats = [
  { value: "500+", label: "Tamamlanan Proje" },
  { value: "20+", label: "Uzman Ekip" },
  { value: "100%", label: "Müşteri Memnuniyeti" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden min-h-screen pt-40 pb-24"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="flex flex-col gap-7">
              {/* Badge */}
              <div>
                <span className="glass inline-flex items-center rounded-full gap-2 py-1.5 px-3">
                  <span className="bg-primary-gold rounded-full pulse-glow size-2" />
                  <span className="font-medium text-primary-gold text-sm">
                    Profesyonel Hizmet
                  </span>
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-bold leading-tight flex flex-col text-fluid-hero">
                <span className="text-theme-text whitespace-nowrap">Güçlü Temeller,</span>
                <span className="text-gradient-gold whitespace-nowrap">Kalıcı Çözümler</span>
              </h1>

              {/* Description */}
              <p className="text-theme-text-secondary leading-relaxed mx-auto lg:mx-0 text-fluid-body max-w-xl">
                Güçlü ekipmanlarımız ve profesyonel ekibimiz ile istinat duvarı,
                hafriyat ve arazi düzenleme projelerinizi en sağlam şekilde hayata
                geçiriyoruz.
              </p>

              {/* Features */}
              <div className="flex flex-col gap-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-center lg:justify-start gap-3"
                  >
                    <CheckCircle className="text-primary-gold shrink-0 size-[1.375rem]" />
                    <span className="text-theme-text font-medium text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a
                  href="https://wa.me/905337711182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center text-center gap-2"
                >
                  <MessageCircle className="size-5" />
                  <span>Hemen İletişime Geç</span>
                </a>
                <a
                  href="#projeler"
                  className="glass text-theme-text font-semibold hover:bg-white/10 transition-all duration-300 text-center border border-primary-gold/30 hover:border-primary-gold py-3.5 px-7 rounded-lg text-base"
                >
                  Projelerimizi İncele
                </a>
              </div>

              {/* Stats */}
              <div className="border-t border-theme-border grid grid-cols-3 gap-6 pt-7">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <h3 className="font-bold text-gradient-gold text-fluid-stat">
                      {stat.value}
                    </h3>
                    <p className="text-theme-text-muted text-sm mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative overflow-hidden glass w-full rounded-2xl p-2 max-w-lg">
              <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                <Image
                  src="/hero.jpg"
                  alt="Yunus İnşaat - Profesyonel Hafriyat ve İnşaat"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute left-1/2 hidden md:flex bottom-8 -translate-x-1/2">
        <a
          href="#hakkimizda"
          className="flex flex-col items-center text-primary-gold hover:text-white transition-colors duration-300 gap-1 opacity-70"
        >
          <span className="font-medium text-xs">Aşağı Kaydır</span>
          <ChevronDown className="animate-bounce size-5" />
        </a>
      </div>
    </section>
  );
}
