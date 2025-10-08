# Quick Reference: Active Files Summary

## ✅ KEEP THESE (60 Core Files)

### Config (9 files)
- index.html, package.json, vite.config.ts, tailwind.config.js, postcss.config.js
- tsconfig.json, tsconfig.node.json, vercel.json, playwright.config.ts

### Core App (5 files)
- src/main.tsx, src/App.tsx, src/i18n.ts, src/index.css, src/types.ts

### Services (4 files)  
- src/context/AuthContext.tsx, src/services/supabaseClient.ts
- src/services/geminiService.ts, src/utils/htmlFetch.ts

### Translations (2 files)
- src/locales/en.json, src/locales/ar.json

### Pages (11 files)
- src/pages/HomePage.tsx, ThreeDAnimationPage.tsx, ArchitectLessonsPage.tsx
- RoadmapPage.tsx, ArchitectsForumPage.tsx, SimpleTestPage.tsx
- TwinSciencePageNew.tsx, TwinFactoryPage.tsx
- auth/LoginPage.tsx, auth/RegisterPage.tsx, josoor/JosoorVisionPage.tsx

### Components (14 files)
- Header.tsx, Footer.tsx, ProtectedRoute.tsx, Frame.tsx, Hero.tsx, RubiksIframe.tsx
- DiscussionForum.tsx, ChapterSection.tsx, EpisodeItem.tsx, SupportingContent.tsx
- CompactAudioControls.tsx, MarkdownRenderer.tsx, HtmlRenderer.tsx

### TwinScience (~15 files)
- src/components/TwinScience/index.tsx, App.tsx, ContentModal.tsx
- components/EpisodeCard.tsx, ContentModal.tsx, Header.tsx
- components/content/*.tsx (4 files), components/figma/ImageWithFallback.tsx
- utils/contentAvailability.ts, TwinScience.css

### Public Assets
- public/faces.json, rubiks-cdn.html
- public/images/, public/lessons/, public/article-assets/, public/assets/cosmic/

---

## ❌ STASH THESE (40+ Files)

### Run: `bash stash-unused-files.sh`

**Categories:**
1. Backup files (.bak)
2. Alternative components (10 files)
3. Old TwinScience directory
4. Unused cosmic components
5. Documentation files (~15)
6. Unused public assets (3 directories)

**Result:** Cleaner codebase with 30-40% fewer files

---

## 📋 Quick Start

1. **Review sitemap:** `COMPREHENSIVE_ACTIVE_SITEMAP.md`
2. **Run stash script:** `bash stash-unused-files.sh`
3. **Test thoroughly:** Check all routes, assets, builds
4. **Delete stash after 30 days** if no issues

---

## 🔍 How Files Were Identified

✅ **Active files** = Imported from entry points OR referenced in code
❌ **Stash files** = No imports found + not in active chain

**Tools used:**
- Custom dependency analyzer (analyze-dependencies.js)
- Import chain tracing from App.tsx
- Asset reference scanning  
- Manual verification of TwinScience components
