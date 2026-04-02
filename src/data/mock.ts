/**
 * Verity+ Mock Data
 * Centralized data source — will be replaced by API calls later.
 */
import type { Article, Author, Category, ArticleStatus } from '@/shared/types'

// --- Authors ---
export const AUTHORS: Author[] = [
  {
    id: 'author-1',
    name: 'Rina Wijaya',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    role: 'Editor',
  },
  {
    id: 'author-2',
    name: 'Arif Kurniawan',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    role: 'Tech Writer',
  },
  {
    id: 'author-3',
    name: 'Siti Aminah',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'Senior Writer',
  },
  {
    id: 'author-4',
    name: 'Budi Santoso',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'Staff Writer',
  },
  {
    id: 'author-5',
    name: 'Rizky Pratama',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: 'Sports Analyst',
  },
]

// --- Categories ---
export const CATEGORIES: Category[] = [
  {
    id: 'cat-tech',
    name: 'Teknologi',
    slug: 'teknologi',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    id: 'cat-business',
    name: 'Bisnis',
    slug: 'bisnis',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-500',
  },
  {
    id: 'cat-design',
    name: 'Desain',
    slug: 'desain',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-500',
  },
  {
    id: 'cat-lifestyle',
    name: 'Gaya Hidup',
    slug: 'gaya-hidup',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-500',
  },
  {
    id: 'cat-sports',
    name: 'Olahraga',
    slug: 'olahraga',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-500',
  },
  {
    id: 'cat-economy',
    name: 'Ekonomi',
    slug: 'ekonomi',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-500',
  },
  {
    id: 'cat-science',
    name: 'Sains',
    slug: 'sains',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-500',
  },
]

// Helper to find category
const cat = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!

