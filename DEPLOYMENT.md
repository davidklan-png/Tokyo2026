# Deployment Guide

This guide covers deploying your Tokyo 2026 trip website to GitHub Pages and Cloudflare Pages.

## Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Build the site locally to verify:
```bash
npm run build
```

3. Preview the production build:
```bash
npm run preview
```

## GitHub Pages Deployment

### Option 1: GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Go to your GitHub repository Settings → Pages
3. Set Source to "GitHub Actions"
4. Push to `main` branch to trigger deployment

### Option 2: Manual Deploy

```bash
npm run build
# Upload the contents of /dist to GitHub Pages via gh-pages branch
npx gh-pages -d dist
```

### Important: Update Your Config

Ensure `astro.config.mjs` has the correct settings for GitHub Pages:

```js
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/WebPage_Tokyo2026',  // Your repo name
  // ...
});
```

Your site will be available at: `https://YOUR_USERNAME.github.io/WebPage_Tokyo2026/`

## Cloudflare Pages Deployment

### Option 1: Connect Git Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Workers & Pages → Create application → Pages
3. Connect to Git → Select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: (leave empty)
   - **Environment variables**: (none needed)

5. Click "Save and Deploy"

### Option 2: Direct Upload

```bash
npm run build
npx wrangler pages deploy dist --project-name=tokyo-2026
```

First, install Wrangler:
```bash
npm install -g wrangler
```

Login to Cloudflare:
```bash
wrangler login
```

Then deploy:
```bash
npm run build
wrangler pages deploy dist --project-name=tokyo-2026
```

### Cloudflare Pages Config (Optional)

Create `wrangler.toml` for advanced configuration:

```toml
name = "tokyo-2026"
compatibility_date = "2024-01-01"

[env.production]
routes = [
  { pattern = "tokyo-2026.pages.dev/*", zone_name = "pages.dev" }
]
```

### Custom Domain (Cloudflare)

1. In your Pages project, go to Custom domains
2. Add your domain (e.g., `tokyo.yourdomain.com`)
3. Update your DNS records as instructed by Cloudflare

## Adding Photos

Place your photos in the `public/photos/` folder organized by date:

```
public/
  photos/
    2026-01-24/
      hero.jpg
      1.jpg
      2.jpg
      ...
    2026-01-26/
      hero.jpg
      1.jpg
      ...
```

Then update the frontmatter in your markdown files to reference them:

```yaml
---
hero: "/photos/2026-01-24/hero.jpg"
---
```

## Updating Content

1. Edit markdown files in `content/days/`
2. Add photos to `public/photos/`
3. Run `npm run build` to verify
4. Commit and push - your site will auto-deploy

## Environment Variables (Optional)

If you need to add analytics or other services:

### GitHub Pages
Add in repository Settings → Secrets and variables → Actions

### Cloudflare Pages
Add in project Settings → Environment variables

## Troubleshooting

### Build fails
- Clear cache: `rm -rf node_modules dist && npm install`
- Check Node version: `node --version` (should be 18+)

### Images not loading
- Ensure paths start with `/` (absolute paths)
- Check that images exist in `public/` folder
- Verify case sensitivity (Linux servers are case-sensitive)

### Navigation dropdown not working
- Ensure JavaScript is enabled in browser
- Check browser console for errors

## Performance Tips

1. **Optimize images**: Use WebP format for smaller file sizes
2. **Enable caching**: Both platforms cache static assets automatically
3. **Minimize photos**: Consider using thumbnails for gallery previews
4. **Use CDN**: Both platforms serve content via global CDNs

## Customization

### Change Colors
Edit `src/styles/global.css` CSS variables:

```css
:root {
  --color-primary: #d4573b;  /* Main accent color */
  --color-bg: #faf8f5;       /* Background */
  /* ... */
}
```

### Add More Days
Create new markdown files in `content/days/` with frontmatter:

```yaml
---
title: "Your Day Title"
date: 2026-01-25
participants: ["Family"]
steps: 10000
hero: "/photos/2026-01-25/hero.jpg"
teaser: "Short description"
order: 10
favorite: true
---
```

## Support

- [Astro Docs](https://docs.astro.build)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
