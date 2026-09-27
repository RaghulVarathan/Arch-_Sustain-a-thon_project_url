# EcoAudit System Architecture & Forensic Engine Design

## Overview
EcoAudit is an environmental intelligence platform for identifying data inconsistencies and unusual reporting patterns in continuous effluent and air emissions data.

## Key Subsystems
1. **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + Recharts + Lucide Icons
2. **Backend**: Java 17/21 + Spring Boot 3 + Spring Data JPA + PostgreSQL Driver + Bean Validation
3. **ML Forensic Service**: Python 3.10+ + FastAPI + scikit-learn + SciPy + NumPy + pandas
4. **Database**: PostgreSQL (Supabase / local PostgreSQL)

## The Three Forensic Detectors
1. **Isolation Forest Multivariate Detector**: Detects multivariate anomalies, value clamping near regulatory boundaries, identical digit distributions (Benford's Law violation tendencies), and flat-line reporting.
2. **Biological & Treatment Kinetics Analyzer**: Evaluates wastewater treatment kinetics (BOD/COD stoichiometric decay curves, aeration basin dissolved oxygen uptake, temperature coefficient response).
3. **Power-to-Effluent Correlation Analyzer**: Evaluates electrical power consumption against wastewater volume throughput and aeration equipment activity.
