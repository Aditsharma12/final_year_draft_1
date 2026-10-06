import React from 'react';
import { ShieldAlert, Info, HelpCircle, Flame, Waves, Building2, Trees } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RiskCard({ assessment = {}, isLoading }) {
  if (isLoading) {
    return (
      <div className="glass-panel p-4.5 relative overflow-hidden animate-pulse font-mono shrink-0">
        <div className="h-4.5 w-32 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 mb-4" />
        <div className="h-16 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 mb-3" />
        <div className="h-9 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20" />
      </div>
    );
  }

  const {
    climateVulnerability = 40,
    riskZone = 'MODERATE',
    hexColor = '#f97316',
    engine = 'GeoPlanner ONNX Ensemble v1.0',
    onnxPredictions = { heat_risk: 0.50, flood_risk: 0.45, expansion_prob: 0.48, gi_suitability: 0.50 },
    zoning = {}
  } = assessment;

  const zoneStyles = {
    LOW: {
      cardClass: 'dossier-alert-success',
      badgeClass: 'bg-[#2e5c36]/25 border border-[#2e5c36]/40 text-[#2c5b36]'
    },
    MODERATE: {
      cardClass: 'dossier-alert-warning',
      badgeClass: 'bg-[#a28120]/25 border border-[#a28120]/40 text-[#7c5e10]'
    },
    HIGH: {
      cardClass: 'dossier-alert-danger',
      badgeClass: 'bg-[#e06b5e]/25 border border-[#e06b5e]/40 text-[#9c2c22]'
    },
    'VERY HIGH': {
      cardClass: 'dossier-alert-danger',
      badgeClass: 'bg-[#e06b5e]/25 border border-[#e06b5e]/40 text-[#9c2c22]'
    }
  };

  const style = zoneStyles[riskZone] || zoneStyles.LOW;

  const heatPct = ((onnxPredictions.heat_risk || 0) * 100).toFixed(1);
  const floodPct = ((onnxPredictions.flood_risk || 0) * 100).toFixed(1);
  const expansionPct = ((onnxPredictions.expansion_prob || 0) * 100).toFixed(1);
  const giPct = ((onnxPredictions.gi_suitability || 0) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="glass-panel p-4.5 relative overflow-hidden font-mono shrink-0 space-y-3"
    >
      {/* Dynamic Glow Line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px]`} style={{ backgroundColor: hexColor }} />

      <div className="flex justify-between items-center border-b border-[var(--theme-border)] pb-2">
        <h3 className="text-xs font-bold tracking-wider text-[var(--theme-border)] uppercase flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-[var(--theme-primary)]" />
          ONNX Multi-Hazard Assessment
        </h3>
        <div className="group relative cursor-pointer">
          <Info className="w-4 h-4 text-slate-500 hover:text-[var(--theme-border)] transition-colors" />
          <div className="absolute right-0 bottom-6 w-60 p-2.5 bg-[var(--theme-panel)] border border-[var(--theme-border)] text-[9px] font-bold shadow-[2px_2px_0px_0px_var(--theme-border)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-[var(--theme-text)] leading-relaxed">
            Derived directly from 4 ONNX deep learning models (Heat, Flood, Urban Expansion & GI Suitability) via FastAPI backend.
          </div>
        </div>
      </div>

      {/* Main Vulnerability Banner */}
      <div className={`p-3 border ${style.cardClass} flex items-center justify-between gap-4`}>
        <div>
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">
            Climate Vulnerability
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-extrabold tracking-tight font-display">
              {climateVulnerability}%
            </span>
            <span className={`px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${style.badgeClass}`}>
              {riskZone}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-[8px] font-bold uppercase tracking-wider opacity-85 mb-0.5">
            Zoning Action Tier
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-black bg-[var(--theme-panel)] border border-[var(--theme-border)]/30 text-[var(--theme-border)] uppercase tracking-wide">
            {zoning.action_tier || 'Tier 4 - Standard'}
          </span>
        </div>
      </div>

      {/* 4 Real ONNX Sub-Model Probabilities Grid */}
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div className="p-2 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 flex items-center justify-between">
          <span className="text-[var(--theme-text-muted)] font-bold flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-500" /> Heat Risk
          </span>
          <span className="font-extrabold text-[var(--theme-border)]">{heatPct}%</span>
        </div>

        <div className="p-2 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 flex items-center justify-between">
          <span className="text-[var(--theme-text-muted)] font-bold flex items-center gap-1">
            <Waves className="w-3 h-3 text-sky-500" /> Flood Risk
          </span>
          <span className="font-extrabold text-[var(--theme-border)]">{floodPct}%</span>
        </div>

        <div className="p-2 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 flex items-center justify-between">
          <span className="text-[var(--theme-text-muted)] font-bold flex items-center gap-1">
            <Building2 className="w-3 h-3 text-amber-600" /> Expansion
          </span>
          <span className="font-extrabold text-[var(--theme-border)]">{expansionPct}%</span>
        </div>

        <div className="p-2 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 flex items-center justify-between">
          <span className="text-[var(--theme-text-muted)] font-bold flex items-center gap-1">
            <Trees className="w-3 h-3 text-emerald-500" /> GI Suitability
          </span>
          <span className="font-extrabold text-[var(--theme-border)]">{giPct}%</span>
        </div>
      </div>

      {/* Policy Recommendation snippet */}
      {zoning.policy_recommendation && (
        <div className="p-2 bg-[var(--theme-panel)] border border-[var(--theme-primary)]/40 text-[9px] font-bold text-[var(--theme-border)] leading-tight">
          <span className="text-[var(--theme-primary)] uppercase font-extrabold block mb-0.5">Policy Directive:</span>
          {zoning.policy_recommendation}
        </div>
      )}

      {/* Protocol / Engine Footer */}
      <div className="bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 p-2 flex items-center justify-between text-xs">
        <span className="text-[9px] font-bold uppercase text-[var(--theme-text-muted)] flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-[var(--theme-primary)]" /> Engine Protocol
        </span>
        <span className="text-[9px] font-extrabold text-[var(--theme-border)] uppercase">
          {engine}
        </span>
      </div>
    </motion.div>
  );
}
