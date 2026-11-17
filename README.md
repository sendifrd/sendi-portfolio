# Sendi Ferdiansyah — Professional IT Portfolio

Website portofolio pribadi untuk melamar magang dan pekerjaan di bidang teknologi informasi — terutama **Intern Strategi Pengembangan Sistem (Indonesia Financial Group)**, serta IT Business Analyst, System Analyst, IT Project Management, Data Analyst, ML Engineer dan AI Engineer.

Dibangun dengan Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, komponen bergaya shadcn/ui, Lucide dan Motion (Framer Motion). Seluruh konten diambil dari file data TypeScript, sehingga website, halaman CV, dan PDF portofolio selalu sinkron.

---

## 1. Project Overview

| Halaman | URL | Keterangan |
| --- | --- | --- |
| Beranda | `/` | Hero, About, Skills, Projects, Experience, Education, Contact |
| Daftar proyek | `/projects` | Semua case study + proyek tambahan |
| Case study | `/projects/jaga-lingkungan`, `/projects/guyub`, `/projects/transjakarta-analytics`, `/projects/fire-smoke-detection`, `/projects/blu-sentiment-analysis`, `/projects/stock-price-prediction` | Halaman detail per proyek |
| CV (PDF Anda) | `/cv/CV_Sendi_Ferdiansyah.pdf` | Diunduh oleh tombol **Download CV** |
| CV (English) | `/cv` | CV 1 halaman A4 dalam Bahasa Inggris, dibuat dari data, siap disimpan sebagai PDF |
| Portfolio PDF | `/portfolio/print` | Portofolio A4 multi-halaman, siap disimpan sebagai PDF |

**Prinsip kredibilitas.** Setiap konten yang belum Anda konfirmasi ditandai `verification: "draft"`:

- Di **development** (`npm run dev`), draf tampil dengan label kuning **“Draft — verify”**, bagian kosong tampil sebagai placeholder, dan ada panel **“Content to verify”** di pojok kanan bawah.
- Di **production** (`npm run build` / Vercel), draf, placeholder, status “unconfirmed”, dan tautan kosong **disembunyikan otomatis**. Jadi tidak ada klaim yang belum diverifikasi yang ikut terpublikasi.

## 2. Features

- Beranda profesional dengan hero animasi halus (gradient, grid, kartu proyek melayang) — tanpa foto orang lain.
- Navigasi sticky dengan penanda section aktif, menu mobile yang bisa ditutup dengan Escape, dan skip link.
- Desain editorial gelap (charcoal + biru langit): hero terbelah dengan nama besar kapital & panel foto, judul section kapital bergaris, foto berbingkai offset, kartu pendidikan bernomor, proyek dalam mockup laptop. Dark mode default, light mode tersedia lewat toggle, tanpa “flash”.
- Kartu proyek profesional dengan status (Planning / In Development / Completed), role, tech stack.
- Case study per proyek: daftar isi, metadata (role, tipe, status, repositori), section, user roles, fitur dikelompokkan per progres, teknologi, slot dokumentasi gambar.
- Skills berbasis kategori dan badge — **tanpa persentase** yang tidak bisa dibuktikan.
- Experience dengan transferable skills; nama perusahaan tidak dikarang.
- Education dengan coursework, academic projects, sertifikasi, prestasi.
- Contact tanpa formulir palsu — tombol **Let's Connect** membuka kanal nyata (email → LinkedIn → GitHub).
- **Download CV**: mengunduh file `public/cv/CV_Sendi_Ferdiansyah.pdf`. Versi Bahasa Inggris tersedia di `/cv` (link “CV (English)” di footer).
- **Download Portfolio PDF**: halaman A4 dengan nomor halaman, tanpa navbar/animasi saat dicetak; halaman yang kosong tidak dicetak.
- Loading skeleton, halaman error, `global-error`, dan halaman 404.
- SEO: metadata, Open Graph image otomatis, `sitemap.xml`, `robots.txt`, JSON-LD (schema.org `Person`), canonical URL.
- Keamanan: security headers + Content Security Policy, tanpa API key, tanpa backend.
- Aksesibilitas: HTML semantik, hierarki heading, fokus terlihat, `aria-*`, dukungan `prefers-reduced-motion`.

## 3. Technology Stack

