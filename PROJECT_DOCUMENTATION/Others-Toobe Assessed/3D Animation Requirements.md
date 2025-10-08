# Instructions to the coding

The below are complex and sophisticated requirements. In order to be able to develop them correctly from the first round, make sure to perform the following:  
1- Save these specifications in a folder called Animation Specifications  
2- Split the file into 10 files: 

- 1 requirements file for each of the 9 phases containing all the phase-specific requirements  
- 1 master file containing the global requirements applied everywhere and the the sequence and transition between them

3- Always use the master file to start, create the full container canvas, then start with the first phase, once the phase is done, always remember to return to the master file and continue to the next phase and continue till all phases are completed.  
4- Once the last phase 9 is done, perform a quality check by going through the master file requirements and compare the final product against the requirements including the phase requirements to ensure they are met. If not, log them in a file as bugs  
5- Once step 4 is done, open the bugs file created in step 4 and proceed to fixing them. Once a bug is fixed, remove that bug only from the bugs file  
6- continue iterating steps 4 and step 5 until the bugs report is empty, then you can declare the work is done

# 1.0 Global Requirements \- DETAILED SCROLL-BY-SCROLL REQUIREMENTS 

**Total Scroll Length**: 18000px (18000px spacer div)   
**THREE.js Version**: use latest 

## 1.1 PHASE TIMING BREAKDOWN

| Phase | Progress Start | Progress End | Scroll Pixels Start | Scroll Pixels End | Duration (pixels) | Percentage of Total |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Phase 1** | 0.00 | 0.0201 | 0px | 362px | 362px | 2.01% |
| **Phase 2** | 0.0201 | 0.1206 | 362px | 2171px | 1809px | 10.05% |
| **Phase 3** | 0.1206 | 0.1448 | 2171px | 2606px | 435px | 2.42% |
| **Phase 4** | 0.1448 | 0.3138 | 2606px | 5648px | 3042px | 16.9% |
| **Phase 5** | 0.3138 | 0.43 | 5648px | 7740px | 2092px | 11.62% |
| **Phase 6** | 0.43 | 0.52 | 7740px | 9360px | 1620px | 9% |
| **Phase 7** | 0.52 | 0.62 | 9360px | 11160px | 1800px | 10% |
| **Phase 8** | 0.62 | 0.70 | 11160px | 12600px | 1440px | 8% |
| **Phase 9** | 0.70 | 1.0 | 12600px | 18000px | 5400px | 30% |

## 1.2 CUBE SPECIFICATIONS

### Large Cubes (Phase 1-3)

- **Count**: 27 cubes (3x3x3 formation)  
- **Size**: `LARGE_SIZE = 1.0`  
- **Gap**: `GAP = 0.08`  
- **Step**: `STEP = 1.08` (size \+ gap)  
- **Initial Scale**: `1.5x` (PHASE1\_INITIAL\_SCALE)  
- **Color**: `0x1f2937` (DARK NAVY BLUE)  
- **Edge Color**: `0xffffff` (white)  
- **Face Patterns**: Applied via faces.json with 6 patterns. Each pattern has exactly 9 instances distributed randomly once and then fixed for consistency.  
- **Visual Properties**:  
  - Metallic feel with reflective surfaces  
  - Shifting lighting that moves across faces  
  - Raised pattern appearance with depth  
- **Critical**: Phase handover maintenance \- Each phase starts from the exact last position/state of cubes from the previous phase. No resets or jumps.

### Mini Cubes (Phase 4+)

- **Count**: 729 cubes (27 large × 27 mini each)  
- **Size**: `MINI_SIZE = 0.28`  
- **Gap**: `MINI_GAP = 0.06`  
- **Step**: `MINI_STEP = 0.34`  
- **Initial Color**: `0x1f2937` (dark navy)  
- **Target Color**: `0x9f7bff` (glowing purple)  
- **Face Patterns**: Mini cubes use NO face patterns \- they will not appear and only impact performance.  
- **Edge Colors**:  
  - White edges when dark navy (`0x1f2937`)  
  - Light gray edges when glowing purple (`0x9f7bff`)

## 1.3 FACE PATTERNS SYSTEM

### faces.json Structure

**Pattern Specifications**:

