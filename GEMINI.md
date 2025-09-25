# Gemini Context: AI Twin Tech Website

## Project Overview

This project is a sophisticated, bilingual (English/Arabic) web application named "AI Twin Tech". It is built using a modern web stack and features a rich, interactive user experience that includes 3D graphics. The application is divided into three main sections:

*   **TwinUni (formerly TwinLab):** An educational platform with a cosmic-themed UI.
*   **TwinStudio:** A section for digital twin visualization and transformation tools.
*   **TwinFactory:** A section for production and manufacturing-focused features (marked as "Coming Soon").

### Core Technologies:

*   **Frontend Framework:** React 18
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router
*   **Internationalization (i18n):** `react-i18next` is used for full English and Arabic language support, including RTL layouts.
*   **3D Graphics:** `three.js` with `@react-three/fiber` and `@react-three/drei` for rendering interactive 3D elements.
*   **Backend as a Service (BaaS):** Supabase is used for authentication and other backend services.

## Building and Running

The project is managed using `npm`. The following scripts are defined in `package.json`:

*   **Start Development Server:**
    ```bash
    npm run dev
    ```
    This command starts the Vite development server on `http://localhost:3100`.

*   **Create Production Build:**
    ```bash
    npm run build
    ```
    This command bundles the application for production into the `dist` directory.

*   **Preview Production Build:**
    ```bash
    npm run preview
    ```
    This command serves the production build locally to test it before deployment.

## Development Conventions

*   **Internationalization (i18n):**
    *   All user-facing text must be translated.
    *   Translation strings are stored in `src/locales/en.json` and `src/locales/ar.json`.
    *   Use the `useTranslation` hook from `react-i18next` to implement translations in components.
    *   The application must support Right-to-Left (RTL) layout for Arabic.

*   **Component Structure:**
    *   The project follows a standard component-based architecture.
    *   Reusable components are located in `src/components`.
    *   Page-level components are in `src/pages`.

*   **Styling:**
    *   Utilize Tailwind CSS for all styling. Adhere to the configuration in `tailwind.config.js`.

*   **Routing:**
    *   The application uses `react-router-dom` for client-side routing. All routes are defined within the React application structure.

*   **Backend Interaction:**
    *   All interactions with the backend (e.g., authentication, data fetching) should go through the Supabase client, which is configured in `src/services/supabaseClient.ts`.
