# 🚀 Cloudflare Workers Deployment Guide

This guide explains how to deploy the Acheng Restaurant Virtual Museum to Cloudflare Workers with Static Assets.

---

## 📋 Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://dash.cloudflare.com/sign-up)
2. **Node.js**: Version 18 or higher
3. **Project Built**: Run `npm install` to install dependencies

---

## 🔧 Deployment Steps

### Step 1: Login to Cloudflare

Run the login command to authenticate with Cloudflare:

```bash
npm run cf:login
```

This will open a browser window. Follow the prompts to authorize Wrangler.

### Step 2: Build and Deploy

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

This command will:
1. Build your Next.js app as static files (`npm run build`)
2. Deploy to Cloudflare Workers with the `out/` directory as static assets
3. Provide you with a deployment URL (e.g., `https://acheng-restaurant-museum.workers.dev`)

### Step 3: Deploy to Production (Optional)

For production deployment with custom domain:

```bash
npm run deploy:production
```

---

## 🌐 Custom Domain Setup

### Option 1: Cloudflare Workers Subdomain (Free)

Your app is automatically deployed to:
```
https://acheng-restaurant-museum.<your-subdomain>.workers.dev
```

### Option 2: Custom Domain

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → Your deployment
3. Click **Custom Domains** → **Add Custom Domain**
4. Enter your domain (e.g., `museum.acheng.com`)
5. Follow DNS configuration instructions

Then uncomment the routes section in `wrangler.toml`:

```toml
routes = [
  { pattern = "museum.acheng.com", custom_domain = true }
]
```

---

## 🔍 Local Preview

Preview your static build locally before deploying:

```bash
npm run preview
```

This starts a local Wrangler Pages dev server at `http://localhost:8788`

---

## 📊 Deployment Information

### What Gets Deployed

- **Static Files**: All files in `out/` directory
  - HTML pages
  - JavaScript bundles
  - CSS files
  - Images (646MB total)
  - 3D models (.glb files)
  - Videos

### Cloudflare Limits (Free Tier)

- ✅ **Unlimited bandwidth**
- ✅ **Unlimited requests**
- ✅ **100,000 requests/day** (Workers limit)
- ✅ **No file size limit** for static assets
- ⚠️ **10ms CPU time** per request (not an issue for static files)

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build static export to `out/` |
| `npm run preview` | Preview static build locally |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run deploy:production` | Deploy to production environment |
| `npm run cf:login` | Login to Cloudflare account |

---

## 🐛 Troubleshooting

### Error: "Not logged in"

Run `npm run cf:login` to authenticate with Cloudflare.

### Error: "Worker name already taken"

Change the `name` field in `wrangler.toml` to a unique value:

```toml
name = "acheng-museum-unique-name"
```

### Large File Warnings

Your project is 646MB due to images and 3D models. This is fine for Cloudflare Workers Static Assets, but consider:

- Compressing images with tools like `sharp` or `imagemin`
- Using `.webp` format for photos
- Compressing 3D models with `gltf-pipeline`

### Build Errors

If you encounter build errors, ensure:

1. All dependencies are installed: `npm install`
2. TypeScript compiles: `npm run lint`
3. No dynamic Next.js features are used (API routes, ISR, etc.)

---

## 📝 Configuration Files

### `wrangler.toml`

Main configuration file for Cloudflare Workers deployment:

```toml
name = "acheng-restaurant-museum"
compatibility_date = "2025-01-07"
assets = { directory = "./out", binding = "ASSETS" }
```

### `next.config.ts`

Next.js configuration for static export:

```ts
output: 'export',        // Enable static export
images: { unoptimized: true },  // Disable image optimization
trailingSlash: true,     // Better static routing
```

---

## 🎯 Post-Deployment

After deployment, test your site:

1. **Homepage**: Visit your Workers URL
2. **Navigation**: Test all sections scroll smoothly
3. **Images**: Verify gallery photos load correctly
4. **Performance**: Check loading speed with Lighthouse
5. **3D Models**: Ensure GLB models render (if implemented)

---

## 🔄 Updates and Redeployment

To update your deployed site:

```bash
npm run deploy
```

Cloudflare will:
- Cache-bust previous version
- Deploy new static files
- Update Worker configuration
- Propagate changes globally (~30 seconds)

---

## 📚 Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Workers Static Assets Guide](https://developers.cloudflare.com/workers/static-assets/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Test build locally: `npm run build`
- [ ] Preview static site: `npm run preview`
- [ ] Login to Cloudflare: `npm run cf:login`
- [ ] Deploy to staging: `npm run deploy`
- [ ] Test deployed URL thoroughly
- [ ] Set up custom domain (optional)
- [ ] Deploy to production: `npm run deploy:production`
- [ ] Monitor Cloudflare Dashboard for analytics

---

**Need Help?** Check [Cloudflare Community](https://community.cloudflare.com/) or [Next.js Discussions](https://github.com/vercel/next.js/discussions)
