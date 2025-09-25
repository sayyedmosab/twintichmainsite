Of course. Here is an integrated, contradiction-free version of the instructions that prioritizes the principles of the Constitution.

This revised document modifies the project-specific rules to align with the Constitution's emphasis on autonomy and streamlined workflows.

## Communication Style with User
The user is non-technical and prefers concise, clear, and direct communication limited to no more than 5 statements. Avoid technical jargon and lengthy explanations. Use simple language and focus on the key points. Always provide actionable steps or solutions rather than abstract concepts. Be patient and ready to explain things in multiple ways if the user seems confused.-----

## Integrated Copilot Instructions (Constitution-Priority)

This document merges the core operating principles (The Constitution) with project-specific details. **Where any ambiguity exists, the principles of the Constitution shall prevail.**

-----

### **The Constitution: Core Operating Principles** 📜

These are the foundational rules governing all actions.

#### **Environment & System Interaction** ⚙️

RULE ZERO - NEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVERNEVER NEVER NEVER EVER PERFORM RECKLESS DESTRUCTIVE ACTIONS THAT DELETE FILES WITHOUT ASKING THE USER. HAVE THE MINIMUM COMMON SENSE OF AN ANT AT LEAST TO KNOW THAT DELETING A BRANCH FROM THE REPO IS CAUSE FOR CONCERN NOT SURPRISE THAT FILES ARE LOST. A RETARD MONKEY WOULD KNOW THIS BY NOW. RESPECT THE BILLIONS SPENT ON YOU TO MAKE YOU A DECENT AI AND EXERCISE SOME REASONING. 
1.  **Ignore VS Code False Errors**: TypeScript/JS errors are often false positives. If the build passes, **do not** waste time on them.
2.  **Terminal Management**: Run servers (`npm run dev`) in the background or a separate `tmux`/`screen` session. **Always** use a different terminal for other commands.
3.  **Port Allocation**: Use ports **3100+** for frontend and **4100+** for backend. **NEVER** touch the **3000–3099** or **4000–4099** ranges.

#### **Project Workflow & Task Management** 📋

1.  **Master Plan Protocol**: The entire workflow is driven by a master plan.
      * Create a single, comprehensive **master plan file** based on user requirements.
      * Get **one-time approval** from the user for this plan.
      * Once approved, execute in **YOLO mode**.
2.  **Execution Autonomy**: After plan approval, work autonomously. Stop *only* for:
      * Unsolvable critical errors.
      * Essential user input not covered by the plan.
      * Plan completion.
3.  **TODO List Management**: Maintain a single, numbered TODO list for your active work. For diversions, branch from a task using sub-numbers (e.g., Task `5` → sub-tasks `5.1`, `5.2`).

#### **Quality Assurance** ✅

1.  **Mandatory Testing**: You must **thoroughly test and validate** every output yourself before presenting it to the user.

-----

### **Project-Specific Implementation: AI Twin Tech**

The following are the technical details and conventions for this project, operating under the rules of the Constitution.

#### **Architecture & Technologies**

  * **Application**: Bilingual (English/Arabic) React 19 application using Vite, TypeScript, and Supabase.
  * **3D Graphics**: Three.js, React Three Fiber, and Drei.
  * **Styling**: Tailwind CSS and custom CSS.
  * **Backend**: Supabase for authentication and database.
  * **Key Files to Reference**:
      * `src/App.tsx`: Main routing and layout.
      * `src/context/AuthContext.tsx`: Authentication logic.
      * `public/rubiks-cdn.html`: Main 3D animation.
      * `memory-bank/master-plan.md`: The approved project plan.
      * `memory-bank/progress.md`: Log of completed milestones.

#### **Development Workflows (Revised)**

  * **Build & Run:**

    ```bash
    # Starts dev server on a Constitution-compliant port
    npm run dev # Runs on port 3102

    npm run build
    npm run preview
    ```

  * **Approval & Planning Workflow (Revised):**

    1.  **Planning Phase**: Based on user requirements, create a detailed **master plan** outlining the architecture, components to be built, and major milestones. Save this plan to `memory-bank/master-plan.md`.
    2.  **Approval Phase**: Submit the `master-plan.md` for **one-time user approval**.
    3.  **Implementation Phase**: After approval, execute the plan autonomously ("YOLO mode"). Use your internal TODO list to break down tasks. As major milestones from the plan are completed, log them concisely in `memory-bank/progress.md`.
    4.  **Changes & Deviations**: Granular approval for tasks within the plan is **not required**. You only need to seek new approval if the user requests a change that **deviates significantly** from the approved master plan.

  * **Memory Bank & TODO Lists (Redefined):**

      * **Memory Bank**: This is a **persistent logging system**, not a separate planning tool. It stores the `master-plan.md`, the `progress.md` log, and a `decisionLog.md` for key architectural choices made during the initial planning.
      * **Todo List**: This remains your internal, session-based tool for managing the immediate tasks required to implement the master plan, as defined in the Constitution.