| Area | Teknologi |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Cache Components, Turbopack) |
| UI | React 19.3, TypeScript 5 |
| Styling | Tailwind CSS 4.3 (design tokens di `app/globals.css`) |
| Komponen | shadcn/ui pattern (`components/ui/*` — Button, Badge, Card dengan `class-variance-authority`, `@radix-ui/react-slot`) |
| Ikon | `lucide-react` (+ ikon GitHub/LinkedIn inline di `components/icons.tsx`) |
| Animasi | `motion` v14 — penerus resmi Framer Motion (API sama, import dari `motion/react`) |
| Font | Inter & Plus Jakarta Sans (self-hosted via `@fontsource-variable`, tanpa request ke Google) |
| Konten | File TypeScript terstruktur di `/data` |
| PDF | Halaman print A4 + fitur “Save as PDF” bawaan browser |
| Deployment | Vercel |

> Catatan shadcn/ui: CLI `shadcn` tidak dapat dijalankan di lingkungan build saya (tidak ada akses ke ui.shadcn.com), jadi komponen ditulis manual mengikuti pola shadcn/ui. `components.json` sudah disiapkan, jadi Anda bisa menambah komponen resmi kapan saja: `npx shadcn@latest add dialog`.

## 4. System Architecture

```
            ┌────────────────────────── /data/*.ts ──────────────────────────┐
            │ profile · projects · skills · experience · education · links   │
            └───────────────┬───────────────────────┬────────────────────────┘
                            │                       │
                 lib/site.ts (draft rules)   lib/links.ts (CV link, nav)
                            │                       │
   ┌────────────────────────┼───────────────────────┼─────────────────────────┐
   │ app/(site)/            │                       │ app/cv, app/portfolio/print│
   │  page.tsx  (beranda)   │  projects/[slug]      │  A4 sheets → Save as PDF   │
   │  components/sections/* │  case study           │  components/print/*        │
   └────────────────────────┴───────────────────────┴─────────────────────────┘
                            │
             Static HTML (prerendered at build) → Vercel CDN (HTTPS)
```

- Semua halaman **di-prerender statis** saat build — tidak ada database, autentikasi, atau server API.
- Route group `(site)` memiliki header/footer; halaman `/cv` dan `/portfolio/print` sengaja berada di luar group sehingga tidak memiliki navbar.
- Komponen default adalah Server Component. Client Component hanya untuk interaksi: header, theme toggle, animasi `Reveal`, toolbar print.

## 5. Folder Structure

```
sendi-portfolio/
├── app/
│   ├── (site)/                 # Halaman dengan header & footer
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Beranda
│   │   └── projects/
│   │       ├── page.tsx        # Daftar case study
│   │       └── [slug]/         # Case study + loading skeleton
│   ├── cv/page.tsx             # CV A4
│   ├── portfolio/print/page.tsx# Portfolio PDF A4
│   ├── layout.tsx              # Root layout, metadata SEO, theme script
│   ├── globals.css             # Design tokens, dark mode, aturan print A4
│   ├── error.tsx · global-error.tsx · not-found.tsx
│   ├── sitemap.ts · robots.ts · opengraph-image.tsx · icon.svg
├── components/
│   ├── ui/                     # shadcn/ui: button, badge, card
│   ├── sections/               # hero, about, skills, projects, experience, education, contact
│   ├── print/                  # sheet A4, toolbar print, blok print
│   └── …                       # header, footer, theme, status badge, draft marker, dll.
├── data/                       # ← SEMUA KONTEN DI SINI
│   ├── profile.ts · projects.ts · skills.ts
│   ├── experience.ts · education.ts · social-links.ts
├── lib/                        # types, site config (aturan draf), links, utils
├── public/
│   ├── cv/                     # taruh PDF CV Anda di sini (opsional)
│   ├── images/                 # foto profil (opsional)
│   └── projects/<slug>/        # screenshot & diagram proyek
├── next.config.ts              # security headers & CSP
└── .env.example
```

## 6. Installation Guide (macOS Apple Silicon)

Butuh **Node.js ≥ 20.9** (disarankan Node 22 LTS atau 24 LTS).

```bash
# 1) Install Homebrew (lewati jika sudah ada)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# 2) Install Node.js LTS dan Git
brew install node@22 git
echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
node -v   # harus v22.x
npm -v

# 3) Ekstrak zip proyek, lalu masuk ke foldernya
cd ~/Downloads
unzip sendi-portfolio.zip -d ~/Projects
cd ~/Projects/sendi-portfolio

# 4) Install dependency (persis sesuai package-lock.json)
npm ci

# 5) Jalankan development server
npm run dev
# buka http://localhost:3000
```

