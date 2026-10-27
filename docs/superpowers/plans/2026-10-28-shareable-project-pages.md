# Shareable Project Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Beri tiap project URL sendiri (`/<locale>/projects/<slug>`) yang crawlable & shareable, tampil sebagai panel samping di layar lebar dan halaman penuh di ponsel/akses langsung.

**Architecture:** Pindahkan data project ke modul bersama yang bisa dibaca server & client. Buat route asli `[locale]/projects/[slug]` (server-rendered, metadata + OG) dan intercept-nya lewat parallel route `@modal` di root layout agar navigasi dari homepage memunculkan panel tanpa pindah halaman. Satu komponen detail dipakai ulang: full-width di halaman asli, panel ramping saat di-intercept, adaptif via CSS untuk ponsel.

**Tech Stack:** Next.js 15 App Router, next-intl (locale segment `[locale]`), TypeScript, Tailwind, framer-motion, lucide-react.

**Spec:** `docs/superpowers/specs/2026-10-28-shareable-project-pages-design.md`

## Global Constraints

- Next.js App Router + next-intl; locales `['en','id']`, default `id`, prefix `always`.
- Semua navigasi internal pakai wrapper next-intl dari `src/i18n/routing.ts` (`Link`, `useRouter`, `usePathname`) agar locale terjaga — JANGAN `next/link` / `next/navigation` langsung untuk navigasi berlokalisasi.
- **Tidak ada test framework** di project ini. Verifikasi = `npx tsc --noEmit` (harus EXIT 0), `npm run lint` (bersih), `npm run build` (sukses), plus pengecekan manual skenario routing. Jangan menambah Jest/Vitest/Playwright.
- Slug permanen, persis seperti tabel di spec §5 — tidak boleh berubah.
- Judul/deskripsi project tetap dari `src/messages/{id,en}.json` kunci `p1_title..p10_desc`. Jangan hardcode string dwibahasa.
- Gaya visual mengikuti yang ada: `glass-premium`, warna gradient per project, background `#060311`.
- Gambar project di `public/projects/`.

## Review Focus

Input/kondisi yang disiratkan spec tapi tak punya unit test (project ini tak punya test runner), dicek manual di task pemiliknya:

1. **Slug tidak dikenal** (`/projects/tidak-ada`) → harus `notFound()` (404), bukan crash. → Task 3.
2. **Akses langsung / hard-refresh** ke `/projects/<slug>` (tanpa soft-nav) → harus render halaman penuh server-rendered, BUKAN 404 (ini inti SEO; risiko `default.tsx` hilang). → Task 4.
3. **Locale non-default** (`/en/projects/<slug>`) → konten & metadata dalam bahasa Inggris; link balik menjaga `/en`. → Task 3 & 5.
4. **Back/Forward browser** setelah membuka panel → panel tertutup/terbuka mengikuti history, body scroll pulih. → Task 4.
5. **Project tanpa screenshot** di-share → OG image generik tampil, bukan kosong. → Task 5.

---

## File Structure

- `src/data/projects.ts` — **Create.** Sumber kebenaran tunggal metadata project (slug, kategori, tahun, tags, icon, image, detailImages, links, color, span, titleKey, descKey) + helper `getProjectBySlug`, `getAllSlugs`. Dibaca client (`Projects.tsx`) & server (route `[slug]`).
- `src/components/projects/ProjectDetail.tsx` — **Create.** Komponen presentasi detail satu project (client). Prop `variant: 'page' | 'panel'`. Mengambil teks via `useTranslations`. Isi: gambar, kategori/tahun, judul, tags, deskripsi, detailImages, tombol aksi. Dipakai halaman asli & intercept.
- `src/components/projects/ProjectPanel.tsx` — **Create.** Pembungkus client untuk mode intercept: backdrop + panel slide-from-right (framer-motion), tombol close pakai `router.back()`, scroll-lock, Esc-to-close. Membungkus `ProjectDetail variant="panel"`.
- `src/components/sections/Projects.tsx` — **Modify.** Hapus array inline; baca `src/data/projects.ts`. Kartu jadi `Link` next-intl ke `/projects/<slug>`. Hapus state drawer & seluruh blok drawer lama (dipindah ke route).
- `src/app/[locale]/projects/[slug]/page.tsx` — **Create.** Server component halaman asli. `generateStaticParams`, `generateMetadata`, render `ProjectDetail variant="page"` + tombol kembali.
- `src/app/[locale]/@modal/default.tsx` — **Create.** Return `null` (slot kosong saat tak ada intercept).
- `src/app/[locale]/@modal/(.)projects/[slug]/page.tsx` — **Create.** Route ter-intercept; render `ProjectPanel`.
- `src/app/[locale]/layout.tsx` — **Modify.** Terima prop `modal`, render `{children}` + `{modal}`.
- `src/app/[locale]/projects/[slug]/opengraph-image.tsx` — **Create.** OG image dinamis (next/og `ImageResponse`) untuk project tanpa screenshot; project ber-screenshot pakai gambarnya via metadata.
- `src/app/sitemap.ts` — **Modify.** Tambah entri tiap slug × locale.

