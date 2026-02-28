import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// ─── Helper ───
function jsonParse(val, fallback) {
  if (!val || val === "") return fallback;
  try { return JSON.parse(String(val)); } catch { return fallback; }
}

async function main() {
  console.log("🔄 Turso veritabanına bağlanılıyor...");
  console.log("   URL:", process.env.TURSO_DATABASE_URL);

  // 1. Tabloları oluştur
  console.log("\n📦 Tablolar oluşturuluyor...");
  await db.batch([
    `CREATE TABLE IF NOT EXISTS blog_posts (
      slug             TEXT PRIMARY KEY,
      title            TEXT NOT NULL,
      excerpt          TEXT NOT NULL,
      image            TEXT NOT NULL,
      date             TEXT NOT NULL,
      category         TEXT NOT NULL,
      reading_time     TEXT NOT NULL DEFAULT '5 dk okuma',
      author           TEXT NOT NULL DEFAULT 'Yunus Özkan İnşaat Ekibi',
      sections         TEXT NOT NULL DEFAULT '[]',
      ai_analysis      TEXT NOT NULL DEFAULT '{}',
      faqs             TEXT DEFAULT '[]',
      html_content     TEXT DEFAULT '',
      focus_keyword    TEXT DEFAULT '',
      status           TEXT NOT NULL DEFAULT 'published',
      meta_title       TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS services (
      id               TEXT PRIMARY KEY,
      title            TEXT NOT NULL,
      "desc"           TEXT NOT NULL,
      image            TEXT NOT NULL,
      features         TEXT NOT NULL DEFAULT '[]',
      media_type       TEXT DEFAULT NULL,
      html_content     TEXT DEFAULT '',
      faqs             TEXT DEFAULT '[]',
      focus_keyword    TEXT DEFAULT '',
      status           TEXT NOT NULL DEFAULT 'published',
      meta_title       TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      slug             TEXT DEFAULT '',
      sort_order       INTEGER NOT NULL DEFAULT 0,
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS projects (
      id               TEXT PRIMARY KEY,
      title            TEXT NOT NULL,
      video            TEXT NOT NULL DEFAULT '',
      image            TEXT DEFAULT '',
      description      TEXT NOT NULL,
      category         TEXT NOT NULL,
      location         TEXT NOT NULL DEFAULT 'Kayseri',
      html_content     TEXT DEFAULT '',
      faqs             TEXT DEFAULT '[]',
      focus_keyword    TEXT DEFAULT '',
      status           TEXT NOT NULL DEFAULT 'published',
      meta_title       TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      slug             TEXT DEFAULT '',
      sort_order       INTEGER NOT NULL DEFAULT 0,
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS gallery (
      id               TEXT PRIMARY KEY,
      src              TEXT NOT NULL,
      title            TEXT NOT NULL,
      category         TEXT NOT NULL,
      sort_order       INTEGER NOT NULL DEFAULT 0,
      created_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
  ]);
  console.log("   ✅ 4 tablo oluşturuldu");

  // 2. Statik verileri import et (ts dosyalarını dinamik yükleyemeyiz, inline tanımlayacağız)
  // Blog posts
  const blogPosts = [
    {
      slug: "istinat-duvari-yapiminda-dikkat-edilmesi-gerekenler",
      title: "İstinat Duvarı Yapımında Dikkat Edilmesi Gerekenler",
      excerpt: "İstinat duvarı yapımında zemin etüdünden malzeme seçimine kadar dikkat edilmesi gereken kritik noktaları ele alıyoruz.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      date: "15 Şubat 2026",
      category: "İnşaat",
      readingTime: "8 dk okuma",
      author: "Yunus Özkan İnşaat Ekibi",
    },
    {
      slug: "arazi-tesviye-rehberi",
      title: "Arazi Tesviye İşleri: Kapsamlı Rehber",
      excerpt: "Arazi tesviye süreçlerini, kullanılan ekipmanları ve profesyonel tesviye hizmetinin önemini açıklıyoruz.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      date: "10 Şubat 2026",
      category: "Arazi",
      readingTime: "6 dk okuma",
      author: "Yunus Özkan İnşaat Ekibi",
    },
    {
      slug: "hafriyat-isleri-guvenlik-rehberi",
      title: "Hafriyat İşlerinde Güvenlik: Temel Kurallar",
      excerpt: "Hafriyat ve kazı işlerinde uyulması gereken güvenlik kuralları ve iş kazalarını önleme yöntemlerini ele alıyoruz.",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200&q=80",
      date: "5 Şubat 2026",
      category: "İş Güvenliği",
      readingTime: "7 dk okuma",
      author: "Yunus Özkan İnşaat Ekibi",
    },
    {
      slug: "drenaj-sistemi-tasarimi",
      title: "Etkili Drenaj Sistemi Tasarımı",
      excerpt: "Su yönetiminin inşaat projelerindeki önemini ve doğru drenaj sistemi tasarım ilkelerini inceliyoruz.",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80",
      date: "1 Şubat 2026",
      category: "Altyapı",
      readingTime: "5 dk okuma",
      author: "Yunus Özkan İnşaat Ekibi",
    },
    {
      slug: "zemin-iyilestirme-yontemleri",
      title: "Zemin İyileştirme Yöntemleri ve Uygulamaları",
      excerpt: "Zayıf zeminlerde uygulanabilecek iyileştirme tekniklerini ve pratik çözüm yollarını ele alıyoruz.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
      date: "25 Ocak 2026",
      category: "Geoteknik",
      readingTime: "9 dk okuma",
      author: "Yunus Özkan İnşaat Ekibi",
    },
    {
      slug: "kayseri-insaat-sektoru-2026",
      title: "Kayseri İnşaat Sektörü: 2026 Trendleri",
      excerpt: "Kayseri'de inşaat sektörünün gelecek vizyonu, yeni projeler ve yatırım fırsatlarını değerlendiriyoruz.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      date: "20 Ocak 2026",
      category: "Sektör",
      readingTime: "6 dk okuma",
      author: "Yunus Özkan İnşaat Ekibi",
    },
  ];

  const services = [
    { id: "1", title: "İstinat Duvarları", desc: "Toprak kaymasını önleyen, mühendislik hesaplarına dayalı güçlendirilmiş betonarme istinat duvarı sistemleri.", image: "/hizmet-istinat.jpg", features: ["Betonarme istinat duvarı yapımı","Zemin etüdü ve analiz","Drenaj sistemi entegrasyonu","Depreme dayanıklı tasarım"], mediaType: null, htmlContent: `<h2>İstinat Duvarı Hizmetimiz</h2><p>Toprak kaymasını önlemek ve arazinin güvenli kullanımını sağlamak amacıyla mühendislik hesaplarına dayalı betonarme istinat duvarı sistemleri inşa ediyoruz.</p><h2>Hizmet Kapsamı</h2><ul><li>Zemin etüdü ve mühendislik analizi</li><li>Betonarme konsol ve ağırlık tipi istinat duvarı</li><li>Arka dolgu drenaj sistemi entegrasyonu</li><li>Deprem yönetmeliğine uygun tasarım</li></ul><p>10 yılı aşkın deneyimimizle Kayseri ve çevresinde onlarca başarılı istinat duvarı projesi tamamladık.</p>`, faqs: [{ question: "İstinat duvarı hangi durumlarda gereklidir?", answer: "Eğimli arazilerde toprak kaymasını önlemek, yol kenarlarında şev stabilitesi sağlamak ve temel kazılarında destek oluşturmak için istinat duvarı gereklidir." }, { question: "İstinat duvarı yapımı ne kadar sürer?", answer: "Duvar boyutu ve zemin koşullarına bağlı olarak küçük projeler 2-3 hafta, büyük projeler 2-3 ay sürebilir." }] },
    { id: "2", title: "Arazi Düzenleme & Tesviye", desc: "GPS destekli modern ekipmanlarla hassas arazi düzenleme ve tesviye hizmetleri.", image: "/hizmet-arazi.jpg", features: ["GPS destekli hassas tesviye","Kazı-dolgu dengesi hesaplama","Kompaksiyon ve zemin iyileştirme","Eğim ve kot ayarlama"], mediaType: null, htmlContent: `<h2>Arazi Tesviye Hizmetimiz</h2><p>GPS destekli modern iş makineleri ile milimetrik hassasiyette arazi düzenleme ve tesviye hizmeti sunuyoruz.</p><h2>Neden GPS Destekli Tesviye?</h2><p>Geleneksel yöntemlere göre çok daha hassas, hızlı ve maliyet etkin sonuçlar elde edilir.</p><ul><li>Milimetrik hassasiyet</li><li>Hızlı çalışma süresi</li><li>Kazı-dolgu optimizasyonu</li><li>Dijital raporlama</li></ul>`, faqs: [{ question: "Tesviye öncesi zemin etüdü gerekli midir?", answer: "Evet, doğru tesviye için önce topoğrafik harita çıkarılmalı ve zemin yapısı analiz edilmelidir." }, { question: "Minimum kaç m² alana hizmet veriyorsunuz?", answer: "Minimum alan sınırımız yoktur ancak küçük alanlarda GPS destekli sistem yerine lazer nivo ile çalışılabilir." }] },
    { id: "3", title: "Kazı & Hafriyat", desc: "Her ölçekte kazı ve hafriyat işleri. Temel kazısından yol açma çalışmalarına kadar geniş hizmet yelpazesi.", image: "/hizmet-kazi.jpg", features: ["Temel kazısı","Kanal ve hendek açma","Hafriyat nakli","Kaya kırma ve söküm"], mediaType: null, htmlContent: `<h2>Kazı & Hafriyat Hizmetimiz</h2><p>Temel kazısından yol açma çalışmalarına, kanal açmadan hafriyat nakline kadar her ölçekte hizmet veriyoruz.</p><h2>Ekipman Parkımız</h2><ul><li>Ekskavatörler (14-30 ton)</li><li>Dozerler</li><li>Kaya kamyonları</li><li>Kırıcı ataçmanları</li></ul><p>Deneyimli operatör kadromuz ve modern makine parkımız ile güvenli ve hızlı çalışma garantisi sunuyoruz.</p>`, faqs: [{ question: "Hafriyat nakli de dahil midir?", answer: "Evet, kazı sonrası hafriyat nakli hizmetimize dahildir." }, { question: "Kaya zeminde çalışabiliyor musunuz?", answer: "Evet, kırıcı ataçmanlı ekskavatörlerimiz ile kaya zeminde de etkili kazı yapabiliyoruz." }] },
    { id: "4", title: "Drenaj Sistemleri", desc: "Yüzey ve yer altı drenaj çözümleri. Su baskınlarına karşı etkin koruma sistemleri.", image: "/hizmet-drenaj.mp4", features: ["Yer altı drenaj borusu döşeme","Yüzey drenaj kanalları","Rögar ve baca yapımı","Su tahliye sistemleri"], mediaType: "video", htmlContent: `<h2>Drenaj Sistemi Hizmetimiz</h2><p>Yüzey ve yer altı drenaj çözümleri ile yapılarınızı su baskınlarından koruyoruz.</p><h2>Uygulama Alanları</h2><ul><li>İstinat duvarı arka drenajı</li><li>Bodrum kat su yalıtımı</li><li>Bahçe ve parsel drenajı</li><li>Yol ve otopark drenajı</li></ul>`, faqs: [{ question: "Mevcut bir yapıya drenaj sistemi eklenebilir mi?", answer: "Evet, mevcut yapılara da retroaktif drenaj sistemi uygulanabilir." }, { question: "Drenaj sistemi garantisi var mı?", answer: "Tüm drenaj çalışmalarımız 2 yıl işçilik garantisi ile sunulmaktadır." }] },
    { id: "5", title: "Dolgu & Stabilizasyon", desc: "Kontrollü dolgu çalışmaları ve zemin stabilizasyonu. Sıkıştırma testleri ile kalite güvencesi.", image: "/hizmet-dolgu.jpg", features: ["Kontrollü dolgu yapımı","Zemin stabilizasyonu","Sıkıştırma testleri","Geotekstil uygulama"], mediaType: null, htmlContent: `<h2>Dolgu & Stabilizasyon Hizmetimiz</h2><p>Kontrollü dolgu çalışmaları ve zemin stabilizasyonu ile yapılarınızın sağlam bir temel üzerinde yükselmesini sağlıyoruz.</p><h2>Kalite Kontrol</h2><p>Her dolgu katmanında sıkıştırma testleri yapılarak Proctor değerinin %95 üzerine ulaşılması hedeflenir.</p>`, faqs: [{ question: "Sıkıştırma kalitesi nasıl ölçülür?", answer: "Kum konisi ve nükleer yoğunluk ölçer ile her katmanda sıkıştırma testi yapılır." }] },
    { id: "6", title: "Taş Ev Yapımı", desc: "Geleneksel taş işçiliği ile modern mühendislik tekniklerini buluşturan taş ev projeleri.", image: "/hizmet-tasev.jpg", features: ["Doğal taş duvar örme","Betonarme iskelet üzeri taş kaplama","Restorasyon çalışmaları","Taş seçimi ve tedarik"], mediaType: null, htmlContent: `<h2>Taş Ev Yapımı Hizmetimiz</h2><p>Geleneksel Anadolu taş işçiliğini modern mühendislik teknikleriyle buluşturarak estetik ve dayanıklı taş evler inşa ediyoruz.</p><h2>Yöntemimiz</h2><p>Betonarme iskelet üzerine doğal taş kaplama yöntemi ile hem yapısal güvenliği hem de otantik görünümü bir arada sunuyoruz.</p>`, faqs: [{ question: "Taş ev yapımı normal yapıdan daha mı pahalıdır?", answer: "Taş malzeme ve işçilik maliyeti nedeniyle geleneksel yapıya göre %20-40 arası ek maliyet oluşabilir." }, { question: "Hangi taş türlerini kullanıyorsunuz?", answer: "Bölgesel olarak Kayseri ve çevresinden temin edilen bazalt, andezit ve kireçtaşı kullanıyoruz." }] },
    { id: "7", title: "Parke Taşı Döşeme", desc: "Yaya yolları, otoparklar ve bahçe düzenlemeleri için profesyonel parke taşı döşeme hizmeti.", image: "/hizmet-parke.jpg", features: ["Alt yapı hazırlığı ve sıkıştırma","Farklı desen seçenekleri","Bordür ve kenar taşı uygulaması","Derzleme ve son işlemler"], mediaType: null, htmlContent: `<h2>Parke Taşı Döşeme Hizmetimiz</h2><p>Yaya yolları, otoparklar ve bahçe düzenlemeleri için profesyonel parke taşı döşeme hizmeti sunuyoruz.</p><h2>Çalışma Süreci</h2><ul><li>Alt zemin hazırlığı ve sıkıştırma</li><li>Kum yatağı serilmesi</li><li>Desen seçimi ve döşeme</li><li>Bordür uygulaması</li><li>Derzleme ve kompaktör ile sabitleme</li></ul>`, faqs: [{ question: "Hangi desen seçenekleri mevcut?", answer: "Balık sırtı, enine diziliş, rastgele desen ve kilitli desen gibi farklı seçenekler sunuyoruz." }, { question: "Parke taşı döşeme m² fiyatı nedir?", answer: "Fiyat, altyapı durumu, seçilen taş türü ve desen karmaşıklığına göre değişir. Ücretsiz keşif sonrası detaylı fiyat teklifi sunuyoruz." }] },
  ];

  const projects = [
    { id: "1", title: "Dora Sitesi – İstinat Duvarı", video: "/dora-dikey.mp4", description: "Dora Sitesi için yapılan istinat duvarı projesi. Toprak kaymasını önleyen güçlendirilmiş betonarme duvar sistemi uygulandı.", category: "İstinat Duvarı", location: "Kayseri", htmlContent: `<h2>Proje Detayı</h2><p>Dora Sitesi'nin çevresindeki eğimli arazide toprak kayması riski nedeniyle güçlendirilmiş betonarme istinat duvarı sistemi uygulandı.</p><h2>Uygulanan Teknikler</h2><ul><li>Zemin etüdü ve sondaj çalışması</li><li>Betonarme temel ve gövde dökümü</li><li>Arka dolgu drenaj sistemi</li><li>Geotekstil filtre tabakası</li></ul><h2>Sonuç</h2><p>Proje başarıyla tamamlanmış olup, duvar sistemi deprem yönetmeliğine uygun şekilde inşa edilmiştir.</p>`, faqs: [{ question: "Proje ne kadar sürede tamamlandı?", answer: "Zemin etüdü dahil toplam 45 iş günü içerisinde tamamlandı." }, { question: "Hangi tür istinat duvarı tercih edildi?", answer: "Betonarme konsol tipi istinat duvarı tercih edildi." }] },
    { id: "2", title: "His Dora – İstinat & Peyzaj", video: "/his-dora-dikey.mp4", description: "His Dora projesi kapsamında istinat duvarı ve çevre düzenleme çalışmaları gerçekleştirildi.", category: "İstinat Duvarı", location: "Kayseri", htmlContent: `<h2>Proje Kapsamı</h2><p>His Dora projesi, istinat duvarı yapımı ile birlikte kapsamlı çevre düzenleme ve peyzaj çalışmalarını içermektedir.</p><h2>Peyzaj Çalışması</h2><ul><li>Kademeli yeşillendirme</li><li>Yürüyüş yolları düzenleme</li><li>Aydınlatma altyapısı</li><li>Sulama sistemi döşemesi</li></ul>`, faqs: [{ question: "Peyzaj çalışması istinat duvarıyla birlikte mi yapıldı?", answer: "Evet, istinat duvarı tamamlandıktan sonra aynı proje kapsamında peyzaj düzenlemesi gerçekleştirildi." }] },
    { id: "3", title: "Okandan – Arazi Tesviye", video: "/okandan-dikey.mp4", description: "Okandan bölgesinde geniş çaplı arazi tesviye ve düzenleme çalışması yapıldı.", category: "Tesviye", location: "Kayseri", htmlContent: `<h2>Proje Detayı</h2><p>Okandan bölgesinde yaklaşık 15.000 m² alanda arazi tesviye çalışması gerçekleştirildi.</p><h2>Çalışma Aşamaları</h2><ul><li>Topoğrafik harita çıkarılması</li><li>Kazı-dolgu dengesi hesaplama</li><li>GPS destekli dozer ile tesviye</li><li>Kompaktör ile sıkıştırma</li></ul>`, faqs: [{ question: "Tesviye alanı ne kadar büyüktü?", answer: "Toplam 15.000 m² alan tesviye edildi." }, { question: "GPS destekli tesviye neden tercih edildi?", answer: "Geniş alanda milimetrik hassasiyet gerektiğinden GPS destekli sistemler kullanıldı." }] },
    { id: "4", title: "Hafriyat Projesi", video: "/hafriyat-dikey.mp4", description: "Büyük ölçekli hafriyat ve kazı çalışması. Modern iş makineleri ile güvenli ve hızlı operasyon.", category: "Hafriyat", location: "Kayseri", htmlContent: `<h2>Proje Detayı</h2><p>Büyük ölçekli bir hafriyat projesi kapsamında yaklaşık 25.000 m³ toprak kazısı ve nakli gerçekleştirildi.</p><h2>Kullanılan Ekipmanlar</h2><ul><li>CAT 320 Ekskavatör</li><li>Volvo A30 Kaya kamyonu</li><li>Komatsu D65 Dozer</li><li>Bomag BW 213 Silindir</li></ul>`, faqs: [{ question: "Toplam ne kadar toprak taşındı?", answer: "Proje süresince yaklaşık 25.000 m³ toprak kazılarak nakledildi." }, { question: "İş güvenliği nasıl sağlandı?", answer: "Günlük güvenlik brifingleri, KKD kontrolü ile iş güvenliği sağlandı." }] },
  ];

  const galleryItems = [
    { id: "1", src: "/galeri-1.jpg", title: "İstinat Duvarı Projesi", category: "istinat" },
    { id: "2", src: "/galeri-2.jpg", title: "İstinat Duvarı Detay", category: "istinat" },
    { id: "3", src: "/galeri-3.jpg", title: "Hafriyat Çalışması", category: "hafriyat" },
    { id: "4", src: "/galeri-4.jpg", title: "Arazi Tesviye", category: "arazi" },
    { id: "5", src: "/galeri-5.jpg", title: "Drenaj Sistemi", category: "drenaj" },
    { id: "6", src: "/galeri-6.jpg", title: "İstinat Duvarı", category: "istinat" },
    { id: "7", src: "/galeri-7.jpg", title: "Hafriyat Projesi", category: "hafriyat" },
    { id: "8", src: "/galeri-8.jpg", title: "Arazi Düzenleme", category: "arazi" },
    { id: "9", src: "/galeri-9.jpg", title: "Tesviye Çalışması", category: "arazi" },
    { id: "10", src: "/galeri-10.jpg", title: "İstinat Duvarı Yapımı", category: "istinat" },
    { id: "11", src: "/galeri-11.jpg", title: "Hafriyat Operasyonu", category: "hafriyat" },
    { id: "12", src: "/galeri-12.jpg", title: "Peyzaj Çalışması", category: "diger" },
    { id: "13", src: "/galeri-13.jpg", title: "Parke Taşı Döşeme", category: "diger" },
  ];

  // 3. Seed blog posts
  const existingBlogs = await db.execute("SELECT COUNT(*) as c FROM blog_posts");
  const blogCount = Number(existingBlogs.rows[0].c);
  if (blogCount === 0) {
    console.log("\n📝 Blog yazıları ekleniyor...");
    for (const post of blogPosts) {
      await db.execute({
        sql: `INSERT INTO blog_posts (slug, title, excerpt, image, date, category, reading_time, author, sections, ai_analysis, faqs, html_content, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, '[]', '{}', '[]', '', 'published')`,
        args: [post.slug, post.title, post.excerpt, post.image, post.date, post.category, post.readingTime, post.author],
      });
    }
    console.log(`   ✅ ${blogPosts.length} blog yazısı eklendi`);
  } else {
    console.log(`\n📝 Blog: ${blogCount} kayıt zaten mevcut, atlanıyor`);
  }

  // 4. Seed services
  const existingServices = await db.execute("SELECT COUNT(*) as c FROM services");
  const svcCount = Number(existingServices.rows[0].c);
  if (svcCount === 0) {
    console.log("\n🔧 Hizmetler ekleniyor...");
    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      await db.execute({
        sql: `INSERT INTO services (id, title, "desc", image, features, media_type, html_content, faqs, status, sort_order)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`,
        args: [s.id, s.title, s.desc, s.image, JSON.stringify(s.features), s.mediaType || null, s.htmlContent || "", JSON.stringify(s.faqs || []), i],
      });
    }
    console.log(`   ✅ ${services.length} hizmet eklendi`);
  } else {
    console.log(`\n🔧 Hizmetler: ${svcCount} kayıt zaten mevcut, atlanıyor`);
  }

  // 5. Seed projects
  const existingProjects = await db.execute("SELECT COUNT(*) as c FROM projects");
  const projCount = Number(existingProjects.rows[0].c);
  if (projCount === 0) {
    console.log("\n🏗️  Projeler ekleniyor...");
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      await db.execute({
        sql: `INSERT INTO projects (id, title, video, description, category, location, html_content, faqs, status, sort_order)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`,
        args: [p.id, p.title, p.video, p.description, p.category, p.location, p.htmlContent || "", JSON.stringify(p.faqs || []), i],
      });
    }
    console.log(`   ✅ ${projects.length} proje eklendi`);
  } else {
    console.log(`\n🏗️  Projeler: ${projCount} kayıt zaten mevcut, atlanıyor`);
  }

  // 6. Seed gallery
  const existingGallery = await db.execute("SELECT COUNT(*) as c FROM gallery");
  const galCount = Number(existingGallery.rows[0].c);
  if (galCount === 0) {
    console.log("\n🖼️  Galeri öğeleri ekleniyor...");
    for (let i = 0; i < galleryItems.length; i++) {
      const g = galleryItems[i];
      await db.execute({
        sql: `INSERT INTO gallery (id, src, title, category, sort_order) VALUES (?, ?, ?, ?, ?)`,
        args: [g.id, g.src, g.title, g.category, i],
      });
    }
    console.log(`   ✅ ${galleryItems.length} galeri öğesi eklendi`);
  } else {
    console.log(`\n🖼️  Galeri: ${galCount} kayıt zaten mevcut, atlanıyor`);
  }

  // 7. Verify
  console.log("\n📊 Doğrulama:");
  const counts = await Promise.all([
    db.execute("SELECT COUNT(*) as c FROM blog_posts"),
    db.execute("SELECT COUNT(*) as c FROM services"),
    db.execute("SELECT COUNT(*) as c FROM projects"),
    db.execute("SELECT COUNT(*) as c FROM gallery"),
  ]);
  console.log(`   Blog:     ${counts[0].rows[0].c} kayıt`);
  console.log(`   Hizmet:   ${counts[1].rows[0].c} kayıt`);
  console.log(`   Proje:    ${counts[2].rows[0].c} kayıt`);
  console.log(`   Galeri:   ${counts[3].rows[0].c} kayıt`);

  console.log("\n✅ Migration tamamlandı!");
}

main().catch((err) => {
  console.error("❌ Migration hatası:", err);
  process.exit(1);
});
