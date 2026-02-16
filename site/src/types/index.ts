export interface RepoFile {
  name: string;
  path: string;
  size: number;
  sha: string;
  url: string;
  download_url: string;
}

export interface FileWithMeta {
  name: string;
  path: string;
  size: number;
  download_url: string;
  last_modified: string;
  category: string;
  description?: string;
}

/**
 * meta.json structure: filename → description string
 */
export type MetaJson = Record<string, string>;

export interface CategoryGroup {
  name: string;
  files: FileWithMeta[];
  collapsed: boolean;
}
