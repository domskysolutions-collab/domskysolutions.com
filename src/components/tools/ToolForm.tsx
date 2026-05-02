import React from 'react';
import type { ToolConfig, ToolInputField } from '../../data/tools';

type Props = {
  tool: ToolConfig;
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
};

function Field({
  field,
  value,
  onChange,
  disabled,
}: {
  field: ToolInputField;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const base =
    'w-full rounded-lg border border-gray-700 bg-brand-bg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyan disabled:opacity-50';

  if (field.type === 'textarea') {
    return (
      <textarea
        id={field.name}
        name={field.name}
        rows={4}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${base} resize-y min-h-[100px] font-sans text-sm`}
      />
    );
  }

  if (field.type === 'select' && field.options?.length) {
    return (
      <select
        id={field.name}
        name={field.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${base} font-sans text-sm appearance-none cursor-pointer`}
      >
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={field.name}
      name={field.name}
      type="text"
      placeholder={field.placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`${base} font-sans text-sm`}
    />
  );
}

export function ToolForm({ tool, values, onChange, disabled }: Props) {
  return (
    <div className="space-y-5">
      {tool.inputs.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2">
            {field.label}
          </label>
          <Field
            field={field}
            value={values[field.name] ?? ''}
            onChange={(v) => onChange(field.name, v)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
}
