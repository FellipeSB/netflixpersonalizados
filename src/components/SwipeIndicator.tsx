import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hand, ArrowUp } from 'lucide-react';

interface SwipeIndicatorProps {
  isVisible: boolean;
}

export function SwipeIndicator({ isVisible }: SwipeIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex flex-col items-center gap-3.5 px-2.5 sm:px-3 py-5 sm:py-6 bg-black/85 backdrop-blur-md rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-12 sm:w-14"
          >
            {/* Animated Arrow Indicators pointing up */}
            <div className="flex flex-col -space-y-0.5 text-[#FF2D55]/90 mb-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.15, y: 2 }}
                  animate={{ 
                    opacity: [0.15, 1, 0.15], 
                    y: [2, -2, 2] 
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowUp className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0 text-[#FF2D55]" />
                </motion.div>
              ))}
            </div>

            {/* Sliding Hand Icon */}
            <div className="relative w-8 h-12 flex items-center justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ 
                  y: [18, -18, -18], 
                  opacity: [0, 1, 0],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 2.0,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              >
                <Hand className="w-5 sm:w-6 h-5 sm:h-6 rotate-[-15deg] fill-white/10 shrink-0" />
              </motion.div>
            </div>

            {/* Text Hint rotated or stacked vertically */}
            <span className="text-[8px] sm:text-[9px] text-[#FF2D55] font-black tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 select-none mt-1">
              Role para ver
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
