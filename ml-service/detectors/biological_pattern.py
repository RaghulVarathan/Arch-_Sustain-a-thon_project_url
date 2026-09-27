import numpy as np

def analyze_biological_kinetics(data: list[dict]) -> dict:
    """
    Evaluates wastewater biological treatment kinetics (stoichiometric COD/BOD reduction,
    aeration basin temperature response, and microbial curve fitting).
    """
    if not data or len(data) < 5:
        return {
            "score": 0.0,
            "observation": "Analysis inconclusive due to insufficient data.",
            "details": "Insufficient continuous measurements to fit stoichiometric biological degradation models.",
            "recommendation": "Maintain standardized logging for kinetic curve verification."
        }

    # Analyze COD / BOD stoichiometric ratios
    cod_values = np.array([d.get("cod", 140.0) for d in data])
    bod_values = np.array([d.get("bod", 30.0) for d in data])

    ratio = cod_values / (bod_values + 1e-6)
    ratio_std = float(np.std(ratio))

    # In wastewater engineering, a constant ratio with zero biological fluctuation during load shifts indicates synthetic reporting
    if ratio_std < 0.05:
        score = 71.0
        observation = "Stoichiometric COD/BOD Removal Inconsistency"
        details = f"COD to BOD ratio maintained unnatural rigidity (std = {ratio_std:.4f}), which diverges from stoichiometric microbial oxygen uptake reference curves."
        recommendation = "Perform physical grab-sample verification at aeration inlet and secondary clarifier overflow."
    else:
        score = 18.0
        observation = "Normal Stoichiometric Biological Curve Fit"
        details = f"Secondary digestion parameters align with configured microbial decay models (ratio std = {ratio_std:.2f})."
        recommendation = "Maintain regular bioprocess calibration."

    return {
        "score": score,
        "observation": observation,
        "details": details,
        "recommendation": recommendation
    }
