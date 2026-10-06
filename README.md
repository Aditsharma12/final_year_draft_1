# GeoPlanner AI 🌍🤖

> AI-Powered Geospatial Decision Support Platform for Sustainable Urban Planning.

GeoPlanner AI is a geospatial intelligence system designed to help urban planners assess climate vulnerability, urban heat islands, flood risk, and nature-based solutions using ONNX machine learning models and spatial telemetry.

---

## 🏛️ System Architecture

- **Backend (`/backend`)**:
  - **Framework**: FastAPI (Python 3.10+)
  - **Machine Learning**: 4 ONNX Neural Network models (`flood_risk_model.onnx`, `green_infra_model.onnx`, `heat_prediction_model.onnx`, `urban_expansion_model.onnx`)
  - **Ensemble Scoring**: Analytic Hierarchy Process (AHP) / MCDA weighting profiles (`climate_resilience`, `disaster_reduction`, `sustainable_growth`, `nbs_prioritization`)
  - **Data Feeds**: Open-Meteo live earth observation and elevation APIs with fallback spatial telemetry

- **Frontend (`/GeoPlanner`)**:
  - **Framework**: React 19 + Vite
  - **Styling**: Tailwind CSS v4 + Glassmorphism
  - **Maps**: Leaflet + React Leaflet with vector overlays
  - **Animations**: Framer Motion
  - **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Run the Backend
```bash
cd backend
pip install fastapi uvicorn onnxruntime numpy pydantic
python main.py
# Server runs at http://127.0.0.1:8000
```

### 2. Run the Frontend
```bash
cd GeoPlanner
npm install
npm run dev
# Application runs at http://localhost:5173
```
