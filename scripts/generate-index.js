#!/usr/bin/env node

/**
 * generate-index.js
 *
 * Scans the repository at build time and produces site/public/index.json
 * so that the frontend needs zero GitHub API calls at runtime.
 *
 * Run from the repo root:  node scripts/generate-index.js
 */

import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, extname, resolve } from 'path';
import { execSync } from 'child_process';

// ── Configuration (keep in sync with site/src/utils/config.ts) ──

const ALLOWED_EXTENSIONS = ['.md', '.tex', '.docx'];
const IGNORED_NAMES = ['.gitignore', '.gitattributes', '.github', 'node_modules', 'dist', 'meta.json', 'site'];
const CATEGORY_DIR_PATTERN = /^[a-zA-Z0-9_-]+$/;
const REPO_OWNER = 'YoungZ2357';
const REPO_NAME = 'Templates';
const REPO_BRANCH = 'main';

// ── Helpers ──

const repoRoot = resolve(process.cwd());

function rawUrl(path) {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${path}`;
}

function getLastCommitDate(filePath) {
  try {
    const date = execSync(
      `git log -1 --format=%cI -- "${filePath}"`,
      { cwd: repoRoot, encoding: 'utf-8' }
    ).trim();
    return date || '';
  } catch {
    return '';
  }
}

function loadMeta(categoryDir) {
  const metaPath = join(categoryDir, 'meta.json');
  if (!existsSync(metaPath)) return {};
  try {
    return JSON.parse(readFileSync(metaPath, 'utf-8'));
  } catch {
    console.warn(`Warning: failed to parse ${metaPath}`);
    return {};
  }
}

// ── Main ──

const index = {};

const rootEntries = readdirSync(repoRoot, { withFileTypes: true });

for (const entry of rootEntries) {
  if (!entry.isDirectory()) continue;
  if (!CATEGORY_DIR_PATTERN.test(entry.name)) continue;
  if (IGNORED_NAMES.includes(entry.name)) continue;

  const categoryPath = join(repoRoot, entry.name);
  const meta = loadMeta(categoryPath);
  const files = [];

  const categoryEntries = readdirSync(categoryPath, { withFileTypes: true });

  for (const fileEntry of categoryEntries) {
    if (!fileEntry.isFile()) continue;
    if (IGNORED_NAMES.includes(fileEntry.name)) continue;

    const ext = extname(fileEntry.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) continue;

    const relativePath = `${entry.name}/${fileEntry.name}`;
    const fullPath = join(categoryPath, fileEntry.name);
    const stat = statSync(fullPath);

    files.push({
      name: fileEntry.name,
      path: relativePath,
      size: stat.size,
      download_url: rawUrl(relativePath),
      last_modified: getLastCommitDate(relativePath),
      category: entry.name,
      description: meta[fileEntry.name] || undefined,
    });
  }

  if (files.length > 0) {
    index[entry.name] = files;
  }
}

// Write output
const outputPath = join(repoRoot, 'site', 'public', 'index.json');
writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf-8');

const totalFiles = Object.values(index).reduce((sum, arr) => sum + arr.length, 0);
console.log(`✓ Generated index.json: ${Object.keys(index).length} categories, ${totalFiles} files`);
