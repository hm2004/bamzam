import React from 'react';
import { Zap } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 sm:px-6 py-3 bg-[var(--neo-green)] text-black border-[var(--border-thick)] rounded-[var(--radius-sm)] shadow-[var(--shadow-lg)] font-display font-extrabold text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-200"
      role="status"
      aria-live="polite"
    >
      <Zap className="w-4 h-4 fill-black" />
      <span>{message}</span>
    </div>
  );
};
