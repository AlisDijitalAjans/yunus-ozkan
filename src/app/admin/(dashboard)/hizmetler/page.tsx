"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import { services } from "@/data/services";

export default function AdminHizmetlerPage() {
  const [search, setSearch] = useState("");

  const data = services.map((s) => ({
    id: s.id,
    title: s.title,
    desc: s.desc,
    featureCount: s.features.length,
  }));

  return (
    <DataTable
      title="Hizmetler"
      description="Hizmet alanlarınızı yönetin, düzenleyin veya yeni hizmet ekleyin."
      columns={[
        {
          key: "title",
          label: "Hizmet Adı",
          render: (val) => (
            <span className="text-gray-900 text-sm font-medium">
              {String(val)}
            </span>
          ),
        },
        {
          key: "desc",
          label: "Açıklama",
          hidden: "hidden md:table-cell",
          render: (val) => (
            <span className="text-gray-500 text-sm line-clamp-1 max-w-xs">
              {String(val)}
            </span>
          ),
        },
        {
          key: "featureCount",
          label: "Özellik",
          hidden: "hidden lg:table-cell",
          render: (val) => (
            <span className="text-gray-500 text-sm">
              {String(val)} özellik
            </span>
          ),
        },
      ]}
      data={data}
      newHref="/admin/hizmetler/new"
      editHref={(row) => `/admin/hizmetler/${row.id}/edit`}
      onDelete={(row) => alert(`Silme: ${row.title}`)}
      searchKey="title"
      searchValue={search}
      onSearchChange={setSearch}
    />
  );
}
