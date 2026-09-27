package com.ecoaudit.forensics.dto;

import java.util.List;
import java.util.Map;

public class ImpactAssessmentDto {
    private String factoryId;
    private String impactSeverity;
    private String impactHeadline;
    private Long affectedPopulation;
    private Double riverOxygenLossPct;
    private Double oxygenDepletionMgL;
    private Double pollutionExcessKgDay;
    private Double pollutionExcessPct;
    private String receivingWaterbody;
    private Double baselineDoMgL;
    private List<String> criticalIntakes;
    private String recommendedAction;
    private String actionVerb;
    private List<String> ecologicalRisks;
    private List<Map<String, Object>> oxygenSagCurve;

    public ImpactAssessmentDto() {
    }

    public String getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(String factoryId) {
        this.factoryId = factoryId;
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

    public Double getPollutionExcessPct() {
        return pollutionExcessPct;
    }

    public void setPollutionExcessPct(Double pollutionExcessPct) {
        this.pollutionExcessPct = pollutionExcessPct;
    }

    public String getReceivingWaterbody() {
        return receivingWaterbody;
    }

    public void setReceivingWaterbody(String receivingWaterbody) {
        this.receivingWaterbody = receivingWaterbody;
    }

    public Double getBaselineDoMgL() {
        return baselineDoMgL;
    }

    public void setBaselineDoMgL(Double baselineDoMgL) {
        this.baselineDoMgL = baselineDoMgL;
    }

    public List<String> getCriticalIntakes() {
        return criticalIntakes;
    }

    public void setCriticalIntakes(List<String> criticalIntakes) {
        this.criticalIntakes = criticalIntakes;
    }

    public String getRecommendedAction() {
        return recommendedAction;
    }

    public void setRecommendedAction(String recommendedAction) {
        this.recommendedAction = recommendedAction;
    }

    public String getActionVerb() {
        return actionVerb;
    }

    public void setActionVerb(String actionVerb) {
        this.actionVerb = actionVerb;
    }

    public List<String> getEcologicalRisks() {
        return ecologicalRisks;
    }

    public void setEcologicalRisks(List<String> ecologicalRisks) {
        this.ecologicalRisks = ecologicalRisks;
    }

    public List<Map<String, Object>> getOxygenSagCurve() {
        return oxygenSagCurve;
    }

    public void setOxygenSagCurve(List<Map<String, Object>> oxygenSagCurve) {
        this.oxygenSagCurve = oxygenSagCurve;
    }
}
