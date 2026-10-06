import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Thermometer, Trees, LayoutGrid, ArrowRight, Activity, Map, Terminal, Satellite, Play } from 'lucide-react';

export default function LandingPage({ onLaunchDashboard }) {
  const [logMessages, setLogMessages] = useState([]);

  const systemLogs = [
    'CONNECTING TO SENTINEL-2 ORBITAL ARRAY...',
    'SECURE CONNECTION ESTABLISHED (LATENCY: 42ms)...',
    'RETRIEVING LATEST MULTISPECTRAL CANOPY METRICS...',
    'INDEXING LOCAL VEGETATION DENSITY (NDVI)...',
    'CALCULATING COMPOSITE CLIMATE STRESS GRADIATION...',
    'SYSTEM INITIALIZATION SECURE. APIS ON STANDBY.',
    'GEOSPATIAL ANCHORS CALIBRATED. READY FOR TELEMETRY.'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < systemLogs.length) {
        setLogMessages((prev) => [...prev, systemLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 550);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      index: '01',
      title: 'Climate Vulnerability',
      description: 'Assess compounding regional climate exposures, sea levels, and precipitation patterns.',
      icon: ShieldAlert
    },
    {
      index: '02',
      title: 'Heat Risk Indexing',
      description: 'Predict and visualize Urban Heat Island (UHI) intensity scores using remote sensing arrays.',
      icon: Thermometer
    },
    {
      index: '03',
      title: 'Canopy Monitoring',
      description: 'Track urban green canopy decline and NDVI indices to support urban forestry initiatives.',
      icon: Trees
    },
    {
      index: '04',
      title: 'Expansion Modeling',
      description: 'Model land cover usage and growth boundaries to optimize carbon offsets.',
      icon: LayoutGrid
    }
  ];

  return (
    <div className="relative min-h-screen bg-[var(--theme-bg)] text-[var(--theme-border)] overflow-y-auto overflow-x-hidden flex flex-col justify-between font-mono select-none">
      
      {/* Decorative Technical Grid Corners */}
      <div className="absolute top-4 left-4 text-[10px] opacity-40 font-bold font-mono"></div>
      <div className="absolute top-4 right-4 text-[10px] opacity-40 font-bold font-mono"></div>
      
      {/* Navbar Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-3 flex justify-between items-center z-10 shrink-0 border-b border-[var(--theme-border)]/20">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-theme-gradient flex items-center justify-center border border-[var(--theme-border)] shadow-sm">
            <Map className="w-4 h-4 text-white font-bold" />
          </div>
          <span className="text-base font-black tracking-wider uppercase font-display text-[var(--theme-border)]">
            GeoPlanner AI
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold px-2.5 py-1 border border-[var(--theme-border)] bg-white text-[var(--theme-border)] flex items-center gap-1.5 shadow-sm">
            <Activity className="w-3 h-3 animate-pulse text-[var(--theme-primary)]" /> Prototype v1.0
          </span>
        </div>
      </header>

      {/* Diagnostic Info Ribbon */}
      <div className="w-full bg-[var(--theme-border)]/5 border-b border-[var(--theme-border)] py-1 px-6 z-10 shrink-0 overflow-hidden hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between text-[9px] font-bold text-[var(--theme-text-muted)] tracking-wider">
          <span>[SATELLITE MATRIX: STANDBY]</span>
          <span>[REGIONS INDEXED: 1,420]</span>
          <span>[LIVE TELEMETRY BANDS: 4]</span>
          <span>[GEOSPATIAL ACCURACY: &lt;10m]</span>
        </div>
      </div>

      {/* Main Command Workspace */}
      <main className="max-w-7xl mx-auto px-6 w-full py-4 flex-1 flex flex-col justify-center items-center gap-6 z-10 overflow-visible">
        
        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full flex-1 overflow-visible">
          
          {/* Left Column: Command Feed & Title */}
          <div className="lg:col-span-7 text-left space-y-4 flex flex-col justify-center w-full overflow-visible">
            
            {/* Classified Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--theme-panel)] border border-[var(--theme-border)] text-[9px] font-bold text-[var(--theme-text)] uppercase tracking-widest w-fit shadow-[2px_2px_0px_0px_var(--theme-border)]">
              <span className="h-1.5 w-1.5 bg-[var(--theme-primary)] dossier-pulse-dot text-[var(--theme-primary)]" />
              CLASSIFIED: ENVIRONMENTAL INTELLIGENCE CONSOLE
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display leading-tight text-[var(--theme-border)] uppercase">
              GeoPlanner AI
            </h1>

            <p className="text-xs md:text-sm text-[var(--theme-text-muted)] max-w-xl font-bold leading-relaxed">
              Predicting urban ecological stress index values through satellite monitoring arrays. Assess composite land classification, moisture retention, and microclimate heat risk.
            </p>

            {/* scrolling log terminal */}
            <div className="w-full max-w-xl bg-[var(--theme-panel)] border border-[var(--theme-border)] p-3 shadow-[2px_2px_0px_0px_var(--theme-border)] flex flex-col h-32 text-[10px] font-mono select-none overflow-hidden shrink-0">
              <div className="flex items-center gap-1.5 border-b border-[var(--theme-border)]/20 pb-1.5 mb-1.5 text-[8px] font-black text-[var(--theme-text-muted)] uppercase shrink-0">
                <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)]" /> Command Feed Terminal
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-none">
                <AnimatePresence>
                  {logMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`font-bold tracking-wide uppercase ${idx === logMessages.length - 1 ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)]'}`}
                    >
                      {msg}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLaunchDashboard}
                className="px-6 py-3 bg-[var(--theme-border)] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all duration-150 border border-[var(--theme-border)] shadow-[3px_3px_0px_0px_var(--theme-primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_var(--theme-primary)] font-mono"
              >
                Launch Decision Console
                <ArrowRight className="w-4 h-4 text-white stroke-[3px]" />
              </motion.button>
            </div>
          </div>

          {/* Right Column: Specimen Card Preview */}
          <div className="lg:col-span-5 flex justify-center items-center w-full overflow-visible py-4 lg:py-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel p-4.5 w-full max-w-[380px] bg-[var(--theme-panel)] relative overflow-hidden flex flex-col justify-between gap-3.5"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-[var(--theme-border)] pb-2 shrink-0">
                <div className="text-[11px] font-bold flex items-center gap-1">
                  <span className="font-serif italic font-black text-xs mr-0.5">01</span>
                  <span>TARGET SPECIMEN • SCAN PREVIEW</span>
                </div>
                <span className="px-1.5 py-0.5 text-[8px] font-black dossier-alert-success uppercase shrink-0">
                  Secure Link
                </span>
              </div>

              {/* Data rows with dotted lines */}
              <div className="space-y-2">
                <div className="flex justify-between items-end w-full text-[10px] font-bold">
                  <span className="text-[var(--theme-text-muted)] uppercase">Target Region</span>
                  <div className="dossier-divider" />
                  <span className="text-[var(--theme-border)]">Delhi Sector-4</span>
                </div>
                <div className="flex justify-between items-end w-full text-[10px] font-bold">
                  <span className="text-[var(--theme-text-muted)] uppercase">Telemetry Lat</span>
                  <div className="dossier-divider" />
                  <span className="text-[var(--theme-border)]">28.61390° N</span>
                </div>
                <div className="flex justify-between items-end w-full text-[10px] font-bold">
                  <span className="text-[var(--theme-text-muted)] uppercase">Telemetry Lng</span>
                  <div className="dossier-divider" />
                  <span className="text-[var(--theme-border)]">77.20900° E</span>
                </div>
                <div className="flex justify-between items-end w-full text-[10px] font-bold">
                  <span className="text-[var(--theme-text-muted)] uppercase">Spectral Base</span>
                  <div className="dossier-divider" />
                  <span className="text-[var(--theme-border)]">Sentinel L2A</span>
                </div>
              </div>

              {/* Progress meter */}
              <div className="space-y-1 border-t border-[var(--theme-border)]/15 pt-2">
                <div className="flex justify-between items-baseline text-[9px] font-black uppercase">
                  <span className="text-[var(--theme-text-muted)]">Tree Canopy Density</span>
                  <span>18.5%</span>
                </div>
                <div className="dossier-progress-bg">
                  <div className="h-full bg-[var(--theme-primary)]" style={{ width: '18.5%' }} />
                </div>
              </div>

              {/* Warning Alert Banner (Lighter shade alert danger container) */}
              <div className="dossier-alert-danger p-2.5 flex items-start gap-2 text-[9px] font-bold shrink-0">
                <ShieldAlert className="w-4 h-4 shrink-0 text-[#9c2c22] mt-0.5" />
                <div className="space-y-0.5">
                  <div className="uppercase tracking-wide font-black">Thermal Gradients high</div>
                  <div className="opacity-90 leading-tight">UHI (Urban Heat Island) intensity values evaluated at critical thresholds.</div>
                </div>
              </div>

              {/* Play Scan Button */}
              <button 
                onClick={onLaunchDashboard}
                className="w-full py-2 bg-[var(--theme-border)] text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[var(--theme-primary)] transition-colors"
              >
                <Play className="w-3 h-3 text-white fill-white" /> Analyze Active Specimen
              </button>
            </motion.div>
          </div>

        </div>

        {/* Feature Cards Grid (Footer attachments) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full shrink-0 border-t border-[var(--theme-border)]/20 pt-4"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-4 text-left flex flex-col justify-between relative overflow-hidden group hover:border-[var(--theme-primary)]"
              >
                <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300">
                  <Icon className="w-16 h-16" />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2 border-b border-[var(--theme-border)]/15 pb-1">
                    <span className="font-serif italic font-black text-sm text-[var(--theme-primary)]">{feature.index}</span>
                    <span className="text-[9px] font-bold text-[var(--theme-text-muted)] uppercase">ATTACHMENT</span>
                  </div>
                  <h3 className="text-xs font-black text-[var(--theme-border)] uppercase tracking-wider mb-1 group-hover:text-[var(--theme-primary)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] text-[var(--theme-text-muted)] leading-relaxed font-bold">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-3 border-t border-[var(--theme-border)]/20 text-center text-[var(--theme-text-muted)] text-[10px] z-10 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
        <span>© 2026 GEOPLANNER ENVIRONMENTAL SYSTEM. CLASSIFIED RESOURCE.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[var(--theme-primary)] transition-colors">Remote Sensing</a>
          <span>•</span>
          <a href="#" className="hover:text-[var(--theme-primary)] transition-colors">Google Earth Engine</a>
        </div>
      </footer>
    </div>
  );
}
