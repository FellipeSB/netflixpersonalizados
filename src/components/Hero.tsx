import React from 'react';
import { Play, Star, MapPin, Truck, MessageSquare, Gift, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data';

interface HeroProps {
  storeName: string;
  onCtaClick: () => void;
  selectedAvatar?: string;
}

export const Hero: React.FC<HeroProps> = ({ storeName, onCtaClick, selectedAvatar }) => {
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
      <div className="relative z-10 max-w-3xl flex flex-col items-start gap-4 text-left mt-10">
        {/* Social Proof above the fold (Micro Trust Badges) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 bg-black/45 border border-white/10 p-2 rounded-xl backdrop-blur-md"
        >
          <div className="flex items-center -space-x-1.5">
            <span className="w-5.5 h-5.5 rounded-full bg-zinc-800 border border-white/20 text-[9px] flex items-center justify-center font-bold">👩</span>
            <span className="w-5.5 h-5.5 rounded-full bg-zinc-700 border border-white/20 text-[9px] flex items-center justify-center font-bold">👩‍🦰</span>
            <span className="w-5.5 h-5.5 rounded-full bg-zinc-600 border border-white/20 text-[9px] flex items-center justify-center font-bold">🧔</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-white font-bold leading-none">4.9/5</span>
            <span className="text-zinc-400 font-sans leading-none">| +500 presentes entregues com carinho em Guaíba</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white leading-[1.05]"
        >
          Presentes que<br/>
          <span className="text-[#FF2D55] font-black relative">
            surpreendem e emocionam.
            <span className="absolute left-0 bottom-1 w-full h-[6px] bg-wine-red/50 -z-10 rounded"></span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-zinc-300 font-sans max-w-xl font-normal leading-relaxed tracking-wide"
        >
          Esqueça lembranças genéricas. Eternize o amor de vocês com fotos, monogramas românticos e playlists do Spotify em acabamento premium de cerâmica e madeira de lei. 
        </motion.p>

        {/* Value Proposition Cards Grid - Immediate value understanding under 3s */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 gap-3 w-full max-w-2xl mt-2 text-xs font-sans text-zinc-300"
        >
          <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-white/2 border border-white/5 font-medium hover:border-wine-red/25 transition">
            <Gift className="w-5 h-5 text-[#FF2D55] shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wide">Presente Único</p>
              <p className="text-zinc-400 text-[11px] mt-0.5 font-normal">Personalizados de verdade a partir de <strong className="text-green-400 text-xs font-mono">R$ 35,90</strong></p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-white/2 border border-white/5 font-medium hover:border-wine-red/25 transition">
            <MapPin className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wide">Produção Guaíba</p>
              <p className="text-zinc-400 text-[11px] mt-0.5 font-normal">Feito localmente por produtores artesanais e designers parceiros</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-white/2 border border-white/5 font-medium hover:border-wine-red/25 transition">
            <Truck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wide">Entrega Rápida</p>
              <p className="text-zinc-400 text-[11px] mt-0.5 font-normal">Envio prioritário em Guaíba e região ou retirada grátis</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-white/2 border border-white/5 font-medium hover:border-wine-red/25 transition">
            <MessageSquare className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wide">Humanizado & Sem Erros</p>
              <p className="text-zinc-400 text-[11px] mt-0.5 font-normal">Design verificado e aprovado com você via WhatsApp antes do envio</p>
            </div>
          </div>
        </motion.div>

        {/* Cognitive Flow Checklist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs font-mono uppercase font-black text-zinc-400 mt-3"
        >
          <span className="bg-[#FF2D55] text-white px-1.5 py-0.5 rounded text-[9px] font-bold">COMO COMPRAR</span>
          <span>1. ESCOLHA</span>
          <span className="text-zinc-600">➔</span>
          <span>2. RECHEIE COM SUA ARTE</span>
          <span className="text-zinc-600">➔</span>
          <span>3. COMBINE NO WHATSAPP</span>
        </motion.div>

        {/* Persuasive CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 w-full sm:w-auto"
        >
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-whatsapp-green hover:bg-whatsapp-green-hover text-white font-sans font-bold text-base tracking-wider px-10 py-4.5 rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-3 group green-glow shadow-xl"
          >
            <Play className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
            🎁 ESCOLHER MEU PRESENTE PERFEITO
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
