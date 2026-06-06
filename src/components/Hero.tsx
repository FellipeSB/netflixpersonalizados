import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data';

interface HeroProps {
  storeName: string;
  onCtaClick: () => void;
  selectedAvatar?: string;
}

export const Hero: React.FC<HeroProps> = ({ storeName, onCtaClick, selectedAvatar }) => {
  return (
    <div id="hero-section" className="relative w-full min-h-[88vh] lg:min-h-[96vh] flex flex-col justify-end overflow-hidden pb-8 sm:pb-12 lg:pb-24 px-4 sm:px-8 md:px-16 pt-28 sm:pt-24">
      {/* Top Navigation Bar from Dark Luxury / Travel Theme */}
      <nav className="absolute top-0 inset-x-0 flex items-center justify-between px-4 sm:px-8 md:px-16 py-6 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-6 sm:gap-12">
          <div id="store-brand-title" className="text-wine-red font-black text-2xl sm:text-3xl tracking-tighter flex items-center gap-2 select-none cursor-pointer">
            <span className="bg-wine-red text-white px-2 py-0.5 rounded shadow-lg text-sm sm:text-base font-extrabold">LOVE</span>
            <span className="italic font-bold text-white tracking-normal">PRESENTES</span>
          </div>
          <div className="hidden md:flex gap-6 text-xs sm:text-sm font-medium text-off-white">
            <a href="#hero-section" className="text-white cursor-pointer hover:text-white/80 transition-colors">Início</a>
            <a href="#catalogo" className="hover:text-white cursor-pointer transition-colors">Canecas</a>
            <a href="#garantia" className="hover:text-white cursor-pointer transition-colors">Garantias</a>
            <a href="#depoimentos" className="hover:text-white cursor-pointer transition-colors">Depoimentos</a>
            <a href="#contato-final" className="hover:text-white cursor-pointer transition-colors">Contato</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <svg className="w-5 h-5 text-off-white hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <div id="profile-avatar-btn" className="w-8 h-8 rounded-full bg-wine-red flex items-center justify-center text-xs font-bold border border-white/10 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all">
            {selectedAvatar || 'AM'}
          </div>
        </div>
      </nav>

      {/* Background Image with clean subtle tint overlay (no border or edge gradients) */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_DATA.heroImage}
          alt="Casal feliz celebrando com caneca personalizada"
          className="w-full h-full object-cover object-center scale-[1.01] select-none"
          referrerPolicy="no-referrer"
        />
        {/* Overall ambient tint for beautiful cohesion */}
        <div className="absolute inset-0 bg-black/20" />
        {/* High-contrast smooth fade gradient behind the text from the left */}
        <div className="absolute inset-y-0 left-0 w-full md:w-4/5 lg:w-2/3 bg-gradient-to-r from-black/90 via-black/55 to-transparent z-[1]" />
        {/* High-contrast bottom-up fade gradient behind the text and button */}
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-[1]" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl flex flex-col items-start gap-4 text-left">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.05]"
        >
          Presentes que<br/><span className="text-[#FF2D55] font-black">surpreendem.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-off-white font-sans max-w-xl font-normal leading-relaxed tracking-wide"
        >
          {HERO_DATA.subtitle} Esqueça os presentes comuns. Transforme suas melhores memórias em algo inesquecível.
        </motion.p>

        {/* Custom Tags Mimicking Netflix Movie Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans text-zinc-400 mt-2"
        >
          <span className="text-green-400 font-bold">99% Recomendado</span>
          <span>•</span>
          <span className="border border-zinc-600 px-1.5 py-0.5 rounded text-[10px] font-mono">100% PERSONALIZADO</span>
          <span>•</span>
          <span>Amor & Afeto</span>
          <span>•</span>
          <span>Edição Limitada de Namorados</span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 w-full sm:w-auto"
        >
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-whatsapp-green hover:bg-whatsapp-green-hover text-white font-sans font-bold text-base tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-3 py-4 text-center focus:outline-none focus:ring-2 focus:ring-whatsapp-green/45 group green-glow"
          >
            <Play className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
            CONHECER PRESENTES
          </button>
        </motion.div>
      </div>

      {/* Decorative gradient mask side shadows */}
      <div className="absolute right-4 bottom-4 md:right-12 md:bottom-12 z-10 pointer-events-none hidden md:flex flex-col items-end opacity-45">
        <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">Apresentação Exclusiva</span>
        <span className="font-display font-bold text-white text-sm">Coleção 2026</span>
      </div>
    </div>
  );
};
