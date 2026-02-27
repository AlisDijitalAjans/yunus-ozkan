"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Wrench,
  Images,
  FileText,
  Plus,
  ArrowRight,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { galleryItems } from "@/data/gallery";
import { blogPosts } from "@/data/blogPosts";

const quickActions = [
  { href: "/admin/blog/new", label: "Yeni Blog Yazısı", icon: FileText },
  { href: "/admin/projeler/new", label: "Yeni Proje", icon: FolderKanban },
  { href: "/admin/hizmetler/new", label: "Yeni Hizmet", icon: Wrench },
  { href: "/admin/galeri", label: "Galeri Yönet", icon: Images },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Yönetim panelinize hoş geldiniz.
        </p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          icon={FolderKanban}
          label="Toplam Proje"
          value={projects.length}
        />
        <StatsCard
          icon={Wrench}
          label="Hizmet Alanı"
          value={services.length}
        />
        <StatsCard
          icon={Images}
          label="Galeri Görseli"
          value={galleryItems.length}
        />
        <StatsCard
          icon={FileText}
          label="Blog Yazısı"
          value={blogPosts.length}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Hızlı İşlemler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-primary-gold/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary-gold/10 group-hover:bg-primary-gold/20 transition-colors">
                  <action.icon className="size-4 text-primary-gold" />
                </div>
                <span className="text-gray-900 text-sm font-medium">
                  {action.label}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-3 text-primary-gold text-xs font-medium">
                <Plus className="size-3" />
                Oluştur
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Blog Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Son Blog Yazıları
          </h2>
          <Link
            href="/admin/blog"
            className="text-primary-gold text-sm font-medium hover:underline inline-flex items-center gap-1"
          >
            Tümünü Gör <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-5 py-3">
                  Başlık
                </th>
                <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                  Kategori
                </th>
                <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                  Tarih
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {blogPosts.slice(0, 5).map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-gray-900 text-sm font-medium line-clamp-1">
                      {post.title}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-primary-gold text-xs font-medium bg-primary-gold/10 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="text-gray-500 text-sm">
                      {post.date}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      className="text-primary-gold text-xs font-medium hover:underline"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
