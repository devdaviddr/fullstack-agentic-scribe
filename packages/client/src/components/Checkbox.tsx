import React from 'react';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {};

export default function Checkbox({ className = '', ...rest }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
      {...rest}
    />
  );
}
