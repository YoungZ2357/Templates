// ============================================================
// Configuration — edit these values to extend supported types
// ============================================================

export const REPO_OWNER = 'YoungZ2357';
export const REPO_NAME = 'Templates';
export const REPO_BRANCH = 'main';

/**
 * Allowed file extensions (lowercase, with leading dot).
 * Add new extensions here to support more file types.
 * NOTE: also update scripts/generate-index.js when changing this.
 */
export const ALLOWED_EXTENSIONS: string[] = [
  '.md',
  '.tex',
  '.docx',
];

/**
 * Files / directory names to always ignore.
 * NOTE: also update scripts/generate-index.js when changing this.
 */
export const IGNORED_NAMES: string[] = [
  '.gitignore',
  '.gitattributes',
  '.github',
  'node_modules',
  'dist',
  'meta.json',
  'site',
];

/**
 * Category directory name must match this pattern.
 * NOTE: also update scripts/generate-index.js when changing this.
 */
export const CATEGORY_DIR_PATTERN = /^[a-zA-Z0-9_-]+$/;
