# Debug Plan: TwinTech MainSite

## 1. Entry Point and Main File Flow
- `index.html` (root): Loads `/src/main.tsx`.
- `src/main.tsx`: Renders `<App />` from `src/App.tsx` and loads `src/index.css`.
- `src/App.tsx`: Sets up routing and layout, imports key components and pages.

## 2. Critical Referenced Files
- `src/context/AuthContext.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/ThreeDAnimationPage.tsx`
- `src/pages/ArchitectLessonsPage.tsx`
- `src/pages/auth/LoginPage.tsx`
- `src/pages/auth/RegisterPage.tsx`
- `src/pages/josoor/JosoorVisionPage.tsx`
- `src/pages/RoadmapPage.tsx`
- `src/pages/ArchitectsForumPage.tsx`
- `src/pages/SimpleTestPage.tsx`
- `src/components/cosmic/CosmicLandingPage.tsx`
- `src/components/RubiksIframe.tsx`
- `public/rubiks-cdn.html`

## 3. Rubiks-cdn.html Usage
- Loaded as the src of an <iframe> in `RubiksIframe.tsx`.
- Communicates with React via postMessage.
- Changes to this file should be reflected in the app wherever RubiksIframe is used.

## 4. Investigation Steps
- Confirm all changes to `public/rubiks-cdn.html` are up-to-date and not overwritten by build or cache.
- Verify the dev server is serving the latest version of `public/rubiks-cdn.html`.
- Check where `RubiksIframe` is used in the app and ensure it is rendered.
- Review recent changes in all critical files listed above.
- Document findings and update this plan as needed.

## 5. Next Actions
- Follow this plan to diagnose why changes to `public/rubiks-cdn.html` are not reflected in the running app.
- Save all findings and steps for future reference.
