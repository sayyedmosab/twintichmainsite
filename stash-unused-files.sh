#!/bin/bash

# SAFE STASHING SCRIPT FOR AI TWIN TECH
# This script moves unused files to a stash directory
# Run with: bash stash-unused-files.sh

set -e  # Exit on error

echo "========================================="
echo "   AI Twin Tech - Safe File Stashing"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to ask for confirmation
confirm() {
    echo -e "${YELLOW}$1${NC}"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Aborted.${NC}"
        exit 1
    fi
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo -e "${RED}Error: Must run from project root directory${NC}"
    exit 1
fi

echo "Current directory: $(pwd)"
echo ""

# Step 1: Create backup
echo -e "${GREEN}Step 1: Creating backup...${NC}"
if [ -d ".git" ]; then
    git add -A
    git commit -m "Pre-stash backup: $(date +%Y-%m-%d_%H-%M-%S)" || echo "No changes to commit"
    echo -e "${GREEN}✓ Git backup created${NC}"
else
    echo -e "${YELLOW}⚠ No git repository found. Manual backup recommended!${NC}"
    confirm "Continue without git backup?"
fi

# Step 2: Run build test
echo ""
echo -e "${GREEN}Step 2: Testing build...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed! Fix errors before stashing.${NC}"
    exit 1
fi

# Step 3: Create stash structure
echo ""
echo -e "${GREEN}Step 3: Creating stash directories...${NC}"
mkdir -p stash/{backup-files,alternative-components,old-twinscience,cosmic-unused,documentation,unused-assets,temp-dev-files}
echo -e "${GREEN}✓ Stash structure created${NC}"

# Step 4: Show what will be stashed
echo ""
echo -e "${YELLOW}The following files/directories will be stashed:${NC}"
echo ""
echo "BACKUP FILES:"
echo "  - src/pages/HomePage.bak.tsx"
echo "  - src/components/Header.tsx.bak"
echo "  - public/rubiks-cdn.html.bak"
echo ""
echo "ALTERNATIVE COMPONENTS:"
echo "  - src/pages/SimpleTest.tsx"
echo "  - src/pages/SimpleTestMain.tsx"
echo "  - src/pages/UnifiedHomePage.tsx"
echo "  - src/pages/TwinSciencePage.tsx (old version)"
echo "  - src/components/HeaderFixed.tsx"
echo "  - src/components/SimpleHeader.tsx"
echo "  - src/components/SketchAppHeader.tsx"
echo "  - src/components/JosoorHeader.tsx"
echo "  - src/components/Navbar.tsx"
echo "  - src/components/TextBlock.tsx"
echo ""
echo "LARGE DIRECTORIES:"
echo "  - src/pages/temp_twinscience_after_migrating_delete_me/"
echo "  - src/components/cosmic/"
echo "  - src/data/"
echo ""
echo "DOCUMENTATION & DEV FILES:"
echo "  - memory-bank/"
echo "  - attached_assets/"
echo "  - src/DOCUMENTATION/ (B-TwinLab, C-TwinStudio - future features)"
echo "  - Various .md and .log files"
echo "  - builder.config.json (tool config)"
echo "  - twin science.json (chat history)"
echo ""
echo "UNUSED PUBLIC ASSETS:"
echo "  - public/3danimation/"
echo "  - public/twinlab/"
echo "  - public/twinstudio/"
echo ""

confirm "Ready to start stashing?"

# Step 5: Move backup files
echo ""
echo -e "${GREEN}Step 5: Moving backup files...${NC}"
[ -f "src/pages/HomePage.bak.tsx" ] && mv src/pages/HomePage.bak.tsx stash/backup-files/ && echo "  ✓ HomePage.bak.tsx"
[ -f "src/components/Header.tsx.bak" ] && mv src/components/Header.tsx.bak stash/backup-files/ && echo "  ✓ Header.tsx.bak"
[ -f "public/rubiks-cdn.html.bak" ] && mv public/rubiks-cdn.html.bak stash/backup-files/ && echo "  ✓ rubiks-cdn.html.bak"

# Step 6: Move alternative components
echo ""
echo -e "${GREEN}Step 6: Moving alternative components...${NC}"
[ -f "src/pages/SimpleTest.tsx" ] && mv src/pages/SimpleTest.tsx stash/alternative-components/ && echo "  ✓ SimpleTest.tsx"
[ -f "src/pages/SimpleTestMain.tsx" ] && mv src/pages/SimpleTestMain.tsx stash/alternative-components/ && echo "  ✓ SimpleTestMain.tsx"
[ -f "src/pages/UnifiedHomePage.tsx" ] && mv src/pages/UnifiedHomePage.tsx stash/alternative-components/ && echo "  ✓ UnifiedHomePage.tsx"
[ -f "src/pages/TwinSciencePage.tsx" ] && mv src/pages/TwinSciencePage.tsx stash/alternative-components/ && echo "  ✓ TwinSciencePage.tsx"
[ -f "src/components/HeaderFixed.tsx" ] && mv src/components/HeaderFixed.tsx stash/alternative-components/ && echo "  ✓ HeaderFixed.tsx"
[ -f "src/components/SimpleHeader.tsx" ] && mv src/components/SimpleHeader.tsx stash/alternative-components/ && echo "  ✓ SimpleHeader.tsx"
[ -f "src/components/SketchAppHeader.tsx" ] && mv src/components/SketchAppHeader.tsx stash/alternative-components/ && echo "  ✓ SketchAppHeader.tsx"
[ -f "src/components/JosoorHeader.tsx" ] && mv src/components/JosoorHeader.tsx stash/alternative-components/ && echo "  ✓ JosoorHeader.tsx"
[ -f "src/components/Navbar.tsx" ] && mv src/components/Navbar.tsx stash/alternative-components/ && echo "  ✓ Navbar.tsx"
[ -f "src/components/TextBlock.tsx" ] && mv src/components/TextBlock.tsx stash/alternative-components/ && echo "  ✓ TextBlock.tsx"

# Step 7: Move old TwinScience
echo ""
echo -e "${GREEN}Step 7: Moving old TwinScience implementation...${NC}"
if [ -d "src/pages/temp_twinscience_after_migrating_delete_me" ]; then
    mv src/pages/temp_twinscience_after_migrating_delete_me stash/old-twinscience/
    echo "  ✓ temp_twinscience_after_migrating_delete_me/"
fi

# Step 8: Move unused cosmic components
echo ""
echo -e "${GREEN}Step 8: Moving unused cosmic components...${NC}"
if [ -d "src/components/cosmic" ]; then
    mv src/components/cosmic stash/cosmic-unused/
    echo "  ✓ src/components/cosmic/"
fi
if [ -d "src/data" ]; then
    mv src/data stash/cosmic-unused/
    echo "  ✓ src/data/"
fi

# Step 9: Move documentation
echo ""
echo -e "${GREEN}Step 9: Moving documentation files...${NC}"
[ -d "memory-bank" ] && mv memory-bank stash/documentation/ && echo "  ✓ memory-bank/"
[ -d "attached_assets" ] && mv attached_assets stash/documentation/ && echo "  ✓ attached_assets/"
[ -d "src/DOCUMENTATION" ] && mv src/DOCUMENTATION stash/documentation/ && echo "  ✓ src/DOCUMENTATION/"

# Move various doc files
for file in *.log *.prompt.md COMPREHENSIVE_MASTER_PLAN.md MASTER_PLAN.md conversation-summary.md debug-plan.md debugging_summary.md GEMINI.md replit.md TEXT_OVERLAY_ARCHITECTURE.md CONTENT_UPLOAD_GUIDE.md builder.config.json "twin science.json"; do
    [ -f "$file" ] && mv "$file" stash/documentation/ && echo "  ✓ $file"
done

# Optionally stash future feature documentation
if [ -d "src/DOCUMENTATION/B - TwinLab" ]; then
    mkdir -p stash/documentation/future-features
    mv "src/DOCUMENTATION/B - TwinLab" stash/documentation/future-features/ && echo "  ✓ src/DOCUMENTATION/B - TwinLab/ (future feature)"
fi
if [ -d "src/DOCUMENTATION/C - TwinStudio" ]; then
    mkdir -p stash/documentation/future-features
    mv "src/DOCUMENTATION/C - TwinStudio" stash/documentation/future-features/ && echo "  ✓ src/DOCUMENTATION/C - TwinStudio/ (future feature)"
fi

# Remove placeholder geminiService if it exists
if [ -f "src/services/geminiService.ts" ]; then
    grep -q "removed as part of the migration" src/services/geminiService.ts 2>/dev/null && rm src/services/geminiService.ts && echo "  ✓ Removed placeholder geminiService.ts"
fi

# Step 10: Move test results
echo ""
echo -e "${GREEN}Step 10: Moving test artifacts...${NC}"
[ -d "test-results" ] && mv test-results stash/temp-dev-files/ && echo "  ✓ test-results/"

# Step 11: Move unused public assets
echo ""
echo -e "${GREEN}Step 11: Moving unused public assets...${NC}"
[ -d "public/3danimation" ] && mv public/3danimation stash/unused-assets/ && echo "  ✓ public/3danimation/"
[ -d "public/twinlab" ] && mv public/twinlab stash/unused-assets/ && echo "  ✓ public/twinlab/"
[ -d "public/twinstudio" ] && mv public/twinstudio stash/unused-assets/ && echo "  ✓ public/twinstudio/"

# Step 12: Test build again
echo ""
echo -e "${GREEN}Step 12: Testing build after stashing...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${RED}✗ Build failed after stashing!${NC}"
    echo -e "${YELLOW}You may need to restore some files.${NC}"
    exit 1
fi

# Step 13: Create stash manifest
echo ""
echo -e "${GREEN}Step 13: Creating stash manifest...${NC}"
cat > stash/MANIFEST.md << 'EOF'
# Stash Manifest

**Date:** $(date)
**Reason:** Cleanup of unused/alternative/backup files

## What Was Stashed

All files in this directory tree were determined to be unused by the active application.

### How to Restore
If you need any of these files back:
1. Identify the file in the appropriate subdirectory
2. Move it back to its original location (check git history for path)
3. Re-test the application

### Safe to Delete After
- 30 days if no issues arise
- After confirming application works in production

### Categories
- `backup-files/` - .bak files
- `alternative-components/` - Unused alternative implementations  
- `old-twinscience/` - Deprecated TwinScience version
- `cosmic-unused/` - Unused cosmic components
- `documentation/` - Dev docs and logs
- `unused-assets/` - Public assets not referenced
- `temp-dev-files/` - Test results and temporary files

## Files Stashed
EOF

find stash -type f -o -type d | sed 's/stash\///' >> stash/MANIFEST.md

echo -e "${GREEN}✓ Manifest created${NC}"

# Step 14: Final git commit
echo ""
echo -e "${GREEN}Step 14: Creating post-stash commit...${NC}"
if [ -d ".git" ]; then
    git add -A
    git commit -m "Stash unused files: $(date +%Y-%m-%d_%H-%M-%S)" || echo "No changes to commit"
    echo -e "${GREEN}✓ Changes committed${NC}"
fi

# Summary
echo ""
echo "========================================="
echo -e "${GREEN}   STASHING COMPLETE!${NC}"
echo "========================================="
echo ""
echo "Summary:"
echo "  - Backup files: stash/backup-files/"
echo "  - Alternative components: stash/alternative-components/"
echo "  - Old TwinScience: stash/old-twinscience/"
echo "  - Cosmic unused: stash/cosmic-unused/"
echo "  - Documentation: stash/documentation/"
echo "  - Unused assets: stash/unused-assets/"
echo "  - Temp files: stash/temp-dev-files/"
echo ""
echo "Next steps:"
echo "  1. Test the application thoroughly"
echo "  2. Check all routes work"
echo "  3. Verify asset loading"
echo "  4. If everything works after 30 days, delete stash/"
echo ""
echo -e "${GREEN}✓ All done!${NC}"
