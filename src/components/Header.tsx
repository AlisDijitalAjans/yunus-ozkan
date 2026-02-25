"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  FolderOpen,
  Settings,
  LayoutGrid,
  Phone,
  MessageCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#projeler", label: "Projeler" },
  { href: "#hizmetler", label: "Hizmetlerimiz" },
  { href: "#galeri", label: "Galeri" },
];

const drawerLinks = [
  { href: "#hero", label: "Ana Sayfa", icon: Home },
  { href: "#hakkimizda", label: "Hakkımızda", icon: Info },
  { href: "#projeler", label: "Projeler", icon: FolderOpen },
  { href: "#hizmetler", label: "Hizmetlerimiz", icon: Settings },
  { href: "#galeri", label: "Galeri", icon: LayoutGrid },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Header */}
      <header
        className={`w-full transition-all duration-500 header-bg ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        }}
      >
        <div className="container-custom">
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between">
            {/* Hamburger Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-white focus:outline-none p-1"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Logo */}
            <a
              href="#hero"
              className="flex justify-center transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/logo.png"
                alt="Yunus İnşaat Logo"
                width={64}
                height={64}
                className={`transition-all duration-500 ${
                  scrolled ? "h-12 md:h-14 w-auto" : "h-14 md:h-16 w-auto"
                }`}
              />
            </a>

            {/* Right Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: "none",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#d5b36b",
                }}
              >
                {theme === "dark" ? (
                  <Sun style={{ width: "1.25rem", height: "1.25rem" }} />
                ) : (
                  <Moon style={{ width: "1.25rem", height: "1.25rem" }} />
                )}
              </button>
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#d5b36b] transition-all duration-300 p-1"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
              </a>
            </div>
          </div>

          {/* Desktop Header */}
          <nav className="hidden lg:grid lg:grid-cols-3 items-center" style={{ gap: "2rem" }}>
            {/* Left Links */}
            <div className="flex items-center" style={{ gap: "1.5rem" }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link whitespace-nowrap">
                  {link.label}
                  <span className="nav-underline" />
                </a>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex justify-center">
              <a
                href="#hero"
                className="transition-all duration-300 hover:scale-105"
                style={{ marginTop: scrolled ? "0" : "0.5rem" }}
              >
                <Image
                  src="/logo.png"
                  alt="Yunus İnşaat Logo"
                  width={128}
                  height={128}
                  className={`transition-all duration-500 ${
                    scrolled
                      ? "h-16 xl:h-20 w-auto"
                      : "h-24 xl:h-32 w-auto"
                  }`}
                />
              </a>
            </div>

            {/* Right CTA */}
            <div className="flex justify-end" style={{ gap: "0.75rem", alignItems: "center" }}>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  border: "1px solid rgba(213, 179, 107, 0.3)",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: "#d5b36b",
                }}
              >
                {theme === "dark" ? (
                  <Sun style={{ width: "1.125rem", height: "1.125rem" }} />
                ) : (
                  <Moon style={{ width: "1.125rem", height: "1.125rem" }} />
                )}
              </button>
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center text-sm xl:text-base"
                style={{ gap: "0.5rem", padding: "0.5rem 1rem" }}
              >
                <MessageCircle className="h-4 w-4 xl:h-5 xl:w-5" />
                <span>İletişim</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div
            className="lg:hidden fixed inset-0"
            style={{ zIndex: 99999 }}
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full w-[280px] sm:w-[320px] border-r border-[#d5b36b]/20 flex flex-col"
              style={{ boxShadow: "4px 0 30px rgba(0, 0, 0, 0.5)", backgroundColor: "var(--theme-drawer-bg)" }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <a
                  href="#hero"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src="/logo.png"
                    alt="Yunus İnşaat Logo"
                    width={48}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-white hover:text-[#d5b36b] transition-colors duration-300 p-1"
                  aria-label="Menüyü Kapat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="flex flex-col" style={{ gap: "0.25rem" }}>
                  {drawerLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={() => setDrawerOpen(false)}
                          className="drawer-link"
                        >
                          <Icon className="w-5 h-5 text-[#d5b36b]" />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-800">
                {/* CTA Button */}
                <a
                  href="https://wa.me/905337711182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full inline-flex items-center justify-center mb-4 text-sm"
                  style={{ gap: "0.5rem", padding: "0.75rem 1rem" }}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp ile İletişim</span>
                </a>

                {/* Contact Info */}
                <div>
                  <a
                    href="tel:+905337711182"
                    className="inline-flex items-center text-gray-300 hover:text-[#d5b36b] transition-colors duration-300"
                    style={{ gap: "0.75rem" }}
                  >
                    <Phone className="w-4 h-4 text-[#d5b36b]" />
                    <span className="text-sm">0533 771 11 82</span>
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-gray-500 text-xs mt-4 text-center">
                  2015&apos;ten beri güvenilir hizmet
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Spacer - header fixed olduğu için içerik kayması önlenir */}
      <div style={{ height: "0" }} />
    </>
  );
}
