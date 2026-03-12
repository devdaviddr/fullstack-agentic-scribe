import React from 'react';

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4;
};

const tagMap: Record<number, string> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

export default function Heading({
  level = 1,
  className = '',
  children,
  ...rest
}: HeadingProps) {
  const Tag = tagMap[level] as any;
  const baseClasses =
    level === 1
      ? 'text-4xl font-extrabold leading-tight'
      : 'text-2xl font-bold';
  return (
    <Tag className={`${baseClasses} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
