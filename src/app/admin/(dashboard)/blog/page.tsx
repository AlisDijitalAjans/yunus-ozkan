"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import { blogPosts } from "@/data/blogPosts";

export default function AdminBlogPage() {
  const [search, setSearch] = useState("");

  const data = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    readingTime: post.readingTime,
  }));

  return (
    <DataTable
      title="Blog Yazıları"
      description="Blog yazılarınızı yönetin, düzenleyin veya yeni yazı ekleyin."
      columns={[
        {
          key: "title",
          label: "Başlık",
          render: (val) => (
            <span className="text-gray-900 text-sm font-medium line-clamp-1">
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
          key: "date",
          label: "Tarih",
          hidden: "hidden md:table-cell",
          render: (val) => (
            <span className="text-gray-500 text-sm">{String(val)}</span>
          ),
        },
      ]}
      data={data}
      newHref="/admin/blog/new"
      editHref={(row) => `/admin/blog/${row.slug}/edit`}
      onDelete={(row) => alert(`Silme: ${row.title}`)}
      searchKey="title"
      searchValue={search}
      onSearchChange={setSearch}
    />
  );
}
