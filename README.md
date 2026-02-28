# Personal Website

A multi-page personal website built with **Next.js 14** (App Router), **Tailwind CSS**, and **Framer Motion**.

## Pages

- **Home** — Hero, intro, identity ticker, latest blog preview, travel portfolio preview
- **About Me** — Bio, portrait, identity carousel, photo gallery
- **Travel Portfolio** — Grid of travel photo cards with hover overlays
- **Blog** — Grid of post cards; individual post pages at `/blog/[slug]`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Fonts: DM Serif Display (headings), DM Sans (body)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Customization

- **Name/branding**: Update "Alex Chen" in `app/layout.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, and page content.
- **Placeholder images**: Replace `https://picsum.photos/...` URLs with your own images or connect a CMS.
- **Theme**: The site uses a dark theme (Tailwind `stone` palette). Toggle or adjust in `app/globals.css` and `app/layout.tsx` (e.g. remove `className="dark"` from `<html>` for light).
- **Social links**: Edit `components/Footer.tsx` with your Instagram and LinkedIn URLs.
- **Logo**: Add your logo as `public/logo.png` (Next.js) or `static/logo.png` (static site). The left sidebar shows a 40×40 circular logo next to your name; if the file is missing, the logo is hidden.
- **Blog**: Latest posts are pulled from the Substack RSS feed (Amin My Head). Next.js fetches at build/request time; the static site uses client-side fetch via a CORS proxy.
