import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return <img src="/logo192.png" alt="Logo" className={`h-12 w-auto ${className}`} />;
}
