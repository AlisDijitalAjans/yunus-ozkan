"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Star, List, BarChart3, Loader2 } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatsCard from "@/components/admin/StatsCard";
import AiCreateModal from "@/components/admin/AiCreateModal";
import { useToast } from "@/components/admin/Toast";

interface ServiceRow {
  id: string;
  title: string;
  image: string;
  mediaType: string;
  featureCount: number;
  author: string;
  createdAt: string;
  date: string;
  status: string;
}

export default function AdminHizmetlerPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const { toast } = useToast();
  const [data, setData] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/services");
      const json = await res.json();
      setData(
        (json.services || []).map((s: Record<string, unknown>) => ({
          id: s.id,
          title: s.title,
          image: s.image,
          mediaType: s.mediaType || "image",
          featureCount: Array.isArray(s.features) ? s.features.length : 0,
          author: "Yunus Özkan",
          createdAt: String(s.createdAt || "").slice(11, 16) || "",
          date: String(s.createdAt || "").slice(0, 10),
          status: s.status === "draft" ? "passive" : "active",
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
      const res = await fetch(`/api/services/${row.id}`, { method: "DELETE" });
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
      const res = await fetch(`/api/services/${row.id}`, {
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

  const totalFeatures = data.reduce((acc, s) => acc + s.featureCount, 0);

  const serviceStats = [
    {
      icon: Briefcase, label: "Toplam Hizmet", value: data.length, color: "emerald",
      chartData: [{ v: 3 }, { v: 4 }, { v: 5 }, { v: 5 }, { v: 6 }, { v: 6 }, { v: data.length }],
    },
    {
      icon: List, label: "Toplam Özellik", value: totalFeatures, trend: "+4 bu ay", color: "blue",
      chartData: [{ v: 15 }, { v: 18 }, { v: 22 }, { v: 25 }, { v: 28 }, { v: 32 }, { v: totalFeatures }],
    },
    {
      icon: Star, label: "Ort. Özellik/Hizmet", value: data.length ? (totalFeatures / data.length).toFixed(1) : "0", color: "amber",
      chartData: [{ v: 3 }, { v: 3.5 }, { v: 4 }, { v: 4 }, { v: 4.5 }, { v: 5 }, { v: data.length ? totalFeatures / data.length : 0 }],
    },
    {
      icon: BarChart3, label: "Aktif Hizmet", value: data.filter(s => s.status === "active").length, trend: "Tümü aktif", color: "violet",
      chartData: [{ v: 4 }, { v: 5 }, { v: 5 }, { v: 6 }, { v: 6 }, { v: 6 }, { v: data.length }],
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
      title="Hizmetler"
      description="Hizmet alanlarınızı yönetin, düzenleyin veya yeni hizmet ekleyin."
      columns={[
        {
          key: "title",
          label: "Hizmet Adı",
          render: (val, row) => (
            <div className="flex items-center gap-3">
              {row.mediaType === "video" ? (
                <video src={String(row.image)} muted className="size-10 rounded-lg object-cover shrink-0 bg-gray-100" />
              ) : row.image ? (
                <img src={String(row.image)} alt={String(val)} className="size-10 rounded-lg object-cover shrink-0 bg-gray-100" />
              ) : (
                <div className="size-10 rounded-lg bg-gray-100 shrink-0" />
              )}
              <span className="text-gray-900 text-sm font-medium">{String(val)}</span>
            </div>
          ),
        },
        {
          key: "featureCount",
          label: "Özellik",
          hidden: "hidden sm:table-cell",
          render: (val) => <span className="text-gray-500 text-sm">{String(val)} özellik</span>,
        },
        {
          key: "author",
          label: "Oluşturan",
          hidden: "hidden lg:table-cell",
          render: (val) => <span className="text-gray-600 text-sm">{String(val)}</span>,
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
      newHref="/admin/hizmetler/new"
      editHref={(row) => `/admin/hizmetler/${row.id}/edit`}
      onDelete={handleDelete}
      onToggleStatus={handleToggleStatus}
      searchKey="title"
      searchValue={search}
      onSearchChange={setSearch}
      onAiCreate={() => setAiOpen(true)}
      statsSlot={
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceStats.map((s) => (
            <StatsCard key={s.label} {...s} />
          ))}
        </div>
      }
    />
    <AiCreateModal
      open={aiOpen}
      onClose={() => setAiOpen(false)}
      entityLabel="Hizmet"
      onGenerated={handleAiGenerated}
    />
    </>
  );
}
