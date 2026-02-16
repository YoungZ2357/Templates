import type { FileWithMeta, MetaJson } from '../types';
import {
  ALLOWED_EXTENSIONS,
  IGNORED_NAMES,
  CATEGORY_DIR_PATTERN,
  contentsUrl,
  commitsUrl,
  rawUrl,
} from './config';

function hasAllowedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function isValidCategory(name: string): boolean {
  return CATEGORY_DIR_PATTERN.test(name) && !IGNORED_NAMES.includes(name);
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

interface GHContentItem {
  name: string;
  path: string;
  size: number;
  type: 'file' | 'dir';
  download_url: string | null;
}

/**
 * Fetch the list of category directories from the repo root.
 */
async function fetchCategories(): Promise<string[]> {
  const res = await fetch(contentsUrl());
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const items: GHContentItem[] = await res.json();
  return items
    .filter((item) => item.type === 'dir' && isValidCategory(item.name))
    .map((item) => item.name);
}

/**
 * Fetch meta.json for a category (best-effort, returns empty if not found).
 */
async function fetchMeta(category: string): Promise<MetaJson> {
  try {
    const res = await fetch(rawUrl(`${category}/meta.json`));
    if (!res.ok) return {};
    return (await res.json()) as MetaJson;
  } catch {
    return {};
  }
}

/**
 * Fetch files in a category directory (non-recursive, skips sub-dirs like imgs/).
 */
async function fetchCategoryFiles(category: string): Promise<FileWithMeta[]> {
  const [contentsRes, meta] = await Promise.all([
    fetch(contentsUrl(category)),
    fetchMeta(category),
  ]);
  if (!contentsRes.ok) throw new Error(`GitHub API error: ${contentsRes.status}`);
  const items: GHContentItem[] = await contentsRes.json();

  const files = items.filter(
    (item) =>
      item.type === 'file' &&
      hasAllowedExtension(item.name) &&
      !IGNORED_NAMES.includes(item.name)
  );

  // Fetch last commit date for each file (parallel, best-effort)
  const enriched = await Promise.all(
    files.map(async (f) => {
      let last_modified = '';
      try {
        const cRes = await fetch(commitsUrl(f.path));
        if (cRes.ok) {
          const commits = await cRes.json();
          if (commits.length > 0) {
            last_modified = commits[0].commit.committer.date;
          }
        }
      } catch {
        // ignore — date will show as empty
      }
      return {
        name: f.name,
        path: f.path,
        size: f.size,
        download_url: f.download_url ?? rawUrl(f.path),
        last_modified,
        category,
        description: meta[f.name],
      } satisfies FileWithMeta;
    })
  );

  return enriched;
}

/**
 * Fetch all categories and their files.
 */
export async function fetchAllFiles(): Promise<Map<string, FileWithMeta[]>> {
  const categories = await fetchCategories();
  const entries = await Promise.all(
    categories.map(async (cat) => {
      const files = await fetchCategoryFiles(cat);
      return [cat, files] as const;
    })
  );
  return new Map(entries);
}

/**
 * Download a single file as a blob (for zipping).
 */
export async function fetchFileBlob(file: FileWithMeta): Promise<Blob> {
  const res = await fetch(file.download_url);
  if (!res.ok) throw new Error(`Failed to fetch ${file.path}`);
  return res.blob();
}
