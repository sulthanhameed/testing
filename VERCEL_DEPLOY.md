# 🚀 Vercel Deployment — Definitive Fix

## ❌ Why Vercel was failing

Your repo has **TWO `package.json` files**:

| Location | Has `build` script? |
|---|---|
| **Root `package.json`** | ✅ `"build": "vite build"` |
| **`backend/package.json`** | ❌ Only has `dev`, `start`, `seed` |

Vercel was picking up the **wrong one** (the backend) — that's why
`npm run build` failed with "exited with 1".

## ✅ The Fix

Two things are now set:

1. **`.vercelignore`** explicitly excludes `backend/`, `database/`, etc.
2. **`vercel.json`** at the root tells Vercel to use root scripts.

But you ALSO need to fix the Vercel **Dashboard settings**:

---

## 📋 EXACT Steps to Deploy

### Step 1: Push to GitHub

```bash
git add .
git commit -m "fix: vercel root deployment config"
git push origin main
```

### Step 2: In Vercel Dashboard — Settings → General

| Setting | EXACT Value |
|---|---|
| **Framework Preset** | `Vite` |
| **Root Directory** | **LEAVE BLANK** ⚠ (or `./`) |
| **Build Command** | LEAVE BLANK (uses vercel.json) |
| **Output Directory** | LEAVE BLANK (uses vercel.json) |
| **Install Command** | LEAVE BLANK (uses vercel.json) |
| **Node.js Version** | `20.x` |

### ⚠ CRITICAL — Check "Root Directory"

If it says `backend`, `frontend`, or **anything other than blank**:
1. **Delete** the value
2. Save
3. Redeploy

Vercel uses "Root Directory" to find `package.json`. If it points to
`backend/`, it gets the wrong file (no build script).

### Step 3: Environment Variables (Settings → Environment Variables)

Add these for **Production**:

| Key | Value |
|---|---|
| `NPM_CONFIG_LEGACY_PEER_DEPS` | `true` |
| `NPM_CONFIG_PRODUCTION` | `false` |

### Step 4: Redeploy WITHOUT Cache

1. **Deployments** tab → ⋯ on latest → **Redeploy**
2. ☐ **UNCHECK** "Use existing Build Cache"
3. Click **Redeploy**

---

## ✨ Expected Successful Output

```
[15:42:01] Cloning github.com/sulthanhameed/hameed
[15:42:05] Detected `package.json` at root
[15:42:05] Running install command: npm install --legacy-peer-deps
[15:42:18] added 96 packages, 0 vulnerabilities
[15:42:19] Running build command: npm run build
[15:42:19] > react-vite-tailwind@0.0.0 build
[15:42:19] > vite build
[15:42:19] vite v7.3.2 building client environment for production...
[15:42:21] ✓ 62 modules transformed.
[15:42:21] dist/index.html  393.80 kB │ gzip: 101.24 kB
[15:42:21] ✓ built in 1.7s
[15:42:22] Build Completed in /vercel/output [22s]
[15:42:25] Deployment completed → https://hameed.vercel.app
```

---

## 🐛 If Build STILL Fails

### Error: "Missing build script"
**Cause**: Vercel is using `backend/package.json` (no build script).
**Fix**: Set Vercel "Root Directory" to **blank** (Step 2).

### Error: "Cannot find module 'vite'"
**Cause**: Vercel skipped devDependencies.
**Fix**: Add env var `NPM_CONFIG_PRODUCTION=false` (Step 3).

### Error: "Failed to resolve /src/main.tsx"
**Cause**: Cached build with old absolute path.
**Fix**: Redeploy with cache UNCHECKED (Step 4).

### Error: "peer dep conflict"
**Cause**: React 19 + older packages.
**Fix**: Add env var `NPM_CONFIG_LEGACY_PEER_DEPS=true` (Step 3).

---

## 💡 Why this approach works

Your project structure:

```
khang/
├── package.json          ← has "build": "vite build" ✅
├── vercel.json           ← tells Vercel: use root npm run build
├── .vercelignore         ← excludes backend/ so Vercel can't find it
├── index.html            ← Vite entry point
├── src/                  ← React source
│
├── backend/              ← IGNORED by Vercel
│   └── package.json      ← (only used for backend deploys to Render)
└── database/             ← IGNORED by Vercel
```

When Vercel scans the repo:
1. ✅ Sees root `package.json` with build script
2. ✅ Sees `vercel.json` with correct commands
3. ❌ Ignores `backend/package.json` (in `.vercelignore`)
4. ❌ Ignores `database/` (in `.vercelignore`)

Result: Clean build, no script confusion.

---

## 🎯 Quick Sanity Check

Run this **locally** to make sure it works:

```bash
# From your project root:
rm -rf node_modules dist
npm install
npm run build
```

Should output:
```
✓ 62 modules transformed.
dist/index.html  393.80 kB │ gzip: 101.24 kB
✓ built in 1.7s
```

If THIS works locally, Vercel will work too — as long as you set the
"Root Directory" to **blank** in the dashboard.

---

## 📞 Still Stuck?

Copy the **EXACT error log** from Vercel (the last 20 lines from
"View Build Logs") and paste it. I can diagnose any specific error
message.
