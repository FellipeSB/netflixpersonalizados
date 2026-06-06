import React from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, Send, CheckCircle, FileCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Escolha seu presente',
      desc: 'Navegue pelo nosso catálogo de canecas, azulejos e cestas premium e encontre o seu favorito.',
      icon: Gift,
      color: 'text-wine-red bg-wine-red/15 border-wine-red/25',
    },
    {
      num: '2',
      title: 'Envie foto e detalhes',
      desc: 'Preencha os nomes, datas especiais e o link do Spotify do casal nos campos de cada presente.',
      icon: Send,
      color: 'text-indigo-400 bg-indigo-400/15 border-indigo-400/25',
    },
    {
      num: '3',
      title: 'Prévia digital profissional',
      desc: 'Nossos designers montam e testam a sua arte após a confirmação do pedido ou sinal de 50%.',
      icon: Sparkles,
      color: 'text-[#FF2D55] bg-[#FF2D55]/15 border-[#FF2D55]/25 shadow-[0_0_15px_rgba(255,45,85,0.15)]',
    },
    {
      num: '4',
      title: 'Aprove e receba',
      desc: 'Após aprovar a arte pelo WhatsApp, produzimos com precisão e te entregamos com embalagem.',
      icon: CheckCircle,
      color: 'text-[#25D366] bg-[#25D366]/15 border-[#25D366]/25',
    },
  ];

  return (
    <section id="como-funciona" className="py-12 sm:py-16 bg-[#09090A] border-y border-white/5 relative overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-wine-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#FF2D55] mb-2">
            PASSO A PASSO ATÉ O SORRISO DELA
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Como funciona?
          </h2>
          <div className="w-12 h-1 bg-[#FF2D55] rounded mx-auto mt-4" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative bg-zinc-900/40 p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition duration-300 flex flex-col justify-between"
              >
                {/* Numeric badge indicator */}
                <div className="absolute -top-3.5 -left-3.5 w-8 h-8 rounded-full bg-[#141414] border border-white/10 shadow-lg text-zinc-400 font-mono text-xs font-black flex items-center justify-center">
                  #{step.num}
                </div>

                <div>
                  {/* Top Icon with color styling */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 shrink-0 ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-display font-extrabold text-white mb-2 decoration-1">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom line accent to guide follow */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 w-8 h-px bg-gradient-to-r from-white/15 to-transparent z-20 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
