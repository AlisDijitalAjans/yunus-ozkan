"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, CheckCircle } from "lucide-react";

const services = [
  {
    title: "İstinat Duvarları",
    desc: "Zemin güvenliği sağlayan kalıcı ve mühendislik esaslı çözümler",
    image: "/hizmet-istinat.jpg",
    mediaType: "image" as const,
    iconPath: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z",
    fullDesc: "Zemin güvenliği sağlayan kalıcı ve mühendislik esaslı çözümler. Betonarme, taş kaplama ve prefabrik sistemler ile uzun ömürlü ve estetik yapılar inşa ediyoruz.",
    features: [
      "Betonarme istinat duvarları",
      "Taş kaplama istinat duvarları",
      "Prefabrik istinat sistemleri",
      "Bahçe istinat duvarları",
      "Drenaj sistemi dahil",
      "Statik hesaplama ve proje",
    ],
  },
  {
    title: "Arazi Düzenleme & Tesviye",
    desc: "Araziyi kullanıma uygun hale getiren düzenleme çözümleri",
    image: "/hizmet-arazi.jpg",
    mediaType: "image" as const,
    iconPath: "M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z",
    fullDesc: "Araziyi kullanıma uygun hale getiren düzenleme çözümleri. Modern kepçe ekipmanlarımızla hassas ve profesyonel arazi hazırlığı yapıyoruz.",
    features: [
      "Hassas tesviye işleri",
      "İnşaat öncesi arazi hazırlığı",
      "Peyzaj altyapı hazırlığı",
      "Yüzey düzenleme",
      "Eğim ve kot ayarlaması",
      "Profesyonel operatör",
    ],
  },
  {
    title: "Kazı & Hafriyat İşleri",
    desc: "İnşaat süreçleri için planlı ve güvenli kazı çözümleri",
    image: "/hizmet-kazi.jpg",
    mediaType: "image" as const,
    iconPath: "M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5z",
    fullDesc: "İnşaat süreçleri için planlı ve güvenli kazı çözümleri. Kendi ekipmanlarımızla hızlı ve güvenli hizmet sunuyoruz.",
    features: [
      "Temel kazı işleri",
      "Derin kazı uygulamaları",
      "Hafriyat ve moloz taşıma",
      "Toprak ve kaya kazısı",
      "Şev açma işleri",
      "İş güvenliği standartları",
    ],
  },
  {
    title: "Drenaj Sistemleri",
    desc: "Yüzey ve yeraltı sularını yöneten drenaj çözümleri",
    image: "/hizmet-drenaj.mp4",
    mediaType: "video" as const,
    iconPath: "M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z",
    fullDesc: "Yüzey ve yeraltı sularını yöneten drenaj çözümleri. Su yalıtımı ve uzun ömürlü sistemler kuruyoruz.",
    features: [
      "İstinat duvarı drenajı",
      "Arazi drenaj sistemleri",
      "Yağmur suyu yönetimi",
      "Drenaj borusu döşeme",
      "Filtre malzemesi uygulaması",
      "Su yalıtım çözümleri",
    ],
  },
  {
    title: "Dolgu & Toprak Taşıma",
    desc: "Zemin iyileştirme için kontrollü dolgu ve taşıma çözümleri",
    image: "/hizmet-dolgu.jpg",
    mediaType: "image" as const,
    iconPath: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
    fullDesc: "Zemin iyileştirme için kontrollü dolgu ve taşıma çözümleri. Kendi kamyon filomuzla hızlı ve ekonomik hizmet.",
    features: [
      "Hafriyat toprağı taşıma",
      "Moloz ve döküntü taşıma",
      "Dolgu malzemesi temini",
      "Kontrollü dolgu işleri",
      "Kendi kamyonlarımızla hizmet",
      "Uygun fiyatlandırma",
    ],
  },
  {
    title: "Taş Ev Yapım İşi",
    desc: "Doğal taş ile estetik ve uzun ömürlü yapı çözümleri",
    image: "/hizmet-tasev.jpg",
    mediaType: "image" as const,
    iconPath: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    fullDesc: "Doğal taş ile estetik ve uzun ömürlü yapı çözümleri. Geleneksel ve modern mimari için profesyonel taş işçiliği.",
    features: [
      "Doğal taş duvar örme",
      "Taş kaplama işleri",
      "Restorasyon ve onarım",
      "Geleneksel taş işçiliği",
      "Modern taş uygulama",
      "Uzun ömürlü yapı",
    ],
  },
  {
    title: "Parke Taşı Döşeme",
    desc: "Bahçe, otopark ve yürüyüş yolları için estetik parke taşı çözümleri",
    image: "/hizmet-parke.jpg",
    mediaType: "image" as const,
    iconPath: "M3 5v14h18V5H3zm4 2v4H5V7h2zm-2 6h2v4H5v-4zm4 4v-4h2v4H9zm4 0v-4h2v4h-2zm4 0v-4h2v4h-2zm2-6h-2V7h2v4zm-4 0h-2V7h2v4zm-4 0H9V7h2v4z",
    fullDesc: "Bahçe, otopark ve yürüyüş yolları için profesyonel parke taşı döşeme hizmeti. Estetik ve dayanıklı zemin çözümleri sunuyoruz.",
    features: [
      "Bahçe yolu parke döşeme",
      "Otopark parke uygulaması",
      "Kaldırım ve yürüyüş yolları",
      "Dekoratif parke desenleri",
      "Bordür ve kenar taşı işleri",
      "Zemin hazırlığı dahil",
    ],
  },
];

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<(typeof services)[0] | null>(null);

  const openModal = (service: (typeof services)[0]) => {
    setActiveService(service);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveService(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="hizmetler" className="section-padding relative overflow-hidden">
      <div className="container-custom relative" style={{ zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "48rem",
            marginBottom: "3rem",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span
            className="inline-block glass rounded-full text-[#d5b36b] font-semibold"
            style={{
              padding: "0.375rem 1rem",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            Hizmetlerimiz
          </span>
          <h2
            className="font-bold text-white"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              marginBottom: "1.25rem",
            }}
          >
            <span className="text-gradient-gold">Profesyonel</span> İnşaat Çözümleri
          </h2>
          <p className="text-gray-300 leading-relaxed" style={{ fontSize: "1.125rem" }}>
            Kendi ekipmanlarımızla sunduğumuz geniş hizmet yelpazesi
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass group overflow-hidden border border-transparent hover:border-[#d5b36b]/50 transition-all duration-500 cursor-pointer"
              style={{ borderRadius: "1rem" }}
              onClick={() => openModal(service)}
            >
              {/* Media */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "1/1",
                }}
              >
                {service.mediaType === "video" ? (
                  <video
                    src={service.image}
                    muted
                    autoPlay
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
                <div
                  className="gold-gradient group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  style={{
                    position: "absolute",
                    bottom: "0.75rem",
                    left: "0.75rem",
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "0.625rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "black" }}>
                    <path d={service.iconPath} />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.25rem" }}>
                <h3
                  className="font-bold text-white group-hover:text-[#d5b36b] transition-colors duration-300"
                  style={{ fontSize: "1.125rem", marginBottom: "0.375rem" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-400 leading-relaxed"
                  style={{ fontSize: "0.875rem", marginBottom: "0.875rem" }}
                >
                  {service.desc}
                </p>
                <span
                  className="text-[#d5b36b] font-semibold group-hover:translate-x-1 transition-transform duration-300"
                  style={{
                    fontSize: "0.875rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  Detayları Öğren
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalOpen && activeService && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass"
              style={{
                position: "relative",
                zIndex: 10,
                maxWidth: "32rem",
                width: "100%",
                borderRadius: "1.5rem",
                padding: "2rem",
                border: "1px solid rgba(213, 179, 107, 0.3)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Kapat"
              >
                <X style={{ width: "1.5rem", height: "1.5rem" }} />
              </button>

              {/* Icon */}
              <div
                className="gold-gradient"
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "black" }}>
                  <path d={activeService.iconPath} />
                </svg>
              </div>

              <h3
                className="font-bold text-white"
                style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}
              >
                {activeService.title}
              </h3>

              <p
                className="text-gray-300 leading-relaxed"
                style={{ fontSize: "1rem", marginBottom: "1.5rem" }}
              >
                {activeService.fullDesc}
              </p>

              {/* Features */}
              <div style={{ marginBottom: "1.75rem" }}>
                <h4
                  className="font-semibold text-[#d5b36b]"
                  style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}
                >
                  Hizmet Kapsamı:
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {activeService.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.625rem",
                      }}
                    >
                      <CheckCircle
                        className="text-[#d5b36b] shrink-0"
                        style={{ width: "1.25rem", height: "1.25rem", marginTop: "0.125rem" }}
                      />
                      <span className="text-white" style={{ fontSize: "0.938rem" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                }}
              >
                <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                <span>Teklif Al</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
