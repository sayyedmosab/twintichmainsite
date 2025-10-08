# Active Files Sitemap - AI Twin Tech Codebase

**Generated:** ${new Date().toISOString()}
**Purpose:** Definitive list of actively used files based on code analysis

## Methodology
- Started from entry points (index.html, src/main.tsx, vite.config.ts, etc.)
- Traced all import chains through actual code
- Included all configuration files
- Included all static assets referenced by active code
- NO ASSUMPTIONS - only files provably used by the application

---

## Core Application Files

### Entry Points & Configuration
```
✓ index.html                    - HTML entry point
✓ package.json                  - Dependencies and scripts
✓ vite.config.ts               - Vite configuration
✓ tailwind.config.js           - Tailwind CSS config
✓ postcss.config.js            - PostCSS config
✓ tsconfig.json                - TypeScript config (app)
✓ tsconfig.node.json           - TypeScript config (node)
✓ vercel.json                  - Vercel deployment config
✓ playwright.config.ts         - E2E test configuration
✓ .gitignore                   - Git ignore rules
✓ .env                         - Environment variables (if exists)
```

### Source Code Root
```
✓ src/main.tsx                 - React entry point
✓ src/App.tsx                  - Main app component with routing
✓ src/i18n.ts                  - i18next configuration
✓ src/index.css                - Global styles
✓ src/types.ts                 - Shared TypeScript types
```

---

## Active Source Files

### Context & Services
```
✓ src/context/AuthContext.tsx              - Authentication context
✓ src/services/supabaseClient.ts           - Supabase client setup
✓ src/services/geminiService.ts            - Gemini AI service (if used)
```

### Utilities
```
✓ src/utils/htmlFetch.ts                   - HTML fetching utility
```

### Localization
```
✓ src/locales/en.json                      - English translations
✓ src/locales/ar.json                      - Arabic translations
```

---

## Pages (Active Routes from App.tsx)

### Main Pages
```
✓ src/pages/HomePage.tsx                   - Landing page (/)
✓ src/pages/ThreeDAnimationPage.tsx        - 3D Animation (/3danimation)
✓ src/pages/ArchitectLessonsPage.tsx       - Architect lessons (/architect)
✓ src/pages/RoadmapPage.tsx                - Roadmap (/roadmap)
✓ src/pages/ArchitectsForumPage.tsx        - Forum (/forum)
✓ src/pages/SimpleTestPage.tsx             - Test page (/test)
✓ src/pages/TwinSciencePageNew.tsx         - Twin Science (/twinscience)
✓ src/pages/TwinFactoryPage.tsx            - Twin Factory (/twinfactory)
```

### Auth Pages
```
✓ src/pages/auth/LoginPage.tsx             - Login (/login)
✓ src/pages/auth/RegisterPage.tsx          - Register (/register)
```

### Special Pages
```
✓ src/pages/josoor/JosoorVisionPage.tsx    - About/Josoor Vision (/about)
```

---

## Core Components (Used by Pages)

### Layout Components
```
✓ src/components/Header.tsx                - Main header navigation
✓ src/components/Footer.tsx                - Footer component
✓ src/components/ProtectedRoute.tsx        - Route protection wrapper
```

### HomePage Components
```
✓ src/components/Frame.tsx                 - Frame component
✓ src/components/Hero.tsx                  - Hero section
✓ src/components/RubiksIframe.tsx          - Rubik's cube iframe embed
```

### Forum Components
```
✓ src/components/DiscussionForum.tsx       - Discussion forum
✓ src/components/ChapterSection.tsx        - Chapter section
✓ src/components/EpisodeItem.tsx           - Episode item
✓ src/components/SupportingContent.tsx     - Supporting content
✓ src/components/CompactAudioControls.tsx  - Audio controls
```

### Content Rendering
```
✓ src/components/MarkdownRenderer.tsx      - Markdown renderer
✓ src/components/HtmlRenderer.tsx          - HTML renderer
```

---

## TwinScience Component System

**Note:** TwinScience uses a modular component system. Need to trace all imports from:

