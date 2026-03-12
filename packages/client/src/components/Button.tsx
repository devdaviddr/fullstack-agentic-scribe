import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

const variantClasses: Record<string, string> = {
  primary: 'rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition',
  outline: 'flex items-center justify-center gap-3 rounded-lg border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 transition',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const variantClass = variantClasses[variant] || '';
  const sizeClass = sizeClasses[size] || '';

  return (
    <button className={`${variantClass} ${sizeClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
