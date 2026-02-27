export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

export const galleryCategories = [
  { id: "tumu", label: "Tümü" },
  { id: "istinat", label: "İstinat Duvarı" },
  { id: "hafriyat", label: "Hafriyat" },
  { id: "arazi", label: "Arazi Düzenleme" },
  { id: "drenaj", label: "Drenaj" },
  { id: "diger", label: "Diğer" },
];

export const galleryItems: GalleryItem[] = [
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
