import React from 'react';
import { Thermometer, CloudRain, Gauge, Wind, Droplets, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherPanel({ weather, isLoading }) {
  if (isLoading) {
    return (
      <div className="glass-panel p-4.5 relative overflow-hidden animate-pulse font-mono shrink-0">
        <div className="h-4.5 w-36 bg-[var(--theme-bg)] border border-[var(--theme-border)]/20 mb-4" />
        <div className="space-y-3">
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
          <div className="h-3 w-full bg-[var(--theme-bg)]" />
        </div>
      </div>
    );
  }

  const { temperature, rainfall, surfacePressure, windSpeed, humidity, time, isMock } = weather;

  const weatherStats = [
    {
      label: 'Temperature',
      value: `${temperature}°C`,
      icon: Thermometer,
      color: 'text-orange-700'
    },
    {
      label: 'Precipitation',
      value: `${rainfall} mm`,
      icon: CloudRain,
      color: 'text-blue-700'
    },
    {
      label: 'Wind Speed',
      value: `${windSpeed} km/h`,
      icon: Wind,
      color: 'text-teal-700'
    },
    {
      label: 'Pressure',
      value: `${surfacePressure} hPa`,
      icon: Gauge,
      color: 'text-purple-700'
    },
    {
      label: 'Humidity',
      value: `${humidity}%`,
      icon: Droplets,
      color: 'text-cyan-700'
    },
    {
      label: 'Telemetry Time',
      value: time,
      icon: Clock,
      color: 'text-emerald-700'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-4.5 relative overflow-hidden text-[var(--theme-border)] font-mono shrink-0"
    >
      {/* Decorative Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-theme-gradient" />
      
      <div className="flex justify-between items-center mb-4 border-b border-[var(--theme-border)] pb-2">
        <h3 className="text-xs font-bold tracking-wider text-[var(--theme-border)] uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[var(--theme-primary)] rounded-full animate-pulse" />
          Microclimate Telemetry
        </h3>
        {isMock && (
          <span className="px-1.5 py-0.5 text-[8px] font-bold tracking-wide dossier-alert-warning uppercase">
            Simulated
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        {weatherStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex justify-between items-end w-full group hover:text-[var(--theme-primary)] transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text-muted)] group-hover:text-[var(--theme-border)] transition-colors">
                <Icon className={`w-3.5 h-3.5 ${stat.color} shrink-0`} />
                <span className="uppercase">{stat.label}</span>
              </div>
              
              <div className="dossier-divider" />
              
              <div className="text-xs font-bold text-[var(--theme-border)] text-right">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
