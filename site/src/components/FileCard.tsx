import type { FileWithMeta } from '../types';
import { formatSize, formatDate } from '../utils/github';

interface FileCardProps {
  file: FileWithMeta;
  selected: boolean;
  onToggle: (file: FileWithMeta) => void;
}

export function FileCard({ file, selected, onToggle }: FileCardProps) {
  return (
    <button
      type="button"
      className={`file-card ${selected ? 'file-card--selected' : ''}`}
      onClick={() => onToggle(file)}
      title={file.name}
    >
      <span className="file-card__icon">{getFileIcon(file.name)}</span>
      <span className="file-card__name">{file.name}</span>
      <span className="file-card__meta">
        <span>{formatSize(file.size)}</span>
        {file.last_modified && <span>{formatDate(file.last_modified)}</span>}
      </span>
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