---

## Task 1: Modul data project bersama

**Files:**
- Create: `src/data/projects.ts`
- Verify: `npx tsc --noEmit`

**Interfaces:**
- Produces:
  - `type ProjectLinks = { demo?: string; github?: string; npm?: string }`
  - `interface ProjectMeta { slug: string; titleKey: string; descKey: string; categoryIndex: 0|1|2|3; year: string; tags: string[]; iconName: string; image?: string; detailImages?: string[]; links: ProjectLinks; color: string; span?: string }`
  - `const projects: ProjectMeta[]` — 10 entri, urutan sama seperti `Projects.tsx` sekarang (p10 dulu, lalu p9, p7, p1, p2, p3, p4, p5, p6, p8).
  - `function getProjectBySlug(slug: string): ProjectMeta | undefined`
  - `function getAllSlugs(): string[]`
  - `const PROJECT_ICONS: Record<string, LucideIcon>` — map `iconName` → komponen lucide (`Database`, `Zap`, `Package`, `Globe`, `ShieldCheck`). Agar data (string) bisa di-serialize/dibaca server, komponen di-resolve lewat map ini.

**Slug (dari spec §5, permanen):** p10→`husnul-bakery-erp`, p9→`just-fun-tournament`, p7→`bouquet-builder`, p1→`kemafar`, p2→`typing-test`, p3→`vehicle-seatpicker`, p4→`nextjs-supabase-starter`, p5→`laravel-12-starter-kit`, p6→`golang-starter-kit`, p8→`comment-spam-detection`.

- [ ] **Step 1: Buat `src/data/projects.ts`** dengan tipe & interface di atas, array `projects` (pindahkan tiap field dari array inline `Projects.tsx:51-158`, ganti `icon: Database` → `iconName: 'Database'`, `title: t('p10_title')` → `titleKey: 'p10_title'` + `descKey: 'p10_desc'`, `category: categories[0]` → `categoryIndex: 0`), serta `PROJECT_ICONS`, `getProjectBySlug`, `getAllSlugs`.

- [ ] **Step 2: Type-check** — Run: `npx tsc --noEmit` — Expected: EXIT 0.

- [ ] **Step 3: Commit**
```bash
git add src/data/projects.ts
git commit -m "feat: extract project data into shared module with slugs"
```

---

## Task 2: Komponen ProjectDetail + refactor Projects.tsx jadi link

**Files:**
- Create: `src/components/projects/ProjectDetail.tsx`
- Modify: `src/components/sections/Projects.tsx`
- Verify: `npx tsc --noEmit`, `npm run lint`, `npm run build`

**Interfaces:**
- Consumes: `projects`, `ProjectMeta`, `PROJECT_ICONS` dari Task 1; `useTranslations('Projects')`.
- Produces:
  - `ProjectDetail({ project, variant }: { project: ProjectMeta; variant: 'page' | 'panel' })` — client component. `variant='page'` → layout 2 kolom lebar (reuse markup drawer lama `Projects.tsx:318-394`). `variant='panel'` → 1 kolom vertikal ramping. Teks via `useTranslations`: `t(project.titleKey)`, `t(project.descKey)`. Kategori di-resolve `t('cat1'..'cat4')[categoryIndex]`. Icon via `PROJECT_ICONS[project.iconName]`. Tombol aksi (demo/github/npm) sama seperti sekarang, pakai label `t('livePreview')` dll.

- [ ] **Step 1: Buat `ProjectDetail.tsx`** (`'use client'`). Dua cabang `variant`. Untuk `page`: pindahkan markup gambar hero + 2 kolom (deskripsi + aksi) dari drawer lama. Untuk `panel`: susun 1 kolom (gambar → kategori/tahun → judul → tags → deskripsi → detailImages → tombol). Keduanya pakai data `ProjectMeta`, bukan `selectedProject`.

