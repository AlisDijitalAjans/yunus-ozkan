"use client";

import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 flex items-center px-5 lg:px-8">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-400 hover:text-gray-700"
      >
        <Menu className="size-5" />
      </button>
    </header>
  );
}
