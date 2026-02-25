"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, FileText, Truck, Droplets } from "lucide-react";

const statsData = [
  { value: "500+", label: "Tamamlanan Proje" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
  { value: "7/12", label: "Destek Hattı" },
  { value: "A+", label: "Kalite Standartı" },
];

const featuresList = [
  "Şeffaf fiyatlandırma, gizli maliyet yok",
  "Projelerin her aşamasında tam kontrol",
  "Zamanında teslimat garantisi",
  "Modern ekipman ile hızlı iş",
];

const equipmentCards = [
  {
    icon: FileText,
    title: "Modern Kepçeler",
    desc: "Profesyonel kazı, hafriyat ve tesviye işleri için modern kepçe makineleri ile hizmetinizdeyiz.",
  },
  {
    icon: Truck,
    title: "Kamyon Filosu",
    desc: "Hafriyat ve malzeme taşıma işlerinde kamyon filomuz ile hızlı ve güvenilir hizmet sunuyoruz.",
  },
  {
    icon: Droplets,
    title: "Sulama Araçları",
    desc: "Toz kontrolü ve şantiye sulama işleri için tanker ve sulama araçları ile hizmet veriyoruz.",
  },
];

export default function About() {
  return (
    <section
      id="hakkimizda"
      className="section-padding relative overflow-hidden"
    >
      <div className="container-custom relative" style={{ zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto"
          style={{ maxWidth: "48rem", marginBottom: "3rem", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
        >
          <span
            className="inline-block glass rounded-full text-[#d5b36b] font-semibold"
            style={{ padding: "0.375rem 1rem", fontSize: "0.875rem", marginBottom: "1rem" }}
          >
            Neden Yunus Özkan İnşaat?
          </span>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", marginBottom: "1.25rem" }}
          >
            <span className="text-gradient-gold">Kesintisiz Hizmet</span> - Garantili İşçilik
          </h2>
          <p className="text-gray-300 leading-relaxed" style={{ fontSize: "1.125rem" }}>
            Profesyonel ekibimiz ve modern ekipmanlarımız ile projelerinizi baştan sona
            kesintisiz ve garantili bir şekilde tamamlıyoruz.
          </p>
        </motion.div>

        {/* Main Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass relative overflow-hidden"
          style={{ borderRadius: "1.5rem", padding: "2rem", marginBottom: "3rem" }}
        >
          {/* Background Glow */}
          <div
            className="absolute bg-[#d5b36b] rounded-full"
            style={{
              top: 0,
              right: 0,
              width: "20rem",
              height: "20rem",
              filter: "blur(64px)",
              opacity: 0.1,
            }}
          />

          <div
            className="relative about-content-grid"
            style={{
              zIndex: 10,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            {/* Image */}
            <div className="relative group" style={{ order: 1 }}>
              <div className="relative overflow-hidden" style={{ borderRadius: "1rem" }}>
                <Image
                  src="/about.jpg"
                  alt="Yunus Özkan İnşaat - Profesyonel Ekip"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ aspectRatio: "4/5" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div style={{ order: 2, display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <h3
                  className="font-bold text-white"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", marginBottom: "1rem" }}
                >
                  <span className="text-gradient-gold">Profesyonel</span> Çözümler
                </h3>
                <p className="text-gray-300 leading-relaxed" style={{ fontSize: "1.063rem" }}>
                  Modern ekipmanlarımız ve deneyimli ekibimizle projelerinizde hiçbir aksaklık
                  yaşanmaz. Zamanlama ve kalite kontrolü tamamen bizim elimizdedir.
                </p>
              </div>

              {/* Stats Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.875rem",
                }}
              >
                {statsData.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-[#d5b36b]/30"
                    style={{ borderRadius: "1rem", padding: "1.25rem" }}
                  >
                    <div
                      className="font-bold text-gradient-gold"
                      style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", marginBottom: "0.25rem" }}
                    >
                      {stat.value}
                    </div>
                    <p className="text-gray-300 font-medium" style={{ fontSize: "0.938rem" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {featuresList.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start group"
                    style={{ gap: "0.75rem" }}
                  >
                    <div
                      className="gold-gradient flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ width: "1.5rem", height: "1.5rem", borderRadius: "0.375rem" }}
                    >
                      <Check
                        className="text-black"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </div>
                    <span className="text-white font-medium" style={{ fontSize: "1rem" }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Equipment Cards */}
        <div
          className="equipment-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
        >
          {equipmentCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass hover:bg-white/10 transition-all duration-500 group relative overflow-hidden border border-transparent hover:border-[#d5b36b]/50"
                style={{ borderRadius: "1rem", padding: "1.75rem" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d5b36b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative" style={{ zIndex: 10 }}>
                  <div
                    className="gold-gradient flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "0.75rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <Icon className="text-black" style={{ width: "1.75rem", height: "1.75rem" }} />
                  </div>
                  <h3
                    className="font-bold text-white group-hover:text-[#d5b36b] transition-colors duration-300"
                    style={{ fontSize: "1.25rem", marginBottom: "0.625rem" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed" style={{ fontSize: "0.938rem" }}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
