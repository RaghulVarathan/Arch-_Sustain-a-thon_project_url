# EcoAudit - Pollution Data Forensics & Environmental Intelligence

An environmental intelligence and data forensics platform designed for authorized environmental regulators, analysts, and pollution control officers to identify unusual industrial pollution-reporting patterns and prioritize records for physical or detailed verification.

> **Important Investigative Notice**: This platform is an investigation-support system. An anomaly or high verification priority score does **NOT** prove fraud, manipulation, illegal activity, or wrongdoing. Neutral terminology is used throughout (e.g., *Anomaly detected*, *Unusual pattern*, *Requires verification*, *Investigation signal*).

---

## 🏛️ System Architecture

```
                    React Frontend (Vite + Tailwind + Recharts)
                                      |
                                      | REST API (JSON)
                                      v
                      Spring Boot Backend (Java 17/21+)
                                 /           \
                                /             \
                               v               v
                   PostgreSQL / Supabase    Python FastAPI ML Service
                                                |
                                    ------------------------
                                    |          |           |
                                    v          v           v
                               Isolation   Biological   Power
                                Forest      Pattern     Analysis
```

---

## 📁 Monorepo Structure

```
pollution-data-forensics/
│
├── frontend/               # React (Vite, TypeScript, Tailwind CSS, Recharts, Lucide)
├── backend/                # Spring Boot (Java, Maven, Spring Data JPA, Web, Validation)
├── ml-service/             # Python FastAPI Service (scikit-learn, SciPy, NumPy, pandas)
├── database/               # SQL Schemas & Seed Data
│   ├── schema.sql
│   └── seed.sql
├── dataset/                # Environmental datasets
│   ├── raw/
│   └── processed/
├── docs/                   # Architecture, API specifications, and regulatory notes
├── .gitignore
├── README.md
└── AGENTS.md
```

---

## 🚀 Quick Start (Development)

### Prerequisites
- **Node.js**: v18+ (tested on v24)
- **Java JDK**: 17, 21, or compatible (tested on Java 26)
- **Python**: 3.10+ (tested on Python 3.14)
- **Maven**: 3.8+ (or Maven Wrapper included in backend)

### 1. Database Setup
Execute `database/schema.sql` and `database/seed.sql` on your PostgreSQL or Supabase instance.

### 2. Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
# Server runs at http://localhost:8080 (Health check: http://localhost:8080/api/health)
```

### 3. React Frontend
```bash
cd frontend
npm install
npm run dev
# Vite dev server runs at http://localhost:5173
```

### 4. Python ML Service
```bash
cd ml-service
python -m venv venv
# On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🛡️ Key Principles & Terminology
- **Neutrality**: Uses strictly neutral, objective terminology.
- **Explainability**: Every flag provides contextual rationale, baseline deviations, and recommended verification steps.
- **Configurability**: Scoring weights, thresholds, and baseline assumptions are fully configurable.
