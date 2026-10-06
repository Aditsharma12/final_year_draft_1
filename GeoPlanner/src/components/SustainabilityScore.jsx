import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shield, Layers, TrendingUp } from 'lucide-react';

export default function SustainabilityScore({ score = 0, indices = {}, isLoading }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (isLoading) return;

    let start = 0;
    const end = Math.min(Math.max(score, 0), 100);
    if (start === end) {
      setAnimatedScore(end);
      return;
    }

    const duration = 0.8;
    const stepTime = Math.abs(Math.floor((duration * 1000) / Math.max(end, 1)));

    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= end) {
        clearInterval(timer);
        setAnimatedScore(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score, isLoading]);

  if (isLoading) {
    return (
      <div className="glass-panel p-4.5 relative overflow-hidden animate-pulse font-mono flex flex-col items-center h-full justify-between">
        <div className="h-4.5 w-32 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 mb-4" />
        <div className="flex justify-center items-center h-28 my-2 flex-1">
          <div className="w-20 h-20 border-4 border-[var(--theme-bg)] border-t-[var(--theme-primary)] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreColorClass = (val) => {
    if (val >= 70) return 'text-[#2c5b36]';
    if (val >= 50) return 'text-[#7c5e10]';
    return 'text-[#9c2c22]';
  };

  const getScoreBgStroke = (val) => {
    if (val >= 70) return 'stroke-emerald-500/20';
    if (val >= 50) return 'stroke-yellow-500/20';
    return 'stroke-rose-500/20';
  };

  const getScoreStrokeUrl = (val) => {
    if (val >= 70) return 'url(#emerald-cyan-grad)';
    if (val >= 50) return 'url(#yellow-orange-grad)';
    return 'url(#red-grad)';
  };

  const mhi = indices.multi_hazard_idx ?? 50.0;
  const gipi = indices.gi_priority_idx ?? 45.0;
  const sevi = indices.sustainable_growth_idx ?? 50.0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-panel p-4 relative overflow-hidden flex flex-col font-mono h-full justify-between space-y-3"
    >
      <div className="w-full flex items-center justify-between border-b border-[var(--theme-border)] pb-2">
        <h3 className="text-xs font-bold tracking-wider text-[var(--theme-border)] uppercase flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
          Resilience Score
        </h3>
        <span className="text-[8px] text-[var(--theme-text-muted)] font-bold uppercase tracking-wider">MCDA Composite</span>
      </div>

      <div className="flex items-center justify-around w-full my-1">
        {/* SVG Circle Progress */}
        <div className="relative flex items-center justify-center h-28 w-28 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="emerald-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2e5c36" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="yellow-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a28120" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9c2c22" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            <circle
              cx="50"
              cy="50"
              r={radius}
              className={`fill-none stroke-[6px] ${getScoreBgStroke(score)}`}
              strokeWidth="6"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none"
              strokeWidth="6.5"
              stroke={getScoreStrokeUrl(score)}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              strokeLinecap="square"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-[var(--theme-border)] font-display tracking-tight leading-none">
              {animatedScore}%
            </span>
            <span className="text-[8px] text-[var(--theme-text-muted)] font-bold tracking-widest uppercase mt-0.5">
              Score
            </span>
          </div>
        </div>

        {/* Researched MCDA/AHP Sub-Indices */}
        <div className="space-y-1.5 text-[9px] w-1/2">
          <div className="p-1.5 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 flex items-center justify-between">
            <span className="text-[var(--theme-text-muted)] font-bold flex items-center gap-1">
              <Shield className="w-3 h-3 text-rose-500" /> Multi-Hazard
            </span>
            <span className="font-extrabold text-[var(--theme-border)]">{mhi.toFixed(1)}</span>
          </div>

          <div className="p-1.5 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 flex items-center justify-between">
            <span className="text-[var(--theme-text-muted)] font-bold flex items-center gap-1">
              <Layers className="w-3 h-3 text-emerald-500" /> GI Priority
            </span>
            <span className="font-extrabold text-[var(--theme-border)]">{gipi.toFixed(1)}</span>
          </div>

          <div className="p-1.5 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 flex items-center justify-between">
            <span className="text-[var(--theme-text-muted)] font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-sky-500" /> Growth Viability
            </span>
            <span className="font-extrabold text-[var(--theme-border)]">{sevi.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="w-full text-center">
        <p className={`text-[10px] font-bold truncate mb-1 ${getScoreColorClass(score)}`}>
          {score >= 70
            ? 'High resilience. Minimal climate hazard risks.'
            : score >= 50
              ? 'Moderate resilience. Regulated planning advised.'
              : 'High vulnerability. Priority intervention required.'}
        </p>
        <span className="text-[8px] text-[var(--theme-text-muted)] font-bold block border-t border-[var(--theme-border)]/20 pt-1 uppercase">
          AHP Weighted Multi-Criteria Decision Score
        </span>
      </div>
    </motion.div>
  );
}
