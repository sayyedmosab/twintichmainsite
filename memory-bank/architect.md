# MemoriPilot: System Architect

## Overview
This file contains the architectural decisions and design patterns for the MemoriPilot project.

## Architectural Decisions

- Debug plan saved in debug-plan.md and logged in memory bank.
- Memory bank tools used for structured tracking.



1. **Decision 1**: Description of the decision and its rationale.
2. **Decision 2**: Description of the decision and its rationale.
3. **Decision 3**: Description of the decision and its rationale.



## Design Considerations

- public/rubiks-cdn.html is loaded via iframe and should reflect changes immediately unless cached or overwritten by build process.
- Dev server may serve cached or built files instead of latest public/rubiks-cdn.html.
- Critical files traced: index.html, main.tsx, App.tsx, RubiksIframe.tsx, public/rubiks-cdn.html.



## Components

### RubiksIframe

Component that loads public/rubiks-cdn.html in an iframe and communicates with it via postMessage.

**Responsibilities:**

- Render Rubiks animation
- Sync progress and phase with parent React app

### DebugPlan

Step-by-step plan to diagnose why changes to public/rubiks-cdn.html are not reflected in the running app.

**Responsibilities:**

- Trace entry point and critical files
- Confirm rubiks-cdn.html usage
- Check dev server build/caching issues
- Verify RubiksIframe usage and rendering
- Document findings and update plan



