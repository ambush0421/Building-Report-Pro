'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WeightSettings } from './WeightSettings';
import { X, ChevronUp } from 'lucide-react';

interface MobileWeightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  weights: any;
  onWeightChange: (newWeights: any) => void;
}

export function MobileWeightDrawer({ isOpen, onClose, weights, onWeightChange }: MobileWeightDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl z-[70] p-8 pb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">추천 기준 설정</h3>
                <p className="text-xs text-slate-400 font-medium">슬라이더를 조절하여 우선순위를 변경하세요.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-100 rounded-full text-slate-500 active:scale-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              <WeightSettings weights={weights} onChange={onWeightChange} />
              
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-200 uppercase tracking-widest active:scale-[0.98] transition-all"
              >
                적용 및 닫기
              </button>
            </div>

            {/* Handle Bar */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
