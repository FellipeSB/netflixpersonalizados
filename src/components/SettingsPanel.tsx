import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  X, 
  Check, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit2, 
  Sparkles, 
  Sliders, 
  List, 
  Package,
  BadgeAlert,
  Gift,
  Download,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, Product, PackagingOption } from '../types';
import { getPackagingOptions, DEFAULT_PACKAGING_OPTIONS } from '../data';
import { exportCatalogToExcel, importCatalogFromExcel } from '../utils/excelHandler';

interface SettingsPanelProps {
  sections: Section[];
  onSettingsChange: (phone: string, storeName: string, updatedSections?: Section[]) => void;
}

type TabType = 'general' | 'sections' | 'products' | 'packaging';

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ sections, onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [isSaved, setIsSaved] = useState(false);

  // Admin lock / access state (Hidden by default to protect shop details)
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const isParamAdmin = urlParams.get('admin') === 'true' || 
                           urlParams.get('painel') === '1' || 
                           urlParams.get('loja') === 'admin' ||
                           urlParams.get('panel') === 'true';
      if (isParamAdmin) {
        localStorage.setItem('catalog_admin_unlocked', 'true');
        return true;
      }
      return localStorage.getItem('catalog_admin_unlocked') === 'true';
    } catch (e) {
      return false;
    }
  });

  // General Settings State
  const [phone, setPhone] = useState(() => {
    return localStorage.getItem('catalog_whatsapp_phone') || '5551997098567';
  });
  const [storeName, setStoreName] = useState(() => {
    return localStorage.getItem('catalog_store_name') || 'Time Imprint';
  });

  // Packaging Options State
  const [packagingList, setPackagingList] = useState<PackagingOption[]>([]);

  // Category Configuration State
  const [sectList, setSectList] = useState<Section[]>([]);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectTitle, setSectTitle] = useState('');
  const [sectSubtitle, setSectSubtitle] = useState('');

  // Product Editor State
  const [selectedProductId, setSelectedProductId] = useState<string>('new');
  const [prodTitle, setProdTitle] = useState('');
  const [prodSectionId, setProdSectionId] = useState('');
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodTagline, setProdTagline] = useState('');
  const [prodPrice, setProdPrice] = useState('49.90');
  const [prodBadge, setProdBadge] = useState('');
  const [prodImages, setProdImages] = useState('');
  const [prodFeatures, setProdFeatures] = useState('');
  const [prodDescription, setProdDescription] = useState('');

  // Custom Field Toggles
  const [prodHasNames, setProdHasNames] = useState(true);
  const [prodHasPhoto, setProdHasPhoto] = useState(true);
  const [prodHasSpotify, setProdHasSpotify] = useState(false);
  const [prodHasDate, setProdHasDate] = useState(false);
  const [prodHasPackaging, setProdHasPackaging] = useState(true);
  const [prodHasMagicReveal, setProdHasMagicReveal] = useState(false);
  const [prodIsFeatured, setProdIsFeatured] = useState(false);

  // Non-blocking Inline Deletion & Reset Confirmation Hooks (Resolves Vercel framework modal freeze risks)
  const [panelError, setPanelError] = useState<string | null>(null);
  const [deleteSectionConfirmId, setDeleteSectionConfirmId] = useState<string | null>(null);
  const [deleteProductConfirmId, setDeleteProductConfirmId] = useState<string | null>(null);
  const [resetDefaultsConfirm, setResetDefaultsConfirm] = useState(false);

  const triggerError = (msg: string) => {
    setPanelError(msg);
    setTimeout(() => {
      setPanelError(null);
    }, 4500);
  };

  useEffect(() => {
    // Load general parameters
    const savedPhone = localStorage.getItem('catalog_whatsapp_phone');
    const savedStoreName = localStorage.getItem('catalog_store_name');
    if (savedPhone) setPhone(savedPhone);
    if (savedStoreName) setStoreName(savedStoreName);

    // Sync with sections
    setSectList(sections);
    if (sections.length > 0 && !prodSectionId) {
      setProdSectionId(sections[0].id);
    }

    // Load packagings
    setPackagingList(getPackagingOptions());

    // 🎹 Invisible trigger: listening to specific keyboard triggers ("admin", "tudum" or "loja") to toggle admin panel on
    let buffer = '';
    const handleKeyPress = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();
      if (buffer.length > 10) buffer = buffer.slice(-10);
      if (buffer.endsWith('admin') || buffer.endsWith('tudum') || buffer.endsWith('loja')) {
        setIsAdmin(true);
        localStorage.setItem('catalog_admin_unlocked', 'true');
        setIsOpen(true);
        buffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    // Also check and process URL parameters if they dynamically change
    const checkUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const isParamAdmin = urlParams.get('admin') === 'true' || 
                           urlParams.get('painel') === '1' || 
                           urlParams.get('loja') === 'admin' ||
                           urlParams.get('panel') === 'true';
      if (isParamAdmin) {
        setIsAdmin(true);
        localStorage.setItem('catalog_admin_unlocked', 'true');
      }
    };

    // Add custom double-tap/triple-click action target so they can unlock on mobile as well
    const handleLogoClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.id === 'store-brand-title' || target.id === 'profile-avatar-btn' || target.closest('#store-brand-title') || target.closest('#profile-avatar-btn'))) {
        const actualTarget = target.id === 'store-brand-title' || target.id === 'profile-avatar-btn' ? target : (target.closest('#store-brand-title') || target.closest('#profile-avatar-btn')) as HTMLElement;
        let count = parseInt(actualTarget.getAttribute('data-click-count') || '0') + 1;
        actualTarget.setAttribute('data-click-count', count.toString());
        if (count >= 5) {
          setIsAdmin(true);
          localStorage.setItem('catalog_admin_unlocked', 'true');
          setIsOpen(true);
          actualTarget.setAttribute('data-click-count', '0');
        }
        setTimeout(() => {
          actualTarget.setAttribute('data-click-count', '0');
        }, 3000);
      }
    };
    window.addEventListener('click', handleLogoClicks);

    checkUrl();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleLogoClicks);
    };
  }, [sections]);

  // Load product to edit
  const loadProductToEditor = (prodId: string) => {
    if (prodId === 'new') {
      resetProductForm();
      return;
    }

    // Find product inside sections
    let found: Product | null = null;
    for (const s of sectList) {
      const p = s.products.find(item => item.id === prodId);
      if (p) {
        found = p;
        break;
      }
    }

    if (found) {
      setProdTitle(found.title);
      setProdSectionId(found.sectionId);
      setProdSubtitle(found.subtitle || '');
      setProdTagline(found.tagline || '');
      setProdPrice(found.price ? String(found.price) : '49.90');
      setProdBadge(found.badge || '');
      setProdImages(found.images ? found.images.join('\n') : '');
      setProdFeatures(found.features ? found.features.join('\n') : '');
      setProdDescription(found.description || '');
      setProdHasNames(found.hasNames !== false);
      setProdHasPhoto(found.hasPhotoUpload !== false);
      setProdHasSpotify(!!found.hasMusicSpotify);
      setProdHasDate(!!found.hasCustomDate);
      setProdHasPackaging(found.hasPackaging !== false);
      setProdHasMagicReveal(!!found.hasMagicReveal);
      setProdIsFeatured(!!found.isFeatured);
    }
  };

  const resetProductForm = () => {
    setSelectedProductId('new');
    setProdTitle('');
    setProdSubtitle('');
    setProdTagline('');
    setProdPrice('49.90');
    setProdBadge('');
    setProdImages('');
    setProdFeatures('Cerâmica nacional classe AAA\nEstampa resistente de alto brilho\nPode ir ao micro-ondas\nAcompanha embalagem segura');
    setProdDescription('');
    setProdHasNames(true);
    setProdHasPhoto(true);
    setProdHasSpotify(false);
    setProdHasDate(false);
    setProdHasPackaging(true);
    setProdHasMagicReveal(false);
    setProdIsFeatured(false);
    setDeleteProductConfirmId(null);
    setDeleteSectionConfirmId(null);
    if (sectList.length > 0) {
      setProdSectionId(sectList[0].id);
    }
  };

  // Romance copywriter engine for high-converting Portuguese text
  const handleGenerateDescription = () => {
    if (!prodTitle) {
      alert('Por favor, defina o Nome do Produto primeiro!');
      return;
    }

    const categoryText = sectList.find(s => s.id === prodSectionId)?.title.replace(/[^\w\s-À-ÿ]/g, '').trim() || 'Presente';

    const templates = [
      `Diga "eu te amo" de uma forma inesquecível com o nosso exclusivo *${prodTitle}*. Perfeito para celebrar o aconchego no Dia dos Namorados, este presente une sofisticação, afeto e altíssima durabilidade. Produzido com os materiais mais nobres do mercado, ele traz uma estampa brilhante projetada para manter a foto e iniciais de vocês duas intactas por toda a vida.`,
      `Um presente com imensa carga romântica e valor sentimental genuíno. O modelo *${prodTitle}* foi especialmente desenhado para emocionar e surpreender quem completa você todos os dias. Seja com as datas marcantes de vocês ou com aquela trilha sonora inesquecível, ele serve como uma moldura constante de afeto e carinho que decora a rotina diária em grande estilo.`,
      `Toda linda história de amor merece um retrato brilhante de suas memórias mais sinceras. Com o *${prodTitle}*, você materializa um abraço caloroso em forma de recordação física impecável. Uma peça contemporânea desenvolvida de casal para casal, que exibe suas iniciais, rostos e momentos mágicos em altíssima definição térmica e acabamento perolado de tirar o fôlego.`
    ];

    const finalCopy = templates[Math.floor(Math.random() * templates.length)];
    setProdDescription(finalCopy);

    // Also auto-write tagline if empty
    if (!prodTagline) {
      const taglines = [
        "A fusão perfeita entre a emoção e o luxo cotidiano.",
        "A sua trilha de romantismo emoldurada para sempre.",
        "Porque o amor brilha de verdade nos mínimos detalhes.",
        "Um presente de aquecer o coração instantaneamente."
      ];
      setProdTagline(taglines[Math.floor(Math.random() * taglines.length)]);
    }
  };

  // Manage General settings submit
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('catalog_whatsapp_phone', phone);
    localStorage.setItem('catalog_store_name', storeName);
    onSettingsChange(phone, storeName, sectList);
    triggerSaved();
  };

  // Save or Edit Category/Section
  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectTitle.trim()) return;

    let updated: Section[];

    if (editingSectionId) {
      // Editing
      updated = sectList.map(s => {
        if (s.id === editingSectionId) {
          return { ...s, title: sectTitle, subtitle: sectSubtitle };
        }
        return s;
      });
      setEditingSectionId(null);
    } else {
      // New
      const newId = 'sect-' + Math.random().toString(36).substring(2, 9);
      updated = [
        ...sectList,
        {
          id: newId,
          title: sectTitle,
          subtitle: sectSubtitle,
          products: []
        }
      ];
    }

    setSectList(updated);
    localStorage.setItem('catalog_sections_db_v10', JSON.stringify(updated));
    onSettingsChange(phone, storeName, updated);
    setSectTitle('');
    setSectSubtitle('');
    triggerSaved();
  };

  const handleDeleteSection = (id: string) => {
    const section = sectList.find(s => s.id === id);
    if (section && section.products && section.products.length > 0) {
      triggerError(`Não é possível excluir a categoria "${section.title}" porque ela possui ${section.products.length} produto(s) cadastrado(s) nela!`);
      setDeleteSectionConfirmId(null);
      return;
    }

    if (deleteSectionConfirmId !== id) {
      setDeleteSectionConfirmId(id);
      return;
    }

    const updated = sectList.filter(s => s.id !== id);
    setSectList(updated);
    localStorage.setItem('catalog_sections_db_v10', JSON.stringify(updated));
    onSettingsChange(phone, storeName, updated);
    setDeleteSectionConfirmId(null);
    triggerSaved();
  };

  const handleEditSectionClick = (section: Section) => {
    setEditingSectionId(section.id);
    setSectTitle(section.title);
    setSectSubtitle(section.subtitle);
  };

  const handleDownloadExcelTemplate = () => {
    try {
      exportCatalogToExcel(sectList, storeName);
    } catch (e: any) {
      triggerError('Erro ao exportar planilha modelo.');
    }
  };

  const handleExcelImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importCatalogFromExcel(file, sectList)
      .then(updatedSections => {
        setSectList(updatedSections);
        localStorage.setItem('catalog_sections_db_v10', JSON.stringify(updatedSections));
        onSettingsChange(phone, storeName, updatedSections);
        triggerSaved();
        
        // Let's reset the selection
        setSelectedProductId('new');
        resetProductForm();
        
        alert('✨ Sucesso! Catálogo importado e atualizado diretamente da planilha Excel!');
      })
      .catch(err => {
        console.error(err);
        triggerError('Erro ao processar planilha Excel. Verifique se o formato está idêntico ao modelo.');
      });
  };

  // Save or New Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim() || !prodSectionId) {
      alert('Favor preencher o Nome do produto e selecionar uma categoria!');
      return;
    }

    // Prepare images list
    let imgs = prodImages.split('\n').map(u => u.trim()).filter(Boolean);
    if (imgs.length === 0) {
      // Default romantic placeholder pictures from Unsplash based on product features
      imgs = ["https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80"];
    }

    const featuresArr = prodFeatures.split('\n').map(f => f.trim()).filter(Boolean);

    const newProductData: Product = {
      id: selectedProductId === 'new' ? 'prod-' + Math.random().toString(36).substring(2, 9) : selectedProductId,
      title: prodTitle,
      sectionId: prodSectionId,
      subtitle: prodSubtitle || undefined,
      tagline: prodTagline || undefined,
      price: parseFloat(prodPrice) || 49.90,
      badge: prodBadge || undefined,
      images: imgs,
      description: prodDescription || `Lindo produto personalizado ${prodTitle} ideal para presente de Dia dos Namorados.`,
      features: featuresArr.length > 0 ? featuresArr : undefined,
      hasNames: prodHasNames,
      hasPhotoUpload: prodHasPhoto,
      hasMusicSpotify: prodHasSpotify,
      hasCustomDate: prodHasDate,
      hasPackaging: prodHasPackaging,
      hasMagicReveal: prodHasMagicReveal,
      isFeatured: prodIsFeatured
    };

    // Build updated sections list
    const updated = sectList.map(sect => {
      // 1. Remove previous copy of this product from all sections
      const filteredProducts = sect.products.filter(p => p.id !== newProductData.id);

      // 2. Add product back if it belongs to this section
      if (sect.id === prodSectionId) {
        filteredProducts.push(newProductData);
      }

      return {
        ...sect,
        products: filteredProducts
      };
    });

    setSectList(updated);
    localStorage.setItem('catalog_sections_db_v10', JSON.stringify(updated));
    onSettingsChange(phone, storeName, updated);
    
    // Select the saved product to keep view
    if (selectedProductId === 'new') {
      setSelectedProductId(newProductData.id);
    }
    
    triggerSaved();
  };

  const handleDeleteProduct = (pId: string) => {
    if (deleteProductConfirmId !== pId) {
      setDeleteProductConfirmId(pId);
      return;
    }

    const updated = sectList.map(sect => {
      return {
        ...sect,
        products: sect.products.filter(p => p.id !== pId)
      };
    });

    setSectList(updated);
    localStorage.setItem('catalog_sections_db_v10', JSON.stringify(updated));
    onSettingsChange(phone, storeName, updated);
    setDeleteProductConfirmId(null);
    resetProductForm();
    triggerSaved();
  };

  const triggerSaved = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 1500);
  };

  const handleSavePackagingOption = (id: string, name: string, description: string, price: number, image: string) => {
    const updated = packagingList.map(item => {
      if (item.id === id) {
        return { ...item, name, description, price, image };
      }
      return item;
    });
    setPackagingList(updated);
    localStorage.setItem('catalog_packaging_options_v3', JSON.stringify(updated));
    triggerSaved();
  };

  const handleResetToDefaults = () => {
    if (!resetDefaultsConfirm) {
      setResetDefaultsConfirm(true);
      setTimeout(() => {
        setResetDefaultsConfirm(false);
      }, 5000);
      return;
    }

    localStorage.removeItem('catalog_sections_db_v9');
    localStorage.removeItem('catalog_sections_db_v10');
    localStorage.removeItem('catalog_sections_db_v11');
    localStorage.removeItem('catalog_whatsapp_phone');
    localStorage.removeItem('catalog_store_name');
    localStorage.removeItem('catalog_packaging_options');
    localStorage.removeItem('catalog_packaging_options_v2');
    localStorage.removeItem('catalog_packaging_options_v3');
    window.location.reload();
  };

  // Extract all products from sections for selector dropdown
  const allProductsList: { id: string; title: string; category: string }[] = [];
  sectList.forEach(s => {
    s.products.forEach(p => {
      allProductsList.push({
        id: p.id,
        title: p.title,
        category: s.title.replace(/[^\w\s-À-ÿ]/g, '').trim()
      });
    });
  });

  return (
    <>
      {/* Floating Trigger - ONLY visible when admin mode has been unlocked via URL, keyboard or click shortcut */}
      {isAdmin && (
        <button
          id="btn-settings-trigger"
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-40 bg-netflix-card/95 border border-white/10 hover:border-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 shadow-xl group font-sans text-xs flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-wine-red"
          title="Painel Administrativo"
        >
          <Settings className="w-4 h-4 text-[#FF2D55] group-hover:rotate-45 transition-transform duration-500" />
          <span className="hidden sm:inline font-bold tracking-wide uppercase text-white">Painel Lojista</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-sans">
            {/* Dark Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
            />

            {/* Expansive Dashboard Modal Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-netflix-card border border-white/10 rounded-2xl shadow-2xl z-50 text-white overflow-hidden max-h-[92vh] flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-wine-red via-red-500 to-wine-red" />

              {/* Header block */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center font-display font-extrabold text-xs shadow">
                    ADM
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                      Painel do Lojista
                    </h3>
                    <p className="text-[11px] text-zinc-400">Configure sua loja, cadastre fotos, ajuste preços e ative/desative formulários facilmente.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Multi-Tab Navigation Bar */}
              <div className="flex border-b border-white/5 bg-black/15 text-xs font-semibold uppercase tracking-wider overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`flex-1 min-w-[120px] py-3 px-4 flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer ${
                    activeTab === 'general'
                      ? 'border-[#FF2D55] text-white bg-white/[0.02]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.01]'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Geral / Contato
                </button>

                <button
                  onClick={() => setActiveTab('sections')}
                  className={`flex-1 min-w-[120px] py-3 px-4 flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer ${
                    activeTab === 'sections'
                      ? 'border-[#FF2D55] text-white bg-white/[0.02]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.01]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  Categorias ({sectList.length})
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex-1 min-w-[120px] py-3 px-4 flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer ${
                    activeTab === 'products'
                      ? 'border-[#FF2D55] text-white bg-white/[0.02]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.01]'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  Produtos ({allProductsList.length})
                </button>

                <button
                  onClick={() => setActiveTab('packaging')}
                  className={`flex-1 min-w-[120px] py-3 px-4 flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer ${
                    activeTab === 'packaging'
                      ? 'border-[#FF2D55] text-white bg-white/[0.02]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.01]'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  Embalagens ({packagingList.length})
                </button>
              </div>

              {/* Scrollable Form Body Container */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-netflix-bg text-zinc-300">
                
                {panelError && (
                  <div className="mb-4 bg-red-950/80 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                    <BadgeAlert className="w-4 h-4 text-[#FF2D55] shrink-0" />
                    <span>{panelError}</span>
                  </div>
                )}

                {/* 📝 TAB 1: GENERAL SETTINGS */}
                {activeTab === 'general' && (
                  <form onSubmit={handleSaveGeneral} className="space-y-6 max-w-xl">
                    <div className="bg-white/2 border border-white/5 p-4 rounded-xl rounded-b-none border-b-0">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Informações de Contato</h4>
                      <p className="text-[11px] text-zinc-400">Insira as credenciais para onde os links de pedidos do carinho serão enviados e formatados em sua conta do WhatsApp.</p>
                    </div>

                    <div className="space-y-4 bg-zinc-900/40 p-5 rounded-xl border border-white/5 mt-0">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                          Telefone WhatsApp para Receber Pedidos
                        </label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ex: 5551997098567"
                          className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-wine-red transition-all duration-300"
                        />
                        <span className="text-[10px] text-zinc-500 mt-1.5 block leading-normal">
                          Código do país e DDD incluídos (somente números). Ex: <strong className="text-zinc-400">5551997098567</strong> (RS) ou <strong className="text-zinc-400">5511999999999</strong> (SP).
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                          Nome do Ateliê / Loja de Presentes
                        </label>
                        <input
                          type="text"
                          required
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-wine-red transition-all duration-300"
                        />
                        <span className="text-[10px] text-zinc-500 mt-1.5 block">
                          Isso muda os textos e assinaturas automáticas do seu catálogo.
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
                      <div className="bg-zinc-900/60 p-4 rounded-xl border border-[#FF2D55]/15">
                        <p className="text-[11px] text-[#FF2D55] font-semibold uppercase tracking-wider mb-1">🔐 MODO ADMINISTRADOR ATIVO</p>
                        <p className="text-[11px] text-zinc-400 leading-normal">
                          O painel está temporariamente visível no seu navegador atual. Para ocultá-lo totalmente dos clientes, clique em "Ocultar Painel". No futuro, você poderá reabri-lo a qualquer momento digitando <strong className="text-white bg-white/10 px-1 py-0.5 rounded">admin</strong> ou <strong className="text-white bg-white/10 px-1 py-0.5 rounded">tudum</strong> no teclado de forma oculta ou incluindo o parâmetro <strong className="text-[#FF2D55]">?admin=true</strong> ao final do link do site. Em aparelhos celulares, você também pode tocar 5 vezes seguidas na logo "LOVE PRESENTES" ou nos avatares do topo para destravar.
                        </p>
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <button
                          type="submit"
                          className="bg-wine-red hover:bg-wine-red-hover text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-300 shadow flex items-center gap-1.5 cursor-pointer"
                        >
                          {isSaved ? <Check className="w-4 h-4" /> : null}
                          Salvar Configurações
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            sessionStorage.removeItem('tudum_intro_done');
                            window.location.reload();
                          }}
                          className="bg-zinc-800 hover:bg-zinc-700 hover:text-[#FF2D55] border border-white/10 text-zinc-300 px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                          title="Remove a trava de única exibição e recarrega a página para reproduzir a animação e som TUDUM"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#FF2D55] animate-pulse" />
                          Testar Intro "TUDUM"
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            localStorage.removeItem('catalog_admin_unlocked');
                            // Remove query parameters to leave a clean URL
                            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                            window.history.replaceState({path: cleanUrl}, '', cleanUrl);
                            window.location.reload();
                          }}
                          className="bg-zinc-850 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                          title="Oculta o Painel temporariamente do navegador"
                        >
                          Ocultar Painel (Bloquear)
                        </button>

                        <button
                          type="button"
                          onClick={handleResetToDefaults}
                          className={`border px-4 py-3 rounded-xl text-xs font-semibold transition ${
                            resetDefaultsConfirm 
                              ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 animate-pulse'
                              : 'bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {resetDefaultsConfirm ? '⚠️ Confirmar Reset Geral?' : 'Resetar Catálogo Original'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* 📂 TAB 2: SECTIONS MANAGEMENT */}
                {activeTab === 'sections' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Left Side */}
                    <form onSubmit={handleSaveSection} className="md:col-span-5 bg-zinc-900/40 p-4 border border-white/5 rounded-xl self-start space-y-4">
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mb-2">
                        {editingSectionId ? '✏️ Editar Categoria' : '➕ Nova Categoria (Sessão)'}
                      </h4>

                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase font-semibold mb-1">Título da Categoria</label>
                        <input
                          type="text"
                          required
                          value={sectTitle}
                          onChange={(e) => setSectTitle(e.target.value)}
                          placeholder="Ex: 🎁 Kits e Combos Finos"
                          className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red text-white py-2 px-3 text-xs rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase font-semibold mb-1">Subtítulo Descritivo</label>
                        <input
                          type="text"
                          value={sectSubtitle}
                          onChange={(e) => setSectSubtitle(e.target.value)}
                          placeholder="Ex: Cestas românticas exclusivas"
                          className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red text-white py-2 px-3 text-xs rounded-lg focus:outline-none"
                        />
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Salvar
                        </button>
                        {editingSectionId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSectionId(null);
                              setSectTitle('');
                              setSectSubtitle('');
                            }}
                            className="bg-zinc-800 text-zinc-300 px-3 py-2 text-[11px] rounded-lg"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Table Right Side */}
                    <div className="md:col-span-7 bg-black/20 rounded-xl p-4 border border-white/5 space-y-3">
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">Categorias Ativas</h4>
                      
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {sectList.map((sect) => {
                          const count = sect.products?.length || 0;
                          return (
                            <div key={sect.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-white/5 text-xs">
                              <div>
                                <span className="font-bold text-white block">{sect.title}</span>
                                <span className="text-[10px] text-zinc-400 block mt-0.5">{sect.subtitle || 'Sem descrição.'}</span>
                                <span className="text-[10px] font-mono text-zinc-500">{count} produto(s) vinculado(s)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleEditSectionClick(sect)}
                                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                                  title="Editar categoria"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  disabled={count > 0}
                                  onClick={() => handleDeleteSection(sect.id)}
                                  className={`p-1.5 rounded transition cursor-pointer text-xs font-bold ${
                                    count > 0 
                                      ? 'bg-zinc-900 text-zinc-700 hover:cursor-not-allowed'
                                      : deleteSectionConfirmId === sect.id
                                        ? 'bg-red-600 hover:bg-red-700 text-white px-2.5 py-1'
                                        : 'bg-red-950/40 hover:bg-red-950 text-red-400 border border-red-900/30'
                                  }`}
                                  title={count > 0 ? "Contém itens" : deleteSectionConfirmId === sect.id ? "Clique novamente para confirmar" : "Excluir categoria"}
                                >
                                  {deleteSectionConfirmId === sect.id ? 'Confirma?' : <Trash2 className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 📦 TAB 3: PRODUCTS MANAGEMENT */}
                {activeTab === 'products' && (
                  <div className="space-y-6">
                    {/* 📊 EXCEL SPREADSHEET MANAGER CARD */}
                    <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-2xl space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-500/10 text-green-400 rounded-xl">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold font-display uppercase tracking-widest text-[#FF2D55]">🗂️ Gestão e Atualização via Planilha Excel (XLSX)</h4>
                          <p className="text-[11px] text-zinc-400 leading-normal max-w-2xl font-sans">
                            Você pode atualizar ou cadastrar todos os seus produtos em lote! Baixe nossa planilha modelo pré-preenchida com seus dados atuais, faça as alterações necessárias no seu computador e suba o arquivo de volta para atualizar o catálogo instantaneamente.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {/* Download Template Button */}
                        <button
                          type="button"
                          onClick={handleDownloadExcelTemplate}
                          className="flex items-center gap-1.5 bg-green-800 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-wider transition hover:scale-[1.02] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-white/90" />
                          Baixar Planilha de Produtos (.xlsx)
                        </button>

                        {/* Upload Input Button */}
                        <label className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-750 border border-white/10 text-zinc-200 hover:text-white font-bold px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-wider transition hover:scale-[1.02] cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-zinc-400" />
                          Subir Planilha (.xlsx)
                          <input
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            onChange={handleExcelImportFile}
                            className="hidden"
                          />
                        </label>

                        <div className="text-[10px] text-zinc-500 font-mono">
                          * As categorias da planilha devem ser <strong className="text-zinc-400">canecas-foto</strong> ou <strong className="text-zinc-400">caneca-spotify</strong>
                        </div>
                      </div>
                    </div>

                    {/* Top Selector dropdown */}
                    <div className="flex flex-wrap items-center gap-3 bg-zinc-900/60 p-4 border border-white/5 rounded-xl justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="text-xs font-bold font-display uppercase tracking-wider text-zinc-400">Selecione para editar:</label>
                        <select
                          value={selectedProductId}
                          onChange={(e) => {
                            setSelectedProductId(e.target.value);
                            loadProductToEditor(e.target.value);
                          }}
                          className="bg-netflix-bg border border-white/10 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-wine-red font-sans max-w-[280px]"
                        >
                          <option value="new">➕ Cadastrar Novo Produto...</option>
                          {allProductsList.map(p => (
                            <option key={p.id} value={p.id}>
                              [{p.category}] - {p.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedProductId !== 'new' && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => resetProductForm()}
                            className="bg-white/5 hover:bg-white/10 text-white hover:text-white px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider transition font-extrabold cursor-pointer"
                          >
                            Ir para Novo
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(selectedProductId)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider transition font-extrabold cursor-pointer border ${
                              deleteProductConfirmId === selectedProductId
                                ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 animate-pulse'
                                : 'bg-red-950 hover:bg-red-900 border border-red-500/20 text-red-300'
                            }`}
                          >
                            {deleteProductConfirmId === selectedProductId ? 'Confirma Exclusão?' : 'Excluir Este Produto'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Master Editor Form */}
                    <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/30 p-5 rounded-2xl border border-white/5">
                      
                      {/* Left Block: Basic Details */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-display font-bold uppercase tracking-wider text-[#FF2D55] border-b border-white/5 pb-2">✏️ Dados Principais</h4>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2 sm:col-span-1">
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Título do Produto *</label>
                            <input
                              type="text"
                              required
                              value={prodTitle}
                              onChange={(e) => setProdTitle(e.target.value)}
                              placeholder="Ex: Caneca Brilho das Estrelas"
                              className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                            />
                          </div>
                          
                          <div className="col-span-2 sm:col-span-1">
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Preço / Valor (R$) *</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={prodPrice}
                              onChange={(e) => setProdPrice(e.target.value)}
                              placeholder="Ex: 59.90"
                              className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2 sm:col-span-1">
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Sessão / Categoria *</label>
                            <select
                              required
                              value={prodSectionId}
                              onChange={(e) => setProdSectionId(e.target.value)}
                              className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                            >
                              {sectList.map(s => (
                                <option key={s.id} value={s.id}>
                                  {s.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-2 sm:col-span-1">
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Selo / Selo Especial</label>
                            <input
                              type="text"
                              value={prodBadge}
                              onChange={(e) => setProdBadge(e.target.value)}
                              placeholder="Ex: Mais Vendido, Novidade"
                              className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Mote / Subtítulo Técnico</label>
                          <input
                            type="text"
                            value={prodSubtitle}
                            onChange={(e) => setProdSubtitle(e.target.value)}
                            placeholder="Ex: Delicadeza perolada exclusiva"
                            className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Frase Curta Romântica (Tagline)</label>
                          <input
                            type="text"
                            value={prodTagline}
                            onChange={(e) => setProdTagline(e.target.value)}
                            placeholder="Ex: Relembre o amor nas pequenas pausas para o café."
                            className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">URLs das Imagens (Uma URL por linha)</label>
                          <textarea
                            value={prodImages}
                            onChange={(e) => setProdImages(e.target.value)}
                            rows={3}
                            placeholder="Insira as URLs das fotos. Deixe vazio para usar a imagem ilustrativa romântica de casal padronizada."
                            className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Características Inclusas (Linha por linha)</label>
                          <textarea
                            value={prodFeatures}
                            onChange={(e) => setProdFeatures(e.target.value)}
                            rows={3}
                            placeholder="Ex: Cerâmica Legítima Classe AAA&#10;Resiste ao micro-ondas"
                            className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Right Block: Custom Form Toggles & Description Generator */}
                      <div className="space-y-5">
                        <h4 className="text-sm font-display font-bold uppercase tracking-wider text-[#FF2D55] border-b border-white/5 pb-2">⚙️ Ativação de Campos & Formulários</h4>
                        
                        <div className="bg-black/30 p-4 border border-white/5 rounded-xl space-y-3.5 text-xs">
                          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-extrabold pb-1">Habilitar ou desabilitar inputs para este produto:</p>

                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">🏷️ Nome do Casal</span>
                            <button
                              type="button"
                              onClick={() => setProdHasNames(!prodHasNames)}
                              className={`w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer relative ${
                                prodHasNames ? 'bg-red-500' : 'bg-zinc-800 border border-white/5'
                              }`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow ${
                                prodHasNames ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">📸 Exigência / Instrução de Envio de Foto</span>
                            <button
                              type="button"
                              onClick={() => setProdHasPhoto(!prodHasPhoto)}
                              className={`w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer relative ${
                                prodHasPhoto ? 'bg-red-500' : 'bg-zinc-800 border border-white/5'
                              }`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow ${
                                prodHasPhoto ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">🎵 Código de Música Spotify</span>
                            <button
                              type="button"
                              onClick={() => setProdHasSpotify(!prodHasSpotify)}
                              className={`w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer relative ${
                                prodHasSpotify ? 'bg-red-500' : 'bg-zinc-800 border border-white/5'
                              }`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow ${
                                prodHasSpotify ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">📅 Data de Aniversário / Namoro</span>
                            <button
                              type="button"
                              onClick={() => setProdHasDate(!prodHasDate)}
                              className={`w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer relative ${
                                prodHasDate ? 'bg-red-500' : 'bg-zinc-800 border border-white/5'
                              }`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow ${
                                prodHasDate ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">🎁 Opção de Embalagem Fina (kraft/visors)</span>
                            <button
                              type="button"
                              onClick={() => setProdHasPackaging(!prodHasPackaging)}
                              className={`w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer relative ${
                                prodHasPackaging ? 'bg-red-500' : 'bg-zinc-800 border border-white/5'
                              }`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow ${
                                prodHasPackaging ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">✨ Efeito Revelação Mágica (Caneca Térmica)</span>
                            <button
                              type="button"
                              onClick={() => setProdHasMagicReveal(!prodHasMagicReveal)}
                              className={`w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer relative ${
                                prodHasMagicReveal ? 'bg-red-500' : 'bg-zinc-800 border border-white/5'
                              }`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow ${
                                prodHasMagicReveal ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">⭐ Destacar no Carrossel Inicial (Destaque 5s)</span>
                            <button
                              type="button"
                              onClick={() => setProdIsFeatured(!prodIsFeatured)}
                              className={`w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer relative ${
                                prodIsFeatured ? 'bg-red-500' : 'bg-zinc-800 border border-white/5'
                              }`}
                            >
                              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 shadow ${
                                prodIsFeatured ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1.5">
                            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Descrição do Presente</label>
                            
                            <button
                              type="button"
                              onClick={handleGenerateDescription}
                              className="bg-red-600/10 border border-red-500/20 hover:bg-red-600 hover:text-white text-red-400 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer select-none"
                              title="Cria automaticamente um texto comercial persuasivo adaptado em português"
                            >
                              <Sparkles className="w-3 h-3 shrink-0" />
                              ✨ Gerar Descrição Emocionante
                            </button>
                          </div>

                          <textarea
                            required
                            value={prodDescription}
                            onChange={(e) => setProdDescription(e.target.value)}
                            rows={5}
                            placeholder="Digite ou clique acima para gerar dinamicamente o texto romântico de venda..."
                            className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none leading-relaxed"
                          />
                        </div>

                        <div className="pt-2 flex">
                          <button
                            type="submit"
                            className="w-full bg-[#FF2D55] hover:bg-[#E02447] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer focus:outline-none font-sans"
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-4 h-4 text-green-300 stroke-[3px]" />
                                Alterações Salvas!
                              </>
                            ) : (
                              'Salvar Informações do Produto'
                            )}
                          </button>
                        </div>
                      </div>

                    </form>
                  </div>
                )}

                {activeTab === 'packaging' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-white/5">
                      <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wide flex items-center gap-2">
                        <Gift className="w-4 h-4 text-[#FF2D55]" />
                        Ajustar Caixas e Embalagens
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        Altere os nomes, subtextos (descritivos) e valores adicionais de cada uma das opções de embalagem exibidas para o cliente na etapa de personalização. A primeira opção ("Não precisa, já tenho") é sempre gratuita.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {packagingList.map((pkg) => (
                        <div key={pkg.id} className="bg-zinc-900/40 p-5 border border-white/5 rounded-2xl flex flex-col gap-4">
                          <div className="flex gap-3.5 items-start">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40 shadow-inner">
                              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover animate-fade-in" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] bg-[#FF2D55]/10 text-[#FF2D55] px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase block mb-1.5 w-fit">
                                Id: {pkg.id}
                              </span>
                              <p className="text-sm font-bold text-zinc-100 truncate leading-tight">{pkg.name}</p>
                              {pkg.id !== 'nenhuma' ? (
                                <p className="text-xs text-green-400 font-mono mt-1 font-bold">
                                  + R$ {Number(pkg.price).toFixed(2).replace('.', ',')} adicional
                                </p>
                              ) : (
                                <p className="text-xs text-zinc-400 font-mono mt-1 font-bold">Incluso no valor base</p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3.5 pt-3 border-t border-white/5">
                            <div>
                              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                                Nome da Embalagem
                              </label>
                              <input
                                type="text"
                                value={pkg.name}
                                onChange={(e) => handleSavePackagingOption(pkg.id, e.target.value, pkg.description, pkg.price, pkg.image)}
                                className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                                Subtexto / Descriminação da Caixa
                              </label>
                              <textarea
                                value={pkg.description}
                                onChange={(e) => handleSavePackagingOption(pkg.id, pkg.name, e.target.value, pkg.price, pkg.image)}
                                rows={2}
                                className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none leading-relaxed font-sans"
                              />
                            </div>

                            {pkg.id !== 'nenhuma' && (
                              <div>
                                <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                                  Valor Adicional (R$)
                                </label>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-zinc-500 font-bold font-mono">R$</span>
                                  <input
                                    type="number"
                                    step="0.10"
                                    value={pkg.price}
                                    onChange={(e) => handleSavePackagingOption(pkg.id, pkg.name, pkg.description, parseFloat(e.target.value) || 0, pkg.image)}
                                    className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-2 px-3 text-xs text-white focus:outline-none font-mono"
                                  />
                                </div>
                              </div>
                            )}

                            <div>
                              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                                URL da Imagem Ilustrativa
                              </label>
                              <input
                                type="text"
                                value={pkg.image}
                                onChange={(e) => handleSavePackagingOption(pkg.id, pkg.name, pkg.description, pkg.price, e.target.value)}
                                className="w-full bg-netflix-bg border border-white/10 focus:border-wine-red rounded-lg py-1.5 px-3 text-xs text-zinc-300 focus:outline-none text-zinc-400 truncate font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
