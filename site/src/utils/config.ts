// ============================================================
// Configuration — edit these values to extend supported types
// ============================================================

export const REPO_OWNER = 'YoungZ2357';
export const REPO_NAME = 'Templates';
export const REPO_BRANCH = 'main';

/**
 * Allowed file extensions (lowercase, with leading dot).
 * Add new extensions here to support more file types.
 */
export const ALLOWED_EXTENSIONS: string[] = [
  '.md',
  '.tex',
  '.docx',
];

/**
 * Files / directory names to always ignore.
 */
export const IGNORED_NAMES: string[] = [
  '.gitignore',
  '.gitattributes',
  '.github',
  'node_modules',
  'dist',
  'meta.json',
];

/**
 * Category directory name must match this pattern.
 * Default: purely ASCII letters, digits, hyphens, and underscores.
 */
export const CATEGORY_DIR_PATTERN = /^[a-zA-Z0-9_-]+$/;

// ============================================================
// GitHub API helpers
// ============================================================

export const API_BASE = 'https://api.github.com';

export function contentsUrl(path: string = ''): string {
  return `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${REPO_BRANCH}`;
}

export function commitsUrl(path: string): string {
  return `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/commits?path=${encodeURIComponent(path)}&sha=${REPO_BRANCH}&per_page=1`;
}

export function rawUrl(path: string): string {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${path}`;
}
