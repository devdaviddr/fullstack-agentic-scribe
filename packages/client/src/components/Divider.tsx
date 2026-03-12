import React from 'react';

export type DividerProps = {
  text?: string;
  className?: string;
};

export default function Divider({ text, className = '' }: DividerProps) {
  return (
    <div className={`relative flex items-center ${className}`}> 
      <hr className="flex-grow border-gray-200" />
      {text && (
        <span className="shrink-0 px-2 text-xs text-gray-400">
          {text}
        </span>
      )}
      <hr className="flex-grow border-gray-200" />
    </div>
  );
}
