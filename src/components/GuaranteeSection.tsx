import React from 'react';
import { Compass, Camera, Gift, Truck } from 'lucide-react';
import { GUARANTEES_DATA } from '../data';

// Map icon names safely
const getIconByName = (name: string) => {
  switch (name) {
    case 'Compass':
      return <Compass className="w-6 h-6 text-wine-red shrink-0" />;
    case 'Camera':
      return <Camera className="w-6 h-6 text-wine-red shrink-0" />;
    case 'Gift':
      return <Gift className="w-6 h-6 text-wine-red shrink-0" />;
    case 'Truck':
      return <Truck className="w-6 h-6 text-wine-red shrink-0" />;
    default:
      return <Gift className="w-6 h-6 text-wine-red shrink-0" />;
  }
};

export const GuaranteeSection: React.FC = () => {
  return (
    <section id="garantia" className="py-12 sm:py-16 md:py-20 bg-netflix-bg px-4 sm:px-8 md:px-16 border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-sm font-mono tracking-widest text-zinc-500 uppercase text-center mb-10">
          ✨ Nossa Promessa e Compromisso
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES_DATA.map((guarantee) => (
            <div 
              key={guarantee.id} 
              className="bg-netflix-card border border-white/5 hover:border-wine-red/25 p-6 rounded-2xl transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 bg-wine-red/10 rounded-xl">
                {getIconByName(guarantee.iconName)}
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white font-display tracking-wide uppercase mb-1">
                  {guarantee.title}
                </h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {guarantee.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
