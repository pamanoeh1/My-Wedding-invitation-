import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-[#2D332D] text-[#FBF9F5] shadow-2xl border border-[#C8A97E]/40 text-sm font-medium transition-all duration-300">
      <div className="w-6 h-6 rounded-full bg-[#C8A97E] text-[#2D332D] flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <span>{message}</span>
    </div>
  );
};
