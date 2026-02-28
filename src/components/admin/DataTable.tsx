"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Sparkles,
  MoreHorizontal,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

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
  onToggleStatus?: (row: Record<string, unknown>) => void;
  searchKey?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onAiCreate?: () => void;
  statsSlot?: React.ReactNode;
}

function RowActions({
  row,
  editHref,
  onDelete,
  onToggleStatus,
}: {
  row: Record<string, unknown>;
  editHref: string;
  onDelete?: (row: Record<string, unknown>) => void;
  onToggleStatus?: (row: Record<string, unknown>) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const isActive = row.status !== "passive";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <MoreHorizontal className="size-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-200 py-1 z-20">
          {onToggleStatus && (
            <button
              onClick={() => {
                onToggleStatus(row);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {isActive ? (
                <>
                  <ToggleRight className="size-4 text-emerald-500" />
                  Pasife Al
                </>
              ) : (
                <>
                  <ToggleLeft className="size-4 text-gray-400" />
                  Aktife Al
                </>
              )}
            </button>
          )}
          <Link
            href={editHref}
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil className="size-4 text-blue-500" />
            Düzenle
          </Link>
          {onDelete && (
            <button
              onClick={() => {
                onDelete(row);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="size-4" />
              Sil
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function DataTable({
  title,
  description,
  columns,
  data,
  newHref,
  editHref,
  onDelete,
  onToggleStatus,
  searchKey,
  searchValue,
  onSearchChange,
  onAiCreate,
  statsSlot,
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
      {/* Stats */}
      {statsSlot}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-start">
          {onAiCreate && (
            <button
              onClick={onAiCreate}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              <Sparkles className="size-3.5" />
              AI ile Oluştur
            </button>
          )}
          <Link
            href={newHref}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
          >
            <Plus className="size-3.5" />
            Yeni Ekle
          </Link>
        </div>
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
        className="bg-white rounded-2xl overflow-hidden border border-gray-100"
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
                <th className="text-right text-gray-500 text-xs font-medium uppercase tracking-wider px-5 py-3 w-12">

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
                      <RowActions
                        row={row}
                        editHref={editHref(row)}
                        onDelete={onDelete}
                        onToggleStatus={onToggleStatus}
                      />
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
