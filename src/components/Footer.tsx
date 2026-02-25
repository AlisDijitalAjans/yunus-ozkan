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
      <div style={{ height: "4px" }} className="w-full gold-gradient" />

      <div className="section-padding">
        <div className="container-custom">
          {/* Footer Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              marginBottom: "3.5rem",
            }}
            className="footer-grid"
          >
            {/* Logo & About */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Image
                src="/logo.png"
                alt="Yunus İnşaat Logo"
                width={160}
                height={160}
                style={{ height: "8rem", width: "auto", marginBottom: "1.5rem" }}
              />
              <p
                className="text-gray-300 leading-relaxed"
                style={{ fontSize: "1rem", marginBottom: "1.5rem" }}
              >
                Kendi ekipmanlarımızla profesyonel inşaat, hafriyat ve arazi
                düzenleme hizmetleri.
              </p>
              <div
                className="flex items-center justify-center md:justify-start text-[#d5b36b]"
                style={{ gap: "0.5rem" }}
              >
                <CheckCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                <span className="font-semibold" style={{ fontSize: "1rem" }}>
                  Güvenilir Hizmet
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3
                className="font-bold text-white"
                style={{ fontSize: "1.375rem", marginBottom: "1.5rem" }}
              >
                Hızlı Linkler
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-[#d5b36b] transition-colors duration-300 inline-flex items-center"
                      style={{ gap: "0.5rem", fontSize: "1rem" }}
                    >
                      <ChevronRight style={{ width: "1.125rem", height: "1.125rem" }} />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="text-center md:text-left">
              <h3
                className="font-bold text-white"
                style={{ fontSize: "1.375rem", marginBottom: "1.5rem" }}
              >
                Hizmetlerimiz
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {services.map((service) => (
                  <li key={service}>
                    <a
                      href="#hizmetler"
                      className="text-gray-300 hover:text-[#d5b36b] transition-colors duration-300 inline-flex items-start"
                      style={{ gap: "0.5rem", fontSize: "1rem" }}
                    >
                      <CheckCircle
                        className="text-[#d5b36b] shrink-0"
                        style={{ width: "1.25rem", height: "1.25rem", marginTop: "0.15rem" }}
                      />
                      <span>{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3
                className="font-bold text-white"
                style={{ fontSize: "1.375rem", marginBottom: "1.5rem" }}
              >
                İletişim
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Phone */}
                <li>
                  <a
                    href="https://wa.me/905337711182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start text-gray-300 hover:text-[#d5b36b] transition-colors duration-300"
                    style={{ gap: "0.75rem" }}
                  >
                    <Phone
                      className="text-[#d5b36b] shrink-0"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    <div className="text-left">
                      <p className="font-semibold" style={{ fontSize: "1rem" }}>
                        Telefon
                      </p>
                      <p style={{ fontSize: "1rem" }}>0533 771 11 82</p>
                    </div>
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a
                    href="https://wa.me/905337711182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start text-gray-300 hover:text-[#d5b36b] transition-colors duration-300"
                    style={{ gap: "0.75rem" }}
                  >
                    <MessageCircle
                      className="text-[#d5b36b] shrink-0"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    <div className="text-left">
                      <p className="font-semibold" style={{ fontSize: "1rem" }}>
                        WhatsApp
                      </p>
                      <p style={{ fontSize: "1rem" }}>Hızlı İletişim</p>
                    </div>
                  </a>
                </li>

                {/* Social Media */}
                <li>
                  <p
                    className="text-gray-300 font-semibold"
                    style={{ fontSize: "1rem", marginBottom: "0.75rem" }}
                  >
                    Sosyal Medya
                  </p>
                  <div
                    className="flex justify-center md:justify-start"
                    style={{ gap: "0.75rem" }}
                  >
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full glass flex items-center justify-center text-[#d5b36b] hover:bg-[#d5b36b] hover:text-black transition-all duration-300"
                      style={{ width: "2.75rem", height: "2.75rem" }}
                    >
                      <Instagram style={{ width: "1.25rem", height: "1.25rem" }} />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full glass flex items-center justify-center text-[#d5b36b] hover:bg-[#d5b36b] hover:text-black transition-all duration-300"
                      style={{ width: "2.75rem", height: "2.75rem" }}
                    >
                      <Twitter style={{ width: "1.25rem", height: "1.25rem" }} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Box */}
          <div
            className="glass relative overflow-hidden"
            style={{
              borderRadius: "1.5rem",
              padding: "2.5rem 2rem",
              marginBottom: "3.5rem",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d5b36b]/20 to-transparent" />
            <div className="relative z-10 text-center" style={{ maxWidth: "42rem", margin: "0 auto" }}>
              <h3
                className="font-bold text-white"
                style={{ fontSize: "2rem", marginBottom: "1rem" }}
              >
                Projeniz İçin{" "}
                <span className="text-gradient-gold">Teklif Alın</span>
              </h3>
              <p
                className="text-gray-300"
                style={{ fontSize: "1.125rem", marginBottom: "2rem" }}
              >
                Profesyonel ekibimizle projelerinizi hayata geçiriyoruz.
              </p>
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
                style={{ gap: "0.625rem", padding: "0.875rem 1.75rem", fontSize: "1rem" }}
              >
                <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                <span>Hemen WhatsApp ile İletişime Geç</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="border-t border-gray-700/50"
            style={{ paddingTop: "2rem" }}
          >
            <div
              className="flex flex-col md:flex-row items-center justify-between text-center md:text-left"
              style={{ gap: "0.75rem" }}
            >
              <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>
                Güvenilir hizmet anlayışı.
              </p>
              <a
                href="https://alisdijital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#d5b36b] transition-colors duration-300"
                style={{ fontSize: "0.875rem" }}
              >
                Web Tasarım Ajansı:{" "}
                <span className="text-[#d5b36b] font-semibold">
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
