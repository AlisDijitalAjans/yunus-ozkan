"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Images,
  FileText,
  LogOut,
  User,
  X,
  Settings,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projeler", label: "Projeler", icon: FolderKanban },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: Wrench },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  // License: 365-day countdown from a fixed start date
  const licenseStart = new Date("2026-02-28");
  const licenseEnd = new Date(licenseStart);
  licenseEnd.setDate(licenseEnd.getDate() + 365);
  const now = new Date();
  const totalDays = 365;
  const msLeft = licenseEnd.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
  const progressPct = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-[#0d0d0d] border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <div>
              <span className="font-bold text-white text-sm">
                Yunus Özkan
              </span>
              <span className="block text-primary-gold text-[10px] font-medium tracking-wider uppercase">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-primary-gold/10 text-primary-gold border border-primary-gold/20"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="!my-3 border-t border-white/[0.06]" />

          {/* Settings */}
          <Link
            href="/admin/ayarlar"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive("/admin/ayarlar")
                ? "bg-primary-gold/10 text-primary-gold border border-primary-gold/20"
                : "text-white/50 hover:text-white hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            <Settings className="size-[18px]" />
            Ayarlar
          </Link>
        </nav>

        {/* License / Subscription */}
        <div className="px-4 py-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-white/70 text-[11px] font-semibold uppercase tracking-wider">
              <Shield className="size-3.5 text-primary-gold" />
              Lisans
            </span>
            <span className="text-white text-xs font-medium">
              {daysLeft} gün kaldı
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background:
                  daysLeft > 90
                    ? "linear-gradient(90deg, #d5b36b, #c9a961)"
                    : daysLeft > 30
                      ? "linear-gradient(90deg, #f59e0b, #d97706)"
                      : "linear-gradient(90deg, #ef4444, #dc2626)",
              }}
            />
          </div>
        </div>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-8 rounded-full bg-primary-gold/15 flex items-center justify-center shrink-0">
                <User className="size-3.5 text-primary-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-white/35 text-[11px] truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              title="Çıkış Yap"
              className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 shrink-0"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
