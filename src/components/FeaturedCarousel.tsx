import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface FeaturedCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products, onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter products to show all baskets and any explicitly featured items
  const featuredProducts = products.filter(p => p.sectionId === 'cestas' || p.isFeatured);

  // If no products are marked as featured, fall back to the first few items
  const activeProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3);

  useEffect(() => {
    if (activeProducts.length <= 1) return;

    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % activeProducts.length);
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, activeProducts.length]);

  // Adjust current index if list length changes dynamically
  useEffect(() => {
    if (currentIndex >= activeProducts.length) {
      setCurrentIndex(0);
    }
  }, [activeProducts.length, currentIndex]);

  if (activeProducts.length === 0) return null;

  const currentProduct = activeProducts[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % activeProducts.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + activeProducts.length) % activeProducts.length);
  };

  return (
    <section className="px-4 md:px-8 py-6 max-w-7xl mx-auto select-none mt-2">
      <div className="flex items-center gap-2 mb-3 px-1">
        <Sparkles className="w-4 h-4 text-[#FF2D55] animate-pulse" />
        <h2 className="text-sm md:text-base font-display font-black uppercase tracking-widest text-zinc-300">
          Destaques Super Especiais
        </h2>
        <span className="h-px bg-white/10 flex-1 ml-2"></span>
      </div>

      <div 
        id="featured-auto-carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onProductClick(currentProduct)}
        className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Clean Image Container (Nothing on top of the image!) */}
        <div className="relative h-[320px] sm:h-[380px] md:h-[460px] rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl transition hover:border-[#FF2D55]/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id + '-' + currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              {/* Main Picture without any darkening overlays, showing full image with object-cover and cinematic Ken Burns zoom */}
              <motion.img 
                src={currentProduct.images[0]} 
                alt={currentProduct.title}
                referrerPolicy="no-referrer"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 5.5, ease: 'linear' }}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls Overlay (Left/Right subtle arrows only visible on hover) */}
          {activeProducts.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 hover:border-[#FF2D55]/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 hover:border-[#FF2D55]/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Sutil auto-rotation bottom progress bar */}
          {activeProducts.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900/40 z-30 overflow-hidden">
              <motion.div
                key={currentIndex + (isHovered ? '-paused' : '-running')}
                initial={{ width: '0%' }}
                animate={{ width: isHovered ? '0%' : '100%' }}
                transition={{ duration: isHovered ? 0.2 : 5.0, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#FF2D55] via-red-500 to-[#FF2D55]"
              />
            </div>
          )}
        </div>

        {/* Content Box OUTSIDE of the Image */}
        <div className="pt-4 pb-2 px-1 text-left">
          {/* Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black tracking-tight text-white leading-tight">
            {currentProduct.title}
          </h3>

          {/* Call to action & indicator dots */}
          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button className="w-fit bg-white hover:bg-[#FF2D55] text-black hover:text-white font-display font-black uppercase text-xs tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer select-none border border-white/10 hover:border-transparent active:scale-95">
              <Play className="w-3 h-3 fill-current" />
              Personalizar Presente
            </button>

            {/* Slide dots indicators */}
            {activeProducts.length > 1 && (
              <div className="flex gap-1.5 items-center">
                {activeProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'w-6 bg-[#FF2D55]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