// --- Articles ---
export const ARTICLES: Article[] = [
  // Featured / Headline articles
  {
    id: 1,
    slug: 'teknologi-ai-terbaru-2026',
    title: 'Teknologi AI Terbaru di 2026',
    excerpt:
      'Perkembangan model bahasa besar kini semakin mendekati kecerdasan manusia dengan efisiensi energi yang luar biasa.',
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    coverImageCaption: 'Ilustrasi kecerdasan buatan generasi terbaru.',
    category: cat('teknologi'),
    author: AUTHORS[1]!,
    tags: ['AI', 'MachineLearning', 'TechTrends'],
    publishedAt: '1 Apr 2026',
    readTimeMinutes: 8,
    status: 'featured' as ArticleStatus,
  },
  {
    id: 2,
    slug: 'eksplorasi-ruang-angkasa-meningkat',
    title: 'Eksplorasi Ruang Angkasa Meningkat',
    excerpt:
      'Misi terbaru ke Mars dijadwalkan akan meluncur pada akhir kuartal ini untuk mencari tanda kehidupan purba.',
    coverImage:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['Space', 'Mars', 'Science'],
    publishedAt: '31 Mar 2026',
    readTimeMinutes: 6,
    status: 'featured' as ArticleStatus,
  },
  {
    id: 3,
    slug: 'tren-gaya-hidup-berkelanjutan',
    title: 'Tren Gaya Hidup Berkelanjutan',
    excerpt:
      'Masyarakat mulai beralih ke produk ramah lingkungan secara masif untuk mengurangi jejak karbon global.',
    coverImage:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['Sustainability', 'EcoFriendly', 'Lifestyle'],
    publishedAt: '30 Mar 2026',
    readTimeMinutes: 5,
    status: 'featured' as ArticleStatus,
  },
  // Latest articles
  {
    id: 4,
    slug: 'ihsg-hari-ini-diprediksi-menguat',
    title: 'IHSG Hari Ini Diprediksi Menguat Seiring Masuknya Aliran Modal Asing',
    excerpt:
      'Analisis mendalam mengenai perkembangan terkini di sektor ekonomi yang berdampak pada pasar nasional.',
    coverImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    category: cat('ekonomi'),
    author: AUTHORS[0]!,
    tags: ['IHSG', 'Saham', 'Ekonomi'],
    publishedAt: '15 Menit yang lalu',
    readTimeMinutes: 4,
    status: 'published' as ArticleStatus,
  },
  {
    id: 5,
    slug: 'inovasi-baterai-solid-state',
    title: 'Inovasi Baterai Solid-State Mulai Masuk Jalur Produksi Massal',
    excerpt:
      'Analisis mendalam mengenai perkembangan terkini di sektor teknologi yang berdampak pada industri otomotif.',
    coverImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    category: cat('teknologi'),
    author: AUTHORS[1]!,
    tags: ['Battery', 'EV', 'Innovation'],
    publishedAt: '1 Jam yang lalu',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 6,
    slug: 'tren-wisata-slow-travel',
    title: 'Tren Wisata "Slow Travel" Semakin Diminati Generasi Z Tahun Ini',
    excerpt:
      'Analisis mendalam mengenai perkembangan terkini di sektor gaya hidup yang mengubah industri pariwisata.',
    coverImage:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['Travel', 'GenZ', 'Lifestyle'],
    publishedAt: '3 Jam yang lalu',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 7,
    slug: 'piala-dunia-2026-jadwal-lengkap',
    title: 'Piala Dunia 2026: Jadwal Lengkap dan Prediksi Tim Favorit',
    excerpt:
      'Analisis mendalam mengenai pertandingan terkini dan prediksi tim yang akan menjadi juara.',
    coverImage:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['WorldCup', 'Football', 'Sports'],
    publishedAt: '5 Jam yang lalu',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  // Grid/more articles
  {
    id: 8,
    slug: 'membangun-desain-sistem-skalabel',
    title: 'Membangun Desain Sistem yang Skalabel dengan Tailwind CSS',
    excerpt:
      'Pelajari bagaimana mengelola konfigurasi warna, tipografi, dan spacing agar konsisten di seluruh proyek besar.',
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    category: cat('desain'),
    author: AUTHORS[1]!,
    tags: ['TailwindCSS', 'DesignSystem', 'Frontend'],
    publishedAt: '12 Okt 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 9,
    slug: 'tips-typescript-utility-types',
    title: 'Tips TypeScript: Utility Types yang Wajib Kamu Tahu',
    excerpt:
      'Mempercepat proses development dengan Omit, Pick, dan Partial untuk manipulasi interface yang lebih elegan.',
    coverImage:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=600&q=80',
    category: cat('teknologi'),
    author: AUTHORS[2]!,
    tags: ['TypeScript', 'WebDev', 'Tips'],
    publishedAt: '15 Okt 2026',
    readTimeMinutes: 8,
    status: 'published' as ArticleStatus,
  },
  {
    id: 10,
    slug: 'fitur-terbaru-vue-3-5',
    title: 'Eksplorasi Fitur Terbaru Vue 3.5 dan Vapor Mode',
    excerpt:
      'Vapor mode menjanjikan performa luar biasa tanpa Virtual DOM. Apakah ini masa depan framework frontend?',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    category: cat('teknologi'),
    author: AUTHORS[3]!,
    tags: ['Vue', 'VaporMode', 'Frontend'],
    publishedAt: '18 Okt 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 11,
    slug: 'optimasi-performa-gambar',
    title: 'Optimasi Performa Gambar di Website Modern',
    excerpt:
      'Menggunakan format WebP, Avif, dan teknik lazy loading untuk mendapatkan skor Core Web Vitals yang sempurna.',
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    category: cat('teknologi'),
    author: AUTHORS[4]!,
    tags: ['Performance', 'WebVitals', 'Images'],
    publishedAt: '20 Okt 2026',
    readTimeMinutes: 4,
    status: 'published' as ArticleStatus,
  },
  {
    id: 12,
    slug: 'cara-menggunakan-ai-konten-marketing',
    title: 'Cara Menggunakan AI untuk Konten Marketing',
    excerpt:
      'Ketahui bagaimana teknologi kecerdasan buatan dapat membantu Anda menciptakan konten yang lebih relevan dan menarik bagi audiens Anda.',
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    category: cat('bisnis'),
    author: AUTHORS[0]!,
    tags: ['AI', 'Marketing', 'ContentStrategy'],
    publishedAt: '28 Mar 2026',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 13,
    slug: 'branding-personal-linkedin',
    title: 'Membangun Branding Personal di LinkedIn',
    excerpt:
      'Panduan lengkap langkah demi langkah untuk membangun profil profesional yang kuat dan menarik peluang kerja impian Anda.',
    coverImage:
      'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80',
    category: cat('bisnis'),
    author: AUTHORS[2]!,
    tags: ['LinkedIn', 'PersonalBranding', 'Career'],
    publishedAt: '25 Mar 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 14,
    slug: 'desain-minimalis-less-is-more',
    title: 'Desain Minimalis: Mengapa Less is More?',
    excerpt:
      'Eksplorasi tren desain grafis tahun ini yang kembali mengusung kesederhanaan namun tetap memberikan dampak visual yang maksimal.',
    coverImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252729f?auto=format&fit=crop&w=800&q=80',
    category: cat('desain'),
    author: AUTHORS[1]!,
    tags: ['Minimalism', 'GraphicDesign', 'Trends'],
    publishedAt: '20 Mar 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  // ReadView full article
  {
    id: 15,
    slug: 'evolusi-desain-web',
    title: 'Evolusi Desain Web: Dari Tabel Hingga AI-Driven UI',
    excerpt:
      'Perjalanan waktu dunia desain web dari halaman statis berbasis tabel hingga interface dinamis yang ditenagai kecerdasan buatan.',
    coverImage:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: 'Ilustrasi proses desain interface modern.',
    category: cat('desain'),
    author: AUTHORS[0]!,
    tags: ['WebDesign', 'UIUX', 'History', 'TechTrends'],
    publishedAt: '15 Apr 2026',
    readTimeMinutes: 10,
    status: 'published' as ArticleStatus,
    content: `Selamat datang di perjalanan waktu dunia desain web. Dalam dua dekade terakhir, kita telah melihat transformasi luar biasa dari halaman statis berbasis tabel hingga interface dinamis yang ditenagai oleh kecerdasan buatan.

### Era Awal: HTML Tabel (1995-2000)
Pada awalnya, tata letak web sangat kaku. Desainer menggunakan tag \`<table>\` untuk memaksa elemen berada di posisi tertentu. Sangat tidak responsif, namun itulah standar pada masanya.

> "Web adalah kanvas kosong, dan tabel adalah grid pertama kami."

### Revolusi CSS (2000-2010)
Munculnya **CSS** mengubah segalanya. Pemisahan konten (HTML) dan presentasi (CSS) memungkinkan fleksibilitas yang belum pernah ada sebelumnya. Kita mulai mengenal tata letak berbasis *float* dan *positioning*.

### Era Modern: Flexbox, Grid, & AI (Sekarang-2026)
Hari ini, kita memiliki alat canggih seperti CSS Grid dan Flexbox. Namun, inovasi terbesar adalah penggunaan **AI** untuk menghasilkan komponen UI secara otomatis berdasarkan *prompt* pengguna, dan mengoptimalkan pengalaman pengguna secara real-time.

---
Evolusi ini membuktikan bahwa adaptasi adalah kunci utama dalam dunia teknologi.`,
  },
]

// --- Computed Helpers ---
// Removed redundant functions here as they are moved to ArticleService.
