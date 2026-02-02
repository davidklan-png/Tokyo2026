# Tokyo 2026 Trip Website

A photo-forward static website documenting our family trip to Tokyo, January 24 - February 2, 2026.

Built with [Astro](https://astro.build) — a modern static site generator.

## Features

- 📅 **Day-by-day trip log** with timeline and stories
- 📸 **Photo gallery** with responsive masonry layout and lightbox
- 🏠 **Home page** with trip overview cards
- ⭐ **Best Of page** for favorite moments
- 📱 **Mobile-first** responsive design
- 🎨 **Warm, family-friendly** aesthetic
- ⚡ **Fast** — static HTML/CSS/JS

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4321` to see the site.

## Project Structure

```
├── content/
│   └── days/           # Markdown files for each day
├── public/
│   └── photos/         # Organize photos by date
├── src/
│   ├── components/     # Astro components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global CSS
├── astro.config.mjs    # Astro configuration
└── package.json        # Dependencies
```

## Adding Content

### Add a New Day

Create a new markdown file in `content/days/`:

```yaml
---
title: "Day Title"
date: 2026-01-25
participants: ["Family", "Kids"]
steps: 10000
hero: "/photos/2026-01-25/hero.jpg"
teaser: "Short description for the card"
order: 5
favorite: true  # Shown on Best Of page
---

## Your Content Here

Write your day's story in markdown...
```

### Add Photos

1. Create a folder in `public/photos/` named by date: `2026-01-25/`
2. Add images (JPG, PNG, WebP)
3. Reference in your markdown or frontmatter

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for full instructions on:
- GitHub Pages (with GitHub Actions)
- Cloudflare Pages

---

Made with ❤️ for the Tokyo 2026 family adventure
