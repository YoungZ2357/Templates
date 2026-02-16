import { useState, useMemo, useCallback } from 'react';
import type { FileWithMeta } from './types';
import { useRepoData } from './hooks/useRepoData';
import { downloadAsZip } from './utils/download';
import { REPO_OWNER, REPO_NAME } from './utils/config';
import { SearchBar } from './components/SearchBar';
import { CategorySection } from './components/CategorySection';
import { DownloadSidebar } from './components/DownloadSidebar';

export default function App() {
  const { categories, loading, error } = useRepoData();
  const [search, setSearch] = useState('');
  const [selectedMap, setSelectedMap] = useState<Map<string, FileWithMeta>>(new Map());
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const selectedPaths = useMemo(
    () => new Set(selectedMap.keys()),
    [selectedMap]
  );

  const selectedFiles = useMemo(
    () => Array.from(selectedMap.values()),
    [selectedMap]
  );

  const filteredCategories = useMemo(() => {
    const result: [string, FileWithMeta[]][] = [];
    const q = search.toLowerCase().trim();
    for (const [cat, files] of categories) {
      const filtered = q
        ? files.filter(
            (f) =>
              f.name.toLowerCase().includes(q) ||
              f.category.toLowerCase().includes(q)
          )
        : files;
      result.push([cat, filtered]);
    }
    return result;
  }, [categories, search]);

  const toggleFile = useCallback((file: FileWithMeta) => {
    setSelectedMap((prev) => {
      const next = new Map(prev);
      if (next.has(file.path)) {
        next.delete(file.path);
      } else {
        next.set(file.path, file);
      }
      return next;
    });
  }, []);

  const removeFile = useCallback((file: FileWithMeta) => {
    setSelectedMap((prev) => {
      const next = new Map(prev);
      next.delete(file.path);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedMap(new Map());
  }, []);

  const handleDownload = useCallback(async () => {
    if (selectedFiles.length === 0) return;
    setDownloading(true);
    setProgress({ done: 0, total: selectedFiles.length });
    try {
      await downloadAsZip(selectedFiles, (done, total) => {
        setProgress({ done, total });
      });
    } catch (err) {
      console.error('Download failed:', err);
      alert('下载失败，请稍后重试');
    } finally {
      setDownloading(false);
      setProgress(null);
    }
  }, [selectedFiles]);

  return (
    <div className="app">
      <main className="main">
        <header className="header">
          <h1 className="header__title">Templates</h1>
          <p className="header__desc">
            文档模板集合 ·{' '}
            <a
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="header__link"
            >
              GitHub
            </a>
          </p>
        </header>

        <SearchBar value={search} onChange={setSearch} />

        {loading && (
          <div className="status">
            <div className="spinner" />
            <span>正在加载仓库内容...</span>
          </div>
        )}

        {error && (
          <div className="status status--error">
            <span>加载失败: {error}</span>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => window.location.reload()}
            >
              重试
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="categories">
            {filteredCategories.map(([cat, files]) => (
              <CategorySection
                key={cat}
                name={cat}
                files={files}
                selectedPaths={selectedPaths}
                onToggle={toggleFile}
              />
            ))}
            {filteredCategories.every(([, files]) => files.length === 0) && (
              <p className="status">无匹配结果</p>
            )}
          </div>
        )}
      </main>

      <DownloadSidebar
        selected={selectedFiles}
        onRemove={removeFile}
        onClear={clearAll}
        onDownload={handleDownload}
        downloading={downloading}
        progress={progress}
      />
    </div>
  );
}
