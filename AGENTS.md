# AGENTS.md - Operational Instructions for AI Agents

## Project Identity
- **Project Name:** EcoAudit - Pollution Data Forensics
- **Role:** Environmental Intelligence & Investigation Platform for Industrial Pollution Reporting Anomaly Detection.

## Guiding Engineering & Domain Principles
1. **Neutral Terminology is Mandatory**:
   - Never use accusatory terms like "fraud", "cheating", "fake", "malicious", or "guilty".
   - Always use: "Anomaly detected", "Unusual pattern", "Requires verification", "Investigation signal", "Data inconsistency", "Verification priority".
2. **Investigation Support System**:
   - An anomaly is a statistical or biological pattern deviation, NOT a legal conclusion.
   - Every metric or score must be explainable: State what was observed, when, which data caused it, and why physical/auditory verification is advised.
3. **Layered Architecture & Boundaries**:
   - React Frontend communicates ONLY with Spring Boot Backend over REST.
   - Spring Boot handles database transactions (PostgreSQL/Supabase) and ML service orchestration (FastAPI).
   - React NEVER connects directly to PostgreSQL or Python ML service.
4. **Design & Aesthetics**:
   - Professional, data-driven, clean, and scientific UI.
   - Semantic color system: Green (Low verification priority), Amber (Moderate), Orange (High), Red (Critical).
   - Color is always accompanied by descriptive text and icons for accessibility.
5. **Incremental Delivery**:
   - Follow systematic checkpoints without jumping ahead.
   - Thoroughly test and verify builds at each stage.
