import React from 'react';
import { TOOL_CATEGORIES } from '../../data/tools';

type Props = {
  selected: string | null;
  onChange: (category: string | null) => void;
};

export function ToolCategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-brand-cyan text-brand-bg font-bold'
            : 'bg-brand-surface border border-gray-700 text-gray-300 hover:border-gray-600'
        }`}
      >
        All
      </button>
      {TOOL_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? 'bg-brand-cyan text-brand-bg font-bold'
              : 'bg-brand-surface border border-gray-700 text-gray-300 hover:border-gray-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
