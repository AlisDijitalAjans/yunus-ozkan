"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "İstinat Duvarı Yapımında Dikkat Edilmesi Gerekenler",
    excerpt:
      "İstinat duvarı projelerinde zemin etüdünden malzeme seçimine kadar dikkat edilmesi gereken kritik noktaları bu yazımızda ele alıyoruz.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    date: "15 Şubat 2026",
    category: "İnşaat",
  },
  {
    title: "Hafriyat İşlerinde Güvenlik Önlemleri",
    excerpt:
      "Hafriyat ve kazı çalışmalarında iş güvenliği standartları, ekipman kontrolü ve risk değerlendirme süreçleri hakkında bilmeniz gerekenler.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    date: "8 Şubat 2026",
    category: "İş Güvenliği",
  },
  {
    title: "Arazi Düzenleme ve Tesviye İşlerinin Önemi",
    excerpt:
      "Doğru arazi düzenleme ve tesviye işleri, yapı projelerinin temelini oluşturur. Bu süreçte kullanılan teknikler ve modern ekipmanlar.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    date: "1 Şubat 2026",
    category: "Arazi",
  },
  {
    title: "Drenaj Sistemleri: Doğru Planlama ve Uygulama",
    excerpt:
      "Etkili bir drenaj sistemi, yapıların uzun ömürlü olmasını sağlar. Drenaj planlaması ve uygulama aşamalarını inceliyoruz.",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&h=600&fit=crop",
    date: "25 Ocak 2026",
    category: "Altyapı",
  },
  {
    title: "Taş Ev Yapımı: Gelenekselden Moderne",
    excerpt:
      "Doğal taş ile yapılan evler hem estetik hem de dayanıklılık açısından üstün özellikler sunar. Taş ev yapım sürecini anlatıyoruz.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    date: "18 Ocak 2026",
    category: "İnşaat",
  },
  {
    title: "Parke Taşı Döşeme: Doğru Teknikler",
    excerpt:
      "Bahçe yolları, otoparklar ve kaldırımlar için parke taşı döşeme teknikleri, malzeme seçimi ve bakım önerileri.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    date: "10 Ocak 2026",
    category: "Peyzaj",
  },
];

export default function BlogContent() {
  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass group overflow-hidden border border-transparent hover:border-primary-gold/50 transition-all duration-500 cursor-pointer rounded-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Date */}
                <div className="flex items-center gap-2 text-theme-text-muted text-sm mb-3">
                  <Calendar className="size-4" />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-lg mb-2.5 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-theme-text-muted leading-relaxed text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <span className="text-primary-gold font-semibold group-hover:translate-x-1 transition-transform duration-300 text-sm inline-flex items-center gap-1.5">
                  Devamını Oku
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
