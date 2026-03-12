import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`text-2xl font-bold text-blue-600 ${className}`}>
      AI Scribe
    </span>
  );
}
