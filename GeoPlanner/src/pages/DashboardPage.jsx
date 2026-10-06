import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import GeospatialMap from '../components/MapContainer';
import WeatherPanel from '../components/WeatherPanel';
import RiskCard from '../components/RiskCard';
import RecommendationCard from '../components/RecommendationCard';
import SustainabilityScore from '../components/SustainabilityScore';
import SatellitePanel from '../components/SatellitePanel';
import LandCoverPanel from '../components/LandCoverPanel';
import { fetchWeatherData } from '../services/weatherService';
import { assessUrbanRisk } from '../utils/riskAssessmentEngine';

// Default Location: Delhi, India
const DEFAULT_LAT = 28.6139;
const DEFAULT_LNG = 77.2090;

export default function DashboardPage({ onBackToHome }) {
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  
  const [weatherData, setWeatherData] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);

  const runAnalysis = async (targetLat, targetLng) => {
    setIsLoading(true);
    try {
      const assessment = await assessUrbanRisk(targetLat, targetLng);
      setRiskAssessment(assessment);

      if (assessment && assessment.telemetry) {
        setWeatherData({
          temperature: assessment.telemetry.surface_temp_c,
          rainfall: assessment.telemetry.rainfall_mm,
          surfacePressure: assessment.telemetry.pressure_hpa,
          windSpeed: assessment.telemetry.wind_speed_kmh,
          humidity: assessment.telemetry.humidity_pct,
          time: new Date().toLocaleTimeString(),
          isMock: !assessment.isLiveAPI
        });
      } else {
        const weather = await fetchWeatherData(targetLat, targetLng);
        setWeatherData(weather);
      }
    } catch (err) {
      console.error('Error during geospatial analysis:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis(DEFAULT_LAT, DEFAULT_LNG);
  }, []);

  const handleLocationSelect = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
    runAnalysis(newLat, newLng);
  };

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-[var(--theme-bg)] text-[var(--theme-border)] flex flex-col overflow-y-auto lg:overflow-hidden relative">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#f5f4ef]/95 backdrop-blur-sm z-[9999] flex flex-col justify-center items-center"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="glass-panel max-w-sm w-full p-8 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--theme-primary)]" />
              <Loader2 className="w-10 h-10 text-[var(--theme-primary)] animate-spin mb-4" />
              <h3 className="text-sm font-bold font-display text-[var(--theme-border)] uppercase tracking-widest">
                GEOSPATIAL INDEXING...
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full border-b border-[var(--theme-border)] bg-[var(--theme-bg)]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center z-[1000] shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="p-2 bg-[var(--theme-panel)] border border-[var(--theme-border)] text-[var(--theme-border)] hover:bg-[var(--theme-border)]/5 cursor-pointer transition-all duration-150 shadow-[2px_2px_0px_0px_var(--theme-border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_var(--theme-border)]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-theme-gradient flex items-center justify-center border border-[var(--theme-border)] shadow-sm">
              <Map className="w-4.5 h-4.5 text-white font-bold" />
            </div>
            <div>
              <span className="text-sm font-black tracking-wider uppercase font-display text-[var(--theme-border)]">
                GeoPlanner AI
              </span>
              <span className="text-[10px] text-white font-bold uppercase ml-2.5 px-2 py-0.5 bg-[var(--theme-primary)] border border-[var(--theme-border)] shadow-sm">
                Prototype Version
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => runAnalysis(lat, lng)}
            className="px-3.5 py-1.5 border border-[var(--theme-border)] bg-[var(--theme-panel)] hover:bg-[var(--theme-border)]/5 text-xs font-bold text-[var(--theme-border)] flex items-center gap-1.5 cursor-pointer transition-all duration-150 shadow-[2px_2px_0px_0px_var(--theme-border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_var(--theme-border)] uppercase tracking-wider font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[var(--theme-primary)] animate-pulse" /> RE-ASSESS REGION
          </button>
        </div>
      </header>

      {/* Workspace Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden overflow-visible relative">
        
        {/* Left Control Center Panel */}
        <aside className="w-full lg:w-[420px] lg:h-full border-b lg:border-b-0 lg:border-r border-[var(--theme-border)] bg-[var(--theme-bg)]/40 lg:overflow-y-auto overflow-visible p-4 space-y-4 shrink-0 flex flex-col">
          
          {/* Weather Panel */}
          <WeatherPanel weather={weatherData || {}} isLoading={isLoading} />

          {/* Satellite Telemetry Panel (displays tapped location features passed into ONNX) */}
          <SatellitePanel lat={lat} lng={lng} assessment={riskAssessment || {}} isLoading={isLoading} />

          {/* AI Assessment Panel */}
          <RiskCard assessment={riskAssessment || {}} isLoading={isLoading} />

          {/* Tiny Sidebar Footer for Hackathon transparency */}
          <div className="pt-3 text-center border-t border-[var(--theme-border)]/20 mt-auto shrink-0">
            <span className="text-[9px] text-[var(--theme-text-muted)] font-bold uppercase tracking-wider block font-mono">
              GeoPlanner ML Spatial Engine v1.0
            </span>
          </div>
        </aside>

        {/* Center/Right Map & Analysis Console Workspace */}
        <div className="flex-1 flex flex-col lg:h-full lg:overflow-hidden overflow-visible bg-[var(--theme-bg)] p-4 gap-4">
          
          {/* Map Workspace */}
          <div className="flex-[3] min-h-[300px] lg:min-h-[250px] relative">
            <GeospatialMap
              lat={lat}
              lng={lng}
              riskColor={riskAssessment?.hexColor ?? '#10b981'}
              onLocationSelect={handleLocationSelect}
            />
          </div>

          {/* Bottom Geospatial Analysis Console */}
          <div className="flex-[2] min-h-[200px] grid grid-cols-1 md:grid-cols-3 gap-4 lg:overflow-y-auto overflow-visible shrink-0">
            
            {/* Column 1: Sustainability Score */}
            <div className="h-full">
              <SustainabilityScore 
                score={riskAssessment?.sustainabilityScore ?? 0} 
                indices={riskAssessment?.ensembleIndices ?? {}} 
                isLoading={isLoading} 
              />
            </div>

            {/* Column 2: AI Recommendations */}
            <div className="h-full">
              <RecommendationCard recommendations={riskAssessment?.recommendations ?? []} isLoading={isLoading} />
            </div>

            {/* Column 3: Land Cover Panel */}
            <div className="h-full">
              <LandCoverPanel lat={lat} lng={lng} assessment={riskAssessment || {}} isLoading={isLoading} />
            </div>


          </div>

        </div>
      </div>

    </div>
  );
}