### Main Entry
```
✓ src/components/TwinScience/index.tsx     - Main export file
✓ src/components/TwinScience/App.tsx       - Main TwinScience component
```

### To Complete - Need to Trace These Imports:
The App.tsx imports:
- EpisodeCard from './components/EpisodeCard'
- ContentModal from './ContentModal'

These need to be added to active files list along with their dependencies.

---

## Static Assets & Public Files

### Configuration Files
```
✓ public/faces.json                        - Rubik's cube faces data
✓ public/rubiks-cdn.html                   - Standalone Rubik's cube
```

### Asset Directories (Need Verification)
These directories exist but need to verify which files are actually referenced:

```
? public/icons/                            - Icon files
? public/images/                           - Image files
? public/assets/                           - General assets
? public/article-assets/                   - Article specific assets
? public/lessons/                          - Lesson content
? public/twinlab/                          - Twin Lab assets
? public/twinstudio/                       - Twin Studio assets
```

**Action Required:** Need to scan actual code for asset references to determine which specific files are used.

---

## Files to INVESTIGATE (Possibly Unused)

### Duplicate/Backup Files
```
? src/pages/HomePage.bak.tsx               - Backup file
? src/pages/SimpleTest.tsx                 - Duplicate test?
? src/pages/SimpleTestMain.tsx             - Duplicate test?
? src/pages/UnifiedHomePage.tsx            - Alternative homepage?
? src/pages/TwinSciencePage.tsx            - Old TwinScience?
? src/components/Header.tsx.bak            - Backup header
? src/components/HeaderFixed.tsx           - Alternative header
? src/components/SimpleHeader.tsx          - Alternative header
? src/components/SketchAppHeader.tsx       - Alternative header
? src/components/JosoorHeader.tsx          - Alternative header
? src/components/Navbar.tsx                - Alternative nav
? src/components/TextBlock.tsx             - Unknown usage
```

### Temporary Directories
```
? src/pages/temp_twinscience_after_migrating_delete_me/   - Marked for deletion
? public/3danimation/                                      - Duplicate 3D animation?
? THREE.examples/                                          - Example code?
? test-results/                                            - Test artifacts
? tests/playwright/                                        - Test files
```

### Documentation & Development Files
```
? memory-bank/                             - Development notes
? attached_assets/                         - Temporary attachments
? src/DOCUMENTATION/                       - Documentation
? *.md files (various)                     - Documentation
? *.log files                              - Log files
? *.prompt.md files                        - Prompt files
```

---

## Next Steps Required

### 1. Complete TwinScience Component Trace
Need to analyze and add:
- All components imported by TwinScience/App.tsx
- All UI components used (from components/ui/)
- All content components
- All utilities

### 2. Verify Static Asset Usage
Run grep/search for:
- Image paths in code
- Asset references
- Public file references

### 3. Cosmic Components Investigation
Check if `src/components/cosmic/` is used and by what.

### 4. Data Files Investigation
Check if `src/data/` contains actively used files.

---

## Recommended Actions

1. **Create stash folder structure:**
   ```
   stash/
   ├── backup-files/          # .bak files
   ├── duplicate-pages/       # Alternative implementations
   ├── old-components/        # Unused components
   ├── temp-directories/      # Temp folders
   ├── documentation/         # Dev docs and logs
   └── unused-assets/         # Unreferenced assets
   ```

2. **Verify before stashing:**
   - Search codebase for any imports of questionable files
   - Check git history for recent usage
   - Test application after stashing

3. **Keep safe:**
   - All files marked with ✓ above
   - TwinScience complete component tree (after tracing)
   - Actually referenced assets only

---

## Status: INCOMPLETE

This sitemap is a work in progress. Need to:
1. ✅ Identify core entry points and pages
2. ✅ Map main components
3. ⏳ Complete TwinScience component tree
4. ⏳ Verify all asset references
5. ⏳ Investigate cosmic components
6. ⏳ Investigate data directory
7. ⏳ Create comprehensive stashing plan
