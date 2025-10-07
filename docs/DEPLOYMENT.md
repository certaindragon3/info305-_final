# 🚀 Cloudflare Pages Deployment Guide

Deploy the Acheng Restaurant Virtual Museum to Cloudflare Pages - a free, unlimited static hosting platform with global CDN.

---

## ✨ Why Cloudflare Pages?

- ✅ **Completely Free** - No cost, no credit card required
- ✅ **Unlimited Bandwidth** - No traffic limits
- ✅ **No File Size Limits** - Perfect for large 3D models (70MB+ GLB files)
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Automatic HTTPS** - Free SSL certificates
- ✅ **Easy Deployment** - Single command deploy

---

## 📋 Prerequisites

1. **Cloudflare Account**: [Sign up free](https://dash.cloudflare.com/sign-up)
2. **Node.js 18+**: Already installed
3. **Project Dependencies**: Run `npm install`

---

## 🚀 Quick Deploy (3 Steps)

### Step 1: Login to Cloudflare

```bash
npm run cf:login
```

This opens your browser - click **Allow** to authenticate.

### Step 2: Build Your Site

```bash
npm run build
```

This creates static files in the `out/` directory (~646MB with images and 3D models).

### Step 3: Deploy to Cloudflare Pages

```bash
npm run deploy
```

✨ **That's it!** Your site will be live at:
```
https://acheng-restaurant-museum.pages.dev
```

---

## 📊 What Gets Deployed

Your deployment includes:
- **9 HTML pages** (home + 4 dish detail pages)
- **Gallery images** (~400MB)
- **3D models** (7 GLB files, ~361MB total)
  - `squirrel-fish.glb` (70MB)
  - `lotus-stir-fry.glb` (69MB)
  - `hot-oil-eel.glb` (70MB)
  - `biluochun-shrimp.glb` (78MB)
  - Plus smaller `_scan.glb` variants (14MB each)
- **Videos** (About section renovation video)
- **JavaScript bundles** (React, Next.js, Three.js)

**Total Size**: ~646MB (perfectly fine for Cloudflare Pages)

---

## 🌐 Custom Domain Setup

After deployment, you can add a custom domain:

### Option 1: Using Cloudflare DNS

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **acheng-restaurant-museum**
3. Click **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter your domain (e.g., `museum.acheng.com`)
6. Follow the DNS setup instructions

### Option 2: Using External DNS

1. Add a CNAME record pointing to:
   ```
   acheng-restaurant-museum.pages.dev
   ```
2. Wait for DNS propagation (~5-10 minutes)

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build static export to `out/` |
| `npm run preview` | Preview static build locally |
| `npm run deploy` | Build and deploy to Cloudflare Pages |
| `npm run cf:login` | Authenticate with Cloudflare |

---

## 🔄 Updating Your Site

To deploy updates:

```bash
npm run deploy
```

Cloudflare Pages will:
- Upload only changed files
- Keep previous deployments (with rollback option)
- Deploy globally in ~30 seconds
- Invalidate CDN cache automatically

---

## 📈 Deployment Analytics

View your site analytics at:
```
https://dash.cloudflare.com/pages/acheng-restaurant-museum
```

You can see:
- **Visitor statistics**
- **Bandwidth usage**
- **Geographic distribution**
- **Deployment history**

---

## 🐛 Troubleshooting

### Error: "Not logged in"

**Solution**: Run `npm run cf:login`

### Error: "Project name already taken"

**Solution**: Change the project name in `package.json`:
```json
"deploy": "npm run build && wrangler pages deploy out --project-name=YOUR-UNIQUE-NAME"
```

### Slow Upload (646MB)

**Solution**: This is normal for first deployment. Cloudflare only uploads changed files on subsequent deploys.

### 404 Errors After Deployment

**Solution**: Cloudflare Pages automatically handles Next.js routing. If you see 404s:
1. Ensure `trailingSlash: true` is set in `next.config.ts`
2. Clear browser cache
3. Check deployment logs in Cloudflare Dashboard

---

## 🎯 Production Checklist

Before your final deployment:

- [ ] Test build locally: `npm run build`
- [ ] Preview locally: `npm run preview`
- [ ] Check all images load correctly
- [ ] Test gallery scrolling
- [ ] Verify 3D models render (if implemented)
- [ ] Test on mobile devices
- [ ] Login to Cloudflare: `npm run cf:login`
- [ ] Deploy: `npm run deploy`
- [ ] Test deployed URL
- [ ] Set up custom domain (optional)
- [ ] Share with stakeholders! 🎉

---

## 🆚 Cloudflare Pages vs Workers

You switched from **Workers** to **Pages** because:

| Feature | Workers | Pages |
|---------|---------|-------|
| Max file size | 25MB ❌ | Unlimited ✅ |
| Deployment complexity | Complex | Simple ✅ |
| Best for | Dynamic apps | Static sites ✅ |
| Your 70MB GLB files | Won't work ❌ | Works perfectly ✅ |

---

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

---

## 🎉 Success!

Once deployed, your museum will be:
- ⚡ **Blazing fast** - Served from 300+ global data centers
- 🔒 **Secure** - Automatic HTTPS encryption
- 💰 **Free forever** - No hosting costs
- 🌍 **Globally accessible** - Fast from anywhere

**Your deployment URL**:
```
https://acheng-restaurant-museum.pages.dev
```

Share it with the world! 🥟✨