Buka di VS Code: `code .` (aktifkan dulu lewat VS Code → Command Palette → “Shell Command: Install 'code' command in PATH”). Ekstensi yang disarankan: *ESLint*, *Tailwind CSS IntelliSense*.

## 7. Environment Configuration

Website ini **tidak membutuhkan secret apa pun**. Hanya satu variabel publik:

```bash
cp .env.example .env.local
```

| Variabel | Wajib | Fungsi |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Disarankan di production | URL publik (mis. `https://sendi-ferdiansyah.vercel.app`). Dipakai untuk metadata SEO, Open Graph, `sitemap.xml`, `robots.txt`, dan ditampilkan di PDF/CV. Tanpa variabel ini, URL tidak ditampilkan di PDF. |

> Variabel berawalan `NEXT_PUBLIC_` terlihat publik di browser — jangan pernah menaruh API key di sana. File `.env*` sudah di-ignore oleh Git (kecuali `.env.example`).

## 8. Development Commands

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Development server di http://localhost:3000 (draf + placeholder terlihat) |
| `npm run build` | Build production (draf disembunyikan) |
| `npm run start` | Menjalankan hasil build di http://localhost:3000 |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate tipe route + cek TypeScript |
| `npm run check` | typecheck + lint + build sekaligus — jalankan sebelum deploy |

## 9. Testing Guide

Tidak ada test runner tambahan (sengaja, agar dependency minimal). Lakukan pengecekan berikut sebelum deploy:

1. **Build test** — `npm run check` harus selesai tanpa error.
2. **Pratinjau production** — `npm run build && npm run start`, buka http://localhost:3000, pastikan tidak ada label kuning/placeholder (itu hanya muncul di dev).
3. **Navigasi** — klik semua menu (desktop & mobile), tombol hero, “View Project Details”, “Back to projects”, footer.
4. **Responsive** — Chrome DevTools → Toggle device toolbar (⌘ + Shift + M): iPhone SE, iPhone 14, iPad, 1440px. Pastikan tidak ada scroll horizontal.
5. **Dark mode** — toggle, reload halaman: tema harus tersimpan.
6. **Keyboard & aksesibilitas** — tekan Tab dari awal halaman: link pertama adalah “Skip to content”, fokus selalu terlihat. Uji juga macOS *System Settings → Accessibility → Display → Reduce motion*.
7. **PDF export** — buka `/portfolio/print` dan `/cv`, klik tombol download, pilih **Save as PDF**, A4, margin **None**, aktifkan **Background graphics**. Periksa: jumlah halaman benar, nomor halaman ada, tidak ada halaman kosong, tidak ada navbar.
8. **Lighthouse** — Chrome DevTools → Lighthouse (mode Incognito, pada build production atau URL Vercel). Target: Performance, Accessibility, Best Practices, SEO ≥ 90.

## 10. Build Instructions

```bash
npm ci
npm run check      # typecheck + lint + build
npm run start      # uji hasil build secara lokal
```

Output build menunjukkan semua route sebagai `○ (Static)`.

## 11. Deployment Guide (Vercel)

**Langkah 1 — Push ke GitHub**

```bash
cd ~/Projects/sendi-portfolio
git init                       # lewati jika sudah ada folder .git
git add .
git commit -m "Initial portfolio"
git branch -M main
# Buat repo kosong di https://github.com/new (mis. "portfolio"), lalu:
git remote add origin https://github.com/sendifrd/portfolio.git
git push -u origin main
```

**Langkah 2 — Import di Vercel**

1. Login ke https://vercel.com dengan akun GitHub.
2. **Add New… → Project** → pilih repo `portfolio` → **Import**.
3. Framework Preset otomatis **Next.js**. Biarkan Build Command & Output default.
4. **Environment Variables**: tambahkan `NEXT_PUBLIC_SITE_URL` = URL Vercel Anda (mis. `https://sendi-ferdiansyah.vercel.app`). Jika belum tahu URL-nya, deploy dulu, lalu tambahkan dan **Redeploy**.
5. Klik **Deploy**.

**Langkah 3 — Setelah deploy**

- HTTPS aktif otomatis di Vercel (security header HSTS sudah dikonfigurasi).
- Opsional: Settings → Domains untuk domain sendiri.
- Setiap `git push` ke `main` akan otomatis men-deploy ulang.
- Jalankan Lighthouse pada URL production dan catat hasil sebenarnya.

Alternatif tanpa GitHub: `npm i -g vercel` → `vercel` → ikuti prompt → `vercel --prod`.

## 12. Content Update Guide

