# Shareable Project Pages — Design

**Date:** 2026-10-28
**Status:** Approved pending review

## Intent & Why

Saat ini detail tiap project di portfolio dibuka lewat state React
(`selectedProject`) di dalam `Projects.tsx` — bukan lewat URL. Akibatnya:

- Tidak ada link yang bisa di-copy / di-share ke project tertentu.
- Tidak bisa di-bookmark, tombol Back browser tidak membuka/menutup detail.
- Google tidak bisa meng-index detail project (nol nilai SEO), dan share
  ke WhatsApp/LinkedIn tidak menampilkan preview yang rapi.

Tujuan utama yang dipilih user secara eksplisit: **SEO + preview sosial
media**. Tiap project harus punya URL sendiri yang crawlable dan punya
Open Graph metadata.

## Goals

- Tiap project punya URL unik: `/<locale>/projects/<slug>`.
- URL bisa di-copy, di-bookmark, dan tombol Back/Forward browser bekerja.
- Halaman project server-rendered dengan metadata SEO lengkap:
  `<title>`, meta description, dan Open Graph tags (judul, deskripsi,
  gambar) — sehingga preview sosial media tampil rapi dan Google
  meng-index tiap project.
- UX tetap enak: di layar lebar, membuka project terasa seperti drawer
  (tidak pindah halaman penuh); di ponsel, langsung halaman penuh.
- Mendukung dua bahasa (id/en) yang sudah ada via next-intl.

## Non-Goals

- Tidak mengubah grid/daftar project, tab kategori, atau animasi kartu.
- Tidak membuat CMS / sumber data dinamis — data project tetap statis di
  dalam repo.
- Tidak menambah halaman index terpisah `/projects` (daftar project tetap
  di section pada homepage). Bisa jadi perbaikan lanjutan, di luar scope.

## Anti-Goals (yang membuat ini gagal walau "jalan")

- Jika demi drawer, konten project jadi tidak ter-render untuk crawler →
  tujuan SEO gagal. Halaman asli HARUS tetap server-rendered penuh.
- Jika URL yang sudah di-share bisa berubah/rusak saat judul project
  diedit → link mati. Slug harus stabil dan independen dari judul.

## Behavior (satu URL, tampilan adaptif per device)

URL selalu sama: `/<locale>/projects/<slug>`. Tampilan berbeda tergantung
cara masuk & lebar layar:

| Skenario | Tampilan |
|----------|----------|
| Di homepage, klik kartu project, layar **≥ 768px** | **Panel samping ramping** slide dari kanan; konten portfolio masih terlihat di belakang; URL berubah ke `/projects/<slug>` |
| Di homepage, klik kartu project, layar **< 768px** (ponsel) | **Halaman penuh** `/projects/<slug>` (layout lebar) |
| Buka link `/projects/<slug>` langsung (hasil share / bookmark) | **Halaman penuh** server-rendered |
| Google crawler / bot sosmed | **Halaman penuh** server-rendered + OG tags |

Breakpoint ponsel vs. bukan: **768px** (Tailwind `md`) — standar komunitas
dan sudah dipakai konsisten di codebase (`md:`).

## How (keputusan arsitektur)

### 1. Mekanisme routing: Next.js Intercepting Routes

Memanfaatkan App Router intercepting routes supaya SATU URL bisa tampil
sebagai panel (saat dinavigasi dari homepage) atau halaman penuh (saat
diakses langsung):

- `src/app/[locale]/projects/[slug]/page.tsx` — halaman penuh asli.
  Server component; generate metadata + OG. Ini yang dilihat crawler &
  akses langsung.
- `src/app/[locale]/@modal/(.)projects/[slug]/page.tsx` (atau pola
  parallel+intercepting route setara) — versi yang di-intercept, dirender
  sebagai panel samping saat navigasi client dari homepage.
- Homepage layout (`[locale]/layout.tsx`) menyediakan slot `@modal`.

Catatan implementasi (diserahkan ke builder): karena ada segmen
`[locale]`, intercept harus berada di dalam `[locale]`. Builder
memverifikasi pola `(.)` vs `(..)` yang benar relatif terhadap lokasi slot
parallel route, dan menguji ketiga jalur masuk pada tabel di atas.

### 2. Perilaku ponsel (full page, bukan panel)

Pada < 768px, panel samping di-skip dan user mendapat halaman penuh.
Builder memilih implementasi yang paling bersih di App Router (mis.
intercept hanya membuka panel pada lebar ≥ md via CSS/kondisi, atau pada
ponsel membiarkan navigasi menuju halaman penuh). Yang mengikat: di
ponsel hasil akhirnya halaman penuh, URL tetap `/projects/<slug>`.

### 3. Bentuk panel (desktop): panel samping ramping

