# Rarestar.studio — Standalone Deployment Guide

Complete Next.js 16 website ready for Vercel deployment. Extract from monorepo, push to its own repo, deploy.

---

## 1. Extract from Monorepo

### Copy these files/folders to new repo root:

```
├── next.config.ts
├── next-env.d.ts (if exists, else create empty)
├── package.json
├── postcss.config.mjs (create — see below)
├── tsconfig.json
├── public/
│   ├── brand/
│   │   ├── mark.png
│   │   ├── mark-ink.png
│   │   └── mark-large.png
│   ├── hero.mp4
│   └── hero-poster.jpg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── opengraph-image.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── twitter-image.tsx
│   ├── components/
│   │   ├── Contact.tsx
│   │   ├── Cursor.tsx
│   │   ├── Divisions.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HeroVideo.tsx
│   │   ├── Magnetic.tsx
│   │   ├── Manifesto.tsx
│   │   ├── Nav.tsx
│   │   ├── Process.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Services.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── StackMarquee.tsx
│   │   └── Work.tsx
│   └── lib/
│       └── lenisSingleton.ts
```

### Create missing config files:

**postcss.config.mjs** (Tailwind v4 requires this)
```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**next-env.d.ts** (if not copied)
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

---

## 2. Update package.json

Change from monorepo package name to standalone:

```json
{
  "name": "rarestar-studio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "lenis": "^1.3.23",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.160.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## 3. Environment Variables (Optional)

Create `.env.local` for local dev. On Vercel, add these in Project Settings → Environment Variables.

```env
# Calendly / scheduling link (used in Contact section)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-handle/intro

# Optional: Resend API key (when you wire up the contact form email)
# RESEND_API_KEY=re_xxxxxxxx
```

If `NEXT_PUBLIC_CALENDLY_URL` is not set, defaults to `https://calendly.com/rarestar/intro`.

---

## 4. Local Test

```bash
pnpm install
pnpm dev
# → http://localhost:3000
```

Build check:
```bash
pnpm build
```

---

## 5. Deploy to Vercel

### Option A: Git Push + Vercel Dashboard

1. Push extracted code to GitHub (new repo, e.g., `rarestar/studio`)
2. Import repo on [vercel.com](https://vercel.com)
3. Framework Preset: Next.js
4. Root Directory: `./` (default)
5. Build Command: `next build` (default)
6. Output Directory: `.next` (default)
7. Add Environment Variables (see section 3)
8. Deploy

### Option B: Vercel CLI

```bash
# Install CLI if needed
npm i -g vercel

# Login and deploy
vercel login
vercel

# Follow prompts, set environment variables when asked
```

---

## 6. Post-Deploy Checklist

- [ ] Hero video loads and loops
- [ ] Custom cursor works on desktop (hides on mobile)
- [ ] Mobile hamburger menu opens/closes
- [ ] Nav scroll progress bar visible
- [ ] Active section underline in nav
- [ ] Contact form POSTs to `/api/contact` (check Network tab)
- [ ] Calendly link opens in new tab
- [ ] OG image generates (visit `/opengraph-image`)
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` returns valid text

---

## 7. Domain Setup

In Vercel Project Settings → Domains:
1. Add `rarestar.studio`
2. Follow DNS instructions (usually CNAME to `cname.vercel-dns.com`)
3. Wait for SSL auto-provision (usually < 1 min)

---

## 8. Troubleshooting

| Issue | Fix |
|-------|-----|
| Tailwind styles missing | Ensure `postcss.config.mjs` exists with `@tailwindcss/postcss` plugin |
| `@/` imports fail | `tsconfig.json` must have `"@/*": ["src/*"]` in paths |
| Hero video 404 | Check `public/hero.mp4` exists and is > 0 bytes |
| Contact form 404 | Ensure `src/app/api/contact/route.ts` exists |
| Build fails on GSAP | `gsap` is in dependencies (not devDependencies) |

---

## File Notes

- **No external CMS** — all content is hardcoded in components
- **Contact form** — logs to console by default. Wire Resend by uncommenting block in `src/app/api/contact/route.ts`
- **Hero video** — 20MB+ file; Git LFS recommended if pushing to GitHub
- **Fonts** — Loaded via `next/font/google` (Fraunces, Inter, JetBrains Mono)

---

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- GSAP 3 + ScrollTrigger
- Lenis (smooth scroll)
- Three.js (WebGL hero treatment)