Semua konten ada di folder **`/data`**. Simpan file → halaman dev langsung ter-update → website, CV, dan PDF ikut berubah.

| Ingin… | Edit |
| --- | --- |
| Ubah nama, headline, deskripsi hero, About | `data/profile.ts` |
| Ganti foto profil | Timpa `public/images/profile.jpg` (persegi, ±800×800, dipakai di About, CV, halaman Profile & Contact PDF) dan `public/images/profile-portrait.jpg` (4:5, ±960×1200, dipakai di hero website & cover PDF). Path diatur di `photo` / `photoPortrait` pada `data/profile.ts`. Hapus metadata lokasi (EXIF/GPS) sebelum mengunggah foto baru |
| Ganti file CV PDF | Timpa `public/cv/CV_Sendi_Ferdiansyah.pdf` (nama sama), atau ubah `cvFile` di `data/profile.ts`. Set `cvFile: null` agar tombol membuka `/cv` |
| Ubah LinkedIn, email, nomor HP | `data/social-links.ts`. Nomor HP memakai `showOnWebsite: false` → hanya tampil di `/cv` dan PDF portofolio, tidak di halaman website. Ubah ke `true` jika ingin ditampilkan |
| Ubah skill | `data/skills.ts` |
| Ganti warna aksen | `app/globals.css` → `--brand-blue` dan `--brand-sky` (palet gelap ada di blok `.dark`) |
| Gambar di mockup laptop proyek | Isi `src` pada slot `documentation` pertama yang berisi screenshot — otomatis menggantikan cover yang dibuat otomatis |
| Ubah pengalaman organisasi / kerja | `data/experience.ts` — `kind: "organization"` atau `"work"`; isi `organization` untuk nama perusahaan |
| Coursework, sertifikasi, prestasi | `data/education.ts` |
| Proyek, status, deskripsi, repo | `data/projects.ts` |

**Memverifikasi draf.** Di `data/projects.ts` setiap section memiliki `verification`. Baca isinya, sesuaikan dengan kondisi sebenarnya, lalu ubah `"draft"` → `"verified"`. Section kosong (hanya `hint`) diisi dengan menambahkan `paragraphs` atau `bullets`:

```ts
{
  id: "workflow",
  title: "Development Workflow",
  paragraphs: ["We used two-week Scrum sprints tracked in …"],
  verification: "verified",
},
```

**Mengubah status proyek.** `status: "planning" | "in-development" | "completed"`. Status fitur: `"completed" | "in-development" | "planned"` — fitur otomatis dikelompokkan di case study.

**Menambah screenshot/diagram.** Simpan di `public/projects/<slug>/`, lalu isi `src` (dan idealnya `width`/`height` asli) pada slot `documentation`:

```ts
{ label: "Use Case Diagram", src: "/projects/guyub/use-case.png", alt: "Guyub use case diagram", width: 1600, height: 1000 },
```

Gunakan PNG/JPG/WebP yang tajam (lebar ≥ 1600px) agar bagus di PDF. Next.js otomatis mengoptimasi ukuran & format (AVIF/WebP) dan lazy-load.

**Menambah tautan GitHub.** Isi `repoUrl` **hanya** dengan URL yang sudah Anda buka sendiri dan bersifat publik. Tombol “View GitHub Repository” muncul otomatis.

**Menambah proyek baru.** Salin satu objek di array `projects`, ganti `slug` (huruf kecil, pakai tanda hubung), `order`, dan kontennya. Halaman `/projects/<slug>` dibuat otomatis.

**Proyek tambahan** (`additionalProjects`) hanya tampil di production bila `confirmed: true`.

**`publishDrafts`** di `lib/site.ts` sebaiknya tetap `false`. Verifikasi draf satu per satu, jangan sekadar menyalakan saklar ini.

**Menyesuaikan untuk lamaran tertentu.** Ubah `profile.targetRoles` (tampil di halaman 2 PDF) dan `siteConfig.lastUpdated` di `lib/site.ts`.

## 13. Troubleshooting

