import React from 'react';

export const UrgencyBanner: React.FC = () => {
  return (
    <div id="urgency-banner" className="bg-wine-red text-white py-2 px-4 text-center text-xs md:text-sm font-medium tracking-wide flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 relative z-30 shadow-md border-b border-white/5 select-none font-sans min-h-[36px]">
      <div className="flex items-center gap-1.5 animate-pulse shrink-0">
        <span className="text-sm">⚠️</span>
        <span className="font-extrabold uppercase tracking-widest text-[#FFF]">ÚLTIMAS VAGAS PARA ENTREGA NO DIA DOS NAMORADOS</span>
      </div>
      <span className="hidden sm:inline text-white/40">|</span>
      <div className="flex items-center gap-1.5 font-mono text-xs bg-black/45 px-3 py-1 rounded-lg border border-white/10 shrink-0 select-none">
        <span className="text-zinc-300 font-sans font-bold text-[10px] uppercase tracking-wider">SUA RESERVA DE VAGA EXPIRA EM:</span>
        <span className="text-[#FF2D55] font-black uppercase tracking-wider animate-pulse">3 DIAS</span>
      </div>
    </div>
  );
};
