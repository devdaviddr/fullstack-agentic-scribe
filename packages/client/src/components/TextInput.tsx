import React from 'react';

export type TextInputProps = {
  id: string;
  label: string;
  hideLabel?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function TextInput({
  id,
  label,
  hideLabel = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}: TextInputProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium text-gray-700 ${
          hideLabel ? 'sr-only' : ''
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
