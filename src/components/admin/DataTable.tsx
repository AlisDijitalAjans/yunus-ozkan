"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

interface Column {
  key: string;
  label: string;
  hidden?: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  description: string;
  columns: Column[];
  data: Record<string, unknown>[];
  newHref: string;
  editHref: (row: Record<string, unknown>) => string;
  onDelete?: (row: Record<string, unknown>) => void;
  searchKey?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function DataTable({
  title,
  description,
  columns,
  data,
  newHref,
  editHref,
  onDelete,
  searchKey,
  searchValue,
  onSearchChange,
}: DataTableProps) {
  const filtered =
    searchKey && searchValue
      ? data.filter((row) =>
          String(row[searchKey])
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      : data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        <Link
          href={newHref}
          className="btn-primary inline-flex items-center gap-2 text-sm shrink-0 self-start"
        >
          <Plus className="size-4" />
          Yeni Ekle
        </Link>
      </div>

      {/* Search */}
      {onSearchChange && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={searchValue || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary-gold/50 focus:ring-1 focus:ring-primary-gold/20 transition-colors"
          />
        </div>
      )}

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-5 py-3 ${col.hidden || ""}`}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="text-right text-gray-500 text-xs font-medium uppercase tracking-wider px-5 py-3">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    Kayıt bulunamadı.
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-5 py-3.5 ${col.hidden || ""}`}
                      >
                        {col.render ? (
                          col.render(row[col.key], row)
                        ) : (
                          <span className="text-gray-900 text-sm">
                            {String(row[col.key] ?? "")}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={editHref(row)}
                          className="p-1.5 rounded-lg hover:bg-primary-gold/10 text-gray-400 hover:text-primary-gold transition-colors"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
