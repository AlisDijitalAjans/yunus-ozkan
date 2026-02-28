"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, FileText, Truck, Droplets } from "lucide-react";

const statsData = [
  { value: "A+", label: "Kalite Standartı" },
  { value: "%100", label: "Müşteri Memnuniyeti" },
  { value: "7/24", label: "Destek Hattı" },
  { value: "Kayseri", label: "Hizmet Bölgesi" },
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

interface AboutProps {
  showHeader?: boolean;
}

export default function About({ showHeader = true }: AboutProps) {
  return (
    <section
      id="hakkimizda"
      className="section-padding relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mx-auto max-w-3xl mb-12"
          >
            <span className="inline-block glass rounded-full text-primary-gold font-semibold py-1.5 px-4 text-sm mb-4">
              Neden Yunus Özkan İnşaat?
            </span>
            <h2 className="font-bold text-theme-text text-fluid-section mb-5">
              <span className="text-gradient-gold">Kesintisiz Hizmet</span> - Garantili İşçilik
            </h2>
            <p className="text-theme-text-secondary leading-relaxed text-lg">
              Profesyonel ekibimiz ve modern ekipmanlarımız ile projelerinizi baştan sona
              kesintisiz ve garantili bir şekilde tamamlıyoruz.
            </p>
          </motion.div>
        )}

        {/* Main Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass relative overflow-hidden rounded-3xl p-8 mb-12"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 bg-primary-gold rounded-full w-80 h-80 blur-[64px] opacity-10" />

          <div className="relative z-10 grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <div className="relative group order-1">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/about.jpg"
                  alt="Yunus Özkan İnşaat - Profesyonel Ekip"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="order-2 flex flex-col gap-8">
              <div>
                <h3 className="font-bold text-theme-text text-fluid-subsection mb-4">
                  <span className="text-gradient-gold">Profesyonel</span> Çözümler
                </h3>
                <p className="text-theme-text-secondary leading-relaxed text-base">
                  Modern ekipmanlarımız ve deneyimli ekibimizle projelerinizde hiçbir aksaklık
                  yaşanmaz. Zamanlama ve kalite kontrolü tamamen bizim elimizdedir.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {statsData.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary-gold/30 rounded-2xl p-5"
                  >
                    <div className="font-bold text-gradient-gold text-fluid-stat-lg mb-1">
                      {stat.value}
                    </div>
                    <p className="text-theme-text-secondary font-medium text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-3.5">
                {featuresList.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start group gap-3"
                  >
                    <div className="gold-gradient flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 size-6 rounded-md">
                      <Check className="text-black size-4" />
                    </div>
                    <span className="text-theme-text font-medium text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {equipmentCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass hover:bg-white/10 transition-[border-color,background-color] duration-500 group relative overflow-hidden border border-transparent hover:border-primary-gold/50 rounded-2xl p-7"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d5b36b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="gold-gradient flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 size-14 rounded-xl mb-5">
                    <Icon className="text-black size-7" />
                  </div>
                  <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-xl mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-theme-text-secondary leading-relaxed text-sm">
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
