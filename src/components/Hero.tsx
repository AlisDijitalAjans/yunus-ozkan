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
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        minHeight: "100vh",
        paddingTop: "10rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="container-custom relative" style={{ zIndex: 10 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
            style={{ order: 2 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {/* Badge */}
              <div>
                <span
                  className="glass inline-flex items-center rounded-full"
                  style={{ gap: "0.5rem", padding: "0.375rem 0.75rem" }}
                >
                  <span
                    className="bg-[#d5b36b] rounded-full pulse-glow"
                    style={{ width: "0.5rem", height: "0.5rem" }}
                  />
                  <span
                    className="font-medium text-[#d5b36b]"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Profesyonel Hizmet
                  </span>
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-bold leading-tight flex flex-col" style={{ fontSize: "clamp(1.875rem, 5vw, 4.5rem)" }}>
                <span className="text-white whitespace-nowrap">Güçlü Temeller,</span>
                <span className="text-gradient-gold whitespace-nowrap">Kalıcı Çözümler</span>
              </h1>

              {/* Description */}
              <p
                className="text-gray-300 leading-relaxed mx-auto lg:mx-0"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", maxWidth: "36rem" }}
              >
                Güçlü ekipmanlarımız ve profesyonel ekibimiz ile istinat duvarı,
                hafriyat ve arazi düzenleme projelerinizi en sağlam şekilde hayata
                geçiriyoruz.
              </p>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-center lg:justify-start"
                    style={{ gap: "0.75rem" }}
                  >
                    <CheckCircle
                      className="text-[#d5b36b] shrink-0"
                      style={{ width: "1.375rem", height: "1.375rem" }}
                    />
                    <span className="text-white font-medium" style={{ fontSize: "1rem" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row justify-center lg:justify-start"
                style={{ gap: "1rem" }}
              >
                <a
                  href="https://wa.me/905337711182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center text-center"
                  style={{ gap: "0.5rem", padding: "0.875rem 1.75rem", fontSize: "1rem" }}
                >
                  <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                  <span>Hemen İletişime Geç</span>
                </a>
                <a
                  href="#projeler"
                  className="glass text-white font-semibold hover:bg-white/10 transition-all duration-300 text-center border border-[#d5b36b]/30 hover:border-[#d5b36b]"
                  style={{ padding: "0.875rem 1.75rem", borderRadius: "0.5rem", fontSize: "1rem" }}
                >
                  Projelerimizi İncele
                </a>
              </div>

              {/* Stats */}
              <div
                className="border-t border-gray-700/50"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                  paddingTop: "1.75rem",
                }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <h3
                      className="font-bold text-gradient-gold"
                      style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}
                    >
                      {stat.value}
                    </h3>
                    <p className="text-gray-400" style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
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
            className="relative flex justify-center lg:justify-end"
            style={{ order: 1 }}
          >
            <div
              className="relative overflow-hidden glass w-full"
              style={{
                borderRadius: "1rem",
                padding: "0.5rem",
                maxWidth: "32rem",
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "0.75rem", aspectRatio: "4/5" }}
              >
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
      <div
        className="absolute left-1/2 hidden md:flex"
        style={{ bottom: "2rem", transform: "translateX(-50%)" }}
      >
        <a
          href="#hakkimizda"
          className="flex flex-col items-center text-[#d5b36b] hover:text-white transition-colors duration-300"
          style={{ gap: "0.25rem", opacity: 0.7 }}
        >
          <span className="font-medium" style={{ fontSize: "0.75rem" }}>Aşağı Kaydır</span>
          <ChevronDown className="animate-bounce" style={{ width: "1.25rem", height: "1.25rem" }} />
        </a>
      </div>
    </section>
  );
}
