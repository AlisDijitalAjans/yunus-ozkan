"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import { projects } from "@/data/projects";

export default function AdminProjelerPage() {
  const [search, setSearch] = useState("");

  const data = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    location: p.location,
  }));

  return (
    <DataTable
      title="Projeler"
      description="Projelerinizi yönetin, düzenleyin veya yeni proje ekleyin."
      columns={[
        {
          key: "title",
          label: "Proje Adı",
          render: (val) => (
            <span className="text-gray-900 text-sm font-medium">
              {String(val)}
            </span>
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
          hidden: "hidden md:table-cell",
          render: (val) => (
            <span className="text-gray-500 text-sm">{String(val)}</span>
          ),
        },
      ]}
      data={data}
      newHref="/admin/projeler/new"
      editHref={(row) => `/admin/projeler/${row.id}/edit`}
      onDelete={(row) => alert(`Silme: ${row.title}`)}
      searchKey="title"
      searchValue={search}
      onSearchChange={setSearch}
    />
  );
}