- All patterns cover the entire face completely  
- Patterns appear raised with 3D depth effect  
- Metallic feel with reflective properties  
- **Canvas Implementation**: Each pattern is generated on a 256x256 pixel texture canvas that maps to cube faces

{

  "version": "v1",

  "palette": \["\#00F0FF", "\#22D3EE", "\#38BDF8", "\#60A5FA", "\#3B82F6", "\#2563EB"\],

  "faces": \[

    { "id": 0, "pattern": "grid", "description": "Subtle grid with white lines on blue gradient" },

    { "id": 1, "pattern": "stripes", "description": "Diagonal stripes with white strokes" },

    { "id": 2, "pattern": "ring", "description": "Concentric rings with white outlines" },

    { "id": 3, "pattern": "chevron", "description": "Chevron patterns with white lines" },

    { "id": 4, "pattern": "hex", "description": "Hexagonal grid with white edges" },

    { "id": 5, "pattern": "wave", "description": "Sinusoidal waves with white strokes" }

  \]

}

### Pattern Implementation Details

- **Canvas Size**: 256x256 pixels (texture canvas for each cube face)  
- **Base Color**: Gradient from palette\[0\] to palette\[2\]  
- **Stroke Style**: `rgba(255,255,255,0.8)` with `lineWidth: 2`  
- **Patterns Applied**: Only to large cubes in Phase 1-3, mini cubes have no patterns for performance

## 1.4 LIGHTING & RENDERING SPECIFICATIONS

### Lighting Setup

- **Hemisphere Light**: `color: 0x8aa4ff, groundColor: 0x0e0f15, intensity: 0.7`  
- **Directional Light**: `color: 0xffffff, intensity: 1.0, position: (6, 10, 8), castShadow: true`  
- **Core Light**: `color: 0x9f7bff, intensity: 2.0` (activated in Phase 8\)

### Post-Processing

- **Effect Composer**: UnrealBloomPass enabled  
- **Bloom Settings**: `threshold: 0.7, strength: 0.7, radius: 0.2`  
- **Tone Mapping**: ACESFilmicToneMapping  
- **Exposure**: 1.0

### Camera Settings

- **Type**: PerspectiveCamera  
- **FOV**: 60 degrees  
- **Position**: `(6, 4, 12)`  
- **Near**: 0.1  
- **Far**: 500

## 1.5 MOUSE INTERACTION SPECIFICATIONS

### Phase 1 & 9 Mouse Control

- **X-axis**: `pointer.x * 0.6` → rotation.y  
- **Y-axis**: `pointer.y * 0.4` → rotation.x  
- **Smooth Interpolation**: Target rotation with lerp  
- **Active Phases**: Phase 1 (0-2.01%) and Phase 9 (70-100%)

### Disabled Phases

- **Phases 2-8**: Mouse rotation disabled  
- **Override**: Animation takes full control  
- **Restoration**: Mouse control returns in Phase 9

## 1.6 BACKGROUND & VISUAL EFFECTS

### Background

- **Base**: A gray color  
- **Tinting**: Gradual black overlay in Phase 8  
- **Final**: Full black in final morph sequence

### Shadow Mapping

- **Enabled**: All cubes cast and receive shadows  
- **Type**: PCFSoftShadowMap  
- **Light Source**: Directional light from (6, 10, 8\)

## 1.7 PERFORMANCE SPECIFICATIONS

### Frame Rate

- **Target**: 60 FPS  
- **Animation**: requestAnimationFrame loop  
- **Pixel Ratio**: Clamped to max 2.0

### Optimization

- **Frustum Culling**: Automatic via THREE.js  
- **Geometry Instancing**: Individual cube objects  
- **Texture Caching**: Face patterns cached on creation

## 1.8 TEXT OVERLAY INTEGRATION REQUIREMENTS

### Typography Specifications

- **Title Font**: Allerta Stencil  
  - Block 1 (Phase 1): 66pts, bright white with light blue glow  
  - All other blocks: 44pts, bright white with light blue glow  
- **Subtitle Font**: Inter, 24pts, blue color  
- **Body Font**: Inter, 18pts, bright white

### Text Block Widths

- **Block 1** (Phase 1): 650px width  
- **All other blocks**: 560px width

### Animation Requirements