- [ ] **Step 2: Modify `Projects.tsx`** — hapus `interface Project` lokal, array inline, `useState(selectedProject)`, `useEffect` scroll-lock, dan seluruh blok `<AnimatePresence>` drawer (`Projects.tsx:264-399`). Baca `projects` dari `src/data/projects.ts`. Kategori tetap `[t('cat1')..t('cat4')]`; filter pakai `categoryIndex` (`projects.filter(p => categories[p.categoryIndex] === activeTab)`). Bungkus tiap kartu dengan `Link` next-intl (`import { Link } from '../../i18n/routing'`) `href={'/projects/' + project.slug}`. Judul kartu `t(project.titleKey)`, icon `PROJECT_ICONS[project.iconName]`, gambar `project.image`.

- [ ] **Step 3: Type-check & lint** — Run: `npx tsc --noEmit && npm run lint` — Expected: EXIT 0, lint bersih.

- [ ] **Step 4: Build** — Run: `npm run build` — Expected: sukses.

- [ ] **Step 5: Commit**
```bash
git add src/components/projects/ProjectDetail.tsx src/components/sections/Projects.tsx
git commit -m "feat: project cards link to detail route, extract ProjectDetail"
```

---

## Task 3: Halaman asli `/projects/[slug]` + metadata

**Files:**
- Create: `src/app/[locale]/projects/[slug]/page.tsx`
- Verify: `npx tsc --noEmit`, `npm run build`, pengecekan manual.

**Interfaces:**
- Consumes: `getProjectBySlug`, `getAllSlugs`, `projects` (Task 1); `ProjectDetail` (Task 2); `getTranslations`, `setRequestLocale` dari `next-intl/server`; `siteConfig`.
- Produces: default export server component `ProjectPage`; `generateStaticParams`; `generateMetadata`.

- [ ] **Step 1: Buat `page.tsx`** (server). Params `Promise<{ locale: string; slug: string }>`. `setRequestLocale(locale)`. `const project = getProjectBySlug(slug)`; jika `undefined` → `notFound()`. Render pembungkus layar penuh (bg `#060311`, `min-h-screen`) + tombol kembali (`Link` next-intl ke `/#projects`) + `<ProjectDetail project={project} variant="page" />`.

- [ ] **Step 2: `generateStaticParams`** — untuk tiap locale × tiap slug (`routing.locales` × `getAllSlugs()`), return `{ locale, slug }`.

- [ ] **Step 3: `generateMetadata`** — `const t = await getTranslations({ locale, namespace: 'Projects' })`. Title `t(project.titleKey)`, description `t(project.descKey)`. `openGraph`: title, description, `url: ${siteConfig.url}/${locale}/projects/${slug}`, `type: 'article'`, `images: [project.image ?? '<OG generik dari Task 5>']`. `twitter`: `summary_large_image`. (metadataBase diwarisi root layout — jangan set ulang.) Slug tak dikenal: karena `generateStaticParams` menghasilkan hanya slug valid & `dynamicParams` default, slug lain tetap kena `notFound()` di Step 1.

- [ ] **Step 4: Type-check & build** — Run: `npx tsc --noEmit && npm run build` — Expected: EXIT 0; build me-list route `/[locale]/projects/[slug]` sebagai static (SSG) dengan 20 path (10 slug × 2 locale).

- [ ] **Step 5: Verifikasi manual (Review Focus 1 & 3)** — `npm run build && npm start`, lalu:
  - `curl -s localhost:3000/id/projects/husnul-bakery-erp | grep -o '<title>[^<]*'` → memuat judul project.
  - `curl -s -o /dev/null -w "%{http_code}" localhost:3000/id/projects/tidak-ada` → `404`.
  - `curl -s localhost:3000/en/projects/husnul-bakery-erp | grep -c 'og:'` → >0, konten Inggris.
  Catat hasil di pesan commit/laporan.

- [ ] **Step 6: Commit**
```bash
git add src/app/[locale]/projects
git commit -m "feat: add server-rendered project detail page with SEO metadata"
```

---

## Task 4: Intercepting route (panel) + slot @modal

