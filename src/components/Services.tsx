"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    title: "İstinat Duvarları",
    desc: "Zemin güvenliği sağlayan kalıcı ve mühendislik esaslı çözümler",
    image: "/hizmet-istinat.jpg",
    mediaType: "image" as const,
    iconPath: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z",
  },
  {
    title: "Arazi Düzenleme & Tesviye",
    desc: "Araziyi kullanıma uygun hale getiren düzenleme çözümleri",
    image: "/hizmet-arazi.jpg",
    mediaType: "image" as const,
    iconPath: "M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z",
  },
  {
    title: "Kazı & Hafriyat İşleri",
    desc: "İnşaat süreçleri için planlı ve güvenli kazı çözümleri",
    image: "/hizmet-kazi.jpg",
    mediaType: "image" as const,
    iconPath: "M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5z",
  },
  {
    title: "Drenaj Sistemleri",
    desc: "Yüzey ve yeraltı sularını yöneten drenaj çözümleri",
    image: "/hizmet-drenaj.mp4",
    mediaType: "video" as const,
    iconPath: "M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z",
  },
  {
    title: "Dolgu & Toprak Taşıma",
    desc: "Zemin iyileştirme için kontrollü dolgu ve taşıma çözümleri",
    image: "/hizmet-dolgu.jpg",
    mediaType: "image" as const,
    iconPath: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  },
  {
    title: "Taş Ev Yapım İşi",
    desc: "Doğal taş ile estetik ve uzun ömürlü yapı çözümleri",
    image: "/hizmet-tasev.jpg",
    mediaType: "image" as const,
    iconPath: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  },
  {
    title: "Parke Taşı Döşeme",
    desc: "Bahçe, otopark ve yürüyüş yolları için estetik parke taşı çözümleri",
    image: "/hizmet-parke.jpg",
    mediaType: "image" as const,
    iconPath: "M3 5v14h18V5H3zm4 2v4H5V7h2zm-2 6h2v4H5v-4zm4 4v-4h2v4H9zm4 0v-4h2v4h-2zm4 0v-4h2v4h-2zm2-6h-2V7h2v4zm-4 0h-2V7h2v4zm-4 0H9V7h2v4z",
  },
];

interface ServicesProps {
  showHeader?: boolean;
}

export default function Services({ showHeader = true }: ServicesProps) {
  return (
    <section id="hizmetler" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12 text-center mx-auto"
          >
            <span className="inline-block glass rounded-full text-primary-gold font-semibold py-1.5 px-4 text-sm mb-4">
              Hizmetlerimiz
            </span>
            <h2 className="font-bold text-theme-text text-fluid-section mb-5">
              <span className="text-gradient-gold">Profesyonel</span> İnşaat Çözümleri
            </h2>
            <p className="text-theme-text-secondary leading-relaxed text-lg">
              Kendi ekipmanlarımızla sunduğumuz geniş hizmet yelpazesi
            </p>
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <Link key={service.title} href={`/hizmetler/${index + 1}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass group overflow-hidden border border-transparent hover:border-primary-gold/50 transition-[border-color] duration-500 cursor-pointer rounded-2xl h-full"
              >
                {/* Media */}
                <div className="relative overflow-hidden aspect-square">
                  {service.mediaType === "video" ? (
                    <video
                      src={service.image}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  {/* Icon Badge */}
                  <div className="gold-gradient group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 absolute bottom-3 left-3 size-11 rounded-lg flex items-center justify-center z-10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                      <path d={service.iconPath} />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-lg mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-theme-text-muted leading-relaxed text-sm mb-3.5">
                    {service.desc}
                  </p>
                  <span className="text-primary-gold font-semibold group-hover:translate-x-1 transition-transform duration-300 text-sm inline-flex items-center gap-1.5">
                    Detayları Öğren
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
