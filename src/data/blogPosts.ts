export interface BlogArticleSection {
  headingId: string;
  headingText: string;
  headingLevel: 2 | 3;
  content: string[];
  list?: string[];
  blockquote?: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface BlogAIAnalysis {
  summary: string;
  keyPoints: string[];
  relatedTopics: string[];
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readingTime: string;
  author: string;
  sections: BlogArticleSection[];
  aiAnalysis: BlogAIAnalysis;
  faqs?: BlogFaqItem[];
  htmlContent?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "istinat-duvari-yapiminda-dikkat-edilmesi-gerekenler",
    title: "İstinat Duvarı Yapımında Dikkat Edilmesi Gerekenler",
    excerpt:
      "İstinat duvarı yapımında zemin etüdünden malzeme seçimine kadar dikkat edilmesi gereken kritik noktaları ele alıyoruz.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    date: "15 Şubat 2026",
    category: "İnşaat",
    readingTime: "8 dk okuma",
    author: "Yunus Özkan İnşaat Ekibi",
    sections: [
      {
        headingId: "istinat-duvari-nedir",
        headingText: "İstinat Duvarı Nedir?",
        headingLevel: 2,
        content: [
          "İstinat duvarları, toprak veya dolgu malzemesinin kaymasını ve göçmesini önlemek amacıyla inşa edilen yapısal elemanlardır. Özellikle eğimli arazilerde, yol kenarlarında ve temel kazılarında kritik bir rol üstlenirler.",
          "Doğru tasarlanmış ve inşa edilmiş bir istinat duvarı, hem güvenliği sağlar hem de arazinin verimli kullanılmasına olanak tanır. Ancak yapım sürecinde göz ardı edilen detaylar, ilerleyen dönemlerde ciddi sorunlara yol açabilir.",
        ],
      },
      {
        headingId: "zemin-etudunun-onemi",
        headingText: "Zemin Etüdünün Önemi",
        headingLevel: 2,
        content: [
          "İstinat duvarı projesine başlamadan önce yapılması gereken en kritik adım zemin etüdüdür. Zemin etüdü, toprağın taşıma kapasitesini, su tablasının seviyesini ve zeminin genel yapısını ortaya koyar.",
          "Etüt sonuçları, duvarın tipini, derinliğini ve kullanılacak malzemeleri doğrudan etkiler. Yetersiz zemin analizi, duvarın devrilmesine veya kaymasına neden olabilir.",
        ],
        list: [
          "Sondaj çalışmaları ile zemin katmanlarının belirlenmesi",
          "Laboratuvar testleri ile taşıma kapasitesinin hesaplanması",
          "Yeraltı su seviyesinin ölçülmesi",
          "Zemin kayma açısının belirlenmesi",
          "Deprem bölgesine göre sismik analiz yapılması",
        ],
        blockquote:
          "Zemin etüdü olmadan yapılan istinat duvarı, temelsiz bir bina gibidir. Riskleri önceden bilmek, doğru çözümler üretmenin ilk adımıdır.",
      },
      {
        headingId: "zemin-etudu-asamalari",
        headingText: "Zemin Etüdü Aşamaları",
        headingLevel: 3,
        content: [
          "Zemin etüdü genellikle üç aşamadan oluşur: saha keşfi, sondaj ve laboratuvar testleri. Saha keşfinde arazinin genel durumu, eğim açıları ve çevresel faktörler değerlendirilir.",
          "Sondaj aşamasında farklı derinliklerde zemin numuneleri alınır. Bu numuneler laboratuvarda çeşitli testlere tabi tutularak zeminin mekanik özellikleri belirlenir.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
          alt: "Zemin etüdü çalışması",
          caption: "Sondaj çalışması sırasında alınan zemin numuneleri",
        },
      },
      {
        headingId: "malzeme-secimi",
        headingText: "Malzeme Seçimi",
        headingLevel: 2,
        content: [
          "İstinat duvarında kullanılacak malzeme, projenin başarısını doğrudan etkiler. Betonarme, taş, gabion veya prefabrik elemanlar arasında seçim yaparken zemin koşulları, duvar yüksekliği ve bütçe göz önünde bulundurulmalıdır.",
          "Betonarme istinat duvarları, yüksek mukavemetleri ve esneklikleri nedeniyle en yaygın tercih edilen türdür. Ancak taş duvarlar, estetik görünümleri ile peyzaj projelerinde sıklıkla kullanılır.",
        ],
        list: [
          "Betonarme: Yüksek mukavemet, her yüksekliğe uygun",
          "Doğal Taş: Estetik görünüm, peyzaj uyumlu",
          "Gabion: Drenaj dostu, çevre uyumlu",
          "Prefabrik: Hızlı montaj, standart ölçüler",
        ],
      },
      {
        headingId: "insaat-surecinde-dikkat-edilecekler",
        headingText: "İnşaat Sürecinde Dikkat Edilecekler",
        headingLevel: 2,
        content: [
          "İnşaat aşamasında en önemli konuların başında drenaj sistemi gelir. Duvarın arkasında biriken su, hidrostatik basınç oluşturarak yapıya zarar verebilir. Bu nedenle uygun bir drenaj sistemi tasarlanmalıdır.",
          "Temel kazısının doğru derinlikte yapılması, dolgu malzemesinin katmanlar halinde sıkıştırılması ve beton dökümünün hava koşullarına uygun zamanlarda gerçekleştirilmesi de kritik faktörlerdir.",
        ],
        list: [
          "Drenaj boruları ve filtre tabakası mutlaka uygulanmalı",
          "Dolgu malzemesi 30 cm katmanlar halinde sıkıştırılmalı",
          "Beton vibrasyonu eksiksiz yapılmalı",
          "Derz ve dilatasyon detayları ihmal edilmemeli",
          "Yüzey suyu drenajı için üst kotta meyil verilmeli",
        ],
      },
      {
        headingId: "sonuc-ve-oneriler",
        headingText: "Sonuç ve Öneriler",
        headingLevel: 2,
        content: [
          "İstinat duvarı yapımı, mühendislik bilgisi ve saha deneyimi gerektiren önemli bir iştir. Zemin etüdünden malzeme seçimine, drenajdan sıkıştırmaya kadar her aşama titizlikle yürütülmelidir.",
          "Profesyonel bir ekiple çalışmak ve projelendirme aşamasında tüm detayları planlamak, hem güvenli hem de uzun ömürlü bir yapı elde etmenin anahtarıdır. Yunus Özkan İnşaat olarak, deneyimli ekibimizle bu alanda güvenilir çözümler sunuyoruz.",
        ],
      },
    ],
    aiAnalysis: {
      summary:
        "Bu makale, istinat duvarı yapımının temel aşamalarını kapsamlı şekilde ele almaktadır. Zemin etüdünün kritik önemi, doğru malzeme seçimi ve drenaj sistemi tasarımı öne çıkan konulardır.",
      keyPoints: [
        "Zemin etüdü, istinat duvarı projesinin en kritik ilk adımıdır",
        "Drenaj sistemi olmadan yapılan duvarlar hidrostatik basınca maruz kalır",
        "Malzeme seçimi zemin koşullarına ve duvar yüksekliğine göre belirlenmelidir",
        "Dolgu sıkıştırma 30 cm katmanlar halinde yapılmalıdır",
      ],
      relatedTopics: [
        "Zemin Mekaniği",
        "Betonarme Tasarım",
        "Drenaj Sistemleri",
        "Temel Kazısı",
      ],
    },
    faqs: [
      {
        question: "İstinat duvarı yapımında zemin etüdü zorunlu mudur?",
        answer: "Evet, zemin etüdü istinat duvarı projesinin en kritik ilk adımıdır. Toprağın taşıma kapasitesini, su tablasını ve zemin yapısını ortaya koyar. Etüt olmadan yapılan duvarlar devrilme veya kayma riski taşır.",
      },
      {
        question: "Hangi malzeme türü istinat duvarı için en uygunudur?",
        answer: "Zemin koşullarına, duvar yüksekliğine ve bütçeye bağlıdır. Betonarme yüksek mukavemet sağlar, doğal taş estetik görünüm sunar, gabion drenaj dostu bir seçenektir, prefabrik ise hızlı montaj avantajı verir.",
      },
      {
        question: "İstinat duvarında drenaj sistemi neden önemlidir?",
        answer: "Duvarın arkasında biriken su hidrostatik basınç oluşturarak yapıya zarar verebilir. Drenaj boruları ve filtre tabakası, bu basıncı azaltarak duvarın ömrünü uzatır.",
      },
      {
        question: "İstinat duvarı yapım maliyetini etkileyen faktörler nelerdir?",
        answer: "Duvar yüksekliği, zemin koşulları, seçilen malzeme türü, drenaj sistemi gereksinimleri ve ulaşım koşulları başlıca maliyet faktörleridir.",
      },
    ],
    htmlContent: `<h2>İstinat Duvarı Nedir?</h2><p>İstinat duvarları, toprak veya dolgu malzemesinin kaymasını ve göçmesini önlemek amacıyla inşa edilen yapısal elemanlardır. Özellikle eğimli arazilerde, yol kenarlarında ve temel kazılarında kritik bir rol üstlenirler.</p><p>Doğru tasarlanmış ve inşa edilmiş bir istinat duvarı, hem güvenliği sağlar hem de arazinin verimli kullanılmasına olanak tanır.</p><h2>Zemin Etüdünün Önemi</h2><p>İstinat duvarı projesine başlamadan önce yapılması gereken en kritik adım zemin etüdüdür. Zemin etüdü, toprağın taşıma kapasitesini, su tablasının seviyesini ve zeminin genel yapısını ortaya koyar.</p><ul><li>Sondaj çalışmaları ile zemin katmanlarının belirlenmesi</li><li>Laboratuvar testleri ile taşıma kapasitesinin hesaplanması</li><li>Yeraltı su seviyesinin ölçülmesi</li><li>Zemin kayma açısının belirlenmesi</li><li>Deprem bölgesine göre sismik analiz yapılması</li></ul><blockquote><p>Zemin etüdü olmadan yapılan istinat duvarı, temelsiz bir bina gibidir.</p></blockquote><h2>Malzeme Seçimi</h2><p>İstinat duvarında kullanılacak malzeme, projenin başarısını doğrudan etkiler. Betonarme, taş, gabion veya prefabrik elemanlar arasında seçim yaparken zemin koşulları, duvar yüksekliği ve bütçe göz önünde bulundurulmalıdır.</p><ul><li><strong>Betonarme:</strong> Yüksek mukavemet, her yüksekliğe uygun</li><li><strong>Doğal Taş:</strong> Estetik görünüm, peyzaj uyumlu</li><li><strong>Gabion:</strong> Drenaj dostu, çevre uyumlu</li><li><strong>Prefabrik:</strong> Hızlı montaj, standart ölçüler</li></ul><h2>İnşaat Sürecinde Dikkat Edilecekler</h2><p>İnşaat aşamasında en önemli konuların başında drenaj sistemi gelir. Duvarın arkasında biriken su, hidrostatik basınç oluşturarak yapıya zarar verebilir.</p><ul><li>Drenaj boruları ve filtre tabakası mutlaka uygulanmalı</li><li>Dolgu malzemesi 30 cm katmanlar halinde sıkıştırılmalı</li><li>Beton vibrasyonu eksiksiz yapılmalı</li><li>Derz ve dilatasyon detayları ihmal edilmemeli</li></ul><h2>Sonuç ve Öneriler</h2><p>İstinat duvarı yapımı, mühendislik bilgisi ve saha deneyimi gerektiren önemli bir iştir. Profesyonel bir ekiple çalışmak ve projelendirme aşamasında tüm detayları planlamak, hem güvenli hem de uzun ömürlü bir yapı elde etmenin anahtarıdır.</p>`,
  },
  {
    slug: "hafriyat-islerinde-guvenlik-onlemleri",
    title: "Hafriyat İşlerinde Güvenlik Önlemleri",
    excerpt:
      "Hafriyat çalışmalarında iş güvenliği protokolleri ve alınması gereken temel önlemleri detaylı olarak inceliyoruz.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
    date: "8 Şubat 2026",
    category: "İş Güvenliği",
    readingTime: "6 dk okuma",
    author: "Yunus Özkan İnşaat Ekibi",
    sections: [
      {
        headingId: "hafriyat-guvenligi-neden-onemli",
        headingText: "Hafriyat Güvenliği Neden Önemli?",
        headingLevel: 2,
        content: [
          "Hafriyat işleri, inşaat sektöründeki en riskli faaliyetlerden biridir. Kazı çukurlarının göçmesi, ağır iş makinelerinin kullanımı ve yer altı altyapı hatlarıyla karşılaşılması gibi pek çok tehlike söz konusudur.",
          "İş güvenliği önlemlerinin alınmaması, telafisi mümkün olmayan kazalara ve maddi kayıplara yol açabilir. Bu nedenle hafriyat çalışmalarına başlamadan önce kapsamlı bir güvenlik planı hazırlanmalıdır.",
        ],
      },
      {
        headingId: "kisisel-koruyucu-donanimlar",
        headingText: "Kişisel Koruyucu Donanımlar (KKD)",
        headingLevel: 2,
        content: [
          "Hafriyat sahasında çalışan tüm personelin uygun kişisel koruyucu donanım kullanması zorunludur. Bu donanımlar, olası tehlikelere karşı ilk savunma hattını oluşturur.",
          "KKD kullanımı yalnızca yasal bir zorunluluk değil, aynı zamanda çalışan sağlığının korunması açısından da büyük önem taşır.",
        ],
        list: [
          "Baret: Düşen nesnelere karşı kafa koruması",
          "Emniyet yeleği: Görünürlük ve tanınabilirlik",
          "Çelik burunlu bot: Ayak koruması",
          "İş eldiveni: El yaralanmalarına karşı koruma",
          "Kulaklık/tıkaç: Gürültüye karşı işitme koruması",
        ],
      },
      {
        headingId: "kazi-guvenligi-kurallari",
        headingText: "Kazı Güvenliği Kuralları",
        headingLevel: 2,
        content: [
          "Kazı çalışmalarında en büyük risk, kazı çukurunun göçmesidir. 1.5 metreden derin kazılarda mutlaka iksa (destek) sistemi uygulanmalıdır. İksa sistemleri, zemin tipine ve kazı derinliğine göre seçilmelidir.",
          "Kazı kenarlarına güvenli mesafede bariyer ve uyarı işaretleri konulmalıdır. Kazı çukurunun kenarında malzeme depolanması kesinlikle önlenmelidir.",
        ],
        blockquote:
          "Her kazı çukuru potansiyel bir tehlikedir. Göçme riski her zaman ciddiye alınmalı ve gerekli önlemler eksiksiz uygulanmalıdır.",
        image: {
          src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
          alt: "Hafriyat kazı alanı güvenlik önlemleri",
          caption:
            "Uygun iksa sistemi ve güvenlik bariyerleri ile korunan kazı alanı",
        },
      },
      {
        headingId: "is-makinesi-guvenligi",
        headingText: "İş Makinesi Güvenliği",
        headingLevel: 2,
        content: [
          "Hafriyat işlerinde kullanılan ekskavatör, dozer ve kamyon gibi ağır iş makineleri, yetkili ve sertifikalı operatörler tarafından kullanılmalıdır. Makinelerin günlük bakım kontrolleri aksatılmamalıdır.",
          "Makine çalışma alanında yaya trafiğinin kontrol altında tutulması hayati önem taşır. Geri manevra sırasında sesli ve görsel uyarı sistemlerinin aktif olması sağlanmalıdır.",
        ],
        list: [
          "Operatör sertifikası kontrolü yapılmalı",
          "Günlük makine bakım formu doldurulmalı",
          "Çalışma alanı yaya trafiğine kapatılmalı",
          "Geri manevra sırasında gözcü bulundurulmalı",
        ],
      },
      {
        headingId: "acil-durum-plani",
        headingText: "Acil Durum Planı",
        headingLevel: 2,
        content: [
          "Her hafriyat sahasında yazılı bir acil durum planı bulunmalıdır. Bu plan, olası kaza senaryolarını, müdahale prosedürlerini ve iletişim bilgilerini içermelidir.",
          "Tüm çalışanlar acil durum planı hakkında bilgilendirilmeli ve düzenli tatbikatlar yapılmalıdır. İlk yardım malzemelerinin sahada eksiksiz bulunması sağlanmalıdır.",
        ],
      },
    ],
    aiAnalysis: {
      summary:
        "Makale, hafriyat işlerinde karşılaşılan temel güvenlik risklerini ve alınması gereken önlemleri sistematik şekilde ele almaktadır. KKD kullanımı, kazı güvenliği ve makine güvenliği öne çıkan konulardır.",
      keyPoints: [
        "1.5 metreden derin kazılarda iksa sistemi zorunludur",
        "Tüm personel uygun KKD kullanmalıdır",
        "İş makineleri yalnızca sertifikalı operatörler tarafından kullanılmalıdır",
        "Her sahada yazılı acil durum planı bulunmalıdır",
      ],
      relatedTopics: [
        "İş Sağlığı ve Güvenliği",
        "Kazı İksa Sistemleri",
        "İş Makineleri",
        "Risk Analizi",
      ],
    },
    faqs: [
      {
        question: "Hafriyat sahasında hangi kişisel koruyucu donanımlar zorunludur?",
        answer: "Baret, emniyet yeleği, çelik burunlu bot, iş eldiveni ve gürültüye karşı kulaklık/tıkaç kullanımı zorunludur. Bu donanımlar olası tehlikelere karşı ilk savunma hattını oluşturur.",
      },
      {
        question: "Kaç metreden derin kazılarda iksa sistemi zorunludur?",
        answer: "1.5 metreden derin kazılarda mutlaka iksa (destek) sistemi uygulanmalıdır. İksa sistemleri zemin tipine ve kazı derinliğine göre seçilmelidir.",
      },
      {
        question: "İş makinesi operatörü için hangi belgeler gereklidir?",
        answer: "Ağır iş makinelerini kullanacak operatörlerin geçerli operatör sertifikasına sahip olması zorunludur. Ayrıca günlük makine bakım formlarının düzenli olarak doldurulması gerekir.",
      },
    ],
    htmlContent: `<h2>Hafriyat Güvenliği Neden Önemli?</h2><p>Hafriyat işleri, inşaat sektöründeki en riskli faaliyetlerden biridir. Kazı çukurlarının göçmesi, ağır iş makinelerinin kullanımı ve yer altı altyapı hatlarıyla karşılaşılması gibi pek çok tehlike söz konusudur.</p><p>İş güvenliği önlemlerinin alınmaması, telafisi mümkün olmayan kazalara ve maddi kayıplara yol açabilir.</p><h2>Kişisel Koruyucu Donanımlar (KKD)</h2><p>Hafriyat sahasında çalışan tüm personelin uygun kişisel koruyucu donanım kullanması zorunludur.</p><ul><li><strong>Baret:</strong> Düşen nesnelere karşı kafa koruması</li><li><strong>Emniyet yeleği:</strong> Görünürlük ve tanınabilirlik</li><li><strong>Çelik burunlu bot:</strong> Ayak koruması</li><li><strong>İş eldiveni:</strong> El yaralanmalarına karşı koruma</li><li><strong>Kulaklık/tıkaç:</strong> Gürültüye karşı işitme koruması</li></ul><h2>Kazı Güvenliği Kuralları</h2><p>Kazı çalışmalarında en büyük risk, kazı çukurunun göçmesidir. 1.5 metreden derin kazılarda mutlaka iksa sistemi uygulanmalıdır.</p><blockquote><p>Her kazı çukuru potansiyel bir tehlikedir. Göçme riski her zaman ciddiye alınmalıdır.</p></blockquote><h2>İş Makinesi Güvenliği</h2><p>Hafriyat işlerinde kullanılan ekskavatör, dozer ve kamyon gibi ağır iş makineleri, yetkili ve sertifikalı operatörler tarafından kullanılmalıdır.</p><ul><li>Operatör sertifikası kontrolü yapılmalı</li><li>Günlük makine bakım formu doldurulmalı</li><li>Çalışma alanı yaya trafiğine kapatılmalı</li><li>Geri manevra sırasında gözcü bulundurulmalı</li></ul><h2>Acil Durum Planı</h2><p>Her hafriyat sahasında yazılı bir acil durum planı bulunmalıdır. Tüm çalışanlar acil durum planı hakkında bilgilendirilmeli ve düzenli tatbikatlar yapılmalıdır.</p>`,
  },
  {
    slug: "arazi-duzenleme-ve-tesviye-islerinin-onemi",
    title: "Arazi Düzenleme ve Tesviye İşlerinin Önemi",
    excerpt:
      "Arazi düzenleme ve tesviye işlerinin yapı projelerindeki kritik rolünü ve doğru uygulama yöntemlerini açıklıyoruz.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    date: "1 Şubat 2026",
    category: "Arazi",
    readingTime: "7 dk okuma",
    author: "Yunus Özkan İnşaat Ekibi",
    sections: [
      {
        headingId: "arazi-duzenleme-nedir",
        headingText: "Arazi Düzenleme Nedir?",
        headingLevel: 2,
        content: [
          "Arazi düzenleme, bir yapı projesinin temelini oluşturan ve arazinin istenilen kot seviyesine getirilmesini sağlayan mühendislik çalışmasıdır. Doğru yapılmış bir arazi düzenlemesi, üzerine inşa edilecek yapının ömrünü ve güvenliğini doğrudan etkiler.",
          "Tesviye işlemi, arazinin belirli eğim ve kot değerlerine göre şekillendirilmesidir. Bu işlem, su drenajının kontrollü sağlanması, temel zeminin hazırlanması ve yapı alanının kullanıma elverişli hale getirilmesi için hayati öneme sahiptir.",
        ],
      },
      {
        headingId: "tesviye-oncesi-hazirliklar",
        headingText: "Tesviye Öncesi Hazırlıklar",
        headingLevel: 2,
        content: [
          "Tesviye çalışmasına başlamadan önce arazinin detaylı bir topoğrafik haritası çıkarılmalıdır. Bu harita, mevcut kot farklarını, eğim yönlerini ve su akış güzergahlarını ortaya koyar.",
          "Harita üzerinden kazı ve dolgu hacimleri hesaplanarak iş planı oluşturulur. Bu planlama, hem maliyetlerin önceden belirlenmesini hem de iş sürecinin verimli yürütülmesini sağlar.",
        ],
        list: [
          "Topoğrafik harita çıkarılması (1/500 veya 1/1000 ölçek)",
          "Kazı-dolgu dengesinin hesaplanması",
          "Yeraltı tesisatlarının tespit edilmesi",
          "Ağaç ve bitki örtüsü envanteri",
          "Çevresel etki değerlendirmesi",
        ],
      },
      {
        headingId: "makine-secimi-ve-kullanimi",
        headingText: "Makine Seçimi ve Kullanımı",
        headingLevel: 3,
        content: [
          "Arazi düzenleme işlerinde kullanılacak makineler, işin büyüklüğüne ve zemin yapısına göre seçilir. Küçük alanlarda mini ekskavatörler yeterliyken, geniş arazilerde dozer ve greyder kullanımı gerekir.",
          "GPS destekli oto-greyder sistemleri, hassas tesviye işlerinde büyük avantaj sağlar. Bu sistemler santimetre düzeyinde hassasiyet sunarak, geleneksel yöntemlere kıyasla hem zaman hem de maliyet tasarrufu sağlar.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
          alt: "Arazi tesviye çalışması",
          caption: "GPS destekli greyder ile hassas tesviye çalışması",
        },
      },
      {
        headingId: "sikistirma-ve-kalite-kontrol",
        headingText: "Sıkıştırma ve Kalite Kontrol",
        headingLevel: 2,
        content: [
          "Tesviye sonrası dolgu yapılan alanlarda zeminin uygun şekilde sıkıştırılması kritik önem taşır. Yetersiz sıkıştırma, ilerleyen dönemlerde çökme ve oturma problemlerine yol açar.",
          "Sıkıştırma kalitesi, nükleer yoğunluk ölçer veya kum konisi deneyi ile kontrol edilir. Proctor değerinin en az %95'ine ulaşılması genel bir kabul kriteridir.",
        ],
        blockquote:
          "İyi bir tesviye, iyi bir yapının ilk şartıdır. Temel atılmadan önce zeminin mükemmel olması gerekir.",
      },
      {
        headingId: "drenaj-ve-su-yonetimi",
        headingText: "Drenaj ve Su Yönetimi",
        headingLevel: 2,
        content: [
          "Arazi düzenleme sırasında yüzey ve yer altı sularının kontrollü bir şekilde yönlendirilmesi planlanmalıdır. Yanlış eğim veya yetersiz drenaj, su birikintilerine ve zemin aşınmasına neden olur.",
          "Tesviye edilen arazide minimum %2 eğim verilmesi, yüzey sularının doğal drenaj kanallarına yönlendirilmesi için yeterlidir. Kritik alanlarda drenaj hendekleri ve borular kullanılmalıdır.",
        ],
      },
    ],
    aiAnalysis: {
      summary:
        "Makale, arazi düzenleme ve tesviye işlemlerinin teknik süreçlerini kapsamlı şekilde anlatmaktadır. Özellikle ön hazırlık, sıkıştırma kalitesi ve drenaj planlaması üzerinde durulmaktadır.",
      keyPoints: [
        "Tesviye öncesi topoğrafik harita çıkarılması zorunludur",
        "GPS destekli sistemler hassas tesviyede büyük avantaj sağlar",
        "Sıkıştırma kalitesi Proctor değerinin %95'ine ulaşmalıdır",
        "Minimum %2 eğim ile yüzey suyu drenajı sağlanmalıdır",
      ],
      relatedTopics: [
        "Topoğrafya",
        "Zemin Sıkıştırma",
        "Drenaj Mühendisliği",
        "İş Makineleri",
      ],
    },
    faqs: [
      {
        question: "Arazi tesviyesi neden gereklidir?",
        answer: "Arazi tesviyesi, yapı projelerinin sağlam bir temel üzerinde yükselmesini sağlar. Düzensiz zemin, yapısal sorunlara, su birikintilerine ve drenaj problemlerine yol açabilir.",
      },
      {
        question: "GPS destekli tesviye sistemleri ne avantaj sağlar?",
        answer: "GPS destekli sistemler milimetrik hassasiyetle çalışarak geleneksel yöntemlere göre çok daha doğru ve hızlı tesviye yapılmasını sağlar. Özellikle geniş alanlarda zaman ve maliyet tasarrufu sağlar.",
      },
      {
        question: "Sıkıştırma kalitesi nasıl kontrol edilir?",
        answer: "Sıkıştırma kalitesi Proctor testi ile ölçülür. Genel olarak Proctor değerinin %95'ine ulaşılması hedeflenir. Kum konisi ve nükleer yoğunluk ölçer gibi saha testleri kullanılır.",
      },
    ],
    htmlContent: `<h2>Arazi Düzenleme Neden Önemli?</h2><p>Arazi düzenleme ve tesviye işleri, yapı projelerinin temelini oluşturur. Doğru yapılmış tesviye, hem yapının güvenliğini hem de arazinin verimli kullanılmasını sağlar.</p><p>Yanlış veya eksik tesviye, ilerleyen dönemlerde çökme, su birikintisi ve yapısal hasar gibi ciddi sorunlara yol açabilir.</p><h2>Ön Hazırlık Aşaması</h2><p>Arazi düzenleme çalışmalarına başlamadan önce topoğrafik harita çıkarılmalı ve arazinin mevcut durumu detaylı şekilde analiz edilmelidir.</p><h2>GPS Destekli Tesviye Teknolojileri</h2><p>Modern tesviye işlemlerinde GPS destekli sistemler, milimetrik hassasiyetle çalışarak geleneksel yöntemlere göre büyük avantaj sağlar. Geniş alanlarda zaman ve maliyet tasarrufu elde edilir.</p><h2>Sıkıştırma ve Kalite Kontrol</h2><p>Tesviye sonrası zemin sıkıştırması kritik bir aşamadır. Proctor değerinin %95'ine ulaşmak hedeflenir. Minimum %2 eğim ile yüzey suyu drenajı sağlanmalıdır.</p>`,
  },
  {
    slug: "drenaj-sistemleri-dogru-planlama-ve-uygulama",
    title: "Drenaj Sistemleri: Doğru Planlama ve Uygulama",
    excerpt:
      "Etkili drenaj sistemlerinin tasarımı, uygun malzeme seçimi ve doğru uygulama teknikleri hakkında kapsamlı bilgiler.",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80",
    date: "25 Ocak 2026",
    category: "Altyapı",
    readingTime: "9 dk okuma",
    author: "Yunus Özkan İnşaat Ekibi",
    sections: [
      {
        headingId: "drenaj-sistemi-nedir",
        headingText: "Drenaj Sistemi Nedir?",
        headingLevel: 2,
        content: [
          "Drenaj sistemi, fazla suyu kontrollü bir şekilde toplayarak uzaklaştıran mühendislik yapısıdır. Yüzey drenajı ve yer altı drenajı olmak üzere iki ana kategoriye ayrılır.",
          "Doğru tasarlanmış bir drenaj sistemi, yapıların su basmasını önler, zemin taşıma kapasitesini korur ve çevresel sürdürülebilirliğe katkı sağlar. Yanlış veya eksik drenaj ise uzun vadede büyük hasarlara yol açabilir.",
        ],
      },
      {
        headingId: "yuzey-drenaji",
        headingText: "Yüzey Drenajı",
        headingLevel: 2,
        content: [
          "Yüzey drenajı, yağmur suyu ve yüzeysel akışları kontrollü kanallar aracılığıyla uzaklaştırma yöntemidir. Açık hendekler, oluklar ve yüzey kanalları bu sistemin temel bileşenleridir.",
          "Yüzey drenajında en önemli faktör, suyun yerçekimi ile akışını sağlayacak yeterli eğimin verilmesidir. Genel olarak %1-3 arası eğim değerleri uygundur.",
        ],
        list: [
          "Açık drenaj hendekleri: Basit ve ekonomik çözüm",
          "Betonlu V kanallar: Yüksek kapasiteli yüzey drenajı",
          "Izgara ve rögar sistemi: Kentsel alanlarda tercih edilen çözüm",
          "Eğimli yüzey oluşturma: Doğal akış sağlama",
        ],
      },
      {
        headingId: "yeralti-drenaji",
        headingText: "Yer Altı Drenajı",
        headingLevel: 2,
        content: [
          "Yer altı drenajı, zemin içindeki fazla suyu toplayan ve uzaklaştıran kapalı sistemlerdir. Delikli borular, geotekstil filtreler ve çakıl dolgu bu sistemin temel elemanlarıdır.",
          "Özellikle istinat duvarları, bodrum katlar ve su tablası yüksek olan alanlarda yer altı drenajı zorunludur. Sistemin tasarımında zemin geçirgenliği ve su debisi hesaplamaları yapılmalıdır.",
        ],
        blockquote:
          "Yer altı suyu kontrolü, bir yapının ömrünü belirleyen en önemli faktörlerden biridir. Görünmeyen tehlike, görünür hasarlara yol açabilir.",
        image: {
          src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
          alt: "Yer altı drenaj borusu döşemesi",
          caption: "Geotekstil sargılı drenaj borusu uygulaması",
        },
      },
      {
        headingId: "malzeme-ve-boru-secimi",
        headingText: "Malzeme ve Boru Seçimi",
        headingLevel: 2,
        content: [
          "Drenaj sisteminde kullanılan boru tipleri, projenin gereksinimlerine göre değişir. PVC, HDPE ve beton borular en yaygın kullanılan malzemelerdir. Her birinin avantaj ve dezavantajları mevcuttur.",
          "Boru çapı, debi hesaplamalarına göre belirlenir. Yetersiz çapta boru kullanımı, sistem tıkanmasına ve taşkına neden olabilir.",
        ],
        list: [
          "PVC boru: Hafif, kolay montaj, korozyona dayanıklı",
          "HDPE boru: Esnek, darbelere dayanıklı, uzun ömürlü",
          "Beton boru: Yüksek basınç dayanımı, büyük çaplar",
          "Geotekstil filtre: Kum ve toprak girişini önler",
        ],
      },
      {
        headingId: "bakim-ve-kontrol",
        headingText: "Bakım ve Kontrol",
        headingLevel: 2,
        content: [
          "Drenaj sistemlerinin düzenli bakımı, sistemin verimli çalışmasını sağlar. Rögarlar periyodik olarak temizlenmeli, borularda tıkanma kontrolü yapılmalıdır.",
          "Yılda en az iki kez, özellikle yağışlı mevsim öncesi ve sonrasında kapsamlı bir drenaj sistemi kontrolü yapılması önerilir. Tespit edilen sorunlar erken müdahale ile büyümeden çözümlenebilir.",
        ],
      },
    ],
    aiAnalysis: {
      summary:
        "Makale, drenaj sistemlerinin tasarım ve uygulama süreçlerini detaylı şekilde ele almaktadır. Yüzey ve yer altı drenajı ayrımı, malzeme seçimi ve bakım konuları öne çıkmaktadır.",
      keyPoints: [
        "Drenaj sistemleri yüzey ve yer altı olmak üzere ikiye ayrılır",
        "Yüzey drenajında %1-3 arası eğim değerleri uygulanmalıdır",
        "Boru çapı debi hesaplamalarına göre belirlenmelidir",
        "Yılda en az iki kez bakım kontrolü yapılmalıdır",
      ],
      relatedTopics: [
        "Hidrolik Mühendislik",
        "Altyapı Projeleri",
        "Geotekstil Malzemeler",
        "Su Yönetimi",
      ],
    },
    faqs: [
      {
        question: "Yüzey drenajı ile yer altı drenajı arasındaki fark nedir?",
        answer: "Yüzey drenajı, yağmur suyu ve yüzeysel akışları açık kanallar ile uzaklaştırır. Yer altı drenajı ise zemin içindeki fazla suyu delikli borular ve çakıl dolgu ile toplar. Her iki sistem de genellikle birlikte kullanılır.",
      },
      {
        question: "Drenaj sistemi ne sıklıkla bakım gerektirir?",
        answer: "Yılda en az iki kez, özellikle yağışlı mevsim öncesi ve sonrasında kapsamlı kontrol yapılmalıdır. Rögarlar temizlenmeli, borularda tıkanma kontrolü yapılmalıdır.",
      },
      {
        question: "Hangi drenaj borusu türü en çok tercih edilir?",
        answer: "PVC ve HDPE borular en yaygın tercih edilen türlerdir. PVC hafif ve kolay montajlı, HDPE ise esnek ve darbelere dayanıklıdır. Seçim, projenin gereksinimlerine göre yapılır.",
      },
      {
        question: "Drenaj eğimi ne kadar olmalıdır?",
        answer: "Yüzey drenajında genel olarak %1-3 arası eğim değerleri uygulanır. Yer altı drenaj borularında ise minimum %0.5 eğim sağlanmalıdır.",
      },
    ],
    htmlContent: `<h2>Drenaj Sistemi Nedir?</h2><p>Drenaj sistemi, fazla suyu kontrollü bir şekilde toplayarak uzaklaştıran mühendislik yapısıdır. Yüzey drenajı ve yer altı drenajı olmak üzere iki ana kategoriye ayrılır.</p><p>Doğru tasarlanmış bir drenaj sistemi, yapıların su basmasını önler ve zemin taşıma kapasitesini korur.</p><h2>Yüzey Drenajı</h2><p>Yüzey drenajında en önemli faktör, suyun yerçekimi ile akışını sağlayacak yeterli eğimin verilmesidir.</p><ul><li>Açık drenaj hendekleri: Basit ve ekonomik çözüm</li><li>Betonlu V kanallar: Yüksek kapasiteli yüzey drenajı</li><li>Izgara ve rögar sistemi: Kentsel alanlarda tercih edilen çözüm</li></ul><h2>Yer Altı Drenajı</h2><p>Yer altı drenajı, zemin içindeki fazla suyu toplayan kapalı sistemlerdir. Delikli borular, geotekstil filtreler ve çakıl dolgu bu sistemin temel elemanlarıdır.</p><blockquote><p>Yer altı suyu kontrolü, bir yapının ömrünü belirleyen en önemli faktörlerden biridir.</p></blockquote><h2>Malzeme ve Boru Seçimi</h2><p>Drenaj sisteminde kullanılan boru tipleri projenin gereksinimlerine göre değişir.</p><ul><li><strong>PVC boru:</strong> Hafif, kolay montaj, korozyona dayanıklı</li><li><strong>HDPE boru:</strong> Esnek, darbelere dayanıklı, uzun ömürlü</li><li><strong>Beton boru:</strong> Yüksek basınç dayanımı, büyük çaplar</li></ul><h2>Bakım ve Kontrol</h2><p>Drenaj sistemlerinin düzenli bakımı, sistemin verimli çalışmasını sağlar. Yılda en az iki kez kapsamlı kontrol yapılması önerilir.</p>`,
  },
  {
    slug: "tas-ev-yapimi-gelenekselden-moderne",
    title: "Taş Ev Yapımı: Gelenekselden Moderne",
    excerpt:
      "Taş ev yapımının tarihçesi, modern tekniklerle birleşimi ve sürdürülebilir yapılaşmadaki yeri hakkında bilgiler.",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
    date: "18 Ocak 2026",
    category: "Peyzaj",
    readingTime: "7 dk okuma",
    author: "Yunus Özkan İnşaat Ekibi",
    sections: [
      {
        headingId: "tas-yapilarin-tarihcesi",
        headingText: "Taş Yapıların Tarihçesi",
        headingLevel: 2,
        content: [
          "Taş, insanlığın en eski yapı malzemelerinden biridir. Anadolu coğrafyası, binlerce yıllık taş yapı geleneğine ev sahipliği yapmaktadır. Kapadokya'nın peri bacalarından Mardin'in taş evlerine kadar zengin bir miras söz konusudur.",
          "Geleneksel taş yapılar, bulundukları bölgenin doğal taşlarından inşa edilmiş ve yerel iklim koşullarına mükemmel uyum sağlamıştır. Bu yapılar, hem estetik hem de fonksiyonel açıdan modern mimariye ilham kaynağı olmaya devam etmektedir.",
        ],
      },
      {
        headingId: "modern-tas-yapi-teknikleri",
        headingText: "Modern Taş Yapı Teknikleri",
        headingLevel: 2,
        content: [
          "Günümüzde taş yapılar, geleneksel ustalık bilgisi ile modern mühendislik tekniklerinin birleşimiyle inşa edilmektedir. Betonarme iskelet üzerine taş kaplama, gabion duvarlar ve doğal taş cephe uygulamaları en yaygın yöntemlerdir.",
          "Modern taş yapılarda deprem güvenliği, ısı yalıtımı ve nem kontrolü gibi teknik gereksinimler de karşılanmaktadır. Bu sayede taşın doğal güzelliği, çağdaş konfor standartlarıyla buluşmaktadır.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
          alt: "Modern taş ev tasarımı",
          caption:
            "Geleneksel taş doku ile modern mimariyi buluşturan bir yapı",
        },
      },
      {
        headingId: "tas-secimi-ve-iscilik",
        headingText: "Taş Seçimi ve İşçilik",
        headingLevel: 2,
        content: [
          "Yapıda kullanılacak taşın seçimi, estetik beklentilerin yanı sıra teknik gereksinimlere de bağlıdır. Bazalt, granit, mermer, traverten ve kireçtaşı en yaygın kullanılan doğal taş türleridir.",
          "Taş işçiliği, büyük ustalık gerektiren bir sanattır. Taşın kesilmesi, şekillendirilmesi ve yerine yerleştirilmesi deneyimli taş ustaları tarafından yapılmalıdır.",
        ],
        list: [
          "Bazalt: Sert, dayanıklı, koyu renkli, dış cephe için ideal",
          "Granit: Çok sert, parlak yüzey, uzun ömürlü",
          "Traverten: Gözenekli yapı, doğal doku, sıcak tonlar",
          "Kireçtaşı: Kolay işlenebilir, açık renkli, bölgesel kullanım",
        ],
      },
      {
        headingId: "surdurulebilirlik-ve-enerji-verimliligi",
        headingText: "Sürdürülebilirlik ve Enerji Verimliliği",
        headingLevel: 2,
        content: [
          "Taş yapılar, doğal ve sürdürülebilir yapı malzemesi kullanımının en güzel örnekleridir. Doğal taşın üretimi, sentetik malzemelere kıyasla çok daha düşük karbon ayak izine sahiptir.",
          "Taşın yüksek ısı kütlesi, yapının enerji verimliliğine önemli katkı sağlar. Yazın serin, kışın sıcak tutan taş duvarlar, enerji tüketimini azaltarak çevre dostu bir yaşam alanı sunar.",
        ],
        blockquote:
          "Doğal taş, doğanın bize sunduğu en mükemmel yapı malzemesidir. Yüzyıllarca dayanan yapılar, taşın gerçek gücünün kanıtıdır.",
      },
      {
        headingId: "maliyet-ve-yatirim-degeri",
        headingText: "Maliyet ve Yatırım Değeri",
        headingLevel: 2,
        content: [
          "Taş yapıların ilk yatırım maliyeti, geleneksel yapılara göre daha yüksek olabilir. Ancak uzun vadede bakım maliyetlerinin düşüklüğü ve yapının değer artışı düşünüldüğünde, taş yapılar karlı bir yatırım niteliği taşır.",
          "Doğal taş cephe veya taş ev konseptindeki yapılar, gayrimenkul piyasasında yüksek talep görmekte ve değer kaybı yaşamadan el değiştirmektedir.",
        ],
      },
    ],
    aiAnalysis: {
      summary:
        "Makale, taş ev yapımının geleneksel köklerinden modern uygulamalarına kadar geniş bir perspektif sunmaktadır. Sürdürülebilirlik ve enerji verimliliği öne çıkan temalar arasındadır.",
      keyPoints: [
        "Modern taş yapılar betonarme iskelet üzerine taş kaplama yöntemiyle inşa edilir",
        "Taş seçimi hem estetik hem teknik gereksinimlere göre yapılmalıdır",
        "Doğal taşın yüksek ısı kütlesi enerji verimliliğine katkı sağlar",
        "Uzun vadede taş yapılar karlı bir yatırımdır",
      ],
      relatedTopics: [
        "Doğal Taş",
        "Sürdürülebilir Mimari",
        "Restorasyon",
        "Enerji Verimliliği",
      ],
    },
    faqs: [
      {
        question: "Taş ev yapımında hangi taş türleri kullanılır?",
        answer: "Granit, bazalt, kireçtaşı ve andezit en yaygın kullanılan doğal taş türleridir. Seçim, bölgesel mevcudiyet, estetik tercih ve teknik gereksinimlere göre yapılır.",
      },
      {
        question: "Modern taş evler nasıl inşa edilir?",
        answer: "Modern taş yapılar genellikle betonarme iskelet üzerine taş kaplama yöntemiyle inşa edilir. Bu yöntem hem yapısal güvenliği hem de estetik görünümü bir arada sunar.",
      },
      {
        question: "Taş evlerin enerji verimliliği nasıldır?",
        answer: "Doğal taşın yüksek ısı kütlesi, yazın serinlik kışın sıcaklık sağlayarak enerji verimliliğine büyük katkıda bulunur. Uygun yalıtım ile birleştirildiğinde enerji maliyetlerini önemli ölçüde düşürür.",
      },
    ],
    htmlContent: `<h2>Taş Yapı Geleneği</h2><p>Taş ev yapımı, insanlık tarihinin en eski yapım tekniklerinden biridir. Anadolu coğrafyasında binlerce yıllık taş yapı geleneği, günümüzde modern tekniklerle buluşarak yeni bir anlam kazanmaktadır.</p><h2>Modern Teknikler</h2><p>Modern taş yapılar, betonarme iskelet üzerine taş kaplama yöntemiyle inşa edilir. Bu yaklaşım hem yapısal güvenliği hem de estetik görünümü bir arada sunar.</p><h2>Taş Seçimi</h2><p>Doğru taş seçimi hem estetik hem teknik gereksinimlere göre yapılmalıdır. Granit, bazalt, kireçtaşı ve andezit en yaygın kullanılan türlerdir.</p><h2>Enerji Verimliliği ve Sürdürülebilirlik</h2><p>Doğal taşın yüksek ısı kütlesi, yazın serinlik kışın sıcaklık sağlayarak enerji verimliliğine büyük katkıda bulunur.</p><h2>Yatırım Değeri</h2><p>Doğal taş cephe veya taş ev konseptindeki yapılar, gayrimenkul piyasasında yüksek talep görmekte ve değer kaybı yaşamadan el değiştirmektedir.</p>`,
  },
  {
    slug: "parke-tasi-doseme-dogru-teknikler",
    title: "Parke Taşı Döşeme: Doğru Teknikler",
    excerpt:
      "Parke taşı döşemede alt yapı hazırlığından derzleme işlemine kadar doğru teknikleri ve sık yapılan hataları anlatıyoruz.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    date: "10 Ocak 2026",
    category: "Peyzaj",
    readingTime: "6 dk okuma",
    author: "Yunus Özkan İnşaat Ekibi",
    sections: [
      {
        headingId: "parke-tasi-nedir",
        headingText: "Parke Taşı Nedir?",
        headingLevel: 2,
        content: [
          "Parke taşı, beton veya doğal taştan üretilen, zemin kaplama amacıyla kullanılan prefabrik yapı elemanıdır. Yaya yolları, otopark alanları, bahçe düzenlemeleri ve kentsel peyzaj projelerinde yaygın olarak tercih edilir.",
          "Parke taşının en büyük avantajı, sökülebilir ve tekrar döşenebilir olmasıdır. Bu özellik, alt yapı onarımlarında büyük kolaylık sağlar ve uzun vadeli kullanım imkânı sunar.",
        ],
      },
      {
        headingId: "altyapi-hazirligi",
        headingText: "Altyapı Hazırlığı",
        headingLevel: 2,
        content: [
          "Parke taşı döşemenin en kritik aşaması altyapı hazırlığıdır. Doğru hazırlanmış bir alt zemin, parkelerin düzgün ve uzun ömürlü olmasını sağlar. Yetersiz altyapı ise çökme, kayma ve düzensizliklere neden olur.",
          "Alt zemin hazırlığı sırasıyla toprak sıyrma, temel dolgu, alt temel ve kum serimi aşamalarından oluşur. Her aşama kendi içinde kalite kontrolden geçmelidir.",
        ],
        list: [
          "Bitkisel toprağın sıyrılması (20-30 cm)",
          "Temel dolgu malzemesinin serilmesi (15-20 cm kırma taş)",
          "Kompaktör ile sıkıştırma (%95 Proctor)",
          "Kum yatağı serilmesi (3-5 cm, yıkanmış kum)",
          "Eğim kontrolü (min %1.5 su tahliyesi için)",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
          alt: "Parke taşı altyapı hazırlığı",
          caption:
            "Kum yatağı üzerine parke taşı döşeme çalışması",
        },
      },
      {
        headingId: "doseme-teknikleri",
        headingText: "Döşeme Teknikleri",
        headingLevel: 2,
        content: [
          "Parke taşları, seçilen desene göre sıralı bir şekilde döşenir. Balık sırtı, enine diziliş ve rastgele desen en yaygın kullanılan döşeme desenleridir. Desen seçimi, hem estetik hem de yük dağılımı açısından önemlidir.",
          "Döşeme sırasında taşlar arasında 2-3 mm derzaralığı bırakılmalıdır. Bu aralık, termal genleşmeyi karşılar ve su tahliyesine yardımcı olur.",
        ],
        blockquote:
          "Parke taşı döşemede sabır ve hassasiyet anahtardır. Her taş, büyük resmin küçük ama vazgeçilmez bir parçasıdır.",
      },
      {
        headingId: "kenar-sinirlandirma",
        headingText: "Kenar Sınırlandırma",
        headingLevel: 3,
        content: [
          "Parke taşı alanlarının kenarlarına bordür veya kenar taşı uygulanması zorunludur. Kenar sınırlandırma, parkelerin kaymasını önler ve alan tanımını net bir şekilde ortaya koyar.",
          "Bordürler, beton harcı üzerine oturtularak sabitlenir. Eğimli alanlarda, suyun tahliye noktalarına yönlendirilmesi için bordür yükseklikleri ayarlanmalıdır.",
        ],
      },
      {
        headingId: "derzleme-ve-son-islemler",
        headingText: "Derzleme ve Son İşlemler",
        headingLevel: 2,
        content: [
          "Parke taşı döşeme tamamlandıktan sonra derz kumu uygulaması yapılır. İnce taneli derz kumu, taşlar arasındaki boşlukları doldurarak kilitlenme etkisi yaratır ve parkelerin hareket etmesini engeller.",
          "Son aşamada plaka kompaktör ile tüm yüzey vibrasyon uygulanarak parkelerin kum yatağına oturması sağlanır. Bu işlem, düz ve stabil bir yüzey elde edilmesinin anahtarıdır.",
        ],
      },
    ],
    aiAnalysis: {
      summary:
        "Makale, parke taşı döşeme sürecinin tüm aşamalarını teknik detaylarıyla açıklamaktadır. Altyapı hazırlığı ve derzleme işlemi özellikle vurgulanan konulardır.",
      keyPoints: [
        "Altyapı hazırlığı parke döşemenin en kritik aşamasıdır",
        "Taşlar arasında 2-3 mm derz aralığı bırakılmalıdır",
        "Kenar bordürleri kayma riskini ortadan kaldırır",
        "Plaka kompaktör ile son vibrasyon uygulaması zorunludur",
      ],
      relatedTopics: [
        "Peyzaj Düzenleme",
        "Kentsel Tasarım",
        "Zemin Kaplama",
        "Altyapı Mühendisliği",
      ],
    },
    faqs: [
      {
        question: "Parke taşı döşemede altyapı hazırlığı nasıl yapılır?",
        answer: "Sırasıyla bitkisel toprak sıyrılır (20-30 cm), temel dolgu malzemesi serilir (15-20 cm kırma taş), kompaktör ile sıkıştırılır (%95 Proctor) ve kum yatağı serilir (3-5 cm yıkanmış kum).",
      },
      {
        question: "Parke taşları arasında ne kadar boşluk bırakılmalıdır?",
        answer: "Taşlar arasında 2-3 mm derz aralığı bırakılmalıdır. Bu aralık termal genleşmeyi karşılar ve su tahliyesine yardımcı olur.",
      },
      {
        question: "Kenar bordürü neden gereklidir?",
        answer: "Kenar bordürleri parkelerin kaymasını önler ve alan tanımını net şekilde ortaya koyar. Bordürler beton harcı üzerine oturtularak sabitlenir.",
      },
      {
        question: "Parke taşı döşemede en sık yapılan hatalar nelerdir?",
        answer: "Yetersiz altyapı hazırlığı, kum yatağının düzgün serilmemesi, kenar bordürü konulmaması, derz kumunun atlanması ve kompaktör uygulamasının yapılmaması en sık karşılaşılan hatalardır.",
      },
    ],
    htmlContent: `<h2>Parke Taşı Nedir?</h2><p>Parke taşı, beton veya doğal taştan üretilen, zemin kaplama amacıyla kullanılan prefabrik yapı elemanıdır. Yaya yolları, otopark alanları, bahçe düzenlemeleri ve kentsel peyzaj projelerinde yaygın olarak tercih edilir.</p><p>En büyük avantajı sökülebilir ve tekrar döşenebilir olmasıdır.</p><h2>Altyapı Hazırlığı</h2><p>Parke taşı döşemenin en kritik aşaması altyapı hazırlığıdır. Doğru hazırlanmış bir alt zemin, parkelerin düzgün ve uzun ömürlü olmasını sağlar.</p><ul><li>Bitkisel toprağın sıyrılması (20-30 cm)</li><li>Temel dolgu malzemesinin serilmesi (15-20 cm kırma taş)</li><li>Kompaktör ile sıkıştırma (%95 Proctor)</li><li>Kum yatağı serilmesi (3-5 cm, yıkanmış kum)</li><li>Eğim kontrolü (min %1.5 su tahliyesi için)</li></ul><h2>Döşeme Teknikleri</h2><p>Parke taşları seçilen desene göre sıralı bir şekilde döşenir. Balık sırtı, enine diziliş ve rastgele desen en yaygın döşeme desenleridir.</p><blockquote><p>Parke taşı döşemede sabır ve hassasiyet anahtardır. Her taş, büyük resmin küçük ama vazgeçilmez bir parçasıdır.</p></blockquote><h2>Kenar Sınırlandırma</h2><p>Parke taşı alanlarının kenarlarına bordür veya kenar taşı uygulanması zorunludur. Kenar sınırlandırma, parkelerin kaymasını önler.</p><h2>Derzleme ve Son İşlemler</h2><p>Döşeme tamamlandıktan sonra derz kumu uygulaması yapılır. İnce taneli derz kumu, taşlar arasındaki boşlukları doldurarak kilitlenme etkisi yaratır. Son aşamada plaka kompaktör ile tüm yüzey vibrasyon uygulanarak parkelerin kum yatağına oturması sağlanır.</p>`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
