import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface TudumIntroProps {
  storeName: string;
  onAvatarSelect?: (avatar: string) => void;
}

export const TudumIntro: React.FC<TudumIntroProps> = ({ storeName, onAvatarSelect }) => {
  const [stage, setStage] = useState<'gate' | 'animating' | 'done'>(() => {
    // Session state to only play once during the user's session to avoid annoying them
    const isOver = sessionStorage.getItem('tudum_intro_done');
    return isOver ? 'done' : 'gate';
  });

  const handleStartSession = (avatar: string) => {
    // Trigger selected avatar callback
    if (onAvatarSelect) {
      onAvatarSelect(avatar);
    }
    
    // Switch to cinematic zoom stage
    setStage('animating');

    // Complete animation sequence in 650ms for an ultra-snappy and responsive user experience!
    setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('tudum_intro_done', 'true');
    }, 650);
  };

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          id="netflix-brand-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center select-none overflow-hidden font-sans"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-[#FF2D55]/5 blur-[120px] pointer-events-none" />

          {stage === 'gate' ? (
            /* PHASE 1: User gate interaction setup - Netflix-style profile selection */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center px-4 max-w-lg flex flex-col items-center"
            >
              <h2 className="text-zinc-100 font-display font-bold text-xl sm:text-2xl tracking-wide mb-8">
                Escolha seu avatar
              </h2>

              {/* Profiles Row */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-sm mb-10">
                {/* Profile 1 */}
                <button
                  id="profile-avatar-amor"
                  onClick={() => handleStartSession('💖')}
                  className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-tr from-[#FF2D55] to-[#FF5E7E] shadow-xl flex items-center justify-center relative overflow-hidden border border-white/5 group-hover:border-white transition-all group-hover:scale-105 active:scale-95 duration-250">
                    <span className="text-white text-2xl sm:text-3xl font-black">💖</span>
                  </div>
                </button>

                {/* Profile 2 */}
                <button
                  id="profile-avatar-cupido"
                  onClick={() => handleStartSession('🏹')}
                  className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-xl flex items-center justify-center relative overflow-hidden border border-white/5 group-hover:border-white transition-all group-hover:scale-105 active:scale-95 duration-250">
                    <span className="text-white text-2xl sm:text-3xl font-black">🏹</span>
                  </div>
                </button>

                {/* Profile 3 */}
                <button
                  id="profile-avatar-curioso"
                  onClick={() => handleStartSession('🍿')}
                  className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-tr from-emerald-600 to-cyan-500 shadow-xl flex items-center justify-center relative overflow-hidden border border-white/5 group-hover:border-white transition-all group-hover:scale-105 active:scale-95 duration-250">
                    <span className="text-white text-2xl sm:text-3xl font-black">🍿</span>
                  </div>
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 font-sans tracking-wide">
                Toque em um avatar para conferir os presentes do <span className="text-[#FF2D55] font-semibold">{storeName}</span>.
              </p>
            </motion.div>
          ) : (
            /* PHASE 2: Epic zooming Logo Intro (TUDUM sequence) */
            <div className="relative flex items-center justify-center">
              {/* Bold centered initial letter growing spectacularly into the screen */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0.2 }}
                animate={{ 
                  scale: [0.8, 1.2, 5.5], 
                  opacity: [1, 1, 0],
                  filter: ['blur(0px)', 'blur(0px)', 'blur(4px)']
                }}
                transition={{ 
                  duration: 0.6, 
                  times: [0, 0.4, 1.0],
                  ease: [0.25, 1, 0.5, 1] 
                }}
                className="text-[#FF2D55] font-display font-black text-9xl md:text-[14rem] tracking-tight leading-none drop-shadow-[0_0_50px_rgba(255,45,85,0.4)]"
              >
                {storeName.slice(0, 1).toUpperCase()}
              </motion.div>

              {/* Vertical red stripes moving slightly for Netflix dimensional barcode look */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0.8 }}
                animate={{ opacity: [0, 1, 0], scaleY: [0.8, 1.3, 1.8] }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="absolute w-2 h-44 bg-white/20 blur-sm pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, scaleY: 0.8 }}
                animate={{ opacity: [0, 0.6, 0], scaleY: [0.9, 1.2, 1.6] }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="absolute w-0.5 h-44 bg-[#FF2D55] left-8 blur-[1px] pointer-events-none"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
