import type { FileWithMeta } from '../types';
import { formatSize, formatDate } from '../utils/github';

interface FileCardProps {
  file: FileWithMeta;
  selected: boolean;
  onToggle: (file: FileWithMeta) => void;
}

export function FileCard({ file, selected, onToggle }: FileCardProps) {
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(file.download_url);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(file.download_url, '_blank');
    }
  };

  return (
    <button
      type="button"
      className={`file-card ${selected ? 'file-card--selected' : ''}`}
      onClick={() => onToggle(file)}
      title={file.name}
    >
      <div className="file-card__top">
        <span className="file-card__icon">{getFileIcon(file.name)}</span>
        <span
          className="file-card__download"
          role="button"
          tabIndex={0}
          onClick={handleDownload}
          onKeyDown={(e) => { if (e.key === 'Enter') handleDownload(e as unknown as React.MouseEvent); }}
          title="下载文件"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="2" x2="8" y2="11" />
            <polyline points="4.5,7.5 8,11 11.5,7.5" />
            <line x1="3" y1="14" x2="13" y2="14" />
          </svg>
        </span>
      </div>
      <span className="file-card__name">{file.name}</span>
      <span className="file-card__meta">
        <span>{formatSize(file.size)}</span>
        {file.last_modified && <span>{formatDate(file.last_modified)}</span>}
      </span>
      {file.description && (
        <>
          <span className="file-card__divider" />
          <span className="file-card__desc">{file.description}</span>
        </>
      )}
    </button>
  );
}

function getFileIcon(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'tex':
      return 'TeX';
    case 'md':
      return 'MD';
    case 'docx':
      return 'W';
    default:
      return '📄';
  }
}
