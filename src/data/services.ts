export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  image: string;
  features: string[];
  mediaType?: "video";
  htmlContent?: string;
  faqs?: ServiceFaqItem[];
}

export const services: Service[] = [
  {
    id: "1",
    title: "İstinat Duvarları",
    desc: "Toprak kaymasını önleyen, mühendislik hesaplarına dayalı güçlendirilmiş betonarme istinat duvarı sistemleri.",
    image: "/hizmet-istinat.jpg",
    features: [
      "Betonarme istinat duvarı yapımı",
      "Zemin etüdü ve analiz",
      "Drenaj sistemi entegrasyonu",
      "Depreme dayanıklı tasarım",
    ],
    htmlContent: `<h2>İstinat Duvarı Hizmetimiz</h2><p>Toprak kaymasını önlemek ve arazinin güvenli kullanımını sağlamak amacıyla mühendislik hesaplarına dayalı betonarme istinat duvarı sistemleri inşa ediyoruz.</p><h2>Hizmet Kapsamı</h2><ul><li>Zemin etüdü ve mühendislik analizi</li><li>Betonarme konsol ve ağırlık tipi istinat duvarı</li><li>Arka dolgu drenaj sistemi entegrasyonu</li><li>Deprem yönetmeliğine uygun tasarım</li></ul><p>Deneyimli ekibimiz ile Kayseri ve çevresinde onlarca başarılı istinat duvarı projesi tamamladık.</p>`,
    faqs: [
      {
        question: "İstinat duvarı hangi durumlarda gereklidir?",
        answer: "Eğimli arazilerde toprak kaymasını önlemek, yol kenarlarında şev stabilitesi sağlamak ve temel kazılarında destek oluşturmak için istinat duvarı gereklidir.",
      },
      {
        question: "İstinat duvarı yapımı ne kadar sürer?",
        answer: "Duvar boyutu ve zemin koşullarına bağlı olarak küçük projeler 2-3 hafta, büyük projeler 2-3 ay sürebilir.",
      },
    ],
  },
  {
    id: "2",
    title: "Arazi Düzenleme & Tesviye",
    desc: "GPS destekli modern ekipmanlarla hassas arazi düzenleme ve tesviye hizmetleri.",
    image: "/hizmet-arazi.jpg",
    features: [
      "GPS destekli hassas tesviye",
      "Kazı-dolgu dengesi hesaplama",
      "Kompaksiyon ve zemin iyileştirme",
      "Eğim ve kot ayarlama",
    ],
    htmlContent: `<h2>Arazi Tesviye Hizmetimiz</h2><p>GPS destekli modern iş makineleri ile milimetrik hassasiyette arazi düzenleme ve tesviye hizmeti sunuyoruz.</p><h2>Neden GPS Destekli Tesviye?</h2><p>Geleneksel yöntemlere göre çok daha hassas, hızlı ve maliyet etkin sonuçlar elde edilir. Geniş alanlarda bile tutarlı kalite sağlanır.</p><ul><li>Milimetrik hassasiyet</li><li>Hızlı çalışma süresi</li><li>Kazı-dolgu optimizasyonu</li><li>Dijital raporlama</li></ul>`,
    faqs: [
      {
        question: "Tesviye öncesi zemin etüdü gerekli midir?",
        answer: "Evet, doğru tesviye için önce topoğrafik harita çıkarılmalı ve zemin yapısı analiz edilmelidir.",
      },
      {
        question: "Minimum kaç m² alana hizmet veriyorsunuz?",
        answer: "Minimum alan sınırımız yoktur ancak küçük alanlarda GPS destekli sistem yerine lazer nivo ile çalışılabilir.",
      },
    ],
  },
  {
    id: "3",
    title: "Kazı & Hafriyat",
    desc: "Her ölçekte kazı ve hafriyat işleri. Temel kazısından yol açma çalışmalarına kadar geniş hizmet yelpazesi.",
    image: "/hizmet-kazi.jpg",
    features: [
      "Temel kazısı",
      "Kanal ve hendek açma",
      "Hafriyat nakli",
      "Kaya kırma ve söküm",
    ],
    htmlContent: `<h2>Kazı & Hafriyat Hizmetimiz</h2><p>Temel kazısından yol açma çalışmalarına, kanal açmadan hafriyat nakline kadar her ölçekte hizmet veriyoruz.</p><h2>Ekipman Parkımız</h2><ul><li>Ekskavatörler (14-30 ton)</li><li>Dozerler</li><li>Kaya kamyonları</li><li>Kırıcı ataçmanları</li></ul><p>Deneyimli operatör kadromuz ve modern makine parkımız ile güvenli ve hızlı çalışma garantisi sunuyoruz.</p>`,
    faqs: [
      {
        question: "Hafriyat nakli de dahil midir?",
        answer: "Evet, kazı sonrası hafriyat nakli hizmetimize dahildir. Uygun döküm sahalarına güvenli nakliye sağlarız.",
      },
      {
        question: "Kaya zeminde çalışabiliyor musunuz?",
        answer: "Evet, kırıcı ataçmanlı ekskavatörlerimiz ile kaya zeminde de etkili kazı yapabiliyoruz.",
      },
    ],
  },
  {
    id: "4",
    title: "Drenaj Sistemleri",
    desc: "Yüzey ve yer altı drenaj çözümleri. Su baskınlarına karşı etkin koruma sistemleri.",
    image: "/hizmet-drenaj.mp4",
    mediaType: "video",
    features: [
      "Yer altı drenaj borusu döşeme",
      "Yüzey drenaj kanalları",
      "Rögar ve baca yapımı",
      "Su tahliye sistemleri",
    ],
    htmlContent: `<h2>Drenaj Sistemi Hizmetimiz</h2><p>Yüzey ve yer altı drenaj çözümleri ile yapılarınızı su baskınlarından koruyoruz.</p><h2>Uygulama Alanları</h2><ul><li>İstinat duvarı arka drenajı</li><li>Bodrum kat su yalıtımı</li><li>Bahçe ve parsel drenajı</li><li>Yol ve otopark drenajı</li></ul><p>Projelendirmeden uygulamaya, bakımdan kontrole kadar komple drenaj hizmeti sunuyoruz.</p>`,
    faqs: [
      {
        question: "Mevcut bir yapıya drenaj sistemi eklenebilir mi?",
        answer: "Evet, mevcut yapılara da retroaktif drenaj sistemi uygulanabilir. Durum analizi sonrası en uygun çözüm belirlenir.",
      },
      {
        question: "Drenaj sistemi garantisi var mı?",
        answer: "Tüm drenaj çalışmalarımız 2 yıl işçilik garantisi ile sunulmaktadır.",
      },
    ],
  },
  {
    id: "5",
    title: "Dolgu & Stabilizasyon",
    desc: "Kontrollü dolgu çalışmaları ve zemin stabilizasyonu. Sıkıştırma testleri ile kalite güvencesi.",
    image: "/hizmet-dolgu.jpg",
    features: [
      "Kontrollü dolgu yapımı",
      "Zemin stabilizasyonu",
      "Sıkıştırma testleri",
      "Geotekstil uygulama",
    ],
    htmlContent: `<h2>Dolgu & Stabilizasyon Hizmetimiz</h2><p>Kontrollü dolgu çalışmaları ve zemin stabilizasyonu ile yapılarınızın sağlam bir temel üzerinde yükselmesini sağlıyoruz.</p><h2>Kalite Kontrol</h2><p>Her dolgu katmanında sıkıştırma testleri yapılarak Proctor değerinin %95 üzerine ulaşılması hedeflenir.</p><ul><li>30 cm katmanlar halinde dolgu</li><li>Her katmanda sıkıştırma testi</li><li>Geotekstil filtre uygulaması</li><li>Dijital kalite raporlama</li></ul>`,
    faqs: [
      {
        question: "Sıkıştırma kalitesi nasıl ölçülür?",
        answer: "Kum konisi ve nükleer yoğunluk ölçer ile her katmanda sıkıştırma testi yapılır. Proctor değerinin %95'ine ulaşılması hedeflenir.",
      },
    ],
  },
  {
    id: "6",
    title: "Taş Ev Yapımı",
    desc: "Geleneksel taş işçiliği ile modern mühendislik tekniklerini buluşturan taş ev projeleri.",
    image: "/hizmet-tasev.jpg",
    features: [
      "Doğal taş duvar örme",
      "Betonarme iskelet üzeri taş kaplama",
      "Restorasyon çalışmaları",
      "Taş seçimi ve tedarik",
    ],
    htmlContent: `<h2>Taş Ev Yapımı Hizmetimiz</h2><p>Geleneksel Anadolu taş işçiliğini modern mühendislik teknikleriyle buluşturarak estetik ve dayanıklı taş evler inşa ediyoruz.</p><h2>Yöntemimiz</h2><p>Betonarme iskelet üzerine doğal taş kaplama yöntemi ile hem yapısal güvenliği hem de otantik görünümü bir arada sunuyoruz.</p><ul><li>Bölgesel doğal taş tedariki</li><li>Usta taş işçiliği</li><li>Isı ve su yalıtımı entegrasyonu</li><li>Modern iç mekan uyumu</li></ul>`,
    faqs: [
      {
        question: "Taş ev yapımı normal yapıdan daha mı pahalıdır?",
        answer: "Taş malzeme ve işçilik maliyeti nedeniyle geleneksel yapıya göre %20-40 arası ek maliyet oluşabilir. Ancak uzun vadede enerji tasarrufu ve değer artışı ile bu fark karşılanır.",
      },
      {
        question: "Hangi taş türlerini kullanıyorsunuz?",
        answer: "Bölgesel olarak Kayseri ve çevresinden temin edilen bazalt, andezit ve kireçtaşı kullanıyoruz.",
      },
    ],
  },
  {
    id: "7",
    title: "Parke Taşı Döşeme",
    desc: "Yaya yolları, otoparklar ve bahçe düzenlemeleri için profesyonel parke taşı döşeme hizmeti.",
    image: "/hizmet-parke.jpg",
    features: [
      "Alt yapı hazırlığı ve sıkıştırma",
      "Farklı desen seçenekleri",
      "Bordür ve kenar taşı uygulaması",
      "Derzleme ve son işlemler",
    ],
    htmlContent: `<h2>Parke Taşı Döşeme Hizmetimiz</h2><p>Yaya yolları, otoparklar ve bahçe düzenlemeleri için profesyonel parke taşı döşeme hizmeti sunuyoruz.</p><h2>Çalışma Süreci</h2><ul><li>Alt zemin hazırlığı ve sıkıştırma</li><li>Kum yatağı serilmesi</li><li>Desen seçimi ve döşeme</li><li>Bordür uygulaması</li><li>Derzleme ve kompaktör ile sabitleme</li></ul><p>Balık sırtı, enine diziliş ve kilitli desen gibi farklı seçenekler sunuyoruz.</p>`,
    faqs: [
      {
        question: "Hangi desen seçenekleri mevcut?",
        answer: "Balık sırtı, enine diziliş, rastgele desen ve kilitli desen gibi farklı seçenekler sunuyoruz. Kullanım alanına göre en uygun deseni birlikte belirleriz.",
      },
      {
        question: "Parke taşı döşeme m² fiyatı nedir?",
        answer: "Fiyat, altyapı durumu, seçilen taş türü ve desen karmaşıklığına göre değişir. Ücretsiz keşif sonrası detaylı fiyat teklifi sunuyoruz.",
      },
    ],
  },
];