Berbeda dari drawer lebar `max-w-7xl` yang sekarang. Panel baru:
- Ramping (~480–600px), menempel di kanan, slide-in dari kanan.
- Backdrop blur di belakang; konten homepage masih samar terlihat.
- Isi disusun **1 kolom vertikal**: gambar → kategori/tahun → judul →
  tags → deskripsi → gambar detail → tombol aksi (demo/github/npm).

Halaman penuh `/projects/<slug>` memakai layout **2 kolom lebar** (mirip
drawer besar yang ada sekarang: deskripsi + kolom aksi), yang jadi
tampilan untuk ponsel, share, dan crawler.

### 4. Data project dipindah ke modul bersama

Saat ini data ada di dalam `Projects.tsx` (`'use client'`) dan judul/
deskripsi diambil via `useTranslations` (hook client). Server component
tidak bisa pakai hook itu. Maka:

- Buat `src/data/projects.ts` berisi array metadata statis per project:
  `slug`, `category` (index), `year`, `tags`, `icon` (nama/komponen),
  `image`, `detailImages`, `links`, `color`, `span`, dan **kunci i18n**
  (`titleKey`, `descKey`) — bukan string jadi, supaya tetap dwibahasa.
- Judul/deskripsi tetap di `src/messages/id.json` & `src/messages/en.json`
  (sudah ada: kunci `p1_title..p10_desc`).
- `Projects.tsx` membaca dari modul ini (menggantikan array inline),
  lalu me-resolve teks via `useTranslations` seperti sekarang.
- Halaman server (`[slug]/page.tsx`) membaca modul yang sama dan
  me-resolve teks via `getTranslations` (API server next-intl).

### 5. Slug — DISETUJUI OWNER (daftar permanen)

Slug ditetapkan **eksplisit & manual per project** di `projects.ts`,
BUKAN auto-generate dari judul. Alasan: slug harus stabil, independen
dari bahasa (judul id ≠ en), dan tidak boleh berubah saat judul diedit
(menghindari link mati — selaras Anti-Goals).

Daftar permanen (disetujui owner 2026-10-28):

| Kunci i18n | Project | Slug |
|-----------|---------|------|
| p10 | Husnul Bakery ERP | `husnul-bakery-erp` |
| p9  | Just Fun Tournament | `just-fun-tournament` |
| p7  | Bouquet Builder | `bouquet-builder` |
| p1  | Kemafar.org | `kemafar` |
| p2  | Typing Test | `typing-test` |
| p3  | Vehicle Seatpicker | `vehicle-seatpicker` |
| p4  | Next.js Supabase Starter | `nextjs-supabase-starter` |
| p5  | Laravel 12 Starter Kit | `laravel-12-starter-kit` |
| p6  | Golang Starter Kit | `golang-starter-kit` |
| p8  | Comment Spam Detection | `comment-spam-detection` |

### 6. Metadata & SEO

- `generateMetadata` di `[slug]/page.tsx`: judul & deskripsi per project
  (sesuai locale), Open Graph (`og:title`, `og:description`, `og:image`,
  `og:type`, `og:url`), dan Twitter card.
- **OG image fallback (disetujui owner):** project yang punya screenshot
  memakai gambarnya sendiri. 4 project tanpa screenshot (Next.js Supabase
  Starter, Laravel 12 Kit, Golang Kit, Vehicle Seatpicker — walau p3
  punya `bangbeli.png`, cek saat implementasi) memakai **gambar OG
  generik bertema portfolio** yang akan dibuat (judul project + branding).
  Builder menentukan apakah OG generik dibuat statis per-project atau
  dinamis via route `opengraph-image`.
- `generateStaticParams` untuk pre-render semua slug × locale.
- Tambahkan URL tiap project ke `sitemap.ts` yang sudah ada.
- Reuse `metadataBase`/`siteConfig.url` dari root layout, jangan
  re-derive.

## Constraints

- Next.js App Router + next-intl dengan segmen `[locale]` (locales:
  `en`, `id`; default `id`).
- Navigasi harus pakai wrapper next-intl (`Link`/`useRouter` dari
  `src/i18n/routing.ts`) agar locale terjaga.
- Gambar project berada di `public/projects/`.

## Yang diserahkan ke builder

- Pola intercepting + parallel route yang persis benar relatif terhadap
  segmen `[locale]`, diverifikasi dengan menguji 4 skenario di tabel
  Behavior.
- Implementasi "ponsel = full page" yang paling bersih.
- Penataan ulang isi panel ramping (1 kolom) dan reuse layout 2 kolom
  untuk halaman penuh, memakai gaya visual yang sudah ada
  (`glass-premium`, warna gradient, dll).
- Daftar slug final untuk ke-10 project.
- Pengujian: build + type-check hijau; keempat skenario masuk berfungsi;
  back/forward browser benar; OG tags tampil (cek via `curl`/inspektur).
