import React from 'react';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {};

export default function Label({ className = '', children, ...rest }: LabelProps) {
  return (
    <label className={`text-sm text-gray-600 ${className}`} {...rest}>
      {children}
    </label>
  );
}
