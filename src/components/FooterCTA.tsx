import React from 'react';
import { HelpCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '../data';

interface FooterCtaProps {
  phone: string;
  storeName: string;
}

export const FooterCTA: React.FC<FooterCtaProps> = ({ phone, storeName }) => {
  const handleConciergeCall = () => {
    const textMessage = `Olá! Estou navegando no catálogo de Dia dos Namorados da *${storeName}* e gostaria de receber uma consultoria ou ajuda personalizada para escolher o presente ideal para meu parceiro(a). Poderiam me orientar? [HEART]`;
    const finalUrl = generateWhatsAppUrl(phone, textMessage);
    window.open(finalUrl, '_blank', 'noreferrer');
  };

  return (
    <footer id="contato-final" className="bg-[#0D0D0E] pt-16 pb-20 px-4 sm:px-8 border-t border-white/5 relative overflow-hidden">
      {/* Decorative dark vector elements */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#9e1b32_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-4xl mx-auto bg-wine-red text-center py-12 px-6 sm:py-16 sm:px-12 rounded-3xl relative z-10 wine-glow overflow-hidden select-none border border-white/10">
        
        {/* Absolute light accent lines */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-zinc-950/20 rounded-full blur-xl" />

        {/* Header Icon */}
        <div className="inline-flex items-center justify-center p-3.5 bg-black/30 rounded-2xl mb-4 text-white">
          <HelpCircle className="w-8 h-8" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
          Na dúvida sobre qual presente escolher?
        </h2>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-zinc-100/90 font-sans mt-3 max-w-xl mx-auto leading-relaxed">
          Converse em tempo real com o nosso Designer Concierge pelo WhatsApp. Nós criamos prévias digitais profissionais da sua foto no presente para você aprovar antes de produzirmos!
        </p>

        {/* Giant Clickable Call-to-action */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleConciergeCall}
            className="w-full sm:w-auto bg-whatsapp-green hover:bg-whatsapp-green-hover text-white font-bold text-base tracking-wider px-10 py-5 rounded-2xl shadow-2xl hover:shadow-black/30 transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-3 select-none focus:outline-none border border-emerald-400/20 hover:scale-103 font-display"
          >
            <svg 
              viewBox="0 0 448 512" 
              className="w-6 h-6 text-white fill-current animate-bounce shrink-0"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 512l141.6-37.2c32.7 18 69.4 27.5 107.1 27.5 122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-65-157.1zM223.9 474c-33.1 0-65.7-8.9-94.1-25.7l-6.7-4-83.9 22 22.4-81.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            💬 QUERO SURPREENDER MEU AMOR
          </button>
          
          <span className="text-[11px] text-zinc-200/75 tracking-wider font-mono uppercase bg-black/15 py-1 px-3.5 rounded-full w-fit">
            ⏰ Atendimento humano imediato e suporte de design integrado com seu pedido
          </span>
        </div>

      </div>

      {/* Real copyright credit footer */}
      <div className="max-w-7xl mx-auto mt-16 text-center text-[10px] text-zinc-600 font-sans tracking-widest uppercase relative z-10">
        <p>© {new Date().getFullYear()} {storeName} • Todos os direitos reservados • Feito com ❤️ para o Dia dos Namorados</p>
      </div>
    </footer>
  );
};
