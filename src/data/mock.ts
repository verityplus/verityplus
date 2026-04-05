/**
 * Verity+ Mock Data
 * Centralized data source — will be replaced by API calls later.
 */
import type { Article, Author, Category, ArticleStatus } from '@/shared/types'

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

const cat = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!

export const ARTICLES: Article[] = [
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
  {
    id: 16,
    slug: 'misi-eksplorasi-palung-mariana-2026',
    title: 'Misi Eksplorasi Palung Mariana: Menyingkap Misteri Laut Dalam',
    excerpt:
      'Ekspedisi terbaru berhasil merekam spesies baru di kedalaman 10.000 meter yang memiliki kemampuan bioluminesensi unik.',
    coverImage:
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['Ocean', 'MarineBiology', 'Science'],
    publishedAt: '2 Hari yang lalu',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 17,
    slug: 'persiapan-olimpiade-los-angeles-2028',
    title: 'Menuju Olimpiade 2028: Kesiapan Tuan Rumah dan Prediksi Medali',
    excerpt:
      'Analisis infrastruktur dan persiapan atlet nasional dalam menghadapi ajang olahraga terbesar di dunia dua tahun mendatang.',
    coverImage:
      'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['Olympics', 'Sports', 'LA2028'],
    publishedAt: '3 Hari yang lalu',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 18,
    slug: 'startup-ai-lokal-raih-pendanaan',
    title: 'Startup AI Lokal Raih Pendanaan Seri B Senilai $50 Juta',
    excerpt:
      'Investor asing mulai melirik potensi kecerdasan buatan di pasar Asia Tenggara dengan suntikan dana fantastis.',
    coverImage:
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80',
    category: cat('bisnis'),
    author: AUTHORS[0]!,
    tags: ['Startup', 'Funding', 'Business'],
    publishedAt: '4 Hari yang lalu',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 19,
    slug: 'mengenal-frugal-living',
    title: 'Mengenal Frugal Living: Rahasia Bebas Finansial di Usia Muda',
    excerpt:
      'Gaya hidup hemat dan sadar pengeluaran kini menjadi tren di kalangan milenial untuk mencapai kemerdekaan finansial.',
    coverImage:
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['Finance', 'FrugalLiving', 'Lifestyle'],
    publishedAt: '1 Minggu yang lalu',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 20,
    slug: 'dampak-suku-bunga-global-2026',
    title: 'Dampak Kenaikan Suku Bunga Global Terhadap UMKM',
    excerpt:
      'Pakar ekonomi memprediksi tantangan likuiditas baru bagi pelaku usaha mikro akibat penyesuaian suku bunga bank sentral.',
    coverImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    category: cat('ekonomi'),
    author: AUTHORS[0]!,
    tags: ['Economy', 'InterestRates', 'UMKM'],
    publishedAt: '1 Minggu yang lalu',
    readTimeMinutes: 8,
    status: 'published' as ArticleStatus,
  },
  {
    id: 21,
    slug: 'warna-pastel-kembali-mendominasi-ui',
    title: 'Warna Pastel Kembali Mendominasi Tren UI 2026',
    excerpt:
      'Setelah era mode gelap (dark mode), kini para desainer mulai beralih ke palet warna pastel yang lebih lembut dan menenangkan.',
    coverImage:
      'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80',
    category: cat('desain'),
    author: AUTHORS[1]!,
    tags: ['UI', 'ColorPalette', 'DesignTrends'],
    publishedAt: '2 Minggu yang lalu',
    readTimeMinutes: 4,
    status: 'published' as ArticleStatus,
  },
  {
    id: 22,
    slug: 'penemuan-eksoplanet-baru-mirip-bumi',
    title: 'Teleskop James Webb Temukan Eksoplanet Baru Mirip Bumi',
    excerpt:
      'Planet sejauh 40 tahun cahaya ini terdeteksi memiliki atmosfer yang kaya akan uap air dan karbon dioksida.',
    coverImage:
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['Space', 'Exoplanet', 'JamesWebb'],
    publishedAt: '2 Minggu yang lalu',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 23,
    slug: 'analisis-taktik-formasi-modern',
    title: 'Bedah Taktik: Mengapa Formasi 3-2-4-1 Sangat Populer?',
    excerpt:
      'Menganalisis evolusi taktik sepak bola Eropa dan bagaimana formasi asimetris menguasai liga-liga top.',
    coverImage:
      'https://images.unsplash.com/photo-1518605368461-1ee1829e006c?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['Football', 'Tactics', 'SportsAnalysis'],
    publishedAt: '3 Minggu yang lalu',
    readTimeMinutes: 9,
    status: 'published' as ArticleStatus,
  },
  {
    id: 24,
    slug: 'pentingnya-digital-detox',
    title: 'Pentingnya Digital Detox di Era Hyperconnected',
    excerpt:
      'Melepas diri dari layar gawai sesaat ternyata terbukti mampu menurunkan tingkat stres hingga 40 persen.',
    coverImage:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['MentalHealth', 'DigitalDetox', 'Wellness'],
    publishedAt: '1 Bulan yang lalu',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 25,
    slug: 'komputasi-kuantum-kapan-tersedia',
    title: 'Komputasi Kuantum: Kapan Akan Tersedia untuk Publik?',
    excerpt:
      'Meskipun masih dalam tahap eksperimental, raksasa teknologi berlomba memecahkan supremasi kuantum untuk komersialisasi.',
    coverImage:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    category: cat('teknologi'),
    author: AUTHORS[1]!,
    tags: ['QuantumComputing', 'TechFuture', 'Hardware'],
    publishedAt: '1 Bulan yang lalu',
    readTimeMinutes: 8,
    status: 'published' as ArticleStatus,
  },
  {
    id: 26,
    slug: 'terobosan-fusi-nuklir-2026',
    title: 'Terobosan Fusi Nuklir: Harapan Baru Energi Bersih Tanpa Batas',
    excerpt:
      'Fasilitas reaktor fusi di Eropa berhasil mempertahankan plasma panas selama lebih dari satu menit, memecahkan rekor dunia sebelumnya.',
    coverImage:
      'https://images.unsplash.com/photo-1533044309907-0fa3413da946?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['Nuclear', 'Energy', 'Science'],
    publishedAt: '1 Feb 2026',
    readTimeMinutes: 8,
    status: 'published' as ArticleStatus,
  },
  {
    id: 27,
    slug: 'motogp-2026-sirkuit-mandalika',
    title: 'MotoGP 2026: Persiapan Sirkuit Mandalika Menyambut Seri Pembuka',
    excerpt:
      'Peningkatan fasilitas tribun dan aspal sirkuit dipastikan selesai sebelum tes pramusim dimulai bulan depan.',
    coverImage:
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['MotoGP', 'Mandalika', 'Racing'],
    publishedAt: '3 Feb 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 28,
    slug: 'kacamata-ar-apple-generasi-baru',
    title: 'Apple Rilis Kacamata AR Generasi Terbaru dengan Desain Ultra-Tipis',
    excerpt:
      'Perangkat komputasi spasial kini semakin mirip dengan kacamata baca biasa namun dengan kemampuan visual yang menakjubkan.',
    coverImage:
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80',
    category: cat('teknologi'),
    author: AUTHORS[1]!,
    tags: ['AR', 'Apple', 'Gadget'],
    publishedAt: '5 Feb 2026',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 29,
    slug: 'strategi-omnichannel-retail-modern',
    title: 'Strategi Omnichannel: Kunci Sukses Retail Modern Pasca Pandemi',
    excerpt:
      'Menggabungkan pengalaman belanja fisik dan digital menjadi satu ekosistem yang mulus bagi konsumen.',
    coverImage:
      'https://images.unsplash.com/photo-1556740749-887f6717dea4?auto=format&fit=crop&w=800&q=80',
    category: cat('bisnis'),
    author: AUTHORS[0]!,
    tags: ['Retail', 'Omnichannel', 'Business'],
    publishedAt: '8 Feb 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 30,
    slug: 'kopi-spesialti-lokal-mendunia',
    title: 'Tren Kopi Spesialti: Biji Kopi Lokal Indonesia Semakin Mendunia',
    excerpt:
      'Petani kopi di berbagai daerah mulai berfokus pada kualitas panen untuk memenuhi permintaan pasar global.',
    coverImage:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['Coffee', 'Lifestyle', 'LocalBrand'],
    publishedAt: '10 Feb 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 31,
    slug: 'tipografi-brutalisme-desain-web',
    title: 'Tipografi Brutalisme: Melawan Aturan Klasik Desain Web',
    excerpt:
      'Tren penggunaan font super besar dan tata letak tidak beraturan yang justru menarik perhatian audiens Gen-Z.',
    coverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: cat('desain'),
    author: AUTHORS[1]!,
    tags: ['Typography', 'Brutalism', 'WebDesign'],
    publishedAt: '12 Feb 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 32,
    slug: 'cbdc-rupiah-digital-tahap-uji-coba',
    title: 'Rupiah Digital: Tahap Uji Coba CBDC di Sektor Perbankan',
    excerpt:
      'Bank Indonesia memulai fase implementasi mata uang digital bank sentral untuk transaksi wholesale.',
    coverImage:
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80',
    category: cat('ekonomi'),
    author: AUTHORS[0]!,
    tags: ['CBDC', 'Crypto', 'Finance'],
    publishedAt: '15 Feb 2026',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 33,
    slug: 'rekayasa-genetika-crispr-pertanian',
    title: 'Aplikasi CRISPR: Rekayasa Genetika Hasilkan Padi Tahan Kemarau',
    excerpt:
      'Solusi krisis pangan akibat perubahan iklim mulai terlihat melalui teknologi modifikasi genetik presisi.',
    coverImage:
      'https://images.unsplash.com/photo-1530836369250-ef71a3f5e439?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['CRISPR', 'Agriculture', 'Genetics'],
    publishedAt: '18 Feb 2026',
    readTimeMinutes: 8,
    status: 'published' as ArticleStatus,
  },
  {
    id: 34,
    slug: 'esports-resmi-olimpiade-remaja',
    title: 'E-Sports Resmi Dipertandingkan di Olimpiade Remaja 2026',
    excerpt:
      'Pengakuan komite olimpiade internasional menjadi tonggak sejarah baru bagi industri game kompetitif.',
    coverImage:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['Esports', 'Gaming', 'Olympics'],
    publishedAt: '20 Feb 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 35,
    slug: 'jaringan-6g-konektivitas-terabit',
    title: 'Menuju Era 6G: Konsep Konektivitas Terabit per Detik',
    excerpt:
      'Meski 5G belum sepenuhnya merata, para ilmuwan telah memulai standardisasi jaringan komunikasi generasi keenam.',
    coverImage:
      'https://images.unsplash.com/photo-1614064641913-6b71f3015f8a?auto=format&fit=crop&w=800&q=80',
    category: cat('teknologi'),
    author: AUTHORS[1]!,
    tags: ['6G', 'Telecommunications', 'FutureTech'],
    publishedAt: '22 Feb 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 36,
    slug: 'ekspansi-franchise-fnb-lokal',
    title: 'Ekspansi Agresif Franchise F&B Lokal ke Pasar Asia Tenggara',
    excerpt:
      'Brand makanan dan minuman lokal mulai mendirikan gerai di Malaysia dan Singapura dengan modal ventura.',
    coverImage:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    category: cat('bisnis'),
    author: AUTHORS[0]!,
    tags: ['FnB', 'Franchise', 'Business'],
    publishedAt: '25 Feb 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 37,
    slug: 'urban-farming-apartemen-sempit',
    title: 'Urban Farming di Apartemen: Berkebun Cerdas di Ruang Sempit',
    excerpt:
      'Sistem hidroponik vertikal dengan lampu LED khusus memungkinkan kaum urban memanen sayuran di balkon apartemen.',
    coverImage:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4ce11?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['UrbanFarming', 'Hydroponics', 'Lifestyle'],
    publishedAt: '27 Feb 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 38,
    slug: 'aksessibilitas-desain-antarmuka',
    title: 'Aksesibilitas dalam Desain: Mengapa Kontras Warna Sangat Penting',
    excerpt:
      'Panduan merancang antarmuka yang ramah bagi pengguna dengan gangguan penglihatan menurut standar WCAG terbaru.',
    coverImage:
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
    category: cat('desain'),
    author: AUTHORS[1]!,
    tags: ['Accessibility', 'UI', 'UX'],
    publishedAt: '28 Feb 2026',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 39,
    slug: 'pajak-karbon-industri-manufaktur',
    title: 'Implementasi Pajak Karbon: Tantangan Baru Industri Manufaktur',
    excerpt:
      'Regulasi pemerintah mengenai batasan emisi mulai berlaku penuh, memaksa pabrik beralih ke energi terbarukan.',
    coverImage:
      'https://images.unsplash.com/photo-1611270418597-a6cbf224c538?auto=format&fit=crop&w=800&q=80',
    category: cat('ekonomi'),
    author: AUTHORS[0]!,
    tags: ['CarbonTax', 'Manufacturing', 'Economy'],
    publishedAt: '1 Mar 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 40,
    slug: 'penemuan-fosil-dinosaurus-patagonia',
    title: 'Ahli Paleontologi Temukan Spesies Dinosaurus Karnivora Baru di Patagonia',
    excerpt:
      'Fosil utuh dari predator puncak yang hidup 80 juta tahun lalu ini memberikan wawasan baru tentang rantai makanan prasejarah.',
    coverImage:
      'https://images.unsplash.com/photo-1518365050014-70fe7232897f?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['Paleontology', 'Dinosaurs', 'Science'],
    publishedAt: '3 Mar 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 41,
    slug: 'nba-draft-2026-prospek-muda',
    title: 'NBA Draft 2026: Mengulas Prospek Pemain Muda Berbakat dari Eropa',
    excerpt:
      'Dominasi pemain internasional di liga basket Amerika diprediksi akan terus berlanjut pada draft tahun ini.',
    coverImage:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['NBA', 'Basketball', 'Draft'],
    publishedAt: '5 Mar 2026',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 42,
    slug: 'keamanan-siber-era-ai',
    title: 'Keamanan Siber di Era AI: Ancaman Serangan Otomatis',
    excerpt:
      'Hacker kini menggunakan machine learning untuk mencari kerentanan sistem secara real-time. Bagaimana cara kita bertahan?',
    coverImage:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    category: cat('teknologi'),
    author: AUTHORS[1]!,
    tags: ['CyberSecurity', 'AI', 'Hacking'],
    publishedAt: '7 Mar 2026',
    readTimeMinutes: 8,
    status: 'published' as ArticleStatus,
  },
  {
    id: 43,
    slug: 'investasi-emas-digital-milenial',
    title: 'Tren Investasi Emas Digital di Kalangan Milenial dan Gen Z',
    excerpt:
      'Aplikasi micro-investing membuat pembelian emas menjadi sangat terjangkau, mengubah cara anak muda menabung.',
    coverImage:
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    category: cat('bisnis'),
    author: AUTHORS[0]!,
    tags: ['Investment', 'Gold', 'Finance'],
    publishedAt: '10 Mar 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 44,
    slug: 'mode-berkelanjutan-thrifting',
    title: 'Mode Berkelanjutan: Thrifting Bukan Sekadar Tren, Melainkan Gaya Hidup',
    excerpt:
      'Pasar pakaian bekas berkualitas (pre-loved) terus melonjak seiring kesadaran akan bahaya fast fashion.',
    coverImage:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['Fashion', 'Thrifting', 'EcoFriendly'],
    publishedAt: '12 Mar 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 45,
    slug: 'animasi-mikro-ui-ux',
    title: 'Animasi Mikro (Micro-interactions): Detail Kecil yang Menghidupkan UI',
    excerpt:
      'Efek transisi sederhana pada tombol atau menu dapat meningkatkan kepuasan dan keterlibatan pengguna secara signifikan.',
    coverImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    category: cat('desain'),
    author: AUTHORS[1]!,
    tags: ['MicroInteractions', 'Animation', 'UIUX'],
    publishedAt: '14 Mar 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 46,
    slug: 'prediksi-ihsg-kuartal-dua-2026',
    title: 'Prediksi Pergerakan IHSG di Kuartal Kedua 2026',
    excerpt:
      'Sektor perbankan dan barang konsumsi diprediksi akan memimpin penguatan indeks saham gabungan.',
    coverImage:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    category: cat('ekonomi'),
    author: AUTHORS[0]!,
    tags: ['IHSG', 'StockMarket', 'Economy'],
    publishedAt: '16 Mar 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 47,
    slug: 'terapi-mrna-kanker-kulit',
    title: 'Uji Klinis Vaksin mRNA Tunjukkan Hasil Positif pada Penderita Kanker Kulit',
    excerpt:
      'Teknologi yang sukses menghentikan pandemi kini diadaptasi untuk mengajarkan sistem imun menyerang sel tumor spesifik.',
    coverImage:
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['mRNA', 'Medicine', 'Health'],
    publishedAt: '18 Mar 2026',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 48,
    slug: 'persaingan-tenis-grand-slam-2026',
    title: 'Grand Slam 2026: Munculnya Rivalitas Baru di Dunia Tenis Pria',
    excerpt:
      'Era "Big Three" telah berakhir, kini petenis muda saling bergantian memperebutkan gelar prestisius.',
    coverImage:
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['Tennis', 'GrandSlam', 'Sports'],
    publishedAt: '20 Mar 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 49,
    slug: 'smart-home-berbasis-matter',
    title: 'Standar Matter: Akhir dari Fragmentasi Perangkat Smart Home',
    excerpt:
      'Protokol universal ini memungkinkan perangkat dari berbagai merek berbeda saling berkomunikasi tanpa hambatan.',
    coverImage:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    category: cat('teknologi'),
    author: AUTHORS[1]!,
    tags: ['SmartHome', 'IoT', 'Matter'],
    publishedAt: '22 Mar 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 50,
    slug: 'perlindungan-pekerja-gig-economy',
    title: 'Regulasi Baru Gig Economy: Menjamin Hak Pekerja Lepas',
    excerpt:
      'Pemerintah merumuskan undang-undang baru untuk memberikan jaminan sosial bagi pengemudi ojek online dan freelancer.',
    coverImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: cat('bisnis'),
    author: AUTHORS[0]!,
    tags: ['GigEconomy', 'Freelance', 'Regulation'],
    publishedAt: '24 Mar 2026',
    readTimeMinutes: 7,
    status: 'published' as ArticleStatus,
  },
  {
    id: 51,
    slug: 'tren-wisata-kebugaran-bali',
    title: 'Wisata Kebugaran (Wellness Tourism) Makin Diminati di Bali',
    excerpt:
      'Turis kini mencari paket liburan yang fokus pada detoksifikasi, yoga, dan retret meditasi untuk kesehatan mental.',
    coverImage:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    category: cat('gaya-hidup'),
    author: AUTHORS[2]!,
    tags: ['Wellness', 'Bali', 'Travel'],
    publishedAt: '26 Mar 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 52,
    slug: 'ilustrasi-3d-gantikan-flat-design',
    title: 'Apakah Ilustrasi 3D Sepenuhnya Menggeser Flat Design?',
    excerpt:
      'Penggunaan elemen tiga dimensi interaktif di situs web semakin mudah berkat kemajuan WebGL dan library seperti Three.js.',
    coverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: cat('desain'),
    author: AUTHORS[1]!,
    tags: ['3DDesign', 'WebGL', 'UI'],
    publishedAt: '28 Mar 2026',
    readTimeMinutes: 6,
    status: 'published' as ArticleStatus,
  },
  {
    id: 53,
    slug: 'ekspor-makanan-laut-indonesia-naik',
    title: 'Kinerja Ekspor Makanan Laut Indonesia Tembus Rekor Baru',
    excerpt:
      'Permintaan udang dan tuna dari pasar Amerika Serikat dan Jepang mendorong surplus neraca perdagangan perikanan.',
    coverImage:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80',
    category: cat('ekonomi'),
    author: AUTHORS[0]!,
    tags: ['Export', 'Fishery', 'Economy'],
    publishedAt: '30 Mar 2026',
    readTimeMinutes: 5,
    status: 'published' as ArticleStatus,
  },
  {
    id: 54,
    slug: 'mencairnya-es-kutub-utara-2026',
    title: 'Laporan Iklim: Laju Mencairnya Es Kutub Utara Semakin Mengkhawatirkan',
    excerpt:
      'Satelit pemantau lingkungan mencatat anomali suhu ekstrem yang mempercepat hilangnya lapisan es permanen.',
    coverImage:
      'https://images.unsplash.com/photo-1548268770-66184aae1860?auto=format&fit=crop&w=800&q=80',
    category: cat('sains'),
    author: AUTHORS[3]!,
    tags: ['ClimateChange', 'Arctic', 'Environment'],
    publishedAt: '1 Apr 2026',
    readTimeMinutes: 8,
    status: 'published' as ArticleStatus,
  },
  {
    id: 55,
    slug: 'marathon-tokyo-2026-rekor-baru',
    title: 'Tokyo Marathon 2026: Pelari Kenya Pecahkan Rekor Lintasan',
    excerpt:
      'Cuaca yang mendukung dan rute baru yang lebih datar membantu para elit mencetak catatan waktu terbaik.',
    coverImage:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
    category: cat('olahraga'),
    author: AUTHORS[4]!,
    tags: ['Marathon', 'Running', 'Tokyo'],
    publishedAt: '2 Apr 2026',
    readTimeMinutes: 4,
    status: 'published' as ArticleStatus,
  },
]
