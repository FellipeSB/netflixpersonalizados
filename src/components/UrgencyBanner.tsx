import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';

export const UrgencyBanner: React.FC = () => {
  return (
    <div id="urgency-banner" className="bg-wine-red text-white py-2 px-4 text-center text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2 relative z-30 shadow-md">
      <div className="flex items-center gap-1.5 animate-pulse">
        <span>⚠️</span>
        <span className="font-semibold select-none">Produção limitada para o Dia dos Namorados.</span>
      </div>
      <span className="hidden sm:inline text-white/80">|</span>
      <span className="underline decoration-white/30 underline-offset-2 hover:text-white/90 transition hidden sm:inline">Faça sua reserva antecipadamente.</span>
    </div>
  );
};
