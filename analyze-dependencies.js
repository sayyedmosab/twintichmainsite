#!/usr/bin/env node

/**
 * Comprehensive Dependency Analysis Tool
 * Traces all actively used files from entry points
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const visited = new Set();
const activeFiles = new Set();
const importMap = new Map();

// Entry points
const ENTRY_POINTS = [
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'src/i18n.ts',
  'src/index.css',
  'vite.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  'tsconfig.json',
  'tsconfig.node.json',
  'package.json',
  'vercel.json',
  'playwright.config.ts',
];

// Static asset directories that should be kept
const STATIC_DIRS = [
  'public',
  'src/locales',
];

// Config files and important docs
const CONFIG_FILES = [
  '.github',
  '.gitignore',
  'README.md',
  '.env',
  '.env.local',
];

function resolvePath(fromFile, importPath) {
  const fromDir = path.dirname(fromFile);
  
  // Handle different import styles
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    // Relative import
    let resolved = path.resolve(fromDir, importPath);
    
    // Try different extensions
    const extensions = ['', '.tsx', '.ts', '.jsx', '.js', '.json', '.css'];
    for (const ext of extensions) {
      const withExt = resolved + ext;
      if (fs.existsSync(withExt) && fs.statSync(withExt).isFile()) {
        return path.relative(process.cwd(), withExt);
      }
    }
    
    // Try index files
    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
      for (const indexFile of ['index.tsx', 'index.ts', 'index.jsx', 'index.js']) {
        const indexPath = path.join(resolved, indexFile);
        if (fs.existsSync(indexPath)) {
          return path.relative(process.cwd(), indexPath);
        }
      }
    }
  } else if (importPath.startsWith('@/')) {
    // Alias import (@/ = root)
    const withoutAlias = importPath.substring(2);
    return resolvePath(fromFile, './' + withoutAlias);
  }
  
  return null;
}

function extractImports(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const imports = [];
  
  // Match various import patterns
  const patterns = [
    // ES6 imports
    /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*)?)+\s+from\s+['"]([^'"]+)['"]/g,
    // Dynamic imports
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    // CSS imports
    /@import\s+['"]([^'"]+)['"]/g,
    // Require
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    // HTML src/href attributes
    /(?:src|href)=["']([^"']+)["']/g,
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      imports.push(match[1]);
    }
  });
  
  return imports;
}

function analyzeFile(filePath) {
  if (visited.has(filePath)) {
    return;
  }
  
  visited.add(filePath);
  activeFiles.add(filePath);
  
  console.log(`Analyzing: ${filePath}`);
  
  const imports = extractImports(filePath);
  importMap.set(filePath, imports);
  
  imports.forEach(importPath => {
    // Skip node_modules
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      return;
    }
    
    const resolved = resolvePath(filePath, importPath);
    if (resolved && !visited.has(resolved)) {
      analyzeFile(resolved);
    }
  });
}

function analyzeDirectory(dirPath) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return;
  }
  
  // Add all files in static directories
  const entries = fs.readdirSync(dirPath);
  entries.forEach(entry => {
    const fullPath = path.join(dirPath, entry);
    const relativePath = path.relative(process.cwd(), fullPath);
    
    if (fs.statSync(fullPath).isDirectory()) {
      analyzeDirectory(fullPath);
    } else {
      activeFiles.add(relativePath);
    }
  });
}

// Main analysis
console.log('Starting dependency analysis...\n');

// Analyze entry points
ENTRY_POINTS.forEach(entry => {
  if (fs.existsSync(entry)) {
    console.log(`\n=== Entry Point: ${entry} ===`);
    analyzeFile(entry);
  }
});

// Add static directories
console.log('\n=== Analyzing Static Directories ===');
STATIC_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Adding directory: ${dir}`);
    analyzeDirectory(dir);
  }
});

// Add config files and directories
console.log('\n=== Adding Config Files ===');
CONFIG_FILES.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Adding: ${file}`);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      analyzeDirectory(file);
    } else {
      activeFiles.add(file);
    }
  }
});

// Sort active files
const sortedFiles = Array.from(activeFiles).sort();

// Write results
const outputPath = 'active-files-sitemap.json';
const output = {
  timestamp: new Date().toISOString(),
  totalFiles: sortedFiles.length,
  files: sortedFiles,
  importMap: Object.fromEntries(importMap),
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log('\n========================================');
console.log(`Analysis complete!`);
console.log(`Total active files: ${sortedFiles.length}`);
console.log(`Results written to: ${outputPath}`);
console.log('========================================\n');

// Create a human-readable list
const listPath = 'active-files-list.txt';
fs.writeFileSync(listPath, sortedFiles.join('\n'));
console.log(`File list written to: ${listPath}\n`);

// Print summary by directory
const byDirectory = {};
sortedFiles.forEach(file => {
  const dir = file.includes('/') ? file.split('/')[0] : '.';
  byDirectory[dir] = (byDirectory[dir] || 0) + 1;
});

console.log('Files by directory:');
Object.entries(byDirectory)
  .sort((a, b) => b[1] - a[1])
  .forEach(([dir, count]) => {
    console.log(`  ${dir}: ${count} files`);
  });
