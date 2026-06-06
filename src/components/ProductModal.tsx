import React, { useState, useRef, useEffect } from 'react';
import { X, Check, Heart, Music, Calendar, ArrowRight, ArrowLeft, Gift, Truck, MapPin, Store, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { generateWhatsAppUrl, getPackagingOptions } from '../data';

const NEIGHBORHOODS_GUAIBA = [
  'Alegria',
  'Altos da Alegria',
  'Alvorada',
  'Bom Fim',
  'Centro',
  'Colina',
  'Coronel Nassuca',
  'Engenho',
  'Ermo',
  'Fátima',
  'Flórida',
  'Ipê',
  'Parque 35',
  'Santa Rita',
  'São Francisco',
  'São Jorge',
  'Vera Cruz'
];

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  phone: string;
  storeName: string;
  onStepChange?: (step: number, maxSteps: number) => void;
}

const UPGRADE_CESTAS = [
  {
    id: "cesta-carinho",
    title: "Cesta Carinho 💝",
    price: 149.90,
    images: ["https://i.ibb.co/FL4TYkYN/Cestas-Caneca-Azulejo.webp"],
    description: "Reúne caneca, azulejo esmaltado com foto, coração gigante de pelúcia fofinho, chocolates KitKat e fita na caixa vazada decorada.",
    features: [
      "Caneca que você personalizou no Passo 1",
      "Azulejo com Foto legítimo 15x15cm",
      "Coração grande de pelúcia fofinho",
      "Chocolates KitKat inclusos",
      "Caixa vazada de madeira decorada premium",
      "Laço de cetim romântico"
    ]
  },
  {
    id: "cesta-sonho",
    title: "Cesta Sonho 💭",
    price: 149.90,
    images: ["https://i.ibb.co/5XqNzDM3/Cesta-Sonho.webp"],
    description: "Uma experiência maravilhosa de café da manhã e carinho. Caneca premium esmaltada com foto, tábua de madeira retangular personalizada a laser, colher coração dourada de luxo, bombons Ferrero Rocher.",
    features: [
      "Caneca que você personalizou no Passo 1",
      "Tábua de Madeira retangular Personalizada a laser",
      "Balão dourado metalizado de Coração",
      "Caixa de MDF decorativa de luxo",
      "Colher com ponta coração dourada",
      "Kit 3 Ferrero Rocher",
      "Decorações românticas e laço"
    ]
  },
  {
    id: "cesta-amor",
    title: "Cesta Amor ❤️",
    price: 179.90,
    images: ["https://i.ibb.co/RprFp5hZ/Cesta-Amor.webp"],
    description: "Surpreenda seu amor com uma cesta inesquecível e luxuosa. Acompanha caneca personalizada, tábua de madeira coração gravada a laser, coração gigante de pelúcia e decorações.",
    features: [
      "Caneca que você personalizou no Passo 1",
      "Tábua de Madeira Coração Personalizada a laser",
      "Coração Grande de Pelúcia escrito com Amor",
      "Balão coração metalizado",
      "Cesta Cartonada de alta qualidade",
      "Decorações românticas e palha decorativa"
    ]
  },
  {
    id: "cesta-love",
    title: "Cesta Love ❤️",
    price: 179.90,
    images: ["https://i.ibb.co/YF0J90WC/Cesta-Love.webp"],
    description: "Um presente sofisticado e diferenciado. Inclui copo térmico estilo Stanley personalizado a laser, 4 bombons finos Ferrero Rocher, balão de coração dourado, flores nobres, embalagens e decorações artesanais na cesta cartonada de coração.",
    features: [
      "Copo estilo Stanley Personalizado a Laser",
      "Kit 4 chocolates Ferrero Rocher",
      "Balão dourado metalizado de coração",
      "Flores e folhagens decorativas",
      "Cesta de formato coração cartonada de luxo",
      "Decorações artesanais sofisticadas"
    ]
  },
  {
    id: "cesta-duo",
    title: "Cesta Duo ☕☕",
    price: 249.90,
    images: ["https://i.ibb.co/NggPSdyf/Cesta-Duo-Plus.webp"],
    description: "Para brindar o amado(a) em dose dupla. Duas canecas personalizadas, caixa de bombons Ferrero Rocher, coração gigante de pelúcia, balão metalizado e cesta de MDF.",
    features: [
      "Duas Canecas personalizadas com foto/nomes (uma com a sua arte e outra combinando)",
      "Kit 12 chocolates Ferrero Rocher",
      "Coração Grande de Pelúcia escrito com Eu te Amo",
      "Balão dourado de coração",
      "Cesta em MDF premium com Visor",
      "Decorações exclusivas"
    ]
  }
];

interface UpgradeBasketType {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, phone, storeName, onStepChange }) => {
  if (!product) return null;

  // Check if product qualifies as a mug or ceramic custom product
  const isMug = product.sectionId === 'canecas-foto' || 
                product.sectionId === 'caneca-spotify' || 
                product.sectionId === 'caneca-calendario' || 
                product.sectionId === 'caneca-magica' ||
                product.id.includes('caneca') ||
                product.id === 'combo-ceramica';

  const isAzulejo = product.sectionId === 'azulejos' || product.id.includes('azulejo');

  const PACKAGING_OPTIONS = React.useMemo(() => {
    const baseOptions = getPackagingOptions();
    
    // Only show Cestas packaging options if it's a mug or an azulejo
    if (isMug || isAzulejo) {
      const baseProductPrice = Number(product.price || 38.90);
      const basketOptions = UPGRADE_CESTAS.filter(cesta => cesta.id !== 'cesta-love').map(cesta => ({
        id: cesta.id,
        name: cesta.title,
        description: cesta.description,
        price: cesta.price - baseProductPrice, // Dynamically set price difference
        image: cesta.images[0],
        isCesta: true,
        fullCestaPrice: cesta.price
      }));
      
      // Combine them
      const combined = [...basketOptions, ...baseOptions];
      
      // Sort: high price to low price (excluding "Não quero embalagem" which is kept at the bottom)
      const sorted = combined.filter(o => o.id !== 'nenhuma').sort((a, b) => b.price - a.price);
      const noneOpt = baseOptions.find(o => o.id === 'nenhuma');
      if (noneOpt) {
        sorted.push(noneOpt);
      }
      return sorted;
    }
    
    // Default fallback order
    const sorted = [...baseOptions].filter(o => o.id !== 'nenhuma').sort((a, b) => b.price - a.price);
    const noneOpt = baseOptions.find(o => o.id === 'nenhuma');
    if (noneOpt) {
      sorted.push(noneOpt);
    }
    return sorted;
  }, [product, isMug, isAzulejo]);

