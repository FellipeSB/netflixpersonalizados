import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  const items = [
    {
      title: 'Produção Local',
      desc: 'Feitos artesanalmente com carinho em Guaíba.',
    },
    {
      title: 'Prévia digital de aprovação',
      desc: 'Veja e aprove o design final com nossos designers antes da produção definitiva.',
    },
    {
      title: 'Atendimento humano',
      desc: 'Fale com pessoas de verdade prontas para te ajudar.',
    },
    {
      title: 'Produtos exclusivos',
      desc: 'Designs únicos desenvolvidos especialmente para casais.',
    },
    {
      title: 'Entrega rápida',
      desc: 'Sua encomenda pronta e entregue com total cuidado.',
    },
  ];

  return (
    <section id="porque-comprar-conosco" className="py-14 sm:py-18 bg-[#0C0C0D] px-4 sm:px-8 md:px-16 border-t border-white/5 relative overflow-hidden select-none">
      {/* Glow highlight */}
      <div className="absolute bottom-[-10rem] right-[-10rem] w-80 h-80 rounded-full bg-whatsapp-green/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <p className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest text-[#FF2D55] mb-2">
          COMPRA 100% SEGURA E SEM RISCOS
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mb-8">
          Por que comprar conosco?
        </h2>

        {/* Thick elegant layout lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mt-4">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3.5 p-4.5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-[#FF2D55]/20 hover:bg-zinc-900/50 transition duration-300 ${
                idx === 4 ? 'md:col-span-2 md:max-w-md md:mx-auto w-full' : ''
              }`}
            >
              <div className="shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white font-sans tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
