interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <svg className="search-bar__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="8.5" cy="8.5" r="5.5" />
        <line x1="12.5" y1="12.5" x2="17" y2="17" />
      </svg>
      <input
        type="text"
        className="search-bar__input"
        placeholder="搜索文件名..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}