  // Active slideshow index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Customization fields
  const [coupleNames, setCoupleNames] = useState('');
  const [spotifySong, setSpotifySong] = useState('');
  const [specialDate, setSpecialDate] = useState('');

  // Multi-step customizer state
  const [step, setStep] = useState(1);
  const [selectedPackaging, setSelectedPackaging] = useState('nenhuma');

  // Upsell & basket upgrade state variables
  const [upgradedToCesta, setUpgradedToCesta] = useState<boolean | null>(null);
  const [upgradedBasket, setUpgradedBasket] = useState<any | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [upgradeExperienceExpanded, setUpgradeExperienceExpanded] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Delivery option states
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup' | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);

  // Is "Incluído nesta experiência" expanded/collapsed
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);

  const isDeliveryIncomplete = deliveryType === null || (deliveryType === 'delivery' && !selectedNeighborhood);
  const selectedPkg = PACKAGING_OPTIONS.find(opt => opt.id === selectedPackaging);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const personalizeRef = useRef<HTMLDivElement>(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);
  const [hasSelectedPackaging, setHasSelectedPackaging] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  // Reset upgraded status when the selected product changes
  useEffect(() => {
    setStep(1);
    setSelectedPackaging('nenhuma');
    setDeliveryType(null);
    setSelectedNeighborhood('');
    setHasSelectedPackaging(false);
    setIsNearBottom(false);
    setUpgradedToCesta(null);
    setUpgradedBasket(null);
    setCarouselIndex(0);
    setUpgradeExperienceExpanded(false);
  }, [product]);

  // Preload packaging options and upgrade images to make them display instantly on step 2
  useEffect(() => {
    PACKAGING_OPTIONS.forEach(opt => {
      if (opt.image) {
        const img = new Image();
        img.src = opt.image;
      }
    });
  }, [PACKAGING_OPTIONS]);



  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    // Reset state on step change
    setShowFloatingBtn(true);
    setIsNearBottom(false);
    setHasSelectedPackaging(false);
  }, [step]);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const target = personalizeRef.current;
      if (target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // If the top of the personalization block is close to or inside the container bounds, hide the floating button.
        if (targetRect.top <= containerRect.bottom - 100) {
          setShowFloatingBtn(false);
        } else {
          setShowFloatingBtn(true);
        }
      }

      // Check if user is scrolled near the bottom of the container
      const scrollRemaining = container.scrollHeight - container.scrollTop - container.clientHeight;
      if (scrollRemaining <= 100) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Run once standard layout has settled
      const timer = setTimeout(handleScroll, 100);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
      };
    }
  }, [step, product]);

  const showUpsell = isAzulejo;
  const showPackaging = isMug;
  
  const maxSteps = isMug 
    ? 3 // 1: Personalize, 2: Packaging, 3: Delivery
    : isAzulejo 
      ? 3 // 1: Personalize, 2: Cesta Carinho Upsell, 3: Delivery
      : 2; // 1: Personalize, 2: Delivery

  // Sync step and maxSteps to parent
  useEffect(() => {
    if (onStepChange) {
      onStepChange(step, maxSteps);
    }
  }, [step, maxSteps, onStepChange]);

  const getFinalPrices = () => {
    let basePrice = Number(product.price || 49.90);
    let extraPrice = 0;
    let detailStr = '';

    if (isAzulejo) {
      if (upgradedToCesta === true) {
        basePrice = 149.90;
        detailStr = "Combo Cesta Carinho 💝";
      } else {
        detailStr = "Apenas o Azulejo de Cerâmica";
      }
    } else if (isMug) {
      const selectedPkg = PACKAGING_OPTIONS.find(opt => opt.id === selectedPackaging);
      if (selectedPkg && selectedPkg.id !== 'nenhuma' && selectedPkg.price) {
        extraPrice = Number(selectedPkg.price);
      }
      detailStr = selectedPkg ? (selectedPkg.isCesta ? `Cesta: ${selectedPkg.name}` : `Embalagem: ${selectedPkg.name}`) : 'Sem embalagem especial';
    } else {
      detailStr = "Produto personalizado";
    }

    const deliveryPrice = deliveryType === 'delivery' && selectedNeighborhood ? (selectedNeighborhood === 'São Jorge' ? 12 : 8) : 0;
    const finalPrice = basePrice + extraPrice + deliveryPrice;

    return {
      basePrice,
      extraPrice,
      deliveryPrice,
      finalPrice,
      detailStr
    };
  };

  // Pre-filled WhatsApp submission logic
  const handleOrderSubmission = () => {
    let orderDetails = `Olá! Vi o produto *${product.title}* no catálogo de Dia dos Namorados 2026 e gostaria de encomendar! [HEART]\n\n`;
    
    const { basePrice, extraPrice, deliveryPrice, finalPrice, detailStr } = getFinalPrices();

    if (finalPrice) {
      let calcExplanation = `R$ ${basePrice.toFixed(2).replace('.', ',')} (${detailStr})`;
      if (extraPrice > 0) {
        calcExplanation += ` + R$ ${extraPrice.toFixed(2).replace('.', ',')} da embalagem`;
      }
      if (deliveryPrice > 0) {
        calcExplanation += ` + R$ ${deliveryPrice.toFixed(2).replace('.', ',')} de entrega`;
      }
      orderDetails += `[BOX] *Valor Total:* R$ ${finalPrice.toFixed(2).replace('.', ',')} (${calcExplanation})\n`;
    }

    const selectedPkg = PACKAGING_OPTIONS.find(opt => opt.id === selectedPackaging);

    if (selectedPkg && selectedPkg.isCesta) {
      orderDetails += `\n💝 *Cesta Escolhida:* ${selectedPkg.name} (Upgrade Completo!) 💝\n`;
    } else if (isAzulejo && upgradedToCesta === true) {
      orderDetails += `\n💝 *Cesta Escolhida:* Cesta Carinho com Azulejo (Upgrade Completo!) 💝\n`;
    }

    if (coupleNames && product.hasNames !== false) {
      orderDetails += `[PENCIL] *Nomes do Casal:* ${coupleNames}\n`;
    }
    
    if (product.hasCustomDate && specialDate) {
      orderDetails += `[CALENDAR] *Data Especial:* ${specialDate}\n`;
    }
    
    if (product.hasMusicSpotify && spotifySong) {
      orderDetails += `[MUSIC] *Música Spotify:* ${spotifySong}\n`;
    }

    if (selectedPkg && !selectedPkg.isCesta && selectedPackaging !== 'nenhuma') {
      orderDetails += `[GIFT] *Embalagem:* ${selectedPkg.name}\n`;
    }

    // Delivery details in WhatsApp message
    if (deliveryType === 'pickup') {
      orderDetails += `🏪 *Entrega:* Vou retirar no Jardim dos Lagos - Guaíba (Sem taxa • Grátis)\n`;
    } else {
      const neighborhoodName = selectedNeighborhood;
      orderDetails += `🚗 *Entrega:* Entrega em Guaíba\n📍 *Bairro:* ${neighborhoodName} (Taxa: R$ ${deliveryPrice.toFixed(2).replace('.', ',')})\n`;
    }

    if (product.hasPhotoUpload !== false) {
      orderDetails += `\n[CAMERA] *Envio de Foto:* Vou enviar a minha foto para personalização direto aqui nesta conversa!`;
    }

    const whatsappUrl = generateWhatsAppUrl(phone, orderDetails);
    window.open(whatsappUrl, '_blank', 'noreferrer');
  };

  // Determine button label
  const getButtonLabel = () => {
    if (product.hasCustomDate) return "Personalizar e Reservar";
    if (product.hasMusicSpotify) return "Quero Surpreender com Música";
    if (product.hasMagicReveal) return "Encomendar Efeito Mágico";
    return "Quero Encomendar Agora";
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGoNext = () => {
    if (step < maxSteps) {
      setStep(step + 1);
    }
  };

  // Dynamically select the displayed preview image based on customization step
  const getCurrentImage = () => {
    if (isAzulejo) {
      if (step >= 2 && upgradedToCesta === true) {
        return "https://i.ibb.co/FL4TYkYN/Cestas-Caneca-Azulejo.webp";
      }
    } else if (isMug) {
      if (step >= 2 && selectedPackaging !== 'nenhuma') {
        const pkg = PACKAGING_OPTIONS.find(opt => opt.id === selectedPackaging);
        if (pkg?.image) return pkg.image;
      }
    }
    return product.images[activeImageIndex] || product.images[0];
  };

  const currentImage = getCurrentImage();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-40"
        />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ y: 50, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-4xl bg-netflix-card border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl z-50 text-white overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col font-sans"
        >
          {/* Top colored accent ribbon */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-wine-red to-red-600" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg outline-none"
            aria-label="Save and dismiss"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Combined Scrollable details view */}
          <div ref={scrollContainerRef} className="overflow-y-auto flex-1 no-scrollbar md:grid md:grid-cols-12">
            
            {/* Left Column: Visual Media Display (5 cols) */}
            {step === 1 && (
              <div className="md:col-span-5 bg-black/20 flex flex-col p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/15">
                {/* Main Preview Container */}
                <div className="aspect-square relative rounded-xl overflow-hidden shadow-inner bg-zinc-900 border border-white/5 select-none mb-3">
                  <img
                    src={currentImage}
                    alt={product.title}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating tags */}
                  {product.badge && (
                    <span className="absolute bottom-3 left-3 bg-wine-red text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Slider Thumbnails Row - Only visible in step 1 */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 p-1 overflow-x-auto no-scrollbar">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition cursor-pointer ${
                          activeImageIndex === idx ? 'border-wine-red scale-102' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img src={img} alt={`${product.title} de lado`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Right Column: Title and Ordering Customizer or Packaging Choice (7 cols) */}
            <div className={`${step === 1 ? 'md:col-span-7' : 'md:col-span-12 mx-auto max-w-2xl w-full'} p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto`}>
              
              {showPackaging && step === 2 ? (
                /* STEP 2: Packaging Selection Form */
                <div>
                  <span className="text-xs sm:text-sm text-[#FF2D55] font-mono font-bold uppercase tracking-widest block mb-1">
                    Passo 2 de {maxSteps} • Embalagem Especial
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-2">
                    Escolha a Embalagem
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans mb-6">
                    A caneca é maravilhosa, mas o unboxing faz toda a diferença! Escolha uma de nossas caixas personalizadas sob medida para eternizar esse presente:
                  </p>

                  <div className="space-y-4 font-sans">
                    {/* Subtle animated indicator to scroll down to view all option details */}
                    <div className="flex items-center justify-between gap-3 bg-indigo-500/15 border-2 border-indigo-500/30 text-indigo-200 rounded-2xl py-3.5 px-4 mb-4 shadow-lg animate-pulse select-none">
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex h-3 w-3 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-bold tracking-wide text-zinc-100">
                          Há {PACKAGING_OPTIONS.length} opções incríveis de embalagem! <strong>Desça a página para ver todas</strong>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <ChevronDown className="w-5 h-5 text-indigo-400 animate-bounce" />
                      </div>
                    </div>

                    {/* Premium Packaging Options shown with MUCH LARGER PHOTOS in responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {PACKAGING_OPTIONS.filter(opt => opt.id !== 'nenhuma').map((opt) => {
                        const isSelected = selectedPackaging === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setSelectedPackaging(opt.id);
                              setHasSelectedPackaging(true);
                            }}
                            className={`group w-full flex flex-col rounded-2xl border text-left cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.01] shadow-md hover:shadow-xl outline-none select-none ${
                              isSelected
                                ? 'bg-[#FF2D55]/5 border-[#FF2D55] ring-2 ring-[#FF2D55]/20 text-white'
                                : 'bg-zinc-900/50 border-white/5 hover:border-white/15 text-zinc-300'
                            }`}
                          >
                            {/* Large Image Aspect Ratio 4:3 */}
                            <div className="relative w-full aspect-[4/3] bg-zinc-950/60 overflow-hidden border-b border-white/5 shrink-0">
                              <img 
                                src={opt.image} 
                                alt={opt.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                referrerPolicy="no-referrer" 
                              />
                              
                              {/* Selection overlay */}
                              {isSelected && (
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                                  <div className="bg-[#FF2D55] p-2 rounded-full shadow-2xl scale-110">
                                    <Check className="w-5 h-5 text-white stroke-[3.5px]" />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Text labels */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <span className={`text-sm sm:text-base font-extrabold leading-snug tracking-tight block transition-colors ${isSelected ? 'text-[#FF2D55]' : 'text-zinc-100 group-hover:text-white'}`}>
                                  {opt.name}
                                </span>
                                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed font-normal">
                                  {opt.description}
                                </p>
                              </div>
                              
                              {/* Adicional text confirmation at the bottom */}
                              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] sm:text-xs font-mono text-zinc-400 tracking-wider uppercase font-bold">
                                  Adicional
                                </span>
                                <span className={`text-xs sm:text-sm font-bold font-mono ${isSelected ? 'text-[#FF2D55]' : 'text-zinc-200'}`}>
                                  R$ {Number(opt.price).toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Non-package Option shown last as requested, as a clean minimalist banner */}
                    <div className="pt-2">
                      <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2 text-center sm:text-left">
                        Outras opções:
                      </div>
                      {PACKAGING_OPTIONS.filter(opt => opt.id === 'nenhuma').map((opt) => {
                        const isSelected = selectedPackaging === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setSelectedPackaging(opt.id);
                              setHasSelectedPackaging(true);
                            }}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 outline-none select-none ${
                              isSelected
                                ? 'bg-zinc-800/80 border-[#FF2D55] text-white shadow-md'
                                : 'bg-zinc-950/40 border-white/5 hover:border-white/10 text-zinc-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center border border-white/10">
                                <span className="text-zinc-400 font-mono text-xs leading-none font-bold">✕</span>
                              </div>
                              <div>
                                <span className={`text-sm sm:text-base font-extrabold tracking-tight block ${isSelected ? 'text-[#FF2D55]' : 'text-zinc-200'}`}>
                                  {opt.name}
                                </span>
                                <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mt-1">
                                  {opt.description}
                                </p>
                              </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                              <span className="text-xs font-mono text-zinc-350 font-bold bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg">
                                Sem custo
                              </span>
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-[#FF2D55] flex items-center justify-center shrink-0">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (isAzulejo && step === 2) ? (
                /* STEP 2: Upsell Offer Screen for Azulejos */
                <div className="font-sans">
                  <span className="text-xs text-[#FF2D55] font-mono font-bold uppercase tracking-widest block mb-1 animate-pulse">
                    Oferta de Dia dos Namorados • Passo 2 de 3
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white mb-2">
                    Eternize seu amor com um combo completo! 💝
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                    Por uma diferença especial, você pode levar a nossa inigualável <strong className="text-[#FF2D55]">Cesta Carinho</strong>. Ela acompanha este seu <strong className="text-white">Azulejo Personalizado</strong> junto com uma <strong className="text-white">Caneca Especial Romântica</strong> com foto, um lindo <strong className="text-white">Coração de Pelúcia Grande</strong> e deliciosos <strong className="text-white">Chocolates KitKat</strong>!
                  </p>

                  {/* Gorgeous visual premium box card for Cesta Carinho */}
                  <div className="bg-gradient-to-br from-[#FF2D55]/15 via-zinc-950/90 to-black border-2 border-[#FF2D55]/40 rounded-2xl p-4 sm:p-5 md:grid md:grid-cols-12 gap-5 items-center mb-6 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#FF2D55] text-white text-[9px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-lg">
                      COMBO SUCESSO
                    </div>
                    
                    <div className="md:col-span-5 aspect-square rounded-xl overflow-hidden border border-white/10 shadow-md mb-3 md:mb-0">
                      <img 
                        src="https://i.ibb.co/FL4TYkYN/Cestas-Caneca-Azulejo.webp" 
                        alt="Cesta Carinho" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="md:col-span-7 space-y-2 mt-2 md:mt-0">
                      <h3 className="text-lg font-black font-display text-white tracking-tight flex items-center gap-1.5">
                        <span>Cesta Carinho 💝</span>
                        <span className="text-xs font-mono font-bold text-[#FF2D55] bg-[#FF2D55]/10 border border-[#FF2D55]/20 px-2.5 py-0.5 rounded-full">R$ 149,90</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                        A escolha número um dos casais apaixonados neste ano para fazer um momento único de emoção e lágrimas de alegria!
                      </p>
                      
                      {/* Features lists with elegant hearts */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 pt-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-bold">
                          <span className="text-[#FF2D55] shrink-0">♥</span>
                          <span className="truncate">Caneca Personalizada (Passo 1)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-bold">
                          <span className="text-[#FF2D55] shrink-0">♥</span>
                          <span className="truncate">Azulejo com Foto legítimo</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-bold">
                          <span className="text-[#FF2D55] shrink-0">♥</span>
                          <span className="truncate">Coração grande de pelúcia</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-bold">
                          <span className="text-[#FF2D55] shrink-0">♥</span>
                          <span className="truncate">Chocolates KitKat inclusos</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-bold">
                          <span className="text-[#FF2D55] shrink-0">♥</span>
                          <span className="truncate">Caixa vazada de madeira</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-bold">
                          <span className="text-[#FF2D55] shrink-0">♥</span>
                          <span className="truncate">Laço de cetim romântico</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick toggle choice cards */}
                  <div className="space-y-3">
                    {/* Option YES */}
                    <button
                      type="button"
                      onClick={() => {
                        setUpgradedToCesta(true);
                        setHasSelectedPackaging(true);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left cursor-pointer transition-all duration-300 select-none outline-none ${
                        upgradedToCesta === true
                          ? 'bg-[#FF2D55]/10 border-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.2)]'
                          : 'bg-zinc-950/40 border-white/5 hover:border-white/10 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          upgradedToCesta === true ? 'bg-[#FF2D55] text-white border-[#FF2D55]' : 'bg-zinc-800/80 text-zinc-400 border-white/10'
                        }`}>
                          {upgradedToCesta === true ? <Check className="w-4 h-4 stroke-[3.5px]" /> : <span className="text-[10px] font-bold">A</span>}
                        </div>
                        <div>
                          <span className={`text-sm sm:text-base font-black tracking-tight block ${upgradedToCesta === true ? 'text-[#FF2D55]' : 'text-zinc-100'}`}>
                            SIM! QUERO LEVAR A CESTA COMPLETA 💝
                          </span>
                          <p className="text-xs sm:text-sm text-zinc-300 font-normal mt-1 leading-relaxed">
                            Quero surpreender ainda mais com o combo presente luxuoso (Copo, Pelúcia, Chocolates, etc).
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`text-xs sm:text-sm font-bold font-mono ${upgradedToCesta === true ? 'text-[#FF2D55]' : 'text-zinc-200'}`}>
                          R$ 149,90
                        </span>
                      </div>
                    </button>

                    {/* Option NO */}
                    <button
                      type="button"
                      onClick={() => {
                        setUpgradedToCesta(false);
                        setHasSelectedPackaging(true);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left cursor-pointer transition-all duration-300 select-none outline-none ${
                        upgradedToCesta === false
                          ? 'bg-zinc-800/80 border-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.15)]'
                          : 'bg-zinc-950/40 border-white/5 hover:border-white/10 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          upgradedToCesta === false ? 'bg-[#FF2D55] text-white border-[#FF2D55]' : 'bg-zinc-800/80 text-zinc-400 border-white/10'
                        }`}>
                          {upgradedToCesta === false ? <Check className="w-4 h-4 stroke-[3.5px]" /> : <span className="text-[10px] font-bold">B</span>}
                        </div>
                        <div>
                          <span className={`text-sm sm:text-base font-black tracking-tight block ${upgradedToCesta === false ? 'text-[#FF2D55]' : 'text-zinc-100'}`}>
                            NÃO, OBRIGADO. QUERO SÓ O AZULEJO 🖼️
                          </span>
                          <p className="text-xs sm:text-sm text-zinc-300 font-normal mt-1 leading-relaxed">
                            Prefiro continuar apenas com o Azulejo Personalizado de cerâmica pura.
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`text-xs sm:text-sm font-bold font-mono ${upgradedToCesta === false ? 'text-[#FF2D55]' : 'text-zinc-200'}`}>
                          R$ {Number(product.price).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (step === maxSteps) ? (
                /* STEP 3 (or 2 if no packaging/upsell): Delivery/Pickup Form */
                <div>
                  <span className="text-xs sm:text-sm text-[#FF2D55] font-mono font-bold uppercase tracking-widest block mb-1">
                    Passo {step} de {maxSteps} • Entrega & Retirada
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-2">
                    Como Deseja Receber?
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans mb-6">
                    Selecione se prefere a entrega em Guaíba ou se prefere retirar o seu pedido gratuitamente conosco.
                  </p>

                  <div className="space-y-4 font-sans">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryType('delivery');
                        setIsNeighborhoodOpen(true);
                        setSelectedNeighborhood('');
                        setTimeout(() => {
                          const el = document.getElementById('neighborhood-selector-anchor');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                          const selectEl = document.getElementById('neighborhood-select-dropdown') as HTMLSelectElement | null;
                          if (selectEl) {
                            selectEl.focus();
                            if (typeof selectEl.showPicker === 'function') {
                              try {
                                selectEl.showPicker();
                              } catch (pickerErr) {
                                console.warn('showPicker error:', pickerErr);
                              }
                            }
                          }
                        }, 150);
                      }}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 outline-none select-none hover:scale-[1.01] active:scale-[0.99] ${
                        deliveryType === 'delivery'
                          ? 'bg-[#FF2D55]/10 border-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.15)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/60 text-zinc-300'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg shrink-0 ${deliveryType === 'delivery' ? 'bg-[#FF2D55]/15 text-[#FF2D55]' : 'bg-zinc-800 text-zinc-400'}`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-base font-extrabold tracking-tight ${deliveryType === 'delivery' ? 'text-[#FF2D55]' : 'text-zinc-100'}`}>
                            Entrega (Guaíba)
                          </span>
                          {deliveryType === 'delivery' ? (
                            <span className="w-5 h-5 rounded-full bg-[#FF2D55] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(255,45,85,0.4)]">
                              <Check className="w-3 h-3 text-white stroke-[3.5px]" />
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-full border-2 border-zinc-650 flex items-center justify-center shrink-0 hover:border-zinc-400 transition-colors" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed font-normal">
                          Entregamos com cuidado diretamente no seu endereço em Guaíba.
                        </p>
                      </div>
                    </button>

                    {/* OPTION 2: Pickup in Jardim dos Lagos */}
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryType('pickup');
                        setSelectedNeighborhood('');
                        setIsNeighborhoodOpen(false);
                        setTimeout(() => {
                          if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({
                              top: scrollContainerRef.current.scrollHeight,
                              behavior: 'smooth'
                            });
                          }
                        }, 120);
                      }}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 outline-none select-none hover:scale-[1.01] active:scale-[0.99] ${
                        deliveryType === 'pickup'
                          ? 'bg-[#FF2D55]/10 border-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.15)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/60 text-zinc-300'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg shrink-0 ${deliveryType === 'pickup' ? 'bg-[#FF2D55]/15 text-[#FF2D55]' : 'bg-zinc-800 text-zinc-400'}`}>
                        <Store className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-base font-extrabold tracking-tight ${deliveryType === 'pickup' ? 'text-[#FF2D55]' : 'text-zinc-100'}`}>
                              Retirada no Jardim dos Lagos
                            </span>
                            <span className="text-[10px] font-mono font-bold text-green-400 bg-green-950/40 border border-green-500/20 px-1.5 py-0.5 rounded">
                              Grátis
                            </span>
                          </div>
                          {deliveryType === 'pickup' ? (
                            <span className="w-5 h-5 rounded-full bg-[#FF2D55] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(255,45,85,0.4)]">
                              <Check className="w-3 h-3 text-white stroke-[3.5px]" />
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-full border-2 border-zinc-650 flex items-center justify-center shrink-0 hover:border-zinc-400 transition-colors" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed font-normal">
                          Combinaremos o horário pelo WhatsApp
                        </p>
                      </div>
                    </button>

                    {/* Conditional Fields based on Delivery Type */}
                    <AnimatePresence mode="wait">
                      {deliveryType === 'delivery' && (
                        <motion.div
                          id="neighborhood-selector-anchor"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 space-y-4 mt-2 scroll-mt-6"
                        >
                          <div id="neighborhood-selector-container">
                            <label className="block text-sm font-black text-white uppercase tracking-widest mb-3 flex items-center gap-1.5">
                              <MapPin className="w-5 h-5 text-[#FF2D55]" />
                              <span>SELECIONE SEU BAIRRO EM GUAÍBA:</span>
                            </label>

                            {/* If a neighborhood is selected, show a beautiful summary pill with an option to change */}
                            {selectedNeighborhood && !isNeighborhoodOpen ? (
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-white shadow-md select-none">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                    <Check className="w-4.5 h-4.5 text-white stroke-[3px]" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-zinc-400 uppercase font-black tracking-wider leading-none">Bairro Selecionado</p>
                                    <p className="text-base font-black tracking-tight text-green-400 mt-1">
                                      {selectedNeighborhood} — Taxa: R$ {selectedNeighborhood === 'São Jorge' ? '12,00' : '8,00'}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setIsNeighborhoodOpen(true)}
                                  className="shrink-0 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-white font-extrabold px-4 py-2.5 rounded-lg text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition duration-200 outline-none select-none"
                                >
                                  Mudar Bairro 🔄
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-xs sm:text-sm text-zinc-300 font-semibold leading-relaxed">
                                  Selecione o seu bairro de entrega na lista abaixo:
                                </p>
                                
                                <select
                                  id="neighborhood-select-dropdown"
                                  value={selectedNeighborhood}
                                  onChange={(e) => {
                                    setSelectedNeighborhood(e.target.value);
                                    setIsNeighborhoodOpen(false);
                                    // Scroll to summary at bottom of modal
                                    setTimeout(() => {
                                      if (scrollContainerRef.current) {
                                        scrollContainerRef.current.scrollTo({
                                          top: scrollContainerRef.current.scrollHeight,
                                          behavior: 'smooth'
                                        });
                                      }
                                    }, 120);
                                  }}
                                  className="w-full bg-[#141414] border border-white/10 hover:border-white/20 focus:border-[#FF2D55] text-white font-black rounded-xl px-4 py-3.5 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#FF2D55] cursor-pointer transition duration-300 font-sans"
                                >
                                  <option value="" disabled className="bg-zinc-950 text-zinc-400 font-bold">
                                    Clique aqui para escolher seu bairro...
                                  </option>
                                  {NEIGHBORHOODS_GUAIBA.map((bairro) => (
                                    <option key={bairro} value={bairro} className="bg-zinc-950 text-white font-bold">
                                      {bairro} — R$ {bairro === 'São Jorge' ? '12,00' : '8,00'}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pre-purchase Review Summary */}
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-4 mt-4 select-none">
                      <h4 className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                        Resumo do Seu Pedido
                      </h4>
                      <div className="space-y-2.5 text-sm">
                        {selectedPkg?.isCesta ? (
                          <>
                            <div className="flex justify-between text-white font-extrabold font-sans">
                              <span>💝 {selectedPkg.name}</span>
                              <span className="font-mono font-black text-[#FF2D55]">R$ {Number(selectedPkg.fullCestaPrice).toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 text-xs pl-4 font-sans">
                              <span>☕ Inclui {product.title}</span>
                              <span className="italic font-bold text-green-400 bg-green-950/40 border border-green-500/25 px-1.5 py-0.5 rounded text-[10px]">INCLUSO</span>
                            </div>
                          </>
                        ) : isAzulejo && upgradedToCesta === true ? (
                          <>
                            <div className="flex justify-between text-white font-extrabold font-sans">
                              <span>💝 Combo Cesta Carinho</span>
                              <span className="font-mono font-black text-[#FF2D55]">R$ 149,90</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 text-xs pl-4 font-sans">
                              <span>🖼️ Inclui Azulejo Personalizado de Cerâmica</span>
                              <span className="italic font-bold text-green-400 bg-green-950/40 border border-green-500/25 px-1.5 py-0.5 rounded text-[10px]">INCLUSO</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between text-zinc-200 font-extrabold font-sans">
                              <span>{product.title}</span>
                              <span className="font-mono font-semibold">R$ {Number(product.price).toFixed(2).replace('.', ',')}</span>
                            </div>
                            {showPackaging && selectedPackaging !== 'nenhuma' && (
                              <div className="flex justify-between text-zinc-200">
                                <span className="text-zinc-350 italic">🎁 {selectedPkg?.name}</span>
                                <span className="font-mono font-semibold text-[#FF2D55]">+ R$ {Number(selectedPkg?.price).toFixed(2).replace('.', ',')}</span>
                              </div>
                            )}
                          </>
                        )}
                        
                        <div className="flex justify-between text-zinc-200">
                          <span>
                            {deliveryType === 'pickup' ? (
                              <span className="text-zinc-300 italic">🏪 Retirada Jardim dos Lagos</span>
                            ) : (
                              <span className="text-zinc-200">🚗 Entrega ({selectedNeighborhood || 'Selecione o bairro'})</span>
                            )}
                          </span>
                          <span className="font-mono text-zinc-100">
                            {deliveryType === 'pickup' 
                              ? 'Grátis' 
                              : (selectedNeighborhood 
                                ? `+ R$ ${(selectedNeighborhood === 'São Jorge' ? 12 : 8).toFixed(2).replace('.', ',')}` 
                                : '—'
                              )
                            }
                          </span>
                        </div>

                        <div className="border-t border-white/15 pt-3.5 mt-2 flex justify-between text-base font-black">
                          <span className="text-white">Valor Total Estimado</span>
                          <span className="text-[#FF2D55] font-mono font-black text-lg">
                            R$ {getFinalPrices().finalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* STEP 1: Main Customization Form */
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs text-wine-red font-mono font-semibold uppercase tracking-widest block">
                      {product.subtitle || 'Dia dos Namorados'}
                    </span>
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 py-0.5 px-2 rounded-full font-mono uppercase tracking-wider font-bold">
                      Passo 1 de {maxSteps}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-3">
                    <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
                      {product.title}
                    </h2>
                    {product.price && (
                      <span className="text-xl sm:text-2xl font-bold text-[#FF2D55] bg-[#FF2D55]/10 border border-[#FF2D55]/20 px-3 py-1 rounded-xl font-mono">
                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm sm:text-base text-zinc-100 font-sans leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Collapsible details for Incluído nesta Experiência */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-6 bg-white/2 border border-white/5 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => setIsExperienceExpanded(!isExperienceExpanded)}
                        className="w-full flex items-center justify-between p-4 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors text-left outline-none cursor-pointer select-none"
                      >
                        <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
                          🎁 O que está incluído nesta experiência:
                        </span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${isExperienceExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isExperienceExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.23, ease: 'easeInOut' }}
                            className="overflow-hidden border-t border-white/5"
                          >
                            <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm font-sans">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-zinc-200">
                                  <Check className="w-4.5 h-4.5 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}



                  {/* Live Customizer Input Block */}
                  <div ref={personalizeRef} className="border-t border-white/10 pt-5 mt-5 scroll-mt-6">
                    <h3 className="text-base sm:text-lg font-display font-black text-white tracking-wide uppercase mb-4 flex items-center gap-2">
                      <span className="w-2 h-6 bg-[#FF2D55] rounded-full animate-pulse" />
                      Personalize Seu Presente
                    </h3>
                    
                    <div className="space-y-4 text-xs font-sans">
                      {/* Couple Names Input */}
                      {product.hasNames !== false && product.id !== 'cesta-love' && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FF2D55]/15 via-red-950/20 to-black/30 border-2 border-[#FF2D55] shadow-[0_0_15px_rgba(255,45,85,0.25)] relative overflow-hidden">
                          <label className="block text-sm font-black text-white uppercase tracking-wider mb-2 flex flex-wrap items-center gap-1.5">
                            <span className="flex items-center gap-1 text-[#FF2D55]">
                              <Heart className="w-4.5 h-4.5 fill-[#FF2D55] animate-bounce" />
                              <span>ESCREVA OS NOMES DO CASAL AQUI:</span>
                            </span>
                          </label>
                          <p className="text-xs sm:text-sm text-zinc-200 mb-3 leading-relaxed font-semibold">
                            Por favor, digite os dois nomes abaixo para gravarmos no seu presente personalizado!
                          </p>
                          <input
                            type="text"
                            value={coupleNames}
                            onChange={(e) => setCoupleNames(e.target.value)}
                            placeholder="Ex: Carlos & Mariana"
                            className="w-full bg-black/55 border border-white/20 focus:border-[#FF2D55] focus:ring-2 focus:ring-[#FF2D55]/30 rounded-xl px-4 py-3 text-base text-white placeholder-zinc-500 font-bold transition duration-300 outline-none"
                            id="names-custom-input"
                          />
                          <p className="text-[11px] text-zinc-300 mt-2 font-medium flex items-center gap-1">
                            🔒 Pode ser alterado ou ajustado depois pelo WhatsApp se você precisar!
                          </p>
                        </div>
                      )}

                      {/* Custom Input statement for Cesta Love Stanley Cup WhatsApp customization */}
                      {product.id === 'cesta-love' && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900/40 to-black/30 border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden">
                          <label className="block text-sm font-black text-white uppercase tracking-wider mb-2 flex flex-wrap items-center gap-1.5">
                            <span className="flex items-center gap-1 text-amber-400">
                              <Heart className="w-4.5 h-4.5 text-amber-400 animate-bounce" />
                              <span>Personalização do Copo Stanley:</span>
                            </span>
                          </label>
                          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-extrabold">
                            A personalização do seu Copo Estilo Stanley (gravação a laser de alta precisão de nomes, logos ou datas) será combinada de forma totalmente direta no WhatsApp de forma simples após fechar o pedido!
                          </p>
                        </div>
                      )}

                      {/* Conditional Spotify Song Integration */}
                      {product.hasMusicSpotify && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-green-500/10 via-zinc-900/40 to-black/30 border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)] relative overflow-hidden">
                          <label className="block text-sm font-black text-white uppercase tracking-wider mb-2 flex flex-wrap items-center gap-1.5">
                            <span className="flex items-center gap-1 text-green-400">
                              <Music className="w-4.5 h-4.5 fill-green-400/20 animate-pulse" />
                              <span>SUA MÚSICA MARCANTE & CANTOR:</span>
                            </span>
                          </label>
                          <p className="text-xs sm:text-sm text-zinc-200 mb-3 leading-relaxed font-semibold">
                            Digite o nome da música e do cantor para colocarmos o código do Spotify no presente!
                          </p>
                          <input
                            type="text"
                            value={spotifySong}
                            onChange={(e) => setSpotifySong(e.target.value)}
                            placeholder="Ex: Perfect - Ed Sheeran"
                            className="w-full bg-black/55 border border-white/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 rounded-xl px-4 py-3 text-base text-white placeholder-zinc-500 font-bold transition duration-300 outline-none"
                            id="spotify-custom-input"
                          />
                          <p className="text-[11px] text-zinc-300 mt-2 font-medium flex items-center gap-1">
                            🎵 Geramos o código de leitura exato e testamos no player antes de produzir.
                          </p>
                        </div>
                      )}

                      {/* Conditional Love Anniversary Date Selection */}
                      {product.hasCustomDate && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-zinc-900/40 to-black/30 border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] relative overflow-hidden">
                          <label className="block text-sm font-black text-white uppercase tracking-wider mb-2 flex flex-wrap items-center gap-1.5">
                            <span className="flex items-center gap-1 text-indigo-400">
                              <Calendar className="w-4.5 h-4.5 text-indigo-400 animate-bounce" />
                              <span>SUA DATA ESPECIAL (DO CASAL):</span>
                            </span>
                          </label>
                          <p className="text-xs sm:text-sm text-zinc-200 mb-3 leading-relaxed font-semibold">
                            Escreva a data especial que registrará a linha do tempo ou calendário do seu amor!
                          </p>
                          <input
                            type="text"
                            value={specialDate}
                            onChange={(e) => setSpecialDate(e.target.value)}
                            placeholder="Ex: 12 de Junho de 2021"
                            className="w-full bg-black/55 border border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 rounded-xl px-4 py-3 text-base text-white placeholder-zinc-500 font-bold transition duration-300 outline-none"
                            id="date-custom-input"
                          />
                          <p className="text-[11px] text-zinc-300 mt-2 font-medium flex items-center gap-1">
                            📅 Nossa equipe monta o calendário original daquele mês correspondente de forma magnífica.
                          </p>
                        </div>
                      )}

                      {/* Photo Upload Info Box */}
                      {product.hasPhotoUpload !== false && (
                        <div className="bg-[#FF2D55]/10 border border-[#FF2D55]/20 rounded-2xl p-4 flex gap-3 mt-4 items-start shadow-sm">
                          <div className="w-10 h-10 rounded-full bg-[#FF2D55]/20 flex items-center justify-center shrink-0 text-xl border border-[#FF2D55]/30 animate-pulse">
                            📸
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-100 leading-normal">
                              A foto para personalizar este presente será enviada diretamente pelo WhatsApp de forma super prática após finalizar seu pedido no botão abaixo!
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">
                              💡 Sem estresse de uploads lentos. Nosso designer a retocará gratuitamente.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Footer (Changes based on customizer steps) */}
              <div className="mt-8 pt-4 border-t border-white/10">
                {step === maxSteps ? (
                  /* Action buttons for delivery/final confirmation page */
                  <div className="flex flex-col gap-3.5 w-full">
                    <motion.button
                      onClick={handleOrderSubmission}
                      disabled={isDeliveryIncomplete}
                      animate={!isDeliveryIncomplete ? { scale: [1, 1.01, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className={`w-full font-black py-5 rounded-2xl shadow-xl transition-all flex flex-col items-center justify-center gap-1.5 select-none focus:outline-none cursor-pointer ${
                        isDeliveryIncomplete 
                          ? 'bg-zinc-800/80 border border-white/10 text-zinc-500 cursor-not-allowed' 
                          : 'bg-whatsapp-green hover:bg-whatsapp-green-hover text-white active:scale-98 border border-white/20 green-glow'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-base sm:text-xl font-display font-black">
                        <svg 
                          viewBox="0 0 448 512" 
                          className={`w-5.5 h-5.5 fill-current shrink-0 ${isDeliveryIncomplete ? 'text-zinc-500' : 'text-white'}`}
                        >
                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 512l141.6-37.2c32.7 18 69.4 27.5 107.1 27.5 122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-65-157.1zM223.9 474c-33.1 0-65.7-8.9-94.1-25.7l-6.7-4-83.9 22 22.4-81.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                        </svg>
                        <span>{deliveryType === null ? 'ESCOLHA COMO RECEBER ACIMA' : (isDeliveryIncomplete ? 'SELECIONE O SEU BAIRRO' : 'GARANTIR MINHA ENCOMENDA ➔')}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-white/90 font-semibold font-sans text-center">
                        {deliveryType === null 
                          ? '👆 Escolha se prefere receber em Guaíba ou fazer retirada grátis' 
                          : (isDeliveryIncomplete 
                            ? '👆 Escolha o seu bairro para calcularmos o valor exato' 
                            : '👉 Clique para fechar seu pedido com o designer e enviar suas fotos!')}
                      </span>
                    </motion.button>

                    <button
                      onClick={handleGoBack}
                      className="w-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-zinc-300 hover:text-white font-extrabold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer select-none focus:outline-none text-xs sm:text-sm uppercase tracking-wider"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar e Ajustar Presente
                    </button>
                  </div>
                ) : (isAzulejo && step === 2) ? (
                  /* Action buttons for Azulejo combo offer page */
                  <div className="flex flex-col gap-3.5 w-full">
                    <motion.button
                      onClick={handleGoNext}
                      animate={{ scale: [1, 1.01, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="w-full bg-gradient-to-r from-[#FF2D55] to-[#E02447] hover:brightness-110 text-white font-black py-5 rounded-2xl shadow-[0_4px_20px_rgba(255,45,85,0.45)] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none focus:outline-none text-base sm:text-lg tracking-wide uppercase border border-white/20"
                    >
                      <div className="flex items-center gap-2 font-display font-black">
                        <span>DEFINIR LOCAL DE ENTREGA ➔</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/95 font-semibold">
                        👉 Toque para preencher se deseja receber ou retirar em Guaíba no próximo passo
                      </span>
                    </motion.button>

                    <button
                      onClick={handleGoBack}
                      className="w-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-zinc-300 hover:text-white font-extrabold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer select-none focus:outline-none text-xs sm:text-sm uppercase tracking-wider"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar e Ajustar Arte (Nomes e Ícones)
                    </button>
                  </div>
                ) : (showPackaging && step === 2) ? (
                  /* Action buttons for packaging page */
                  <div className="flex flex-col gap-3.5 w-full">
                    <motion.button
                      onClick={handleGoNext}
                      animate={{ scale: [1, 1.01, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="w-full bg-gradient-to-r from-[#FF2D55] to-[#E02447] hover:brightness-110 text-white font-black py-5 rounded-2xl shadow-[0_4px_20px_rgba(255,45,85,0.45)] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none focus:outline-none text-base sm:text-lg tracking-wide uppercase border border-white/20"
                    >
                      <div className="flex items-center gap-2 font-display font-black">
                        <span>DEFINIR LOCAL DE ENTREGA ➔</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/95 font-semibold">
                        👉 Toque para preencher se deseja receber ou retirar em Guaíba no próximo passo
                      </span>
                    </motion.button>

                    <button
                      onClick={handleGoBack}
                      className="w-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-zinc-300 hover:text-white font-extrabold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer select-none focus:outline-none text-xs sm:text-sm uppercase tracking-wider"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar e Ajustar Arte (Nomes e Ícones)
                    </button>
                  </div>
                ) : (
                  /* Action buttons for first step or default views */
                  <div className="flex flex-col gap-3">
                    <motion.button
                      onClick={handleGoNext}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="w-full bg-gradient-to-r from-[#FF2D55] to-[#E02447] hover:brightness-110 text-white font-black py-5 rounded-2xl shadow-[0_4px_20px_rgba(255,45,85,0.45)] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none focus:outline-none text-base sm:text-lg tracking-wide border border-white/20"
                    >
                      <div className="flex items-center gap-2 font-display font-black">
                        <span>PROSSEGUIR COM MEU PRESENTE ➔</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/90 font-semibold text-center">
                        {showPackaging 
                          ? '👉 Próximo passo: escolher a Caixa Embalagem de Presente' 
                          : '👉 Próximo passo: evoluir este presente para uma linda Cesta de Café'}
                      </span>
                    </motion.button>
                    <span className="text-sm text-zinc-300 text-center block leading-relaxed font-semibold">
                      {showPackaging 
                        ? "Clique no botão acima para escolher a embalagem ideal do Dia dos Namorados no próximo passo."
                        : "Clique no botão acima para presentear seu amor de forma completa com um super combo."}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 2 Floating Continue Button */}
          <AnimatePresence>
            {showPackaging && step === 2 && hasSelectedPackaging && !isNearBottom && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
                animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                exit={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="absolute bottom-5 left-1/2 z-40 w-[calc(100%-2.5rem)] max-w-md px-1"
              >
                <button
                  onClick={handleGoNext}
                  className="w-full bg-gradient-to-r from-[#FF2D55] to-[#E02447] hover:brightness-110 active:scale-[0.99] text-white font-black py-4.5 rounded-2xl shadow-[0_12px_30px_rgba(255,45,85,0.45)] border border-white/25 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all uppercase tracking-wide"
                >
                  <div className="flex items-center gap-2 font-display font-black text-sm sm:text-base">
                    <span>AVANÇAR PARA A ENTREGA</span>
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/90 font-medium font-sans normal-case">
                    👉 Clique para preencher o local de entrega ou retirada
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 1 Floating 'Quero este' Button */}
          <AnimatePresence>
            {step === 1 && !isNearBottom && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
                animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                exit={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="absolute bottom-6 left-1/2 z-40 w-auto px-1"
              >
                <button
                  type="button"
                  onClick={() => {
                    personalizeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="bg-gradient-to-r from-[#FF2D55] to-[#E02447] hover:brightness-110 active:scale-[0.99] text-white font-black py-3.5 px-8 rounded-full shadow-[0_12px_25px_rgba(255,45,85,0.45)] border border-white/25 flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider text-sm font-sans"
                >
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                  <span>Quero este</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
        </div>
      </AnimatePresence>
  );
};
