import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Product } from '../types';

interface ProductRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ title, subtitle, products, onProductClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative py-6 sm:py-8 border-b border-white/5 last:border-0">
      {/* Row Header */}
      <div className="px-4 sm:px-8 md:px-16 mb-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
            {subtitle}
          </p>
        )}
      </div>

      {/* Slider Area */}
      <div className="group/row relative">
        {/* Left Arrow - centered vertically, with a circular background and dynamic shadow */}
        {products.length > 1 && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/10 hover:border-[#FF2D55]/30 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Right Arrow - centered vertically, with a circular background and dynamic shadow */}
        {products.length > 1 && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/10 hover:border-[#FF2D55]/30 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Horizontal Scroll Containers */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto overflow-y-hidden pl-4 sm:pl-8 md:pl-16 pr-12 sm:pr-24 py-3 scroll-smooth no-scrollbar netflix-scrollbar"
        >
          {products.map((product) => {
            const hasBadge = !!product.badge;
            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="flex-shrink-0 w-[60vw] sm:w-[38vw] md:w-[26vw] lg:w-[18vw] flex flex-col gap-2 select-none group/card cursor-pointer transition-all duration-300 hover:scale-[1.03]"
              >
                {/* 1x1 Image Wrapper */}
                <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-netflix-card border border-white/5 shadow-md">
                  {/* Hero Product Image */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Badges and details */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    {hasBadge && (
                      <span className="bg-wine-red text-white text-[9px] font-mono font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow-md border border-wine-red-hover">
                        {product.badge}
                      </span>
                    )}
                    {product.hasMusicSpotify && (
                      <span className="bg-green-500/95 text-white text-[8px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded shadow-sm w-fit">
                        🎵 SPOTIFY
                      </span>
                    )}
                  </div>
                </div>

                {/* Caption / Information - gracefully placed underneath the image to prevent overlapping */}
                <div className="text-center w-full px-1">
                  <h3 className="text-sm sm:text-base font-display font-black text-white/95 group-hover/card:text-white leading-snug line-clamp-1 transition-colors text-center">
                    {product.title}
                  </h3>
                  
                  {/* Center-aligned CTA footer with no price */}
                  <div className="flex items-center justify-center mt-1.5 md:mt-2 border-t border-white/5 pt-1.5">
                    <span className="text-xs sm:text-sm text-green-400 font-sans font-bold flex items-center justify-center gap-1 opacity-90 group-hover/card:opacity-100 transition-opacity">
                      <Play className="w-3 h-3 fill-green-400 text-green-400 inline" /> Clique aqui para ver detalhes
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
