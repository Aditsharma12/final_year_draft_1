# GeoPlanner AI 🌍🤖

> AI-Powered Geospatial Decision Support Platform for Sustainable Urban Planning.
> **Hackathon Prototype**

GeoPlanner AI is a premium, responsive geospatial analytics platform designed to help urban planners evaluate localized environmental risks (Climate Vulnerability, Temperature Heat Islands, Canopy loss) and formulate sustainable urban development policies.

## 🚀 Key Features

- **Interactive Geospatial Visualization**: Leverages Leaflet & OpenStreetMap dark vector overlays with pulsing, color-coded risk markers:
  - 🟢 **LOW Risk**
  - 🟡 **MODERATE Risk**
  - 🟠 **HIGH Risk**
  - 🔴 **VERY HIGH Risk**
- **Dynamic Microclimate Telemetry**: Integrates with the open **Open-Meteo API** to pull real-time weather metrics (Temperature, Rain, Surface Pressure, Wind Speed, Humidity).
- **Transparency-First Assessment Logic**: Runs a clear **Rule-Based Prototype Engine** correlating coordinate hashes and climate stressors to calculate Climate Vulnerability and Estimated Sustainability Indexes.
- **AI Recommendation Engine**: Recommends targeted urban planning mitigations (e.g., broadleaf deciduous tree buffers, rainwater harvesting systems, permeable pavements) based on risk factors.
- **Apple/Vercel-inspired Glassmorphic UI**: High-fidelity dark mode with glowing backdrop blur styling, smooth Framer Motion entrance transitions, and interactive indicator bars.
- **Telemetry Analysis Loader**: Simulates multi-step live cloud calculation steps (*Analyzing location...* → *Fetching climate...* → *Generating mitigations...*) upon clicking the map.

## 🛠️ Tech Stack

- **Framework**: React + Vite (SPA)
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism
- **Interactive Map**: Leaflet, React Leaflet
- **APIs**: Open-Meteo API
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **HTTP Client**: Axios

## 📂 Project Structure

```bash
components/       # Reusable layout cards (Weather, Risk, Recommendations, Score)
pages/            # LandingPage & DashboardPage coordinators
services/         # Weather service client with simulated quadrant-fallback
utils/            # Rule-based assessment & recommendation engine
assets/           # Theme assets
index.css         # Custom animations & dark map filters
```

## ⚖️ Disclaimer (Transparency Guidelines)

This repository serves as a frontend prototype demonstrating core platform design and user workflow for hackathon judging.
- The **Risk Assessment Engine** runs on deterministic rule-based algorithms.
- **Future Integration**: The logic is architected in a modular function (`src/utils/riskAssessmentEngine.js`) so that it can be easily replaced by a trained Random Forest or Neural Network API.

---
*Created for Hackathon judging presentation.*
