"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, Phone, FileSearch, Hammer, ThumbsUp, ArrowRight } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

const services = [
  {
    title: "İstinat Duvarları",
    desc: "Zemin güvenliği sağlayan kalıcı ve mühendislik esaslı çözümler. Betonarme, taş kaplama ve prefabrik sistemler ile uzun ömürlü ve estetik yapılar inşa ediyoruz.",
    image: "/hizmet-istinat.jpg",
    features: ["Betonarme istinat duvarları", "Taş kaplama istinat duvarları", "Prefabrik istinat sistemleri", "Drenaj sistemi dahil"],
  },
  {
    title: "Arazi Düzenleme & Tesviye",
    desc: "Araziyi kullanıma uygun hale getiren düzenleme çözümleri. Modern kepçe ekipmanlarımızla hassas ve profesyonel arazi hazırlığı yapıyoruz.",
    image: "/hizmet-arazi.jpg",
    features: ["Hassas tesviye işleri", "İnşaat öncesi arazi hazırlığı", "Peyzaj altyapı hazırlığı", "Eğim ve kot ayarlaması"],
  },
  {
    title: "Kazı & Hafriyat İşleri",
    desc: "İnşaat süreçleri için planlı ve güvenli kazı çözümleri. Kendi ekipmanlarımızla hızlı ve güvenli hizmet sunuyoruz.",
    image: "/hizmet-kazi.jpg",
    features: ["Temel kazı işleri", "Derin kazı uygulamaları", "Hafriyat ve moloz taşıma", "İş güvenliği standartları"],
  },
  {
    title: "Drenaj Sistemleri",
    desc: "Yüzey ve yeraltı sularını yöneten drenaj çözümleri. Su yalıtımı ve uzun ömürlü sistemler kuruyoruz.",
    image: "/hizmet-drenaj.mp4",
    mediaType: "video" as const,
    features: ["İstinat duvarı drenajı", "Arazi drenaj sistemleri", "Yağmur suyu yönetimi", "Drenaj borusu döşeme"],
  },
  {
    title: "Dolgu & Toprak Taşıma",
    desc: "Zemin iyileştirme için kontrollü dolgu ve taşıma çözümleri. Kendi kamyon filomuzla hızlı ve ekonomik hizmet.",
    image: "/hizmet-dolgu.jpg",
    features: ["Hafriyat toprağı taşıma", "Moloz ve döküntü taşıma", "Dolgu malzemesi temini", "Kontrollü dolgu işleri"],
  },
  {
    title: "Taş Ev Yapım İşi",
    desc: "Doğal taş ile estetik ve uzun ömürlü yapı çözümleri. Geleneksel ve modern mimari için profesyonel taş işçiliği.",
    image: "/hizmet-tasev.jpg",
    features: ["Doğal taş duvar örme", "Taş kaplama işleri", "Restorasyon ve onarım", "Modern taş uygulama"],
  },
  {
    title: "Parke Taşı Döşeme",
    desc: "Bahçe, otopark ve yürüyüş yolları için profesyonel parke taşı döşeme hizmeti. Estetik ve dayanıklı zemin çözümleri.",
    image: "/hizmet-parke.jpg",
    features: ["Bahçe yolu parke döşeme", "Otopark parke uygulaması", "Kaldırım ve yürüyüş yolları", "Dekoratif parke desenleri"],
  },
];

const processSteps = [
  { icon: Phone, title: "İletişim", desc: "Projeleriniz hakkında bize ulaşın, ihtiyaçlarınızı dinleyelim." },
  { icon: FileSearch, title: "Keşif & Planlama", desc: "Arazi keşfi yapılır, proje planı ve maliyet analizi hazırlanır." },
  { icon: Hammer, title: "Uygulama", desc: "Profesyonel ekibimiz ve modern ekipmanlarımız ile iş başlar." },
  { icon: ThumbsUp, title: "Teslim", desc: "Proje zamanında ve kalite standartlarında teslim edilir." },
];

export default function HizmetlerContent({ settings }: { settings: SiteSettings }) {
  return (
    <>
      {/* Services Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/hizmetler/${index + 1}`} className="block h-full">
                  <article className="glass group rounded-2xl overflow-hidden border border-transparent hover:border-primary-gold/50 transition-[border-color] duration-500 h-full flex flex-col">
                    {/* Media */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {service.mediaType === "video" ? (
                        <video
                          src={service.image}
                          muted
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-theme-text text-lg group-hover:text-primary-gold transition-colors duration-300 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-theme-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                        {service.desc}
                      </p>

                      {/* Features */}
                      <ul className="flex flex-col gap-1.5 mb-5 flex-1">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle className="text-primary-gold shrink-0 size-4 mt-0.5" />
                            <span className="text-theme-text-secondary text-xs">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <span className="text-primary-gold font-semibold text-sm inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                        Detaylı Bilgi
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </article>
                </Link>
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
                  className="glass rounded-2xl p-6 text-center border border-transparent hover:border-primary-gold/30 transition-[border-color] duration-300 relative"
                >
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
