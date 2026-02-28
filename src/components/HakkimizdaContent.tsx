"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  FileText,
  Truck,
  Droplets,
  Shield,
  Clock,
  Users,
  Award,
  Target,
  Heart,
  MessageCircle,
} from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

const statsData = [
  { value: "A+", label: "Kalite Standartı", icon: Shield },
  { value: "%100", label: "Müşteri Memnuniyeti", icon: Heart },
  { value: "7/24", label: "Destek Hattı", icon: Clock },
  { value: "Kayseri", label: "Hizmet Bölgesi", icon: Award },
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

const timeline = [
  { year: "01", title: "Kuruluş", desc: "Yunus Özkan İnşaat, ilk kepçemizle hizmet vermeye başladı." },
  { year: "02", title: "Filo Genişlemesi", desc: "Kamyon filosu ve yeni iş makineleri ile kapasitemizi artırdık." },
  { year: "03", title: "Büyük Projeler", desc: "Site ve toplu konut projelerinde istinat duvarı işleri üstlendik." },
  { year: "04", title: "Hizmet Çeşitliliği", desc: "Taş ev yapımı, parke döşeme ve drenaj sistemleri hizmetlerimize eklendi." },
  { year: "05", title: "Sürekli Büyüme", desc: "Modern ekipman parkı ve deneyimli kadromuzla büyümeye devam ediyoruz." },
];

const values = [
  {
    icon: Shield,
    title: "Güvenilirlik",
    desc: "Her projede söz verdiğimiz kalite ve zamanlamaya sadık kalırız.",
  },
  {
    icon: Target,
    title: "Profesyonellik",
    desc: "İşimizi en yüksek standartlarda, titizlikle ve özenle yaparız.",
  },
  {
    icon: Users,
    title: "Müşteri Odaklılık",
    desc: "Her projeyi müşterimizin ihtiyaçlarına göre özel olarak planlarız.",
  },
];

export default function HakkimizdaContent({ settings }: { settings: SiteSettings }) {
  return (
    <>
      {/* Hero Section — Image + Intro */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass relative overflow-hidden rounded-3xl p-8"
          >
            <div className="absolute top-0 right-0 bg-primary-gold rounded-full w-80 h-80 blur-[64px] opacity-10" />

            <div className="relative z-10 grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-12">
              {/* Image */}
              <div className="relative group">
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
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="font-bold text-theme-text text-fluid-subsection mb-4">
                    <span className="text-gradient-gold">Profesyonel</span> Çözümler
                  </h2>
                  <p className="text-theme-text-secondary leading-relaxed text-base mb-3">
                    Modern ekipmanlarımız ve deneyimli ekibimizle projelerinizde hiçbir aksaklık
                    yaşanmaz. Zamanlama ve kalite kontrolü tamamen bizim elimizdedir.
                  </p>
                  <p className="text-theme-text-secondary leading-relaxed text-base">
                    Kayseri ve çevresinde birçok projeyi başarıyla tamamladık.
                    Kendi ekipmanlarımızla çalışarak maliyetleri düşürüyor, kaliteyi artırıyoruz.
                  </p>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-3">
                  {featuresList.map((feature) => (
                    <li key={feature} className="flex items-start group gap-3">
                      <div className="gold-gradient flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 size-6 rounded-md">
                        <Check className="text-black size-4" />
                      </div>
                      <span className="text-theme-text font-medium text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass hover:bg-white/10 transition-[border-color,background-color] duration-300 border border-transparent hover:border-primary-gold/30 rounded-2xl p-6 text-center"
                >
                  <div className="gold-gradient size-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-black size-6" />
                  </div>
                  <div className="font-bold text-gradient-gold text-fluid-stat-lg mb-1">
                    {stat.value}
                  </div>
                  <p className="text-theme-text-secondary font-medium text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h2 className="font-bold text-theme-text text-fluid-subsection mb-4">
              Yolculuğumuz
            </h2>
            <p className="text-theme-text-secondary leading-relaxed text-base">
              Kuruluşumuzdan bugüne sürekli büyüyen bir hikaye.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary-gold/30 md:-translate-x-px" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 mb-8 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 gold-gradient size-3 rounded-full mt-2 z-10" />

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}>
                  <div className="glass rounded-2xl p-5 border border-transparent hover:border-primary-gold/30 transition-all duration-300">
                    <span className="text-primary-gold font-bold text-lg">{item.year}</span>
                    <h3 className="font-bold text-theme-text text-base mt-1 mb-2">{item.title}</h3>
                    <p className="text-theme-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h2 className="font-bold text-theme-text text-fluid-subsection mb-4">
              Değerlerimiz
            </h2>
            <p className="text-theme-text-secondary leading-relaxed text-base">
              Her projemizde bizi yönlendiren temel ilkeler.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {values.map((val, index) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass hover:bg-white/10 transition-[border-color,background-color] duration-500 group relative overflow-hidden border border-transparent hover:border-primary-gold/50 rounded-2xl p-7"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d5b36b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="gold-gradient flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 size-14 rounded-xl mb-5">
                      <Icon className="text-black size-7" />
                    </div>
                    <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-xl mb-2.5">
                      {val.title}
                    </h3>
                    <p className="text-theme-text-secondary leading-relaxed text-sm">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h2 className="font-bold text-theme-text text-fluid-subsection mb-4">
              Ekipmanlarımız
            </h2>
            <p className="text-theme-text-secondary leading-relaxed text-base">
              Kendi bünyemizde bulunan modern iş makineleri ve araçlarımız.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {equipmentCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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

      {/* CTA Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="glass relative overflow-hidden rounded-3xl py-10 px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d5b36b]/20 to-transparent" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="font-bold text-theme-text text-[2rem] mb-4">
                Projeniz İçin{" "}
                <span className="text-gradient-gold">Bize Ulaşın</span>
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
