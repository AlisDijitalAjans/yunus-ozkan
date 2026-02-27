"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, Phone, FileSearch, Hammer, Truck as TruckIcon, ThumbsUp } from "lucide-react";

const services = [
  {
    title: "İstinat Duvarları",
    desc: "Zemin güvenliği sağlayan kalıcı ve mühendislik esaslı çözümler. Betonarme, taş kaplama ve prefabrik sistemler ile uzun ömürlü ve estetik yapılar inşa ediyoruz.",
    image: "/hizmet-istinat.jpg",
    features: ["Betonarme istinat duvarları", "Taş kaplama istinat duvarları", "Prefabrik istinat sistemleri", "Drenaj sistemi dahil", "Statik hesaplama ve proje"],
  },
  {
    title: "Arazi Düzenleme & Tesviye",
    desc: "Araziyi kullanıma uygun hale getiren düzenleme çözümleri. Modern kepçe ekipmanlarımızla hassas ve profesyonel arazi hazırlığı yapıyoruz.",
    image: "/hizmet-arazi.jpg",
    features: ["Hassas tesviye işleri", "İnşaat öncesi arazi hazırlığı", "Peyzaj altyapı hazırlığı", "Eğim ve kot ayarlaması", "Profesyonel operatör"],
  },
  {
    title: "Kazı & Hafriyat İşleri",
    desc: "İnşaat süreçleri için planlı ve güvenli kazı çözümleri. Kendi ekipmanlarımızla hızlı ve güvenli hizmet sunuyoruz.",
    image: "/hizmet-kazi.jpg",
    features: ["Temel kazı işleri", "Derin kazı uygulamaları", "Hafriyat ve moloz taşıma", "Şev açma işleri", "İş güvenliği standartları"],
  },
  {
    title: "Drenaj Sistemleri",
    desc: "Yüzey ve yeraltı sularını yöneten drenaj çözümleri. Su yalıtımı ve uzun ömürlü sistemler kuruyoruz.",
    image: "/hizmet-drenaj.mp4",
    mediaType: "video" as const,
    features: ["İstinat duvarı drenajı", "Arazi drenaj sistemleri", "Yağmur suyu yönetimi", "Drenaj borusu döşeme", "Su yalıtım çözümleri"],
  },
  {
    title: "Dolgu & Toprak Taşıma",
    desc: "Zemin iyileştirme için kontrollü dolgu ve taşıma çözümleri. Kendi kamyon filomuzla hızlı ve ekonomik hizmet.",
    image: "/hizmet-dolgu.jpg",
    features: ["Hafriyat toprağı taşıma", "Moloz ve döküntü taşıma", "Dolgu malzemesi temini", "Kontrollü dolgu işleri", "Kendi kamyonlarımızla hizmet"],
  },
  {
    title: "Taş Ev Yapım İşi",
    desc: "Doğal taş ile estetik ve uzun ömürlü yapı çözümleri. Geleneksel ve modern mimari için profesyonel taş işçiliği.",
    image: "/hizmet-tasev.jpg",
    features: ["Doğal taş duvar örme", "Taş kaplama işleri", "Restorasyon ve onarım", "Modern taş uygulama", "Uzun ömürlü yapı"],
  },
  {
    title: "Parke Taşı Döşeme",
    desc: "Bahçe, otopark ve yürüyüş yolları için profesyonel parke taşı döşeme hizmeti. Estetik ve dayanıklı zemin çözümleri.",
    image: "/hizmet-parke.jpg",
    features: ["Bahçe yolu parke döşeme", "Otopark parke uygulaması", "Kaldırım ve yürüyüş yolları", "Dekoratif parke desenleri", "Zemin hazırlığı dahil"],
  },
];

const processSteps = [
  {
    icon: Phone,
    title: "İletişim",
    desc: "Projeleriniz hakkında bize ulaşın, ihtiyaçlarınızı dinleyelim.",
  },
  {
    icon: FileSearch,
    title: "Keşif & Planlama",
    desc: "Arazi keşfi yapılır, proje planı ve maliyet analizi hazırlanır.",
  },
  {
    icon: Hammer,
    title: "Uygulama",
    desc: "Profesyonel ekibimiz ve modern ekipmanlarımız ile iş başlar.",
  },
  {
    icon: ThumbsUp,
    title: "Teslim",
    desc: "Proje zamanında ve kalite standartlarında teslim edilir.",
  },
];

export default function HizmetlerContent() {
  return (
    <>
      {/* Services List — Alternating Layout */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="flex flex-col gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="glass rounded-3xl overflow-hidden border border-transparent hover:border-primary-gold/30 transition-all duration-500"
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${
                  index % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}>
                  {/* Media */}
                  <div className="relative aspect-[4/3] overflow-hidden md:[direction:ltr]">
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
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center md:[direction:ltr]">
                    <h3 className="font-bold text-theme-text text-xl md:text-2xl mb-3">
                      {service.title}
                    </h3>
                    <p className="text-theme-text-secondary leading-relaxed text-base mb-5">
                      {service.desc}
                    </p>

                    {/* Features */}
                    <ul className="flex flex-col gap-2 mb-5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckCircle className="text-primary-gold shrink-0 size-5 mt-0.5" />
                          <span className="text-theme-text text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/905337711182"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-gold font-semibold text-sm hover:underline w-fit"
                    >
                      <MessageCircle className="size-4" />
                      <span>Bu Hizmet İçin Teklif Al</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="inline-block glass rounded-full text-primary-gold font-semibold py-1.5 px-4 text-sm mb-4">
              Nasıl Çalışıyoruz?
            </span>
            <h2 className="font-bold text-theme-text text-fluid-subsection mb-4">
              4 Adımda <span className="text-gradient-gold">Proje Süreci</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 text-center border border-transparent hover:border-primary-gold/30 transition-all duration-300 relative"
                >
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-primary-gold/20 font-bold text-4xl">
                    {index + 1}
                  </div>
                  <div className="gold-gradient size-14 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-black size-7" />
                  </div>
                  <h3 className="font-bold text-theme-text text-lg mb-2">{step.title}</h3>
                  <p className="text-theme-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="glass relative overflow-hidden rounded-3xl py-10 px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d5b36b]/20 to-transparent" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="font-bold text-theme-text text-[2rem] mb-4">
                Hangi Hizmeti{" "}
                <span className="text-gradient-gold">Arıyorsunuz?</span>
              </h3>
              <p className="text-theme-text-secondary text-lg mb-8">
                Size en uygun çözümü birlikte belirleyelim.
              </p>
              <a
                href="https://wa.me/905337711182"
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
