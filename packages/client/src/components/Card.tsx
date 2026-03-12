import React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  footer?: React.ReactNode;
};

// generic card container with hover and base styles
export default function Card({ title, footer, className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow p-6 flex flex-col justify-between min-h-[220px] border border-transparent hover:border-blue-200 hover:shadow-lg hover:scale-105 transition-transform cursor-pointer ${className}`}
      {...rest}
    >
      {title && <div className="mb-4">{title}</div>}
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
