import type { FileWithMeta } from '../types';

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

/**
 * Fetch all categories and their files from the static index.json
 * generated at build time. Zero GitHub API calls at runtime.
 */
export async function fetchAllFiles(): Promise<Map<string, FileWithMeta[]>> {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}index.json`);
  if (!res.ok) throw new Error(`Failed to load index.json: ${res.status}`);
  const data: Record<string, FileWithMeta[]> = await res.json();
  return new Map(Object.entries(data));
}

/**
 * Download a single file as a blob (for zipping).
 */
export async function fetchFileBlob(file: FileWithMeta): Promise<Blob> {
  const res = await fetch(file.download_url);
  if (!res.ok) throw new Error(`Failed to fetch ${file.path}`);
  return res.blob();
}
