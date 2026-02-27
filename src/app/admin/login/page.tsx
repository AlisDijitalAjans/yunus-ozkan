"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn, Eye, EyeOff, Building2, Award, Users } from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Tamamlanan Proje" },
  { icon: Award, value: "10+", label: "Yıllık Deneyim" },
  { icon: Users, value: "50+", label: "Uzman Kadro" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT — Video + Overlay */}
      <div className="relative hidden lg:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/admin-login-bg.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="relative z-10 flex flex-col justify-between h-full p-10 lg:p-14">
          {/* Logo + Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/logo.png"
              alt="Yunus Özkan İnşaat"
              width={60}
              height={60}
              className="mb-4"
            />
            <h1 className="text-3xl font-bold text-white">
              Yunus Özkan <span className="text-primary-gold">İnşaat</span>
            </h1>
            <p className="text-white/60 mt-1">Yönetim Paneli</p>
          </motion.div>

          {/* Middle tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight max-w-lg">
              Güvenilir İnşaat
              <br />
              <span className="text-gradient-gold">Hizmetleri</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-md leading-relaxed">
              2015&apos;ten bu yana sektörde edindiğimiz tecrübe ve güvenle
              projelerinizi hayata geçiriyoruz.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="size-5 text-primary-gold mx-auto mb-1.5" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-theme-bg">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <div>
              <h1 className="text-xl font-bold text-theme-text">
                Yunus Özkan <span className="text-primary-gold">İnşaat</span>
              </h1>
              <p className="text-theme-text-muted text-xs">Yönetim Paneli</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-theme-text mb-1">
            Giriş Yap
          </h2>
          <p className="text-theme-text-muted text-sm mb-8">
            Yönetim paneline erişmek için bilgilerinizi girin.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-theme-text-secondary text-sm font-medium mb-1.5">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-theme-text-faint" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yunusozkan.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-theme-glass-bg border border-theme-glass-border text-theme-text placeholder:text-theme-text-faint text-sm focus:outline-none focus:border-primary-gold/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-theme-text-secondary text-sm font-medium mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-theme-text-faint" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-theme-glass-bg border border-theme-glass-border text-theme-text placeholder:text-theme-text-faint text-sm focus:outline-none focus:border-primary-gold/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-theme-text-faint hover:text-theme-text transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn className="size-4" />
              )}
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <p className="text-theme-text-faint text-xs text-center mt-8">
            &copy; {new Date().getFullYear()} Yunus Özkan İnşaat. Tüm hakları saklıdır.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
