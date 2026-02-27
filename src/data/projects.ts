export interface ProjectFaqItem {
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  title: string;
  video: string;
  description: string;
  category: string;
  location: string;
  htmlContent?: string;
  faqs?: ProjectFaqItem[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Dora Sitesi – İstinat Duvarı",
    video: "/dora-dikey.mp4",
    description:
      "Dora Sitesi için yapılan istinat duvarı projesi. Toprak kaymasını önleyen güçlendirilmiş betonarme duvar sistemi uygulandı.",
    category: "İstinat Duvarı",
    location: "Kayseri",
    htmlContent: `<h2>Proje Detayı</h2><p>Dora Sitesi'nin çevresindeki eğimli arazide toprak kayması riski nedeniyle güçlendirilmiş betonarme istinat duvarı sistemi uygulandı.</p><p>Proje kapsamında önce kapsamlı bir zemin etüdü gerçekleştirildi. Ardından derinlik ve yük hesaplamalarına göre betonarme istinat duvarı projelendirildi.</p><h2>Uygulanan Teknikler</h2><ul><li>Zemin etüdü ve sondaj çalışması</li><li>Betonarme temel ve gövde dökümü</li><li>Arka dolgu drenaj sistemi</li><li>Geotekstil filtre tabakası</li></ul><h2>Sonuç</h2><p>Proje başarıyla tamamlanmış olup, duvar sistemi deprem yönetmeliğine uygun şekilde inşa edilmiştir. Drenaj sistemi sayesinde hidrostatik basınç riski minimize edilmiştir.</p>`,
    faqs: [
      {
        question: "Proje ne kadar sürede tamamlandı?",
        answer: "Zemin etüdü dahil toplam 45 iş günü içerisinde tamamlandı.",
      },
      {
        question: "Hangi tür istinat duvarı tercih edildi?",
        answer: "Betonarme konsol tipi istinat duvarı tercih edildi. Zemin koşulları ve yükseklik değerlerine göre en uygun çözüm bu tip olarak belirlendi.",
      },
    ],
  },
  {
    id: "2",
    title: "His Dora – İstinat & Peyzaj",
    video: "/his-dora-dikey.mp4",
    description:
      "His Dora projesi kapsamında istinat duvarı ve çevre düzenleme çalışmaları gerçekleştirildi.",
    category: "İstinat Duvarı",
    location: "Kayseri",
    htmlContent: `<h2>Proje Kapsamı</h2><p>His Dora projesi, istinat duvarı yapımı ile birlikte kapsamlı çevre düzenleme ve peyzaj çalışmalarını içermektedir.</p><h2>İstinat Duvarı</h2><p>Arazinin eğim yapısına uygun olarak kademeli istinat duvarı sistemi tasarlandı. Her kademe arasında yeşillendirme alanları bırakıldı.</p><h2>Peyzaj Çalışması</h2><ul><li>Kademeli yeşillendirme</li><li>Yürüyüş yolları düzenleme</li><li>Aydınlatma altyapısı</li><li>Sulama sistemi döşemesi</li></ul>`,
    faqs: [
      {
        question: "Peyzaj çalışması istinat duvarıyla birlikte mi yapıldı?",
        answer: "Evet, istinat duvarı tamamlandıktan sonra aynı proje kapsamında peyzaj düzenlemesi gerçekleştirildi.",
      },
    ],
  },
  {
    id: "3",
    title: "Okandan – Arazi Tesviye",
    video: "/okandan-dikey.mp4",
    description:
      "Okandan bölgesinde geniş çaplı arazi tesviye ve düzenleme çalışması yapıldı.",
    category: "Tesviye",
    location: "Kayseri",
    htmlContent: `<h2>Proje Detayı</h2><p>Okandan bölgesinde yaklaşık 15.000 m² alanda arazi tesviye çalışması gerçekleştirildi. GPS destekli iş makineleri kullanılarak milimetrik hassasiyette tesviye sağlandı.</p><h2>Çalışma Aşamaları</h2><ul><li>Topoğrafik harita çıkarılması</li><li>Kazı-dolgu dengesi hesaplama</li><li>GPS destekli dozer ile tesviye</li><li>Kompaktör ile sıkıştırma</li><li>Kalite kontrol testleri</li></ul><h2>Sonuç</h2><p>Tesviye çalışması Proctor değerinin %96'sına ulaşılarak tamamlandı. Yüzey eğimi %2 olarak ayarlanarak drenaj uyumluluğu sağlandı.</p>`,
    faqs: [
      {
        question: "Tesviye alanı ne kadar büyüktü?",
        answer: "Toplam 15.000 m² alan tesviye edildi.",
      },
      {
        question: "GPS destekli tesviye neden tercih edildi?",
        answer: "Geniş alanda milimetrik hassasiyet gerektiğinden GPS destekli sistemler kullanıldı. Bu sayede hata payı minimuma indirildi.",
      },
    ],
  },
  {
    id: "4",
    title: "Hafriyat Projesi",
    video: "/hafriyat-dikey.mp4",
    description:
      "Büyük ölçekli hafriyat ve kazı çalışması. Modern iş makineleri ile güvenli ve hızlı operasyon.",
    category: "Hafriyat",
    location: "Kayseri",
    htmlContent: `<h2>Proje Detayı</h2><p>Büyük ölçekli bir hafriyat projesi kapsamında yaklaşık 25.000 m³ toprak kazısı ve nakli gerçekleştirildi.</p><h2>Kullanılan Ekipmanlar</h2><ul><li>CAT 320 Ekskavatör</li><li>Volvo A30 Kaya kamyonu</li><li>Komatsu D65 Dozer</li><li>Bomag BW 213 Silindir</li></ul><h2>Güvenlik Önlemleri</h2><p>Tüm çalışma boyunca iş güvenliği protokollerine eksiksiz uyuldu. Günlük güvenlik brifingleri yapıldı, tüm personel KKD kullandı.</p>`,
    faqs: [
      {
        question: "Toplam ne kadar toprak taşındı?",
        answer: "Proje süresince yaklaşık 25.000 m³ toprak kazılarak nakledildi.",
      },
      {
        question: "İş güvenliği nasıl sağlandı?",
        answer: "Günlük güvenlik brifingleri, KKD kontrolü, makine bakım formları ve gözcü sistemi ile iş güvenliği sağlandı. Proje süresince sıfır kaza hedefine ulaşıldı.",
      },
    ],
  },
];
