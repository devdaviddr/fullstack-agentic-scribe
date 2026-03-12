import React from 'react';

export type TextWithLinkProps = {
  text: string;
  linkText: string;
  href?: string;
  className?: string;
  linkClassName?: string;
};

export default function TextWithLink({
  text,
  linkText,
  href = '#',
  className = '',
  linkClassName = '',
}: TextWithLinkProps) {
  return (
    <p className={`text-center text-sm text-gray-500 ${className}`}>
      {text}{' '}
      <a
        href={href}
        className={`font-medium text-blue-600 hover:text-blue-700 hover:underline ${linkClassName}`}
      >
        {linkText}
      </a>
    </p>
  );
}