- **No fading** \- Text scrolls out of screen to imitate natural scrolling  
- **Entry**: Vertical slide in  
- **Exit**: Vertical slide out  
- **Timing**: Phase-synchronized  
- **Smoothness**: Hardware-accelerated transforms

### Text Blocks Transition

* Vertical slide in/out \- must not overlap, must give feeling of scrolling, happens at transition points and remains still while cubes animate

## 1.9 Overall View

The visible screen is split virtually into 3 equal columns, from left to right:

- 1/3: contains the text overlay, left-aligned and vertically centered. The text can overlap the area if needed   
- 2/3: contains the cube animation which is centered to it and vertically top-aligned 

# 2.0 Phase Requirements

## 2.1 PHASE 1: Idle / Mouse Rotation (0px \- 362px)

**Face patterns are set from the start** **Duration**: 362 pixels (2.01% of scroll)

| Scroll Range | Animation Behavior | Visual State | Mouse Interaction |
| :---- | :---- | :---- | :---- |
| 0px \- 90px | Cube at 1.5x scale, gentle floating | 27 large cubes with face patterns organized as one Rubiks Cube | Mouse can spin in all directions |
| 90px \- 180px | Gradual scale reduction begins | Cube shrinking towards 1.0x | Mouse can spin in all directions |
| 180px \- 270px | Continued shrinking | Scale approaching target | Smooth rotation interpolation |
| 270px \- 362px | Final positioning for Phase 2 | Ready for dismantle | Mouse control maintained |

**Text Display**: 3 TEXT BLOCKS THAT SCROLL WHILE CUBE IS SHRINKING:  
**Block 1**

