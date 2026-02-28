"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen, MapPin, CheckCircle, Clock, Loader2 } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatsCard from "@/components/admin/StatsCard";
import AiCreateModal from "@/components/admin/AiCreateModal";
import { useToast } from "@/components/admin/Toast";

interface ProjectRow {
  id: string;
  title: string;
  video: string;
  category: string;
  location: string;
  author: string;
  createdAt: string;
  date: string;
  status: string;
}

export default function AdminProjelerPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const { toast } = useToast();
  const [data, setData] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      setData(
        (json.projects || []).map((p: Record<string, unknown>) => ({
          id: p.id,
          title: p.title,
          video: p.video || "",
          category: p.category,
          location: p.location,
          author: "Yunus Özkan",
          createdAt: String(p.createdAt || "").slice(11, 16) || "",
          date: String(p.createdAt || "").slice(0, 10),
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
      const res = await fetch(`/api/projects/${row.id}`, { method: "DELETE" });
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
      const res = await fetch(`/api/projects/${row.id}`, {
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

  const locations = new Set(data.map((p) => p.location));

  const projectStats = [
    {
      icon: FolderOpen, label: "Toplam Proje", value: data.length, trend: "+1 bu ay", color: "emerald",
      chartData: [{ v: 3 }, { v: 4 }, { v: 5 }, { v: 5 }, { v: 6 }, { v: 7 }, { v: data.length }],
    },
    {
      icon: CheckCircle, label: "Tamamlanan", value: Math.max(0, data.length - 2), color: "blue",
      chartData: [{ v: 2 }, { v: 3 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 5 }, { v: Math.max(0, data.length - 2) }],
    },
    {
      icon: Clock, label: "Devam Eden", value: 2, color: "amber",
      chartData: [{ v: 3 }, { v: 2 }, { v: 3 }, { v: 2 }, { v: 1 }, { v: 2 }, { v: 2 }],
    },
    {
      icon: MapPin, label: "Farklı Konum", value: locations.size, color: "violet",
      chartData: [{ v: 1 }, { v: 2 }, { v: 2 }, { v: 3 }, { v: 3 }, { v: 4 }, { v: locations.size }],
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
        title="Projeler"
        description="Projelerinizi yönetin, düzenleyin veya yeni proje ekleyin."
        columns={[
          {
            key: "title",
            label: "Proje Adı",
            render: (val, row) => (
              <div className="flex items-center gap-3">
                {row.video ? (
                  <video src={String(row.video)} muted className="size-10 rounded-lg object-cover shrink-0 bg-gray-100" />
                ) : (
                  <div className="size-10 rounded-lg bg-gray-100 shrink-0" />
                )}
                <span className="text-gray-900 text-sm font-medium">{String(val)}</span>
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
            key: "location",
            label: "Konum",
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
        newHref="/admin/projeler/new"
        editHref={(row) => `/admin/projeler/${row.id}/edit`}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        searchKey="title"
        searchValue={search}
        onSearchChange={setSearch}
        onAiCreate={() => setAiOpen(true)}
        statsSlot={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {projectStats.map((s) => (
              <StatsCard key={s.label} {...s} />
            ))}
          </div>
        }
      />
      <AiCreateModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        entityLabel="Proje"
        onGenerated={handleAiGenerated}
      />
    </>
  );
}
