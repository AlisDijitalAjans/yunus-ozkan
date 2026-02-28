"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Eye, TrendingUp, MessageSquare, Loader2 } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatsCard from "@/components/admin/StatsCard";
import AiCreateModal from "@/components/admin/AiCreateModal";
import { useToast } from "@/components/admin/Toast";

interface BlogRow {
  slug: string;
  title: string;
  image: string;
  category: string;
  date: string;
  author: string;
  createdAt: string;
  status: string;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const { toast } = useToast();
  const [data, setData] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/blog");
      const json = await res.json();
      setData(
        (json.posts || []).map((p: Record<string, unknown>) => ({
          slug: p.slug,
          title: p.title,
          image: p.image,
          category: p.category,
          date: p.date,
          author: p.author || "Yunus Özkan",
          createdAt: String(p.createdAt || "").slice(11, 16) || "",
          status: p.status === "draft" ? "passive" : "active",
        }))
      );
    } catch {
      toast("Veriler yüklenirken hata oluştu.", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAiGenerated = useCallback(
    (entityType: string) => {
      const path =
        entityType === "service"
          ? "/admin/hizmetler/new"
          : entityType === "project"
            ? "/admin/projeler/new"
            : "/admin/blog/new";
      router.push(path);
    },
    [router]
  );

  const handleDelete = async (row: Record<string, unknown>) => {
    if (!confirm(`"${row.title}" silinsin mi?`)) return;
    try {
      const res = await fetch(`/api/blog/${row.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast(`"${row.title}" silindi.`, "success");
      fetchData();
    } catch {
      toast("Silme hatası.", "error");
    }
  };

  const handleToggleStatus = async (row: Record<string, unknown>) => {
    const newStatus = row.status === "active" ? "draft" : "published";
    try {
      const res = await fetch(`/api/blog/${row.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      toast(`"${row.title}" durumu değiştirildi.`, "info");
      fetchData();
    } catch {
      toast("Durum değiştirme hatası.", "error");
    }
  };

  const blogStats = [
    {
      icon: FileText,
      label: "Toplam Yazı",
      value: data.length,
      trend: "+2 bu ay",
      color: "emerald",
      chartData: [{ v: 2 }, { v: 3 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 6 }, { v: data.length }],
    },
    {
      icon: Eye,
      label: "Toplam Görüntülenme",
      value: "1.2K",
      trend: "+18%",
      color: "blue",
      chartData: [{ v: 400 }, { v: 520 }, { v: 480 }, { v: 650 }, { v: 800 }, { v: 950 }, { v: 1200 }],
    },
    {
      icon: TrendingUp,
      label: "Ort. Okuma Süresi",
      value: "4.2 dk",
      color: "amber",
      chartData: [{ v: 3 }, { v: 3.5 }, { v: 4 }, { v: 3.8 }, { v: 4.5 }, { v: 4 }, { v: 4.2 }],
    },
    {
      icon: MessageSquare,
      label: "Yorum",
      value: 24,
      trend: "+5 bu ay",
      color: "violet",
      chartData: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 15 }, { v: 18 }, { v: 20 }, { v: 24 }],
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <>
      <DataTable
        title="Blog Yazıları"
        description="Blog yazılarınızı yönetin, düzenleyin veya yeni yazı ekleyin."
        columns={[
          {
            key: "title",
            label: "Başlık",
            render: (val, row) => (
              <div className="flex items-center gap-3">
                {row.image ? (
                  <img
                    src={String(row.image)}
                    alt={String(val)}
                    className="size-10 rounded-lg object-cover shrink-0 bg-gray-100"
                  />
                ) : (
                  <div className="size-10 rounded-lg bg-gray-100 shrink-0" />
                )}
                <span className="text-gray-900 text-sm font-medium line-clamp-1">
                  {String(val)}
                </span>
              </div>
            ),
          },
          {
            key: "category",
            label: "Kategori",
            hidden: "hidden sm:table-cell",
            render: (val) => (
              <span className="text-primary-gold text-xs font-medium bg-primary-gold/10 px-2 py-0.5 rounded-full">
                {String(val)}
              </span>
            ),
          },
          {
            key: "author",
            label: "Oluşturan",
            hidden: "hidden lg:table-cell",
            render: (val) => (
              <span className="text-gray-600 text-sm">{String(val)}</span>
            ),
          },
          {
            key: "date",
            label: "Tarih",
            hidden: "hidden md:table-cell",
            render: (val, row) => (
              <div className="text-sm">
                <span className="text-gray-600">{String(val)}</span>
                {row.createdAt ? <span className="text-gray-400 ml-1.5 text-xs">{String(row.createdAt)}</span> : null}
              </div>
            ),
          },
        ]}
        data={data as unknown as Record<string, unknown>[]}
        newHref="/admin/blog/new"
        editHref={(row) => `/admin/blog/${row.slug}/edit`}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        searchKey="title"
        searchValue={search}
        onSearchChange={setSearch}
        onAiCreate={() => setAiOpen(true)}
        statsSlot={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {blogStats.map((s) => (
              <StatsCard key={s.label} {...s} />
            ))}
          </div>
        }
      />
      <AiCreateModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        entityLabel="Blog Yazısı"
        onGenerated={handleAiGenerated}
      />
    </>
  );
}
