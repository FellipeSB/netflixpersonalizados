import React from 'react';
import { Play, Star, MapPin, Truck, MessageSquare, Gift, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data';

interface HeroProps {
  storeName: string;
  onCtaClick: () => void;
  selectedAvatar?: string;
  phone?: string;
}

export const Hero: React.FC<HeroProps> = ({ storeName, onCtaClick, selectedAvatar, phone }) => {
  return (
    <div id="hero-section" className="relative w-full min-h-[92vh] lg:min-h-[100vh] flex flex-col justify-end overflow-hidden pb-10 sm:pb-16 lg:pb-24 px-4 sm:px-8 md:px-16 pt-24 sm:pt-24 bg-[#0F0F10]">
      {/* Top Navigation Bar from Dark Luxury / Travel Theme */}
      <nav className="absolute top-0 inset-x-0 flex items-center justify-between px-4 sm:px-8 md:px-16 py-6 z-20 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-6 sm:gap-12">
          <div id="store-brand-title" className="text-wine-red font-black text-2xl sm:text-3xl tracking-tighter flex items-center gap-2 select-none cursor-pointer">
            <span className="bg-wine-red text-white px-2 py-0.5 rounded shadow-lg text-sm sm:text-base font-extrabold">LOVE</span>
            <span className="italic font-bold text-white tracking-normal">PRESENTES</span>
          </div>
          <div className="hidden md:flex gap-6 text-xs sm:text-sm font-medium text-off-white">
            <a href="#hero-section" className="text-white cursor-pointer hover:text-white/80 transition-colors">Início</a>
            <a href="#catalogo" className="hover:text-white cursor-pointer transition-colors">Catálogo Netflix</a>
            <a href="#garantia" className="hover:text-white cursor-pointer transition-colors">Garantias</a>
            <a href="#depoimentos" className="hover:text-white cursor-pointer transition-colors">Clientes Satisfeitos</a>
            <a href="#contato-final" className="hover:text-white cursor-pointer transition-colors">Falar com Designer</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 bg-zinc-900/80 border border-white/5 py-1.5 px-3 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-wine-red shrink-0" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300">Guaíba e Região</span>
          </div>
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
        <div className="absolute inset-0 bg-black/35" />
        {/* High-contrast smooth fade gradient behind the text from the left */}
        <div className="absolute inset-y-0 left-0 w-full md:w-4/5 lg:w-2/3 bg-gradient-to-r from-black/95 via-black/70 to-transparent z-[1]" />
        {/* High-contrast bottom-up fade gradient behind the text and button */}
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/98 via-black/60 to-transparent z-[1]" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl flex flex-col items-start gap-4 text-left mt-6 md:mt-8">
        {/* Social Proof above the fold (Micro Trust Badges) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 bg-black/60 border border-white/10 p-2 rounded-xl backdrop-blur-md"
        >
          <div className="flex items-center -space-x-1.5">
            <span className="w-5.5 h-5.5 rounded-full bg-zinc-800 border border-white/20 text-[9px] flex items-center justify-center font-bold">👩</span>
            <span className="w-5.5 h-5.5 rounded-full bg-zinc-700 border border-white/20 text-[9px] flex items-center justify-center font-bold">👩‍🦰</span>
            <span className="w-5.5 h-5.5 rounded-full bg-zinc-600 border border-white/20 text-[9px] flex items-center justify-center font-bold">🧔</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <div className="flex items-center gap-0.5 text-[#FF2D55]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-white font-black leading-none">4.9/5</span>
            <span className="text-zinc-300 font-sans font-semibold leading-none">| +500 presentes entregues em Guaíba</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-black tracking-tight text-white leading-[1.1] md:leading-[1.05]"
        >
          Não sabe o que dar <br />
          <span className="text-[#FF2D55] font-black relative">
            para sua namorada?
            <span className="absolute left-0 bottom-1 w-full h-[6px] bg-wine-red/50 -z-10 rounded"></span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-zinc-100 font-sans max-w-xl font-bold leading-relaxed tracking-wide"
        >
          Mais de 50 ideias de presentes personalizados prontas para encomenda em Guaíba e região.
        </motion.p>

        {/* Buttons Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2"
        >
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-[#FF2D55] hover:bg-wine-red-hover active:scale-95 text-white font-sans font-black text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl border border-white/10"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            VER CATÁLOGO
          </button>
          
          <a
            href={`https://wa.me/${phone || '5551997098567'}?text=Olá!%20Não%20sei%20o%20que%20dar%20para%20minha%20namorada%20e%20gostaria%20de%20dicas%20de%20presentes%20personalizados!`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-sans font-black text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl green-glow"
          >
            <MessageSquare className="w-4 h-4 fill-white text-white" />
            FALAR NO WHATSAPP
          </a>
        </motion.div>

        {/* Micro Provas Sociais Row - Below CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full border-t border-white/10 pt-4 mt-2"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-black/55 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-sans text-zinc-300">
              <span className="text-base select-none">🎁</span>
              <div>
                <p className="font-extrabold text-white text-[11px] sm:text-xs">A partir de R$ 38,90</p>
                <p className="text-[9px] text-zinc-400 font-medium">Super acessível</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-sans text-zinc-300">
              <span className="text-base select-none">⭐</span>
              <div>
                <p className="font-extrabold text-white text-[11px] sm:text-xs">Guaíba e Região</p>
                <p className="text-[9px] text-zinc-400 font-medium">Confiança local</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-sans text-zinc-300">
              <span className="text-base select-none">🚚</span>
              <div>
                <p className="font-extrabold text-white text-[11px] sm:text-xs">Entrega Local</p>
                <p className="text-[9px] text-zinc-400 font-medium">Rápida e cuidadosa</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-sans text-zinc-300">
              <span className="text-base select-none">❤️</span>
              <div>
                <p className="font-extrabold text-white text-[11px] sm:text-xs">Personalização Exclusiva</p>
                <p className="text-[9px] text-zinc-400 font-medium">Diga adeus ao genérico</p>
              </div>
            </div>
          </div>
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
