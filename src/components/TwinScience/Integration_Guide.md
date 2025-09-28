# TwinScience Learning Hub Integration Guide

## Overview
The TwinScience Learning Hub is a self-contained React component that provides an interactive learning experience for digital twin technology education.

## Integration Steps

### 1. Copy Required Files
Copy these files/folders to your React project:

```
├── components/
│   ├── EpisodeCard.tsx
│   ├── ContentModal.tsx
│   ├── content/
│   │   ├── ArticleContent.tsx
│   │   ├── PodcastContent.tsx
│   │   ├── StudyGuideContent.tsx
│   │   └── VideoContent.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/ (entire folder - shadcn/ui components)
├── App.tsx (renamed to TwinScienceLearningHub)
├── index.tsx
└── styles/globals.css (or merge the CSS variables)
```

### 2. Install Dependencies
Ensure these packages are installed in your project:

```bash
npm install lucide-react motion/react
```

### 3. CSS Integration Options

#### Option A: Import the entire globals.css
```tsx
import './path/to/globals.css';
```

#### Option B: Merge CSS variables into your existing CSS
Copy the CSS variables from `globals.css` and merge them into your existing stylesheets. You may want to scope them to avoid conflicts:

```css
.twin-science-learning-hub {
  /* Copy all the CSS variables here */
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  /* ... rest of variables */
}
```

### 4. Usage in Your React App

#### Basic Usage
```tsx
import { TwinScienceLearningHub } from './path/to/TwinScienceLearningHub';

function MyPage() {
  return (
    <div>
      <h1>My Educational Content</h1>
      <TwinScienceLearningHub />
    </div>
  );
}
```

#### With CSS Scoping (if using Option B above)
```tsx
import { TwinScienceLearningHub } from './path/to/TwinScienceLearningHub';

function MyPage() {
  return (
    <div>
      <h1>My Educational Content</h1>
      <div className="twin-science-learning-hub">
        <TwinScienceLearningHub />
      </div>
    </div>
  );
}
```

### 5. Customization

#### Custom Data
You can modify the learning data directly in the component or extract it to a separate file:

```tsx
// Create a separate data file
export const customLearningData = {
  chapters: [
    // Your custom chapters and episodes
  ]
};

// Then import and use in the component
```

#### Styling
The component uses Tailwind CSS classes. You can:
- Override specific classes by adding more specific selectors
- Modify the CSS variables to match your brand colors
- Use the `!important` modifier in Tailwind for specific overrides

### 6. TypeScript Support
The component exports TypeScript interfaces:

```tsx
import { Episode, Chapter, TwinScienceLearningHub } from './path/to/TwinScienceLearningHub';

// Use the types in your own code
const myEpisode: Episode = {
  id: "custom-1",
  title: "My Custom Episode",
  description: "Custom description"
};
```

## Features
- ✅ Self-contained React component
- ✅ Responsive design
- ✅ Interactive episode cards with hover effects
- ✅ Modal content viewer with multiple content types
- ✅ Professional angular design aesthetic
- ✅ TypeScript support
- ✅ Accessible navigation and interactions

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Mobile responsive design
- Touch-friendly interactions

## Notes
- The component is designed to be embedded within existing pages
- No external dependencies on routing or global state management
- All interactions are self-contained within the component
- Uses system fonts by default (no custom font loading required)