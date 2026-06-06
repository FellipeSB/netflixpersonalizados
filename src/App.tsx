import React, { useState, useEffect } from 'react';
import { SECTIONS_DATA } from './data';
import { Product, Section } from './types';
import { UrgencyBanner } from './components/UrgencyBanner';
import { SettingsPanel } from './components/SettingsPanel';
import { Hero } from './components/Hero';
import { ProductRow } from './components/ProductRow';
import { ProductModal } from './components/ProductModal';
import { GuaranteeSection } from './components/GuaranteeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FooterCTA } from './components/FooterCTA';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { TudumIntro } from './components/TudumIntro';
import { SwipeIndicator } from './components/SwipeIndicator';

// Utility to populate and load default sections with prices and options
const getInitialSections = (): Section[] => {
  const saved = localStorage.getItem('catalog_sections_db_v11');
  if (saved) {
    try {
      let parsed = JSON.parse(saved) as Section[];
      
      // Programmatic migration for previously saved databases:
      // 1. Rename "Canecas com Foto" to "Canecas Love"
      let migrated = false;
      parsed = parsed.map(section => {
        if (section.id === 'canecas-foto' && section.title === '☕ Canecas com Foto') {
          migrated = true;
          return { ...section, title: '☕ Canecas Love' };
        }
        if (section.id === 'caneca-spotify' && section.title === '🎵 Caneca Spotify + Foto') {
          migrated = true;
          return { ...section, title: '🎵 Canecas Doce Amor', subtitle: 'A música ou data que marcou a história de vocês.' };
        }
        return section;
      });

      // 2. Locate any 'caneca-calendario' section and merge into 'caneca-spotify', then remove it
      const calendarSection = parsed.find(s => s.id === 'caneca-calendario');
      if (calendarSection) {
        migrated = true;
        parsed = parsed.map(section => {
          if (section.id === 'caneca-spotify') {
            const mergedProducts = [...section.products];
            calendarSection.products.forEach(p => {
              if (!mergedProducts.some(mp => mp.id === p.id)) {
                mergedProducts.push({
                  ...p,
                  sectionId: 'caneca-spotify'
                });
              }
            });
            return { 
              ...section, 
              title: section.title === '🎵 Caneca Spotify + Foto' ? '🎵 Canecas Doce Amor' : section.title,
              products: mergedProducts 
            };
          }
          return section;
        }).filter(section => section.id !== 'caneca-calendario');
      }

      // Ensure that if any calendar products still have sectionId as 'caneca-calendario', we sweep them over
      parsed = parsed.map(section => {
        if (section.id === 'caneca-spotify') {
          return {
            ...section,
            products: section.products.map(p => p.id === 'caneca-calendario-unica' ? { ...p, sectionId: 'caneca-spotify' } : p)
          };
        }
        return section;
      });

      if (migrated) {
        localStorage.setItem('catalog_sections_db_v11', JSON.stringify(parsed));
      }

      return parsed;
    } catch (e) {
      console.error('Error loading custom products base:', e);
    }
  }
  
  // Augment standard products with beautiful default pricing and custom field toggles
  const augmented = SECTIONS_DATA.map(section => {
    return {
      ...section,
      products: section.products.map(product => {
        let price = product.price !== undefined ? product.price : 49.90;
        let hasNames = product.hasNames !== undefined ? product.hasNames : true;
        let hasPhotoUpload = product.hasPhotoUpload !== undefined ? product.hasPhotoUpload : true;
        let hasPackaging = product.hasPackaging !== undefined ? product.hasPackaging : false;
        
        // Define products featured by default
        const isFeatured = product.id === 'caneca-magica-unica' || 
                           product.id === 'caneca-spotify-unica' || 
                           product.id === 'cesta-novidade' || 
                           product.id === 'combo-ceramica';
        
        // Logical default prices and options depending on sections/ids
        if (product.price === undefined) {
          if (section.id === 'caneca-spotify' || product.id === 'caneca-spotify-unica' || product.id === 'caneca-calendario-unica') {
            price = 59.90;
            hasPackaging = true;
          } else if (section.id === 'caneca-magica' || product.id === 'caneca-magica-unica') {
            price = 69.90;
            hasPackaging = true;
          } else if (section.id === 'canecas-foto' || product.id.includes('caneca')) {
            price = 49.90;
            hasPackaging = true;
          } else if (section.id === 'combos-casal' || product.id.includes('combo')) {
            price = 119.90;
            if (product.id === 'combo-ceramica') {
              hasPackaging = true;
            }
          } else if (section.id === 'azulejos' || product.id.includes('azulejo')) {
            price = 79.90;
          } else if (section.id === 'cestas' || product.id.includes('cesta')) {
            price = 189.90;
          }
        }

        return {
          id: product.id,
          title: product.title,
          sectionId: product.sectionId,
          subtitle: product.subtitle,
          tagline: product.tagline,
          images: product.images,
          description: product.description,
          features: product.features,
          badge: product.badge,
          hasCustomDate: product.hasCustomDate,
          hasMusicSpotify: product.hasMusicSpotify,
          hasMagicReveal: product.hasMagicReveal,
          price,
          hasNames,
          hasPhotoUpload,
          hasPackaging,
          isFeatured
        };
      })
    };
  });

  localStorage.setItem('catalog_sections_db_v11', JSON.stringify(augmented));
  return augmented;
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Inactivity tracking states for swipe prompt gesture overlay
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false);
  const [inactivityThreshold, setInactivityThreshold] = useState(3000);
  const [isDeliveryStep, setIsDeliveryStep] = useState(false);

  // Monitor selectedProduct swaps: resets requirement threshold back to 3s when clicking another product
  useEffect(() => {
    setInactivityThreshold(3000);
    setShowSwipeIndicator(false);
    setIsDeliveryStep(false);
  }, [selectedProduct]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      // If indicator is showing and user acts or scrolls, dismiss it
      // and adjust the next inactivity threshold to 5s.
      setShowSwipeIndicator((prev) => {
        if (prev) {
          setInactivityThreshold(5000);
          return false;
        }
        return prev;
      });

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (!isDeliveryStep) {
          setShowSwipeIndicator(true);
        }
      }, inactivityThreshold);
    };

    // Listeners capturing global movement and multi-touch or scrolling inputs (using capturing for scrolls)
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('touchmove', resetTimer);
    window.addEventListener('wheel', resetTimer);
    window.addEventListener('scroll', resetTimer, true);
    window.addEventListener('click', resetTimer);

    // Initial silent delay trigger
    timeoutId = setTimeout(() => {
      if (!isDeliveryStep) {
        setShowSwipeIndicator(true);
      }
    }, inactivityThreshold);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('touchmove', resetTimer);
      window.removeEventListener('wheel', resetTimer);
      window.removeEventListener('scroll', resetTimer, true);
      window.removeEventListener('click', resetTimer);
    };
  }, [inactivityThreshold, isDeliveryStep]);
  
  // Synchronous state loading prevents any state loss, flashes or asynchronous reset issues on page reloads!
  const [sections, setSections] = useState<Section[]>(() => {
    return getInitialSections();
  });

  const [phone, setPhone] = useState<string>(() => {
    const saved = localStorage.getItem('catalog_whatsapp_phone');
    return saved || '5551997098567';
  });

  const [storeName, setStoreName] = useState<string>(() => {
    const saved = localStorage.getItem('catalog_store_name');
    return saved || 'Time Imprint';
  });

  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
    return localStorage.getItem('catalog_selected_avatar') || 'AM';
  });

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'canecas' | 'spotify' | 'azulejos' | 'cestas'>('all');

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    localStorage.setItem('catalog_selected_avatar', avatar);
  };

  useEffect(() => {
    // 💡 Vercel-optimized Dynamic Parameter Parsing: Supports external query params (?w= & ?store=)
    const urlParams = new URLSearchParams(window.location.search);
    const urlPhone = urlParams.get('w') || urlParams.get('phone') || urlParams.get('whatsapp');
    const urlStoreName = urlParams.get('store') || urlParams.get('loja') || urlParams.get('storeName');

    if (urlPhone) {
      const cleanPhone = urlPhone.replace(/\D/g, '');
      setPhone(cleanPhone);
      localStorage.setItem('catalog_whatsapp_phone', cleanPhone);
    }

    if (urlStoreName) {
      setStoreName(urlStoreName);
      localStorage.setItem('catalog_store_name', urlStoreName);
    }
  }, []);

  const handleSettingsChange = (newPhone: string, newStoreName: string, updatedSections?: Section[]) => {
    setPhone(newPhone);
    setStoreName(newStoreName);
    if (updatedSections) {
      setSections(updatedSections);
    }
  };

  // Scroll smoothly down to catalog when action is clicked
  const handleScrollToCatalog = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Compile flat product list for auto-carousel highlights
  const allProducts = sections.flatMap(s => s.products || []);

  const filteredSections = activeCategoryFilter === 'all' 
    ? sections 
    : sections.filter(sec => {
        if (activeCategoryFilter === 'canecas') return sec.id === 'canecas-foto' || sec.id === 'caneca-spotify';
        if (activeCategoryFilter === 'spotify') return sec.id === 'caneca-spotify';
        if (activeCategoryFilter === 'azulejos') return sec.id === 'azulejos';
        if (activeCategoryFilter === 'cestas') return sec.id === 'cestas';
        return true;
      });

  return (
    <div className="min-h-screen bg-netflix-bg text-white relative flex flex-col font-sans select-none">
      {/* 🎵 Netflix Brand Intro with physical Synthesized "Tudum" */}
      <TudumIntro storeName={storeName} onAvatarSelect={handleAvatarSelect} />

      {/* ⚠️ Sticky Limited Edition Bar */}
      <UrgencyBanner />

      {/* ⚙️ Profile / Contact Configuration Drawer Trigger */}
      <SettingsPanel 
        sections={sections} 
        onSettingsChange={handleSettingsChange} 
      />

      {/* 🎬 Big Visual Landing Frame */}
      <Hero storeName={storeName} onCtaClick={handleScrollToCatalog} selectedAvatar={selectedAvatar} />

      {/* 📂 Netflix Category Carousels */}
      <main id="catalogo" className="bg-netflix-bg relative z-10 pb-8 scroll-mt-6">
        
        {/* Netflix Category Filter Pills Bar */}
        <div className="px-4 md:px-16 py-6 max-w-7xl mx-auto flex flex-col gap-1 select-none border-b border-white/5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF2D55] mb-1 animate-pulse">🎯 Explorar Coleção dos Namorados</p>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-2 shrink-0 scroll-smooth">
            {[
              { id: 'all', label: '🎬 Todos os Presentes', count: allProducts.length },
              { id: 'canecas', label: '☕ Canecas Modernas', count: (sections.find(s => s.id === 'canecas-foto')?.products?.length || 0) + (sections.find(s => s.id === 'caneca-spotify')?.products?.length || 0) },
              { id: 'spotify', label: '🎵 Especiais Spotify/Data', count: sections.find(s => s.id === 'caneca-spotify')?.products?.length || 0 },
              { id: 'azulejos', label: '🖼️ Azulejos com Foto', count: sections.find(s => s.id === 'azulejos')?.products?.length || 0 },
              { id: 'cestas', label: '💝 Cestas Românticas', count: sections.find(s => s.id === 'cestas')?.products?.length || 0 }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCategoryFilter(item.id as any);
                  // Auto-snap scroll focus slightly down if clicked from a tall device
                  const el = document.getElementById('category-filter-pills-deck');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }}
                className={`px-4.5 py-3 rounded-2xl text-xs sm:text-xs font-sans font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2 border ${
                  activeCategoryFilter === item.id
                    ? 'bg-wine-red text-white border-wine-red shadow-[0_4px_15px_rgba(158,27,50,0.5)] md:scale-105'
                    : 'bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white border-white/5 hover:border-white/10'
                }`}
              >
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-lg font-mono font-bold ${activeCategoryFilter === item.id ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-500'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Scroll Target anchor */}
          <div id="category-filter-pills-deck" className="h-px bg-transparent"></div>
        </div>

        {/* Dynamic Auto-rotating Featured Showcase */}
        {allProducts.length > 0 && activeCategoryFilter === 'all' && (
          <FeaturedCarousel 
            products={allProducts} 
            onProductClick={(prod) => setSelectedProduct(prod)} 
          />
        )}

        <div className="py-2">
          {filteredSections.map((section) => (
            section.products && section.products.length > 0 && (
              <ProductRow
                key={section.id}
                title={section.title}
                subtitle={section.subtitle}
                products={section.products}
                onProductClick={(prod) => setSelectedProduct(prod)}
              />
            )
          ))}
        </div>
      </main>

      {/* 🏆 Quality & Trust Badges */}
      <GuaranteeSection />

      {/* 💬 Live WhatsApp Feeds */}
      <TestimonialsSection />

      {/* 🎁 Bottom Conversion Deck */}
      <FooterCTA phone={phone} storeName={storeName} />

      {/* 🎫 Netflix Detail Modal Card Sheet */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          phone={phone}
          storeName={storeName}
          onStepChange={(step, maxSteps) => {
            setIsDeliveryStep(step === maxSteps);
          }}
        />
      )}

      {/* 👆 Animated Swipe/Scroll Gesture Reminder Overlay */}
      <SwipeIndicator isVisible={showSwipeIndicator} />
    </div>
  );
}
