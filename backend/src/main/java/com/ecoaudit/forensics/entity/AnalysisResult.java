package com.ecoaudit.forensics.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "analysis_results")
public class AnalysisResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "factory_id", nullable = false, length = 50)
    private String factoryId;

    @Column(name = "isolation_forest_score", nullable = false)
    private Double isolationForestScore;

    @Column(name = "biological_pattern_score", nullable = false)
    private Double biologicalPatternScore;

    @Column(name = "power_consumption_score", nullable = false)
    private Double powerConsumptionScore;

    @Column(name = "overall_signal_score", nullable = false)
    private Double overallSignalScore;

    @Column(name = "status", nullable = false, length = 30)
    private String status; // 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'

    @Column(name = "signals", columnDefinition = "TEXT")
    private String signalsJson;

    @Column(name = "explanations", columnDefinition = "TEXT")
    private String explanationsJson;

    // Environmental Impact Engine Fields
    @Column(name = "impact_severity", length = 30)
    private String impactSeverity;

    @Column(name = "impact_headline", length = 500)
    private String impactHeadline;

    @Column(name = "affected_population")
    private Long affectedPopulation;

    @Column(name = "river_oxygen_loss_pct")
    private Double riverOxygenLossPct;

    @Column(name = "oxygen_depletion_mg_l")
    private Double oxygenDepletionMgL;

    @Column(name = "pollution_excess_kg_day")
    private Double pollutionExcessKgDay;

    @Column(name = "recommended_action", length = 1000)
    private String recommendedAction;

    @Column(name = "receiving_waterbody", length = 200)
    private String receivingWaterbody;

    @Column(name = "impact_assessment", columnDefinition = "TEXT")
    private String impactAssessmentJson;

    @Column(name = "computed_at")
    private Instant computedAt = Instant.now();

    public AnalysisResult() {
    }

    public AnalysisResult(String factoryId, Double isolationForestScore, Double biologicalPatternScore,
                          Double powerConsumptionScore, Double overallSignalScore, String status,
                          String signalsJson, String explanationsJson) {
        this.factoryId = factoryId;
        this.isolationForestScore = isolationForestScore;
        this.biologicalPatternScore = biologicalPatternScore;
        this.powerConsumptionScore = powerConsumptionScore;
        this.overallSignalScore = overallSignalScore;
        this.status = status;
        this.signalsJson = signalsJson;
        this.explanationsJson = explanationsJson;
        this.computedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(String factoryId) {
        this.factoryId = factoryId;
    }

    public Double getIsolationForestScore() {
        return isolationForestScore;
    }

    public void setIsolationForestScore(Double isolationForestScore) {
        this.isolationForestScore = isolationForestScore;
    }

    public Double getBiologicalPatternScore() {
        return biologicalPatternScore;
    }

    public void setBiologicalPatternScore(Double biologicalPatternScore) {
        this.biologicalPatternScore = biologicalPatternScore;
    }

    public Double getPowerConsumptionScore() {
        return powerConsumptionScore;
    }

    public void setPowerConsumptionScore(Double powerConsumptionScore) {
        this.powerConsumptionScore = powerConsumptionScore;
    }

    public Double getOverallSignalScore() {
        return overallSignalScore;
    }

    public void setOverallSignalScore(Double overallSignalScore) {
        this.overallSignalScore = overallSignalScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSignalsJson() {
        return signalsJson;
    }

    public void setSignalsJson(String signalsJson) {
        this.signalsJson = signalsJson;
    }

    public String getExplanationsJson() {
        return explanationsJson;
    }

    public void setExplanationsJson(String explanationsJson) {
        this.explanationsJson = explanationsJson;
    }

    public String getImpactSeverity() {
        return impactSeverity;
    }

    public void setImpactSeverity(String impactSeverity) {
        this.impactSeverity = impactSeverity;
    }

    public String getImpactHeadline() {
        return impactHeadline;
    }

    public void setImpactHeadline(String impactHeadline) {
        this.impactHeadline = impactHeadline;
    }

    public Long getAffectedPopulation() {
        return affectedPopulation;
    }

    public void setAffectedPopulation(Long affectedPopulation) {
        this.affectedPopulation = affectedPopulation;
    }

    public Double getRiverOxygenLossPct() {
        return riverOxygenLossPct;
    }

    public void setRiverOxygenLossPct(Double riverOxygenLossPct) {
        this.riverOxygenLossPct = riverOxygenLossPct;
    }

    public Double getOxygenDepletionMgL() {
        return oxygenDepletionMgL;
    }

    public void setOxygenDepletionMgL(Double oxygenDepletionMgL) {
        this.oxygenDepletionMgL = oxygenDepletionMgL;
    }

    public Double getPollutionExcessKgDay() {
        return pollutionExcessKgDay;
    }

    public void setPollutionExcessKgDay(Double pollutionExcessKgDay) {
        this.pollutionExcessKgDay = pollutionExcessKgDay;
    }

    public String getRecommendedAction() {
        return recommendedAction;
    }

    public void setRecommendedAction(String recommendedAction) {
        this.recommendedAction = recommendedAction;
    }

    public String getReceivingWaterbody() {
        return receivingWaterbody;
    }

    public void setReceivingWaterbody(String receivingWaterbody) {
        this.receivingWaterbody = receivingWaterbody;
    }

    public String getImpactAssessmentJson() {
        return impactAssessmentJson;
    }

    public void setImpactAssessmentJson(String impactAssessmentJson) {
        this.impactAssessmentJson = impactAssessmentJson;
    }

    public Instant getComputedAt() {
        return computedAt;
    }

    public void setComputedAt(Instant computedAt) {
        this.computedAt = computedAt;
    }
}
