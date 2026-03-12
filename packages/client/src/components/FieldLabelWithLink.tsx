import React from 'react';
import { Link } from 'react-router-dom';

export type FieldLabelWithLinkProps = {
  htmlFor: string;
  label: string;
  linkText?: string;
  linkHref?: string;
  className?: string;
};

export default function FieldLabelWithLink({
  htmlFor,
  label,
  linkText,
  linkHref = '#',
  className = '',
}: FieldLabelWithLinkProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {linkText && (
        <a
          href={linkHref}
          className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
        >
          {linkText}
        </a>
      )}
    </div>
  );
}
