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
        </nav>

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