| Masalah | Solusi |
| --- | --- |
| `command not found: npm` | Install Node (Bagian 6) dan buka terminal baru. |
| `EBADENGINE` / error versi Node | `node -v` harus ≥ 20.9. `brew upgrade node@22`. |
| `Port 3000 is already in use` | `npm run dev -- -p 3001`, atau hentikan proses lama: `lsof -ti:3000 \| xargs kill`. |
| Perubahan tidak muncul / error aneh setelah update | `rm -rf .next && npm run dev`. |
| Error tipe `PageProps`/`LayoutProps` di editor | `npm run typecheck` (menjalankan `next typegen`), lalu restart TS server di VS Code. |
| Label kuning “Draft” terlihat | Normal di `npm run dev`. Tidak tampil di production. |
| Konten hilang di production | Konten masih `verification: "draft"` atau kosong. Verifikasi di `/data`. |
| PDF tanpa warna latar | Aktifkan **Background graphics** di dialog print. |
| PDF terpotong / ada margin putih | Paper size **A4**, Margins **None**, Scale **100%**. |
| Tombol PDF tidak membuka dialog | Beberapa in-app browser (Instagram/LinkedIn) memblokir print. Buka di Chrome/Safari/Edge. |
| Gambar tidak muncul | Path `src` harus diawali `/` dan relatif terhadap `public/` (mis. `/projects/guyub/x.png`). |
| URL proyek tidak dikenal mengembalikan HTTP 200 | Perilaku resmi Next.js streaming dengan Cache Components; halaman 404 tetap tampil dengan `noindex`. |

## 14. Security Considerations

- **Tidak ada API key, token, atau secret** di kode. Tidak ada backend, database, atau autentikasi.
- **Security headers** (`next.config.ts`): Content-Security-Policy, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS, `Cross-Origin-Opener-Policy`. Header `X-Powered-By` dimatikan.
- CSP memakai `'unsafe-inline'` untuk script karena situs sepenuhnya statis dan membutuhkan script tema inline sebelum paint (nonce memerlukan rendering dinamis per request). Tidak ada script pihak ketiga.
- `dangerouslySetInnerHTML` hanya dipakai untuk (a) string script tema yang statis dan (b) JSON-LD yang di-escape dengan `safeJsonLd()` (`<`, `>`, `&` di-escape).
- Semua link eksternal memakai `rel="noopener noreferrer"`.
- **Tidak ada formulir kontak**, jadi tidak ada input pengguna yang perlu divalidasi. Jika nanti ingin menambah formulir, gunakan provider (mis. Resend/Formspree) lewat Route Handler server-side, validasi input (mis. dengan `zod`), tambahkan rate limiting/anti-spam, dan simpan API key di Environment Variables Vercel — bukan di frontend.
- Jangan pernah mengunggah KTP, transkrip, NIK, alamat rumah, atau dokumen pribadi ke folder `public/` — semua isi `public/` dapat diakses siapa pun.
- Nomor telepon bersifat opsional; pertimbangkan hanya mencantumkan email + LinkedIn di website publik.
- Jaga dependency: `npm audit` dan `npm outdated` secara berkala; perbarui dengan `npm update`.

## 15. Future Improvements

- Isi seluruh draf & dokumentasi visual proyek (lihat daftar di bawah).
- Formulir kontak dengan backend (Route Handler + Resend) dan validasi.
- Vercel Analytics / Speed Insights untuk memantau Core Web Vitals nyata.
- Versi Bahasa Indonesia (i18n).
- Halaman detail untuk proyek tambahan setelah dikonfirmasi.
- Test otomatis (Playwright) untuk navigasi dan ekspor PDF.
- Generasi PDF server-side (mis. Playwright di CI) bila ingin tombol unduh file PDF langsung.

---

## Checklist konten yang perlu Anda konfirmasi

Sumber utama konten: CV Anda (Nov 2026) + brief awal. Yang masih kosong / draf:

**Guyub** (tidak ada di CV) — konsep final & cakupan fitur; tanggung jawab PM yang sebenarnya (6 poin draf); tech stack; jumlah anggota & timeline; metodologi; tantangan & pembelajaran; screenshot & diagram.

**Jaga Lingkungan** — detail peran Administrator, dashboard admin & penugasan petugas (belum disebut di CV); bagian problem identification (draf); ERD & screenshot aplikasi.

**TransJakarta** — sumber & ukuran dataset; temuan yang benar-benar dihasilkan notebook; URL repo/notebook; grafik.

**Sentiment Analysis blu by BCA** — model terbaik & skornya; URL repo (jika publik).

**Fire & Smoke / Stock Price** — (opsional) angka metrik, screenshot dashboard/hasil deteksi.

**Lainnya** — (opsional) foto formal dengan latar polos untuk menggantikan foto saat ini; sertifikasi & prestasi; nama perusahaan untuk pengalaman Supervisor/Barista (opsional); status 2 proyek tambahan (AI Agent, RAG Chatbot).
