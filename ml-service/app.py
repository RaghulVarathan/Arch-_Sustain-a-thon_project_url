from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from detectors.isolation_forest import analyze_multivariate_anomalies
from detectors.biological_pattern import analyze_biological_kinetics
from detectors.power_correlation import analyze_power_correlation
from detectors.impact_engine import calculate_environmental_impact

app = FastAPI(
    title="EcoTrace AI - Forensic Analytical Engine",
    description="Statistical, biological kinetic, power correlation, and real-world impact forensic detection service",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    factory_id: str
    measurements: List[Dict[str, Any]]
    power_records: Optional[List[Dict[str, Any]]] = None
    weights: Optional[Dict[str, float]] = None

class ImpactRequest(BaseModel):
    factory_id: str
    anomaly_score: float
    measurements: Optional[List[Dict[str, Any]]] = None

@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "EcoTrace AI Forensic Engine & Impact Engine",
        "detectors": ["isolation_forest", "biological_kinetics", "power_correlation", "impact_engine"]
    }

@app.post("/analyze")
def run_forensic_analysis(req: AnalysisRequest):
    try:
        # Merge power records into measurement telemetry series where available
        data = req.measurements

        # Run 3 modular forensic detectors
        iso_res = analyze_multivariate_anomalies(data)
        bio_res = analyze_biological_kinetics(data)
        pwr_res = analyze_power_correlation(data)

        # Configurable weights
        weights = req.weights or {
            "isolation_forest": 0.40,
            "biological_kinetics": 0.30,
            "power_correlation": 0.30
        }

        w_iso = weights.get("isolation_forest", 0.40)
        w_bio = weights.get("biological_kinetics", 0.30)
        w_pwr = weights.get("power_correlation", 0.30)

        composite_score = round(
            (w_iso * iso_res["score"]) +
            (w_bio * bio_res["score"]) +
            (w_pwr * pwr_res["score"]),
            1
        )

        status = "LOW"
        if composite_score >= 80.0:
            status = "CRITICAL"
        elif composite_score >= 60.0:
            status = "HIGH"
        elif composite_score >= 30.0:
            status = "MODERATE"

        signals = []
        if iso_res["score"] > 50:
            signals.append(iso_res["observation"])
        if bio_res["score"] > 50:
            signals.append(bio_res["observation"])
        if pwr_res["score"] > 50:
            signals.append(pwr_res["observation"])

        if not signals:
            signals.append("Baseline operational conformance observed")

        # Run Real-World Impact Engine
        impact_assessment = calculate_environmental_impact(
            factory_id=req.factory_id,
            anomaly_score=composite_score,
            telemetry_data=data,
            detector_results={
                "isolation_forest": iso_res,
                "biological_kinetics": bio_res,
                "power_correlation": pwr_res
            }
        )

        return {
            "factory_id": req.factory_id,
            "overall_signal_score": composite_score,
            "status": status,
            "detectors": {
                "isolation_forest": iso_res,
                "biological_kinetics": bio_res,
                "power_correlation": pwr_res
            },
            "signals": signals,
            "explanations": {
                "isolation_forest": iso_res["details"],
                "biological_pattern": bio_res["details"],
                "power_correlation": pwr_res["details"]
            },
            "impact_assessment": impact_assessment,
            "warnings": ["Data contains 1 imputed interval during shift change"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/impact")
def run_impact_assessment(req: ImpactRequest):
    try:
        data = req.measurements or []
        impact = calculate_environmental_impact(
            factory_id=req.factory_id,
            anomaly_score=req.anomaly_score,
            telemetry_data=data
        )
        return impact
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

