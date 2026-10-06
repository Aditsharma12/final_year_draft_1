import React, { useState } from 'react';
import { Compass, Thermometer, Droplets, Trees, Satellite, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SatellitePanel({ lat, lng, assessment = {}, isLoading }) {
  const [showVectorDetails, setShowVectorDetails] = useState(false);

  if (isLoading) {
    return (
      <div className="glass-panel p-4.5 relative overflow-hidden animate-pulse font-mono shrink-0">
        <div className="h-4.5 w-36 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 mb-4" />
        <div className="space-y-3">
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
        </div>
      </div>
    );
  }

  const telemetry = assessment.telemetry || {};
  const featureVectors = assessment.onnxFeatureVectors || {};

  const heatVec = featureVectors.heat || [];
  const greenVec = featureVectors.green_infra || [];

  const ndviVal = heatVec[0] ?? telemetry.ndvi ?? 0.5078;
  const moistureVal = greenVec[1] ?? telemetry.soil_moisture ?? 0.374;
  const lstVal = heatVec[2] ?? telemetry.surface_temp_c ?? 25.4;
  const popVal = heatVec[5] ?? telemetry.pop_density ?? 6686.2;


  const getNdviStatus = (val) => {
    if (val >= 0.6) return { text: 'Dense Vegetation', style: 'dossier-alert-success' };
    if (val >= 0.3) return { text: 'Fair/Moderate Canopy', style: 'dossier-alert-warning' };
    return { text: 'Barren / Urbanized', style: 'dossier-alert-danger' };
  };

  const getMoistureStatus = (val) => {
    if (val >= 0.3) return { text: 'High Moisture', style: 'dossier-alert-success' };
    if (val >= 0.1) return { text: 'Moderate Moisture', style: 'dossier-alert-warning' };
    return { text: 'Dry Soil / Water Scarce', style: 'dossier-alert-danger' };
  };

  const ndvi = getNdviStatus(ndviVal);
  const moisture = getMoistureStatus(moistureVal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-4.5 relative overflow-hidden text-[var(--theme-border)] font-mono shrink-0 space-y-3"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-theme-gradient" />

      <div className="flex justify-between items-center border-b border-[var(--theme-border)] pb-2">
        <h3 className="text-xs font-bold tracking-wider text-[var(--theme-border)] uppercase flex items-center gap-1.5">
          <Satellite className="w-4 h-4 text-[var(--theme-primary)]" />
          Earth Observation Telemetry
        </h3>
        <span className="px-1.5 py-0.5 text-[8px] font-bold tracking-wide bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30 uppercase">
          Tapped Location
        </span>
      </div>

      <div className="space-y-2.5">
        {/* NDVI */}
        <div className="space-y-0.5">
          <div className="flex justify-between items-end w-full">
            <span className="text-xs font-bold text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Trees className="w-3.5 h-3.5 text-emerald-600" />
              NDVI (Veg Index)
            </span>
            <div className="dossier-divider" />
            <span className="text-xs font-bold text-[var(--theme-border)]">{Number(ndviVal).toFixed(3)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[8px] text-slate-500 font-bold uppercase">Vegetation Density</span>
            <span className={`px-1.5 py-0.2 text-[8px] font-black uppercase ${ndvi.style}`}>
              {ndvi.text}
            </span>
          </div>
        </div>

        {/* Moisture */}
        <div className="space-y-0.5">
          <div className="flex justify-between items-end w-full">
            <span className="text-xs font-bold text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-600" />
              Moisture Telemetry
            </span>
            <div className="dossier-divider" />
            <span className="text-xs font-bold text-[var(--theme-border)]">{Number(moistureVal).toFixed(3)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[8px] text-slate-500 font-bold uppercase">Soil Water Index</span>
            <span className={`px-1.5 py-0.2 text-[8px] font-black uppercase ${moisture.style}`}>
              {moisture.text}
            </span>
          </div>
        </div>

        {/* Land Surface Temp */}
        <div className="flex justify-between items-end w-full">
          <span className="text-xs font-bold text-[var(--theme-text-muted)] flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-orange-600" />
            Land Surface Temp
          </span>
          <div className="dossier-divider" />
          <span className="text-xs font-bold text-[var(--theme-border)]">{Number(lstVal).toFixed(1)}°C</span>
        </div>

        {/* Pop Density */}
        <div className="flex justify-between items-end w-full">
          <span className="text-xs font-bold text-[var(--theme-text-muted)] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            Population Density
          </span>
          <div className="dossier-divider" />
          <span className="text-xs font-bold text-[var(--theme-border)]">{Math.round(popVal)} /km²</span>
        </div>
      </div>

      {/* Expandable ONNX Feature Vector Inspector */}
      <div className="pt-2 border-t border-[var(--theme-border)]/20">
        <button
          onClick={() => setShowVectorDetails(!showVectorDetails)}
          className="w-full flex items-center justify-between text-[9px] font-bold uppercase text-[var(--theme-primary)] hover:underline cursor-pointer py-1"
        >
          <span className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" /> ONNX Tapped Feature Arrays [1x7]
          </span>
          {showVectorDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showVectorDetails && (
          <div className="mt-2 p-2 bg-black/80 border border-[var(--theme-border)]/40 rounded text-[8px] font-mono space-y-1.5 text-slate-200 overflow-x-auto">
            <div>
              <span className="text-orange-400 font-bold uppercase">Heat Model:</span>
              <div className="text-slate-300 break-all">
                [{featureVectors.heat ? featureVectors.heat.join(', ') : '...'}]
              </div>
            </div>

            <div>
              <span className="text-amber-400 font-bold uppercase">Expansion Model:</span>
              <div className="text-slate-300 break-all">
                [{featureVectors.expansion ? featureVectors.expansion.join(', ') : '...'}]
              </div>
            </div>

            <div>
              <span className="text-emerald-400 font-bold uppercase">GI Infra Model:</span>
              <div className="text-slate-300 break-all">
                [{featureVectors.green_infra ? featureVectors.green_infra.join(', ') : '...'}]
              </div>
            </div>

            <div>
              <span className="text-sky-400 font-bold uppercase">Flood Model:</span>
              <div className="text-slate-300 break-all">
                [{featureVectors.flood ? featureVectors.flood.join(', ') : '...'}]
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
