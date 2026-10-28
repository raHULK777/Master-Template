# Santos Construction Inc — Demo Website

A complete marketing website and order management portal for Santos Construction Inc, built with the ConstructOps engine.

## 📁 Project Structure

```
santos/
├── app/                      # Next.js pages
│   ├── (marketing)/         # Marketing pages (homepage, etc.)
│   │   ├── layout.tsx       # Marketing layout with fonts
│   │   └── page.tsx         # Homepage (copied from portal)
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── estimate/            # Estimate request form
│   ├── projects/            # Projects showcase
│   ├── services/            # Services listing
│   ├── layout.tsx           # Root layout with branding
│   └── globals.css          # Global styles
├── components/               # React components
│   ├── marketing/           # Marketing UI components
│   └── [portal components]  # Order management portal components
├── lib/                      # Utilities
│   ├── site-server.ts       # Santos site data configuration
│   ├── site-data.ts         # Static Santos content
│   ├── branding.ts          # Branding utilities
│   └── types.ts             # TypeScript types
├── public/                   # Static assets
│   ├── fonts/               # Web fonts (Fraunces, Inter)
│   ├── santos/              # Santos-specific images
│   │   ├── dallas-skyline.jpg
│   │   ├── crew-on-site.jpg
│   │   └── [placeholder SVGs]
│   └── assets/              # Generated image assets
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Quick Start

### Option 1: Run Development Server

```bash
cd "D:\Projects\ConstructOps\santos"
npm install
npm run dev
```

Then open **http://localhost:3001**

### Option 2: Build for Production

```bash
cd "D:\Projects\ConstructOps\santos"
npm run build
```

The static export will be created in the `.next` folder.

### Option 3: Deploy to Cloudflare Pages

1. Push this repository to GitHub
2. In Cloudflare Dashboard → Pages → Connect to Git
3. Configure:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Output directory**: `.next` or `out`
4. Click "Deploy"

Your site will be live at: `https://santos-construction.pages.dev`

## 📄 Pages

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero, services, projects, testimonials, FAQ |
| About | `/about` | Company story, facts, testimonials |
| Services | `/services` | All services listing |
| Projects | `/projects` | Project gallery with before/after |
| Estimate | `/estimate` | Lead capture form |
| Contact | `/contact` | Contact info + form + map |

## 🎨 Branding

- **Primary Color**: `#0B1220` (Navy)
- **Secondary Color**: `#C2410C` (Orange)
- **Company Name**: Santos Construction Inc
- **Tagline**: "Dallas construction, done right."

## 📸 Assets

### Generated Placeholder Images
Run the asset generator to create placeholder images:

```bash
node "../scripts/generate-assets.js"
```

### Santos-Specific Images
Located in `public/santos/`:
- `dallas-skyline.jpg` — Hero background
- `crew-on-site.jpg` — About section
- Before/after project photos (placeholders)

### Gemini Image Generation
Replace placeholders with real AI-generated images:

```bash
# Set your Gemini API key
export GEMINI_API_KEY="your-key-here"
node "../scripts/generate-assets.js"
```

**Note**: The Gemini API has quota limits on the free tier. The script falls back to SVG placeholders automatically.

## 🔐 Client Portal Access

The Santos site includes a full order management portal for contractors:

- **Admin Login**: `http://localhost:3001/login`
- **Dashboard**: `http://localhost:3001/dashboard`
- **Branding Settings**: `http://localhost:3001/dashboard/branding`

Default credentials (if seeded):
- Email: `admin@santosconstruction.example`
- Password: (set during seeding)

## 🛠️ Customization

### Update Site Content

Edit `lib/site-data.ts` to change:
- Headlines and subheadlines
- Services and descriptions
- Projects and testimonials
- FAQ entries
- Contact information

### Update Branding

Edit the branding colors in `lib/site-server.ts`:
```typescript
primaryColor: '#0B1220',  // Change this
secondaryColor: '#C2410C', // Change this
```

### Add New Pages

Create new pages in the `app/` directory following Next.js conventions:
```
app/new-page/page.tsx
```

## 📊 SEO & Structured Data

The site includes:
- Meta tags for all pages
- Open Graph protocol
- Twitter cards
- Schema.org LocalBusiness markup
- Sitemap.xml
- robots.txt

## 🔧 Troubleshooting

### Build Fails with EPERM

If you see `spawn EPERM` errors, the sandbox is blocking child processes. Use the static HTML version:
```bash
# Serve from static folder instead
npx http-server "D:\Projects\ConstructOps\santos\static" -p 3001
```

### Images Not Loading

Ensure the correct asset paths:
- Hero image: `/santos/dallas-skyline.jpg`
- Project images: `/santos/after-vaulted-ceiling.jpg`
- Font files: `/fonts/fraunces.woff2`, `/fonts/inter.woff2`

### Port Already in Use

Change the port in `package.json`:
```json
"dev": "next dev -p 3001"
```

## 📝 Content Sources

All Santos Construction data sourced from:
- **Google Business Profile**: https://maps.app.goo.gl/yca3zX1sQFvfsQDq7
- **Address**: 4485 W Red Bird Ln, Dallas, TX 75236
- **Phone**: (972) 296-5813
- **Rating**: 5.0★ on Google (7 reviews)
- **Reviews**: Denise Andrews, Wendy Byrum, Marcus & Tanya R.

## 🚢 Deployment Checklist

- [ ] Install dependencies: `npm install`
- [ ] Run build: `npm run build`
- [ ] Test all pages locally
- [ ] Verify images load correctly
- [ ] Check mobile responsiveness
- [ ] Test contact form submission
- [ ] Run Lighthouse audit
- [ ] Deploy to Cloudflare Pages

## 📜 License

Built with ConstructOps — White-label construction marketing platform.

---

**Built by**: Santos Construction Inc  
**Location**: Dallas, TX  
**Website**: https://santos-construction.constructops.demo
