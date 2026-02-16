import type { FileWithMeta } from '../types';

interface DownloadSidebarProps {
  selected: FileWithMeta[];
  onRemove: (file: FileWithMeta) => void;
  onClear: () => void;
  onDownload: () => void;
  downloading: boolean;
  progress: { done: number; total: number } | null;
}

export function DownloadSidebar({
  selected,
  onRemove,
  onClear,
  onDownload,
  downloading,
  progress,
}: DownloadSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h3 className="sidebar__title">
          已选择
          {selected.length > 0 && (
            <span className="sidebar__badge">{selected.length}</span>
          )}
        </h3>
      </div>

      <div className="sidebar__list">
        {selected.length === 0 ? (
          <p className="sidebar__empty">点击左侧卡片选择文件</p>
        ) : (
          selected.map((file) => (
            <label key={file.path} className="sidebar__item">
              <input
                type="checkbox"
                checked
                onChange={() => onRemove(file)}
                className="sidebar__checkbox"
              />
              <span className="sidebar__filename" title={file.path}>
                {file.name}
              </span>
            </label>
          ))
        )}
      </div>

      <div className="sidebar__actions">
        {downloading && progress && (
          <div className="sidebar__progress">
            <div
              className="sidebar__progress-bar"
              style={{ width: `${(progress.done / progress.total) * 100}%` }}
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn--primary"
          disabled={selected.length === 0 || downloading}
          onClick={onDownload}
        >
          {downloading ? `下载中 (${progress?.done ?? 0}/${progress?.total ?? 0})` : '确认下载'}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={selected.length === 0 || downloading}
          onClick={onClear}
        >
          清空
        </button>
      </div>
    </aside>
  );
}
