import React from 'react';

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: 'body' | 'lead';
};

const styles: Record<string, string> = {
  body: 'text-sm text-gray-500',
  lead: 'text-lg text-gray-700',
};

export default function Text({
  variant = 'body',
  className = '',
  children,
  ...rest
}: TextProps) {
  return (
    <p className={`${styles[variant]} ${className}`} {...rest}>
      {children}
    </p>
  );
}