- **Title**: "Transforming Strategy Execution" (66pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "COMPLEXITY AS AN ASSET" (24pts, Inter, blue)  
- **Body**: "Most transformations fail because complexity overwhelms. We turned that complexity into an advantage—redefining planning, risks, and dashboards inside one integrated model." (18pts, Inter, bright white)  
- **Text Block Width**: 650px

Block 2

- **Title**: "Imagine a Parallel Universe" (44pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "WHERE TRANSFORMATIONS FLOW" (24pts, Inter, blue)  
- **Body**: "Let us show you a week in that universe — A Week in the Life of a Transformation Team . Farfetched? It's here. We built the MVP: a Net.js web app with a Supabase database and a Gemini Assistant, built on a five-year scenario dataset inspired by real transformation events." (18pts, Inter, bright white)  
- **Text Block Width**: 560px

Block 3

- **Title**: "So How Did We Do It?" (44pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "THE RIGHT QUESTIONS FIRST" (24pts, Inter, blue)  
- **Body**: "Before answers, you need the right questions. This journey begins by uncovering the questions that matter most—the ones that unlock how complexity really works." (18pts, Inter, bright white)  
- **Text Block Width**: 560px

## 2.2 PHASE 2: First Dismantle / Dramatic Cloud (362px \- 2171px)

**Duration**: 1809 pixels (10.05% of scroll)

| Scroll Range | Animation Behavior | Cube Movement | Color Changes |
| :---- | :---- | :---- | :---- |
| 362px \- 600px | Dismantle begins | Cubes start separating | DARK NAVY BLUE maintained |
| 600px \- 1000px | Cloud formation | Radius expansion to PHASE2\_RADIUS (8.0) | Face patterns visible \- each of the 27 cubes has fixed pattern faces on all sides |
| 1000px \- 1500px | Full cloud spread | Maximum separation achieved | Edge lines white |
| 1500px \- 2171px | Hovering cloud state | Gentle random rotations | Prepare for settle |

**Critical**: Cubes must remain in visible window while considering camera zoom state \- this is what user observes

**Text Display**:

- **Title**: "The Anatomy of an Organization" (44pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "WHAT MAKES AN ORGANIZATION?" (24pts, Inter, blue)  
- **Body**: "Many things, like a living system of systems—Strategy, Policies, Processes, Digital—shaped by external forces such as markets and global events. Real transformation means understanding how these components interact, not treating them in isolation." (18pts, Inter, bright white)  
- **Text Block Width**: 560px

**Technical Notes**:

- Large cubes separate along fixed paths that appear random (not truly random each time)  
- This is an implosion effect \- add perspective where top appears smaller and bottom bigger for depth  
- Fixed radius of 8.0 world units  
- Root rotation neutralized during cloud phase  
- Individual cube rotations applied

## 2.3 PHASE 3: Settle with Perspective (2171px \- 2606px)

**Duration**: 435 pixels (2.42% of scroll)

| Scroll Range | Animation Behavior | Movement Pattern | Preparation |
| :---- | :---- | :---- | :---- |
| 2171px \- 2300px | Cloud settling begins | Slow random rotations continue | Position anchoring |
| 2300px \- 2450px | Perspective adjustment | Hover effects with sine waves | Scale preparation |
| 2450px \- 2606px | Final settle state | Ready for transformation | Mini cube spawn prep |

\`  
**Text Display**:

* **Same text from phase 2 continues appearing \- no transition into this phase**

## 2.4 PHASE 4: Rubik Transform (2606px \- 5648px)

**Duration**: 3042 pixels (16.9% of scroll)

| Scroll Range | Animation Behavior | Cube Generation | Color Transition |
| :---- | :---- | :---- | :---- |
| 2606px \- 3200px | Synchronized transformation | Existing cubes shrink while new cubes grow \- new cubes are Rubik cubes so each 27 cubes formed as a Rubik cube are replacing a single solid cube. Cube 13 in the Rubik constellation which is in the center of the Rubik cube is the anchor. The anchor has the same center point as the normal cube. When the shrink/grow starts, the solid cube starts going transparent so we see the new cube coming out. | Start at 0x1f2937 (dark navy) |
| 3200px \- 4200px | Scale growth | Mini cubes grow from 0.0001 to full size | Maintain dark navy |
| 4200px \- 5200px | Large cubes fade | Large cubes become transparent | Mini cubes visible |
| 5200px \- 5648px | Transformation complete | Let them settle \- 27 Rubiks formed from 729 minis | Ready for recolor |

**Text Display**:

- **Title**: "The Hidden Relations" (44pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "HOW DEEP DOES IT GO?" (24pts, Inter, blue)  
- **Body**: "Each component has its own inputs, outputs, and hidden ties to others. When those ties are mapped, patterns emerge—a structure that shows why small changes ripple across the whole system." (18pts, Inter, bright white)  
- **Text Block Width**: 560px

**Technical Details**:

- Each large cube spawns 27 mini cubes (3x3x3 local grid)  
- Mini cubes tagged with ownerIndex and local coordinates  
- No face patterns \- just solid navy color for performance  
- Initial scale `0.0001` grows with eased interpolation

## 2.5 PHASE 5: Second Dismantle (5648px \- 7740px)

**Duration**: 2092 pixels (11.62% of scroll)

| Scroll Range | Animation Behavior | Movement Pattern | State Changes |
| :---- | :---- | :---- | :---- |
| 5648px \- 6200px | Second expansion begins | Mini cubes separate further | Maintain navy color |
| 6200px \- 7000px | Cloud reformation | Larger radius for 729 cubes | Prepare for recolor |
| 7000px \- 7740px | Maximum expansion | Full separation achieved | Ready for popcorn effect |

**Critical**: Cubes must remain in visible window while considering camera zoom state \- this is what user observes

**Text Display**:

- **Title**: "The Moment of Truth" (44pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "SHOULD YOU WALK THIS JOURNEY?" (24pts, Inter, blue)  
- **Body**: "We already did—and the answer is yes. But do it with eyes open. Complexity runs deeper than expected, and guidance is scarce. That's why we built a model that captures the whole picture and makes the path navigable." (18pts, Inter, bright white)  
- **Text Block Width**: 560px

## 2.6 PHASE 6: Popcorn Recolor (7740px \- 9360px)

**Duration**: 1620 pixels (9% of scroll)

| Scroll Range | Animation Behavior | Color Transition | Speed Pattern |
| :---- | :---- | :---- | :---- |
| 7740px \- 8200px | Recolor begins sequentially | First 15 cubes turn purple slowly | Cubes change one by one, they start slow for the first 15 then accelerate while still sequential, speed must still be visible for the user |
| 8200px \- 8800px | Acceleration | More cubes change color | Speed increases |
| 8800px \- 9360px | Rapid completion | All cubes become 0x9f7bff | Make sure all cubes finish recoloring before moving |

**Text Display**:

- **Title**: "Locks, Locks Everywhere" (44pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "WHAT DID TWO YEARS REVEAL?" (24pts, Inter, blue)  
- **Body**: "Two years of relentless work, unlocking barrier after barrier. Each layer exposed new dependencies, each cube revealed hidden ties. Piece by piece, the digital twin took shape—a living map of complexity. And just as it came together, AI leapt forward, suddenly powerful and accessible, turning years of struggle into a working reality." (18pts, Inter, bright white)  
- **Text Block Width**: 560px  
- 

**Technical Notes**:

- Color transition from `0x1f2937` to `0x9f7bff` (glowing purple)  
- "Popcorn" effect: cubes change color one by one, slow then fast  
- Random selection algorithm for color change order

## 2.7 PHASE 7: Dance (9360px \- 11160px)

**Duration**: 1800 pixels (10% of scroll)

| Scroll Range | Animation Behavior | Movement Pattern | Visual Effects |
| :---- | :---- | :---- | :---- |
| 9360px \- 9800px | Dance begins | They rotate randomly and settle into small groups formed as rotating circles  | Purple color maintained |
| 9800px \- 10500px | Circle formations | Orbital movements around anchors | Rotating circle groups floating in place  |
| 10500px \- 11160px | Choreographed motion | Let them settle and float/rotate | Prepare for morphing |

**Text Display**:

- **Same text from phase 6 continues appearing \- no transition into this phase**

**Technical Details**:

- Swirl radius: `MINI_STEP * 2.0`  
- Orbital motion with sine/cosine calculations  
- Hover effects with phase offsets  
- Individual cube rotations continue

## 2.8 PHASE 8: Final Morph (11160px \- 12600px)

**Duration**: 1440 pixels (8% of scroll)

| Scroll Range | Animation Behavior | Morphing Process | Visual Effects |
| :---- | :---- | :---- | :---- |
| 11160px \- 11600px | Morph begins | Glowing sphere appears in center of scene Cubes move to sculpture positions around the sphere.  | Purple maintained |
| 11600px \- 12200px | Shape formation | Complex 3D sculpture emerges around the glowing sphere.  Sculpture is every 5 cubes form a pillar placed on the faces of the sphere The sculptures cover the entire surface of the glowing sphere with reasonable spacing | Tint increases from previous phase |
| 12200px \- 12600px | Final sculpture | Complete morph with appearance of a single large cube with glowing light purple solid edges containing the glowing sphere and the sculptures | Tint ends here, container cube frame is solid, metallic and glowing with shifting lighting |

**Text Display**:

- **Title**: "The Future, Ready Today" (44pts, Allerta Stencil, bright white with light blue glow)  
- **Subtitle**: "WHICH PATH WILL YOU CHOOSE?" (24pts, Inter, blue)  
- **Body**: "With the final piece in place—the very heart of the solution—the AI breathed life into the Digital Twin, reigniting hope for true transformation. The journey is not over for us or you, it continues through two distinct hubs: TwinLab \- Access our multi-media knowledge base and contribute to it in Wiki style. Help shape the future of transformations. TwinStudio \- Take real steps towards your first use case and prototype V0 of your twin using our free tools. Start shaping your own transformation" (18pts, Inter, bright white)  
- **Text Block Width**: 560px


  
**Technical Notes**:

- Core sphere and frame group become visible  
- Core light (purple point light) activates  
- Gradual black tint overlay increases  
- Sculpture positions pre-calculated

## 2.9 PHASE 9: Final Formation (12600px \- 18000px)

**Duration**: 5400 pixels (30% of scroll)

| Scroll Range | Animation Behavior | Final State | Interaction |
| :---- | :---- | :---- | :---- |
| 12600px \- 14000px | Formation solidifies | Sculpture complete | Mouse control returns |
| 14000px \- 16000px | Gentle rotation | Whole sculpture rotates | Full 360° spin capability |
| 16000px \- 18000px | Final idle state | Ready for interaction | Mouse can spin in all directions |

**Text Display**:

- **Same text from phase 8 continues appearing \- no transition into this phase**

**Critical Requirement**: Scrolling must work in reverse in the exact sequence  
