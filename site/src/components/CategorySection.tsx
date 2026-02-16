import { useState } from 'react';
import type { FileWithMeta } from '../types';
import { FileCard } from './FileCard';

interface CategorySectionProps {
  name: string;
  files: FileWithMeta[];
  selectedPaths: Set<string>;
  onToggle: (file: FileWithMeta) => void;
}

export function CategorySection({
  name,
  files,
  selectedPaths,
  onToggle,
}: CategorySectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (files.length === 0) return null;

  return (
    <section className="category">
      <button
        type="button"
        className="category__header"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className={`category__arrow ${collapsed ? 'category__arrow--collapsed' : ''}`}>
          ▾
        </span>
        <h2 className="category__title">{name}</h2>
        <span className="category__count">{files.length}</span>
        <span className="category__line" />
      </button>

      {!collapsed && (
        <div className="category__grid">
          {files.map((file) => (
            <FileCard
              key={file.path}
              file={file}
              selected={selectedPaths.has(file.path)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </section>
  );
}
