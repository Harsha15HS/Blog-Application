Vercel setup for `VITE_API_URL`
===============================

Steps for setting the environment variable and build settings in Vercel (copy-paste):

1. Open Vercel and go to your project dashboard.
2. Settings → Environment Variables → Add New
   - Key: `VITE_API_URL`
   - Value: `https://my-backend.onrender.com` (replace with your Render URL)
   - Environment: `Production` (optionally add `Preview` and `Development` too)
3. Save the variable.

Make sure Vercel builds the correct folder (monorepo):
1. Project Settings → General (or Git) → Root Directory: set to `front-end`
2. Build Command: `npm run build` (or the command you use)
3. Output Directory: `dist`

Redeploy:
- Trigger a redeploy from the Vercel dashboard (Deployments → Redeploy) so Vite picks up `VITE_API_URL` at build time.

Local testing
-------------
- Create `.env.local` inside `front-end/` with:

  VITE_API_URL=http://localhost:8282

- Start dev server:

```bash
cd front-end
npm install
npm run dev
```

- Or test production build locally:

```bash
cd front-end
VITE_API_URL=https://my-backend.onrender.com npm run build
npm install -g serve
serve -s dist
```

Why the 404 happened
---------------------
- Vite replaces `import.meta.env.VITE_*` during build. If `VITE_API_URL` was not set during the Vercel build, `API` becomes undefined and requests go to the frontend origin (e.g. `/users/register`) causing 404.

If you want, I can also add these exact steps into your repository README or commit a `.env.example` file. Tell me which you'd prefer.
