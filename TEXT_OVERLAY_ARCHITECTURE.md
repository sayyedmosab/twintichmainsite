# Text Overlay System Architecture Design

## Overview
This document outlines the complete architectural design for implementing the missing text overlay system that renders scrolling text content synchronized with the 9-phase Rubik's cube animation.

## Current State
- ✅ **Animation System**: RubiksIframe with 9-phase cube transformation working
- ✅ **Text Content**: scrollingSections array with 8 transformation narrative sections
- ❌ **Text Rendering**: scrollingSections defined but never used in JSX
- ❌ **Text Overlay**: No component to display text over animation
- ❌ **Slide Animations**: No slide in/out transitions implemented

## 1. Component Architecture

```
HomePage.tsx
├── RubiksIframe (existing)
│   ├── Handles 3D animation
│   ├── Emits progress/phase events via postMessage
│   └── Provides onProgress & onPhaseChange callbacks
└── ScrollingTextOverlay (NEW)
    ├── Receives progress from RubiksIframe
    ├── Maps progress to text sections
    ├── Handles slide animations
    └── Renders text content over iframe
```

## 2. Data Flow Architecture

```
iframe scroll → globalProgress() → postMessage → RubiksIframe → 
onProgress callback → ScrollingTextOverlay → calculate visible section → 
slide transition → render text
```

## 3. Integration Points

### Existing Infrastructure (Keep)
- `RubiksIframe` component with postMessage communication
- `scrollingSections` data array (8 text sections)
- Progress calculation (0-1 range)
- Phase detection system (9 phases)

### New Components Needed
```typescript
interface ScrollingTextOverlayProps {
  progress: number;
  currentPhase: number;
  sections: ScrollingSection[];
}

interface ScrollingSection {
  title: string;
  subtitle: string;
  text: string;
  startProgress: number;  // When this section appears
  endProgress: number;    // When this section disappears
}
```

## 4. Progress Mapping Design

### Current System
- Animation has 9 phases with specific progress ranges
- Example: Phase 1 (0-2.01%), Phase 2 (2.01-12.06%), etc.

### Text Section Mapping
```typescript
const textSectionMap = [
  { section: 0, startProgress: 0.00, endProgress: 0.125 },   // 0-12.5%
  { section: 1, startProgress: 0.125, endProgress: 0.25 },  // 12.5-25%
  { section: 2, startProgress: 0.25, endProgress: 0.375 },  // 25-37.5%
  { section: 3, startProgress: 0.375, endProgress: 0.50 },  // 37.5-50%
  { section: 4, startProgress: 0.50, endProgress: 0.625 },  // 50-62.5%
  { section: 5, startProgress: 0.625, endProgress: 0.75 },  // 62.5-75%
  { section: 6, startProgress: 0.75, endProgress: 0.875 },  // 75-87.5%
  { section: 7, startProgress: 0.875, endProgress: 1.0 },   // 87.5-100%
];
```

## 5. Animation Architecture

### Slide Transition System
```css
.text-overlay {
  position: absolute;
  z-index: 10;
  /* Positioned over iframe */
}

.text-section {
  transform: translateX(-100%);  /* Start off-screen */
  transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
}

.text-section.active {
  transform: translateX(0);      /* Slide in */
  opacity: 1;
}

.text-section.exiting {
  transform: translateX(100%);   /* Slide out */
  opacity: 0;
}
```

## 6. State Management Design

```typescript
const ScrollingTextOverlay = ({ progress, sections }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState(-1);

  useEffect(() => {
    const newSection = calculateCurrentSection(progress);
    if (newSection !== currentSection) {
      handleSectionTransition(newSection);
    }
  }, [progress]);
};
```

## 7. Positioning Architecture

### Layout Strategy
```jsx
<div className="relative w-full h-full">
  {/* Iframe (background) */}
  <RubiksIframe onProgress={handleProgress} onPhaseChange={handlePhase} />
  
  {/* Text overlay (foreground) */}
  <div className="absolute inset-0 pointer-events-none z-10">
    <ScrollingTextOverlay 
      progress={progress} 
      sections={scrollingSections} 
    />
  </div>
</div>
```

## 8. Performance Considerations

### Optimization Strategy
- **Debounced Updates**: Avoid re-rendering on every progress change
- **Section Pre-loading**: Prepare next/previous sections for smooth transitions
- **CSS Transforms**: Use transform3d for hardware acceleration
- **Conditional Rendering**: Only render visible + adjacent sections

```typescript
const debouncedProgress = useDebounce(progress, 16); // ~60fps
const visibleSections = useMemo(() => 
  getVisibleSections(debouncedProgress), [debouncedProgress]
);
```

## 9. Responsive Design Architecture

### Multi-Device Strategy
```css
.text-overlay {
  /* Desktop: Side overlay */
  @media (min-width: 1024px) {
    left: 5%;
    width: 40%;
    top: 20%;
  }
  
  /* Mobile: Bottom overlay */
  @media (max-width: 1023px) {
    bottom: 10%;
    left: 5%;
    right: 5%;
  }
}
```

## 10. Error Handling Architecture

### Fallback Strategy
- **Progress Bounds**: Clamp progress to 0-1 range
- **Section Fallback**: Default to section 0 if calculation fails
- **Animation Fallback**: CSS transitions with fallback to opacity-only
- **Content Fallback**: Show static text if dynamic system fails

## 11. Testing Architecture

### Component Testing
- Mock progress values and verify correct section display
- Test transition animations with progress changes
- Verify text content matches scrollingSections data
- Test responsive behavior across screen sizes

### Integration Testing
- Test RubiksIframe → ScrollingTextOverlay communication
- Verify progress mapping accuracy
- Test slide timing with animation phases

## 12. Code Organization

```
src/components/
├── RubiksIframe.tsx (existing)
├── ScrollingTextOverlay/
│   ├── index.tsx
│   ├── TextSection.tsx
│   ├── useProgressMapping.ts
│   ├── useSlideAnimation.ts
│   └── styles.css
└── HomePage.tsx (modified)
```

## Implementation Priority

1. **Phase 1**: Create ScrollingTextOverlay component with basic text rendering
2. **Phase 2**: Implement progress mapping and section switching
3. **Phase 3**: Add slide animations and transitions
4. **Phase 4**: Optimize performance and add error handling
5. **Phase 5**: Add responsive design and testing

## Key Benefits

- **Preserves Existing**: Leverages current RubiksIframe infrastructure
- **Maintainable**: Clean separation of concerns
- **Performant**: Hardware-accelerated animations with debouncing
- **Responsive**: Works across all device sizes
- **Extensible**: Easy to modify text content or add new sections

This architecture restores the sophisticated text overlay system that synchronizes with your beautiful 9-phase cube transformation animation.
