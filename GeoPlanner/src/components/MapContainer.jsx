import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Component to handle map clicks and updating location
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

// Component to dynamically pan map view when coordinates change
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    // Force Leaflet to recalculate container dimensions to avoid grey box rendering bugs on resize/mobile
    map.invalidateSize();
    map.setView([lat, lng], 10, { animate: true, duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

export default function GeospatialMap({ lat, lng, riskColor, onLocationSelect }) {
  // Create a custom glowing/pulsing marker based on risk category color
  const createPulsingIcon = (color) => {
    return L.divIcon({
      className: 'custom-leaflet-pulsing-marker',
      html: `
        <div class="pulse-marker-container">
          <div class="pulse-marker" style="color: ${color}; background-color: ${color};"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  const activeIcon = createPulsingIcon(riskColor);

  return (
    <div className="w-full h-full relative overflow-hidden border-2 border-[var(--theme-border)] shadow-[4px_4px_0px_0px_var(--theme-border)] dark-leaflet-map">
      {/* Absolute Badge for coordinates */}
      <div className="absolute bottom-4 left-4 z-[999] glass-panel px-3 py-1.5 flex gap-3.5 text-[10px] font-bold font-mono shadow-[2px_2px_0px_0px_var(--theme-border)] border border-[var(--theme-border)] bg-[var(--theme-panel)] uppercase tracking-wider text-[var(--theme-border)]">
        <div>
          <span className="text-[var(--theme-text-muted)] mr-1.5">LAT:</span>
          <span className="text-[var(--theme-primary)]">{lat.toFixed(5)}</span>
        </div>
        <div className="w-[1px] bg-[var(--theme-border)]/30" />
        <div>
          <span className="text-[var(--theme-text-muted)] mr-1.5">LNG:</span>
          <span className="text-[var(--theme-primary)]">{lng.toFixed(5)}</span>
        </div>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={10}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[lat, lng]} icon={activeIcon} />
        
        <MapClickHandler onLocationSelect={onLocationSelect} />
        <RecenterMap lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
}
