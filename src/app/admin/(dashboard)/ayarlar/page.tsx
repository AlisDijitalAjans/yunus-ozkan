"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Shield,
  Building2,
  Phone,
  Mail,
  MapPin,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const licenseStart = new Date("2026-02-28");
const licenseEnd = new Date(licenseStart);
licenseEnd.setDate(licenseEnd.getDate() + 365);
const now = new Date();
const totalDays = 365;
const msLeft = licenseEnd.getTime() - now.getTime();
const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
const progressPct = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));

export default function AyarlarPage() {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const s = data.settings || {};
        setCompanyName(s.company_name || "Yunus Özkan İnşaat");
        setPhone(s.phone || "0533 771 11 82");
        setPhoneRaw(s.phone_raw || "905337711182");
        setEmail(s.email || "info@yunusozkaninsaat.com");
        setAddress(s.address || "Kayseri, Türkiye");
      })
      .catch(() => {
        setCompanyName("Yunus Özkan İnşaat");
        setPhone("0533 771 11 82");
        setPhoneRaw("905337711182");
        setEmail("info@yunusozkaninsaat.com");
        setAddress("Kayseri, Türkiye");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          phone,
          phone_raw: phoneRaw,
          email,
          address,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 text-[#d5b36b] animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="gold-gradient p-2.5 rounded-xl">
                <Settings className="size-5 text-white" />
              </div>
              Ayarlar
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Panel ayarlarını ve lisans bilgilerinizi yönetin.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <Save className="size-4" />
            )}
            {saving ? "Kaydediliyor..." : saved ? "Kaydedildi" : "Kaydet"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Firma Bilgileri Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="gold-gradient p-2 rounded-lg">
                <Building2 className="size-4 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Firma Bilgileri</h2>
                <p className="text-gray-400 text-xs">Genel firma ayarları</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-sm font-medium block mb-1.5">
                  Firma Adı
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#d5b36b]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-500 text-sm font-medium block mb-1.5">
                  Tel No
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#d5b36b]/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-sm font-medium block mb-1.5">
                  WhatsApp / Ham Numara
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={phoneRaw}
                    onChange={(e) => setPhoneRaw(e.target.value)}
                    placeholder="905337711182"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#d5b36b]/50 transition-colors"
                  />
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  WhatsApp ve tel linkleri için kullanılır (ör: 905337711182)
                </p>
              </div>
              <div>
                <label className="text-gray-500 text-sm font-medium block mb-1.5">
                  Mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#d5b36b]/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-sm font-medium block mb-1.5">
                  Adres
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 size-4 text-gray-400" />
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#d5b36b]/50 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* License Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="gold-gradient p-2 rounded-lg">
                <Shield className="size-4 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Lisans Bilgileri</h2>
                <p className="text-gray-400 text-xs">Abonelik durumunuz</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Plan</span>
                <span className="text-[#d5b36b] font-semibold text-sm">
                  Pro Lisans
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Başlangıç</span>
                <span className="text-gray-900 text-sm">
                  {licenseStart.toLocaleDateString("tr-TR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Bitiş</span>
                <span className="text-gray-900 text-sm">
                  {licenseEnd.toLocaleDateString("tr-TR")}
                </span>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-semibold text-sm">
                    {daysLeft} gün kaldı
                  </span>
                  <span className="text-gray-400 text-xs">
                    {totalDays} günden
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPct}%`,
                      background:
                        daysLeft > 90
                          ? "linear-gradient(90deg, #d5b36b, #c9a961)"
                          : daysLeft > 30
                            ? "linear-gradient(90deg, #f59e0b, #d97706)"
                            : "linear-gradient(90deg, #ef4444, #dc2626)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
