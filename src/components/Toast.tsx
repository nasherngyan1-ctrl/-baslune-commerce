import React from 'react';
import { Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#39291F] text-[#F7F3EB] text-xs sm:text-sm rounded-lg shadow-xl border border-[#C6A77B]/30 flex items-center gap-2 max-w-[90vw]"
    >
      <Check className="w-4 h-4 text-[#C6A77B] shrink-0" />
      <span className="truncate">{toast.message}</span>
    </div>
  );
};
