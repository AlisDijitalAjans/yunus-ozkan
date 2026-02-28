"use client";

import { LucideIcon } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendDown?: boolean;
  chartData?: { v: number }[];
  color?: string;
}

const colorMap: Record<string, { bg: string; text: string; chart: string; gradient: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    chart: "#059669",
    gradient: "#059669",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    chart: "#2563eb",
    gradient: "#2563eb",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    chart: "#d97706",
    gradient: "#d97706",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    chart: "#7c3aed",
    gradient: "#7c3aed",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    chart: "#e11d48",
    gradient: "#e11d48",
  },
};

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  trendDown,
  chartData,
  color = "emerald",
}: StatsCardProps) {
  const c = colorMap[color] || colorMap.emerald;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 transition-all duration-300 relative overflow-hidden">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-xl ${c.bg}`}>
          <Icon className={`size-4 ${c.text}`} />
        </div>
        {trend && (
          <span
            className={`text-[11px] font-medium ${trendDown ? "text-red-500" : "text-emerald-600"}`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-500 text-xs mt-0.5">{label}</p>

      {/* Mini Chart */}
      {chartData && chartData.length > 0 && (
        <div className="absolute bottom-0 right-0 w-24 h-12 opacity-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.gradient} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={c.gradient} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={c.chart}
                strokeWidth={1.5}
                fill={`url(#grad-${color})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
