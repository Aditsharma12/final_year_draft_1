import React from 'react';
import { Thermometer, CloudRain, Wind, ShieldAlert, Compass, Droplets, Trees, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping icons by key string
const iconMap = {
  Thermometer,
  CloudRain,
  Wind,
  ShieldAlert,
  Compass,
  Droplets,
  Trees
};

export default function RecommendationCard({ recommendations, isLoading }) {
  if (isLoading) {
    return (
      <div className="glass-panel p-4.5 relative overflow-hidden animate-pulse font-mono h-full flex flex-col">
        <div className="h-4.5 w-40 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 mb-4 shrink-0" />
        <div className="space-y-3 flex-1 overflow-hidden">
          <div className="h-12 w-full bg-[var(--theme-bg)] border border-[var(--theme-border)]/20" />
          <div className="h-12 w-full bg-[var(--theme-bg)] border border-[var(--theme-border)]/20" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-panel p-4.5 relative overflow-hidden flex flex-col font-mono h-full"
    >
      {/* Decorative gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-theme-gradient" />

      <div className="flex items-center gap-2 mb-4 border-b border-[var(--theme-border)] pb-2 shrink-0">
        <Sparkles className="w-4 h-4 text-[var(--theme-primary)] animate-pulse" />
        <h3 className="text-xs font-bold tracking-wider text-[var(--theme-border)] uppercase">
          AI Recommendations
        </h3>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => {
              const IconComponent = iconMap[rec.icon] || Compass;
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="p-3 bg-[var(--theme-panel)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all flex gap-3 items-start group shadow-[2px_2px_0px_0px_var(--theme-border)] hover:shadow-[3px_3px_0px_0px_var(--theme-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                >
                  <div className="p-1.5 bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30 text-[var(--theme-primary)] shrink-0">
                    <IconComponent className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[var(--theme-border)] uppercase tracking-wider">
                      {rec.title}
                    </h4>
                    <p className="text-[10px] text-[var(--theme-text-muted)] font-bold leading-normal mt-1">
                      {rec.action}
                    </p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-6 text-[var(--theme-text-muted)] text-xs font-bold uppercase">
              No recommendations required. Selected region is fully resilient.
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