**Files:**
- Create: `src/components/projects/ProjectPanel.tsx`
- Create: `src/app/[locale]/@modal/default.tsx`
- Create: `src/app/[locale]/@modal/(.)projects/[slug]/page.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Verify: `npx tsc --noEmit`, `npm run build`, pengecekan manual skenario.

**Interfaces:**
- Consumes: `getProjectBySlug` (Task 1); `ProjectDetail variant="panel"` (Task 2); `useRouter` dari `src/i18n/routing.ts`.
- Produces: `ProjectPanel({ project }: { project: ProjectMeta })` client component.

- [ ] **Step 1: Buat `ProjectPanel.tsx`** (`'use client'`). Backdrop (`fixed inset-0 bg-[#060311]/80 backdrop-blur-xl z-[100]`, klik → `router.back()`) + panel kanan ramping (`framer-motion` slide-in dari kanan, lebar `w-full max-w-[520px] md:max-w-[560px]`, `z-[101]`, scroll internal). Scroll-lock body saat mount (set `overflow hidden`, pulihkan saat unmount). Esc-to-close via listener → `router.back()`. Tombol X → `router.back()`. Isi `<ProjectDetail project={project} variant="panel" />`.

- [ ] **Step 2: Buat `@modal/default.tsx`** — `export default function Default() { return null }`.

- [ ] **Step 3: Buat `@modal/(.)projects/[slug]/page.tsx`** (server). Params `Promise<{ locale, slug }>`. `setRequestLocale(locale)`. `const project = getProjectBySlug(slug)`; jika undefined → `notFound()`. Render `<ProjectPanel project={project} />`. (Marker `(.)` benar karena slot `@modal` berada selevel `[locale]` dengan target `projects` — lihat spec §1 & builder note.)

- [ ] **Step 4: Modify `layout.tsx`** — tambah prop `modal: React.ReactNode` ke signature `RootLayout`, render `<Layout>{children}{modal}</Layout>` (modal di luar `main` tak masalah; panel `fixed`). Pastikan destructuring params tetap jalan.

- [ ] **Step 5: Type-check & build** — Run: `npx tsc --noEmit && npm run build` — Expected: EXIT 0.

- [ ] **Step 6: Verifikasi manual skenario (Review Focus 2 & 4)** — `npm run build && npm start`, buka browser:
  - Dari homepage (lebar ≥768px) klik kartu → **panel** muncul, URL `/id/projects/<slug>`, homepage masih di belakang.
  - Tekan **Back** → panel tertutup, kembali homepage, scroll pulih. **Forward** → panel muncul lagi.
  - **Hard-refresh** di URL panel → render **halaman penuh** (Task 3), BUKAN 404. ← kritikal; kalau 404, `default.tsx`/marker salah.
  - Ponsel (<768px, devtools responsive) klik kartu → full page (lihat Task 6 untuk penyempurnaan adaptif).
  Catat hasil tiap skenario.

- [ ] **Step 7: Commit**
```bash
git add src/components/projects/ProjectPanel.tsx "src/app/[locale]/@modal" "src/app/[locale]/layout.tsx"
git commit -m "feat: intercepting route renders project detail as side panel"
```

---

## Task 5: OG image generik + wiring fallback + sitemap

**Files:**
- Create: `src/app/[locale]/projects/[slug]/opengraph-image.tsx`
- Modify: `src/app/[locale]/projects/[slug]/page.tsx` (fallback image di `generateMetadata`)
- Modify: `src/app/sitemap.ts`
- Verify: `npx tsc --noEmit`, `npm run build`, pengecekan manual.

**Interfaces:**
- Consumes: `getProjectBySlug`, `getAllSlugs`, `routing.locales`, `getTranslations`, `siteConfig`.
- Produces: `opengraph-image` route (next/og `ImageResponse`, size 1200×630) + `generateStaticParams` + `alt`.

- [ ] **Step 1: Buat `opengraph-image.tsx`** — `import { ImageResponse } from 'next/og'`. `export const size = { width: 1200, height: 630 }`, `contentType = 'image/png'`. `generateStaticParams` = locale × slug. Default export async `Image({ params })`: resolve project & judul (`getTranslations`), render kartu bertema portfolio (background `#060311`, judul project besar, nama `siteConfig.name`, aksen gradient). Ini jadi OG untuk tiap project; project ber-screenshot akan override via metadata di Step 2.

- [ ] **Step 2: Modify `generateMetadata` (Task 3)** — set `openGraph.images`: jika `project.image` ada → gunakan `project.image` (screenshot asli); jika tidak → biarkan Next memakai `opengraph-image.tsx` otomatis (jangan set `images` manual untuk kasus ini). Konfirmasi 4 project tanpa gambar (nextjs-supabase-starter, laravel-12-starter-kit, golang-starter-kit; cek p3 vehicle-seatpicker apakah punya `bangbeli.png`) memakai OG generik.

- [ ] **Step 3: Modify `sitemap.ts`** — tambahkan, untuk tiap slug × locale, entri `{ url: ${appUrl}/${locale}/projects/${slug}, lastModified, changeFrequency: 'monthly', priority: 0.7 }`. Impor `getAllSlugs` & `routing.locales`.

- [ ] **Step 4: Type-check & build** — Run: `npx tsc --noEmit && npm run build` — Expected: EXIT 0; build me-list route `opengraph-image`.

- [ ] **Step 5: Verifikasi manual (Review Focus 5)** — `npm start`:
  - `curl -s -o /dev/null -w "%{http_code}" localhost:3000/id/projects/golang-starter-kit/opengraph-image` → `200`, content-type image.
  - `curl -s localhost:3000/sitemap.xml | grep -c projects` → 20.
  - Project ber-screenshot: `curl -s localhost:3000/id/projects/husnul-bakery-erp | grep 'og:image'` → menunjuk `husnul-dashboard.png`.

- [ ] **Step 6: Commit**
```bash
git add "src/app/[locale]/projects/[slug]/opengraph-image.tsx" "src/app/[locale]/projects/[slug]/page.tsx" src/app/sitemap.ts
git commit -m "feat: generic OG images for screenshot-less projects, add projects to sitemap"
```

---

## Task 6: Perilaku adaptif ponsel vs panel (finishing)

**Files:**
- Modify: `src/components/projects/ProjectPanel.tsx`
- Verify: `npx tsc --noEmit`, `npm run build`, pengecekan manual lintas lebar.

**Interfaces:** tak ada tipe baru; menyempurnakan render `ProjectPanel`.

Spec §2: di <768px hasil akhir harus terasa seperti halaman penuh, bukan panel sempit. Karena intercept diputuskan server (tak tahu viewport), pakai pendekatan CSS-adaptif pada komponen ter-intercept: pada `<md` panel mengisi seluruh layar (`inset-0`, `max-w-full`, tanpa backdrop blur di samping) sehingga identik dengan halaman penuh; pada `≥md` jadi panel ramping kanan.

- [ ] **Step 1: Sesuaikan `ProjectPanel.tsx`** — kelas responsif: container panel `inset-0 md:inset-y-0 md:right-0 md:left-auto`, lebar `w-full md:max-w-[560px]`, sudut & shadow hanya `md:`. Pada `<md`, `ProjectDetail` tetap `variant="panel"` tapi diberi padding/olahan agar nyaman full-screen (atau switch ke layout `page` di `<md` bila lebih rapi — builder pilih yang paling bersih, hasil akhir: terasa halaman penuh di ponsel).

- [ ] **Step 2: Type-check & build** — Run: `npx tsc --noEmit && npm run build` — Expected: EXIT 0.

- [ ] **Step 3: Verifikasi manual lintas lebar** — devtools responsive: 390px (ponsel) → tampil full-screen; 1280px (desktop) → panel ramping kanan. Back/Forward tetap benar di kedua lebar.

- [ ] **Step 4: Commit**
```bash
git add "src/components/projects/ProjectPanel.tsx"
git commit -m "feat: panel renders full-screen on mobile, slim side panel on desktop"
```

---

## Catatan eksekusi

- Urutan task berurutan: Task 1 → 6. Task 3 & 4 saling bergantung (panel reuse `notFound`/data), Task 4 bergantung pada halaman asli Task 3 untuk hard-refresh fallback.
- Risiko tertinggi (spec & builder review): interaksi intercepting route × next-intl middleware (`src/proxy.ts`) × `localePrefix: 'always'`. Dibuktikan di Task 4 Step 6 (4 skenario). Jika intercept tak firing / salah locale: cek urutan marker `(.)`, keberadaan `@modal/default.tsx`, dan apakah `proxy.ts` me-rewrite sebelum intercept — sesuaikan di Task 4 sebelum lanjut.
- Tak ada test runner → verifikasi bersandar pada build + type-check + lint + skenario manual (sesuai tooling project yang ada; menambah framework test di luar scope).
