"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  FolderOpen,
  Settings,
  LayoutGrid,
  FileText,
  Phone,
  MessageCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const navLinksLeft = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/projeler", label: "Projeler" },
];

const navLinksRight = [
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/galeri", label: "Galeri" },
  { href: "/blog", label: "Blog" },
];

const drawerLinks = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/hakkimizda", label: "Hakkımızda", icon: Info },
  { href: "/projeler", label: "Projeler", icon: FolderOpen },
  { href: "/hizmetler", label: "Hizmetlerimiz", icon: Settings },
  { href: "/galeri", label: "Galeri", icon: LayoutGrid },
  { href: "/blog", label: "Blog", icon: FileText },
];

function isActiveLink(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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
        className={`w-full transition-all duration-500 header-bg fixed top-0 inset-x-0 z-[9999] ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{ padding: scrolled ? "0.5rem 0" : "0.75rem 0" }}
      >
        <div className="container-custom">
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between">
            {/* Hamburger Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-theme-text focus:outline-none p-1"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex justify-center transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/logo.png"
                alt="Yunus İnşaat Logo"
                width={64}
                height={64}
                className={`transition-all duration-500 ${
                  scrolled ? "h-10 md:h-12 w-auto" : "h-12 md:h-14 w-auto"
                }`}
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn size-8 rounded-full flex items-center justify-center text-primary-gold"
                aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
              >
                {theme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </button>
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-text hover:text-primary-gold transition-all duration-300 p-1"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
              </a>
            </div>
          </div>

          {/* Desktop Header */}
          <nav className="hidden lg:flex items-center justify-between">
            {/* Left Links */}
            <div className="flex items-center gap-4 xl:gap-5">
              {navLinksLeft.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link whitespace-nowrap ${
                    isActiveLink(link.href, pathname) ? "text-primary-gold" : ""
                  }`}
                >
                  {link.label}
                  <span className="nav-underline" />
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex justify-center shrink-0 mx-4 xl:mx-6">
              <Link
                href="/"
                className="transition-all duration-300 hover:scale-105"
              >
                <Image
                  src="/logo.png"
                  alt="Yunus İnşaat Logo"
                  width={128}
                  height={128}
                  className={`transition-all duration-500 ${
                    scrolled
                      ? "h-14 xl:h-16 w-auto"
                      : "h-18 xl:h-22 w-auto"
                  }`}
                />
              </Link>
            </div>

            {/* Right Links + CTA */}
            <div className="flex items-center gap-4 xl:gap-5">
              {navLinksRight.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link whitespace-nowrap ${
                    isActiveLink(link.href, pathname) ? "text-primary-gold" : ""
                  }`}
                >
                  {link.label}
                  <span className="nav-underline" />
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn size-10 rounded-full border border-primary-gold/30 bg-white/5 flex items-center justify-center cursor-pointer transition-all duration-300 text-primary-gold ml-1"
                aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
              >
                {theme === "dark" ? (
                  <Sun className="size-[1.125rem]" />
                ) : (
                  <Moon className="size-[1.125rem]" />
                )}
              </button>
              <a
                href="https://wa.me/905337711182"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center text-sm xl:text-base gap-2"
                style={{ padding: "0.5rem 1rem" }}
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
          <div className="lg:hidden fixed inset-0 z-[99999]">
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
              className="absolute top-0 left-0 h-full w-[280px] sm:w-[320px] border-r border-primary-gold/20 flex flex-col bg-theme-drawer-bg shadow-[4px_0_30px_rgba(0,0,0,0.5)]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-theme-border">
                <Link
                  href="/"
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
                </Link>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-theme-text hover:text-primary-gold transition-colors duration-300 p-1"
                  aria-label="Menüyü Kapat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="flex flex-col gap-1">
                  {drawerLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActiveLink(link.href, pathname);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`drawer-link ${active ? "text-primary-gold" : ""}`}
                        >
                          <Icon className="w-5 h-5 text-primary-gold" />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-theme-border">
                {/* CTA Button */}
                <a
                  href="https://wa.me/905337711182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full inline-flex items-center justify-center mb-4 text-sm gap-2"
                  style={{ padding: "0.75rem 1rem" }}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp ile İletişim</span>
                </a>

                {/* Contact Info */}
                <div>
                  <a
                    href="tel:+905337711182"
                    className="inline-flex items-center text-theme-text-secondary hover:text-primary-gold transition-colors duration-300 gap-3"
                  >
                    <Phone className="w-4 h-4 text-primary-gold" />
                    <span className="text-sm">0533 771 11 82</span>
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-theme-text-faint text-xs mt-4 text-center">
                  2015&apos;ten beri güvenilir hizmet
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-0" />
    </>
  );
}
