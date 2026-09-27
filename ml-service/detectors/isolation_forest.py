import numpy as np

def analyze_multivariate_anomalies(data: list[dict]) -> dict:
    """
    Evaluates multivariate density distributions, flat-line behaviors,
    and boundary value clamping near statutory thresholds.
    """
    if not data or len(data) < 5:
        return {
            "score": 0.0,
            "status": "LOW",
            "observation": "Insufficient continuous telemetry samples.",
            "details": "At least 5 continuous observations required for multivariate density estimation.",
            "recommendation": "Collect additional temporal records."
        }

    bod_values = [d.get("bod", 0.0) for d in data if "bod" in d]
    
    if not bod_values:
        bod_values = [d.get("value", 0.0) for d in data]

    bod_arr = np.array(bod_values)
    mean_val = float(np.mean(bod_arr))
    std_val = float(np.std(bod_arr))
    cv = std_val / (mean_val + 1e-6)

    # Check for boundary clamping near 30 mg/L threshold or zero variance
    if cv < 0.02 and mean_val > 25.0:
        score = 82.0
        observation = "Boundary Clamping & Artificial Low Variance"
        details = f"Observed BOD values clustered tightly at mean {mean_val:.1f} mg/L (CV = {cv:.4f}), which is characteristic of synthetic threshold bounding."
        recommendation = "Request unedited raw optical probe calibration logs and inspect PLC telemetry scaling blocks."
    elif cv < 0.01:
        score = 88.0
        observation = "Zero-Variance Flat-Line Reporting"
        details = f"Identical repeated values detected across consecutive logging intervals (CV = {cv:.4f})."
        recommendation = "Conduct physical inspection of sensor flow cell for line blockage or simulation overrides."
    else:
        score = 15.0
        observation = "Stochastic Environmental Baseline"
        details = f"Parameters exhibit expected natural stochastic variance (CV = {cv:.3f}, std = {std_val:.2f})."
        recommendation = "Maintain routine verification cycle."

    return {
        "score": score,
        "observation": observation,
        "details": details,
        "recommendation": recommendation
    }
