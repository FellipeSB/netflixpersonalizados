import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCheck, Smile, Phone, Video, MoreVertical } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export const TestimonialsSection: React.FC = () => {
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
    <section id="depoimentos" className="py-12 sm:py-16 md:py-20 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden">
      {/* Background decorations for luxury feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wine-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="px-4 sm:px-8 md:px-16 max-w-7xl mx-auto mb-8">
        <span className="text-xs text-wine-red font-mono font-bold tracking-widest uppercase block text-center mb-1">
          Depoimentos Reais
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight text-center">
          ❤️ Quem já presenteou com a gente
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 text-center max-w-lg mx-auto font-sans">
          Arraste para o lado para ver prints reais de conversas com clientes que emocionaram seus parceiros.
        </p>
      </div>

      {/* Testimonials horizontal slider */}
      <div className="group/testimonials relative">
        {/* Navigation triggers - centered vertically, circular background, dynamic shadow, no edge gradients */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/10 hover:border-[#FF2D55]/30 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/testimonials:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => handleScroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/10 hover:border-[#FF2D55]/30 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/testimonials:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Scroll block */}
        <div 
          ref={rowRef}
          className="flex gap-6 overflow-x-auto pl-4 sm:pl-8 md:pl-16 pr-12 sm:pr-24 py-4 scroll-smooth no-scrollbar netflix-scrollbar select-none"
        >
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="flex-shrink-0 w-[82vw] sm:w-[50vw] md:w-[42vw] lg:w-[28vw] bg-[#0E1B15] border border-emerald-950/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans"
              style={{ contentVisibility: 'auto' }}
            >
              
              {/* WhatsApp Interface Header mimicking high-end smartphone view */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between text-white border-b border-emerald-900/40">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#075E54] rounded-full animate-pulse" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-semibold tracking-tight">{testimonial.author}</h4>
                    <span className="text-[10px] text-emerald-200/80 font-medium flex items-center gap-1">
                      {testimonial.date}
                    </span>
                  </div>
                </div>
                {/* Visual Icons */}
                <div className="flex items-center gap-4 text-emerald-100/90">
                  <Video className="w-4 h-4 hover:text-white transition cursor-pointer" />
                  <Phone className="w-4 h-4 hover:text-white transition cursor-pointer" />
                  <MoreVertical className="w-4 h-4 hover:text-white transition cursor-pointer" />
                </div>
              </div>

              {/* Chat Canvas Section */}
              <div 
                className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-cover"
                style={{ 
                  backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
                  backgroundColor: '#efeae2',
                  minHeight: '260px'
                }}
              >
                {/* Conversation flow */}
                {testimonial.messages.map((msg, mIdx) => {
                  const isStore = msg.sender === 'store';
                  return (
                    <div 
                      key={mIdx} 
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs relative shadow-sm text-left flex flex-col gap-0.5 ${
                        isStore 
                          ? 'self-start bg-white text-zinc-800 rounded-tl-none' 
                          : 'self-end bg-[#D9FDD3] text-zinc-900 rounded-tr-none'
                      }`}
                    >
                      {/* Message body */}
                      <p className="leading-relaxed font-normal">{msg.text}</p>
                      
                      {/* Time and checkmarks */}
                      <div className="flex items-center gap-1 self-end justify-end mt-1 text-[9px] text-zinc-500 font-sans leading-none">
                        <span>{msg.time}</span>
                        {!isStore && <CheckCheck className="w-3.5 h-3.5 text-sky-500 fill-sky-500/10" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input simulator */}
              <div className="bg-[#F0F2F5] px-3 py-2 flex items-center gap-2 border-t border-zinc-200 text-zinc-500 text-xs">
                <Smile className="w-5 h-5 cursor-pointer hover:text-zinc-700 transition shrink-0" />
                <div className="flex-1 bg-white border border-zinc-200 px-3.5 py-1.5 rounded-full text-zinc-400 select-none text-left font-normal italic">
                  Mensagem enviada...
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
