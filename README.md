# DSI Transport Management System (Places-Only v4) — Frontend

## Stack
- Static HTML + Vanilla JS (NO React)
- Premium glassmorphism UI
- Sinhala-first labels
- Light default + Dark toggle (typed text visible in dark mode inputs)
- Profile button on all logged-in pages
- Home button routes to correct dashboard by role

## Configure Backend URL
Edit:
- `js/config.js`

```js
export const API_BASE = "https://your-railway-backend.up.railway.app";
```

## Hosting (GitHub Pages)
1) Put this frontend folder in a GitHub repo.
2) Enable **GitHub Pages** → Deploy from branch → `/` root.
3) Set backend CORS allowlist:
   - Railway `ALLOWED_ORIGINS=https://<username>.github.io`

## Pages
- `pages/login.html`
- `pages/register.html` (EMP register — drop place required)
- `pages/admin.html` (ADMIN)
- `pages/hod.html` (HOD)
- `pages/ta.html` (TA)
- `pages/hr.html` (HR)
- `pages/emp.html` (EMP)
- `pages/profile.html`

## Notes
- **No Routes/Sub-routes anywhere** (Places-based only)
- Place search uses DB-only endpoints:
  - Public register: `/auth/places/search?q=`
  - Logged-in pages: `/lookup/places/search?q=`

