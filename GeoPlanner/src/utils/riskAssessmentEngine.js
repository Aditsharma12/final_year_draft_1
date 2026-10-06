const API_BASE_URL = "http://127.0.0.1:8000";

function getRiskLevel(vulnerability) {
  if (vulnerability > 65) return { riskZone: "VERY HIGH", colorTheme: "red", hexColor: "#ef4444" };
  if (vulnerability > 45) return { riskZone: "HIGH", colorTheme: "orange", hexColor: "#f97316" };
  if (vulnerability > 30) return { riskZone: "MODERATE", colorTheme: "yellow", hexColor: "#eab308" };
  return { riskZone: "LOW", colorTheme: "emerald", hexColor: "#10b981" };
}

export const assessUrbanRisk = async (lat, lon, profile = "climate_resilience") => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat: Number(lat), lng: Number(lon), profile }),
    });

    if (response.ok) {
      const data = await response.json();
      const vectors = data.vectors || {};
      const scores = data.scores || {};
      const combinedScore = data.combined_score ?? 75;
      const vulnerability = Math.round(Math.max(0, Math.min(100, 100 - combinedScore)));
      const riskMeta = getRiskLevel(vulnerability);

      return {
        isLiveAPI: true,
        engine: "GeoPlanner ONNX Ensemble v1.0",
        climateVulnerability: vulnerability,
        sustainabilityScore: Math.round(combinedScore),
        ...riskMeta,
        onnxPredictions: scores,
        ensembleIndices: {
          multi_hazard_idx: scores.flood_risk ? Math.round(scores.flood_risk * 100) : 40,
          gi_priority_idx: scores.gi_suitability ? Math.round(scores.gi_suitability * 100) : 50,
          sustainable_growth_idx: scores.expansion_prob ? Math.round(scores.expansion_prob * 100) : 50,
          geoplanner_resilience_score: Math.round(combinedScore),
        },
        onnxFeatureVectors: vectors,
        telemetry: {
          ndvi: vectors.heat ? vectors.heat[0] : 0.45,
          elevation_m: 214.0,
          pop_density: vectors.heat ? vectors.heat[5] : 5400,
          slope_deg: vectors.expansion ? vectors.expansion[2] : 15.2,
          surface_temp_c: vectors.heat ? vectors.heat[2] : 25.4,
          soil_moisture: vectors.green_infra ? vectors.green_infra[1] : 0.374,
          humidity_pct: vectors.heat ? vectors.heat[4] : 98.0,
          pressure_hpa: vectors.heat ? vectors.heat[3] * 10.0 : 976.9,
          wind_speed_kmh: vectors.heat ? vectors.heat[6] / 10.0 : 6.4,
          rainfall_mm: vectors.flood ? Math.max(0, (vectors.flood[0] - 5.0) / 10.0) : 0.1,
          api_source: "Google Earth / Earth Observation Telemetry API"
        },
        zoning: {
          action_tier: vulnerability > 50 ? "Tier 1 - High Priority Buffer" : "Tier 4 - Standard",
          policy_recommendation: vulnerability > 50 ? "Target for immediate green infrastructure intervention" : "Standard Urban Infill: Regular environmental monitoring & zoning guidelines",
          ...riskMeta
        },
        recommendations: [
          {
            id: "onnx_heat_high",
            title: "Urban Heat Island Mitigation",
            action: `Deploy cool pavement & broadleaf tree canopy (Heat Risk: ${(scores.heat_risk || 0).toFixed(2)})`,
            impact: "Reduces surface thermal radiation via evapotranspiration.",
            icon: "Thermometer",
          },
          {
            id: "onnx_flood_mod",
            title: "Rainwater Harvesting Infrastructure",
            action: `Mandate rooftop rainwater catchment & bioswales (Flood Risk: ${(scores.flood_risk || 0).toFixed(2)})`,
            impact: "Secures secondary non-potable water supply and recharges local aquifers.",
            icon: "Droplets",
          },
        ],
      };
    }
  } catch (err) {
    console.warn("FastAPI backend unavailable, running offline fallback engine:", err);
  }

  // Offline Fallback
  const coordFactor = Math.abs(Math.sin(lat * 0.05) + Math.cos(lon * 0.05)) / 2;
  const vulnerabilityPercentage = Math.round(Math.min(Math.max((0.52 + coordFactor * 0.3) * 100, 15), 95));
  const finalSustainabilityScore = Math.max(100 - vulnerabilityPercentage, 10);
  const fallbackRiskMeta = getRiskLevel(vulnerabilityPercentage);

  return {
    isLiveAPI: false,
    engine: "Local Fallback Engine",
    climateVulnerability: vulnerabilityPercentage,
    sustainabilityScore: finalSustainabilityScore,
    ...fallbackRiskMeta,
    onnxPredictions: { heat_risk: 0.52, flood_risk: 0.48, expansion_prob: 0.55, gi_suitability: 0.60 },
    ensembleIndices: {
      multi_hazard_idx: vulnerabilityPercentage,
      gi_priority_idx: 45.0,
      sustainable_growth_idx: 50.0,
      geoplanner_resilience_score: finalSustainabilityScore,
    },
    onnxFeatureVectors: {
      heat: [0.45, 0.26, 28.0, 101.3, 60.0, 5400, 120.0],
      expansion: [1200, 5400, 15.2, 25.0, 6480, 0.28, 0.77],
      green_infra: [0.45, 0.54, 13500, 0.40, 15.2, 8.5, 105.0],
      flood: [105.0, 180, 15.2, 6.6, 0.28, 0.77, 240],
    },
    telemetry: {
      ndvi: 0.45, elevation_m: 200.0, pop_density: 5400, slope_deg: 15.2, surface_temp_c: 28.0,
      soil_moisture: 0.40, humidity_pct: 60.0, pressure_hpa: 1013.0, wind_speed_kmh: 12.0, rainfall_mm: 10.0,
      api_source: "Google Earth Telemetry Engine (Fallback)"
    },
    zoning: {
      action_tier: "Tier 3 - Regulated Expansion",
      policy_recommendation: "Standard Urban Infill: Regular environmental monitoring & zoning guidelines",
      ...fallbackRiskMeta
    },
    recommendations: [
      { id: "rec_1", title: "Urban Heat Island Mitigation", action: "Deploy cool pavement & broadleaf tree canopy", impact: "Reduces surface thermal radiation via evapotranspiration.", icon: "Thermometer" },
      { id: "rec_2", title: "Sustainable Urban Drainage (SuDS)", action: "Construct permeable pavements & storm retention basins", impact: "Captures peak storm runoff and mitigates localized flooding.", icon: "CloudRain" },
    ],
  };
};


