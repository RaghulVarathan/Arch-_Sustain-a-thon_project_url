---
name: forensic-verification
description: >-
  Standard Operating Procedure for evaluating industrial pollution telemetry anomalies,
  running the 3 forensic detectors (Isolation Forest, Biological Kinetics, Power Draw),
  and generating explainable regulatory verification reports.
---

# Industrial Pollution Forensics & Verification Playbook

This skill provides step-by-step procedures for investigating continuous effluent telemetry anomalies using the EcoTrace AI platform.

---

## 🔬 Forensic Verification Workflow

```
[Telemetry Ingestion] ─► [Structural Validation] ─► [3-Layer Detector Ensemble] ─► [Evidence Synthesis] ─► [Verification Audit]
```

### Stage 1: Ingestion & Telemetry Range Validation
1. Verify presence of required fields: `factory_id`, `timestamp` (ISO-8601), `parameter`, `value`, `power_kwh`.
2. Inspect parameter bounds against physical sensor saturation limits:
   - Effluent pH: $6.0 \le \text{pH} \le 9.0$
   - BOD: $0 \le \text{BOD} \le 100\text{ mg/L}$
   - COD: $0 \le \text{COD} \le 500\text{ mg/L}$
   - TSS: $0 \le \text{TSS} \le 200\text{ mg/L}$

### Stage 2: Three-Layer Forensic Detection

#### Detector 1: Isolation Forest & Multivariate Clamping
- Check for low coefficient of variation ($\text{CV} < 0.02$) immediately below statutory consent limits (e.g. BOD consistently at 29.2–29.8 mg/L against a 30.0 mg/L limit).
- Output: Anomaly score and unedited PLC raw probe log request.

#### Detector 2: Stoichiometric Biological Kinetics
- Fit secondary clarifier digestion to stoichiometric microbial curves.
- Flag unnatural rigidity in COD/BOD ratios ($\sigma_{\text{ratio}} < 0.05$) during temperature swings.
- Output: Recommended grab-sample audit at aeration inlet and overflow weir.

#### Detector 3: Power vs Hydraulic Flow Correlation
- Calculate Pearson correlation coefficient ($r$) between ETP blower/pump electrical kWh and discharge flow volume ($m^3/\text{hr}$).
- Flag flat-line energy draws during reported discharge surges ($r < 0.1$ or $r < 0$).
- Output: Utility smart-meter interval cross-referencing protocol.

### Stage 3: Composite Verification Scoring & Prioritization
$$\text{Overall Priority Score} = 0.40 \cdot S_{\text{ISO}} + 0.30 \cdot S_{\text{BIO}} + 0.30 \cdot S_{\text{PWR}}$$

- **LOW ($0-30$)**: Standard surveillance baseline.
- **MODERATE ($31-60$)**: Desk review and sensor calibration audit.
- **HIGH ($61-80$)**: Formal verification case within 48 hours.
- **CRITICAL ($81-100$)**: Immediate field inspection and split grab-sample protocol.
