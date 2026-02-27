"use client";

import Image from "next/image";
import {
  Phone,
  MessageCircle,
  CheckCircle,
  ChevronRight,
  Instagram,
  Twitter,
} from "lucide-react";

const quickLinks = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#projeler", label: "Projeler" },
  { href: "#hizmetler", label: "Hizmetlerimiz" },
  { href: "#galeri", label: "Galeri" },
];

const services = [
  "İstinat Duvarları",
  "Arazi Düzenleme",
  "Kazı & Hafriyat",
  "Toprak Taşıma",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gold Line */}
      <div className="w-full gold-gradient h-px" />

      <div className="section-padding">
        <div className="container-custom">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 gap-10 mb-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Logo & About */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Image
                src="/logo.png"
                alt="Yunus İnşaat Logo"
                width={160}
                height={160}
                className="h-32 w-auto mb-6"
              />
              <p className="text-theme-text-secondary leading-relaxed text-base mb-6">
                Kendi ekipmanlarımızla profesyonel inşaat, hafriyat ve arazi
                düzenleme hizmetleri.
              </p>
              <div className="flex items-center justify-center md:justify-start text-primary-gold gap-2">
                <CheckCircle className="size-5" />
                <span className="font-semibold text-base">
                  Güvenilir Hizmet
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="font-bold text-theme-text text-xl mb-6">
                Hızlı Linkler
              </h3>
              <ul className="flex flex-col gap-3.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-theme-text-secondary hover:text-primary-gold transition-colors duration-300 inline-flex items-center gap-2 text-base"
                    >
                      <ChevronRight className="size-5" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="text-center md:text-left">
              <h3 className="font-bold text-theme-text text-xl mb-6">
                Hizmetlerimiz
              </h3>
              <ul className="flex flex-col gap-3.5">
                {services.map((service) => (
                  <li key={service}>
                    <a
                      href="#hizmetler"
                      className="text-theme-text-secondary hover:text-primary-gold transition-colors duration-300 inline-flex items-start gap-2 text-base"
                    >
                      <CheckCircle className="text-primary-gold shrink-0 size-5 mt-[0.15rem]" />
                      <span>{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="font-bold text-theme-text text-xl mb-6">
                İletişim
              </h3>
              <ul className="flex flex-col gap-5">
                {/* Phone */}
                <li>
                  <a
                    href="https://wa.me/905337711182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start text-theme-text-secondary hover:text-primary-gold transition-colors duration-300 gap-3"
                  >
                    <Phone className="text-primary-gold shrink-0 size-6" />
                    <div className="text-left">
                      <p className="font-semibold text-base">Telefon</p>
                      <p className="text-base">0533 771 11 82</p>
                    </div>
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a
                    href="https://wa.me/905337711182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start text-theme-text-secondary hover:text-primary-gold transition-colors duration-300 gap-3"
                  >
                    <MessageCircle className="text-primary-gold shrink-0 size-6" />
                    <div className="text-left">
                      <p className="font-semibold text-base">WhatsApp</p>
                      <p className="text-base">Hızlı İletişim</p>
                    </div>
                  </a>
                </li>

                {/* Social Media */}
                <li>
                  <p className="text-theme-text-secondary font-semibold text-base mb-3">
                    Sosyal Medya
                  </p>
                  <div className="flex justify-center md:justify-start gap-3">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full glass flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-black transition-all duration-300 size-11"
                    >
                      <Instagram className="size-5" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full glass flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-black transition-all duration-300 size-11"
                    >
                      <Twitter className="size-5" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Box */}
          <div className="glass relative overflow-hidden rounded-3xl py-10 px-8 mb-14">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d5b36b]/20 to-transparent" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="font-bold text-theme-text text-[2rem] mb-4">
                Projeniz İçin{" "}
                <span className="text-gradient-gold">Teklif Alın</span>
              </h3>
              <p className="text-theme-text-secondary text-lg mb-8">
                Profesyonel ekibimizle projelerinizi hayata geçiriyoruz.
              </p>
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2.5"
              >
                <MessageCircle className="size-5" />
                <span>Hemen WhatsApp ile İletişime Geç</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-theme-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-3">
              <p className="text-theme-text-muted text-sm">
                Güvenilir hizmet anlayışı.
              </p>
              <a
                href="https://alisdijital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-text-muted hover:text-primary-gold transition-colors duration-300 text-sm"
              >
                Web Tasarım Ajansı:{" "}
                <span className="text-primary-gold font-semibold">
                  Alis Dijital
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
