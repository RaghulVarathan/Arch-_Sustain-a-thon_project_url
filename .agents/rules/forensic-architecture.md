---
trigger: always_on
---

# EcoTrace AI Architecture & Boundary Rules

1. **Strict Layer Separation**:
   - React Frontend communicates ONLY with Spring Boot Backend over REST.
   - Spring Boot orchestrates database transactions (PostgreSQL/Supabase) and ML microservices (FastAPI).
   - React NEVER connects directly to PostgreSQL or Python ML service.

2. **Security & Credentials**:
   - Database credentials, service-role tokens, and backend internal endpoints must never be exposed to the client bundle.
   - All external endpoints must use environment variables (`VITE_API_BASE_URL`, `DATABASE_URL`, `ML_SERVICE_URL`).

3. **Detector Modularity**:
   - The system maintains 3 distinct forensic detectors:
     1. Isolation Forest (Multivariate density, digit entropy & regulatory boundary clamping).
     2. Biological / Treatment Kinetics (Stoichiometric COD/BOD reductions & Arrhenius curve fits).
     3. Power vs Wastewater Flow (ETP sub-meter kWh correlation against hydraulic throughput).
