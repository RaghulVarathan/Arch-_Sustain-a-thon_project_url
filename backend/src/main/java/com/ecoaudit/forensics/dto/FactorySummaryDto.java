package com.ecoaudit.forensics.dto;

public class FactorySummaryDto {
    private String id;
    private String name;
    private String location;
    private String industry;
    private String consentOrderId;
    private Double overallSignalScore;
    private String status;
    private int activeSignalsCount;
    private String lastAnalyzed;

    // Environmental Impact Engine Fields
    private String impactSeverity;
    private String impactHeadline;
    private Long affectedPopulation;
    private Double riverOxygenLossPct;
    private Double pollutionExcessKgDay;
    private String recommendedAction;
    private String receivingWaterbody;

    public FactorySummaryDto() {
    }

    public FactorySummaryDto(String id, String name, String location, String industry, String consentOrderId,
                             Double overallSignalScore, String status, int activeSignalsCount, String lastAnalyzed) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.industry = industry;
        this.consentOrderId = consentOrderId;
        this.overallSignalScore = overallSignalScore;
        this.status = status;
        this.activeSignalsCount = activeSignalsCount;
        this.lastAnalyzed = lastAnalyzed;
    }

    public FactorySummaryDto(String id, String name, String location, String industry, String consentOrderId,
                             Double overallSignalScore, String status, int activeSignalsCount, String lastAnalyzed,
                             String impactSeverity, String impactHeadline, Long affectedPopulation,
                             Double riverOxygenLossPct, Double pollutionExcessKgDay, String recommendedAction,
                             String receivingWaterbody) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.industry = industry;
        this.consentOrderId = consentOrderId;
        this.overallSignalScore = overallSignalScore;
        this.status = status;
        this.activeSignalsCount = activeSignalsCount;
        this.lastAnalyzed = lastAnalyzed;
        this.impactSeverity = impactSeverity;
        this.impactHeadline = impactHeadline;
        this.affectedPopulation = affectedPopulation;
        this.riverOxygenLossPct = riverOxygenLossPct;
        this.pollutionExcessKgDay = pollutionExcessKgDay;
        this.recommendedAction = recommendedAction;
        this.receivingWaterbody = receivingWaterbody;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getConsentOrderId() {
        return consentOrderId;
    }

    public void setConsentOrderId(String consentOrderId) {
        this.consentOrderId = consentOrderId;
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

    public int getActiveSignalsCount() {
        return activeSignalsCount;
    }

    public void setActiveSignalsCount(int activeSignalsCount) {
        this.activeSignalsCount = activeSignalsCount;
    }

    public String getLastAnalyzed() {
        return lastAnalyzed;
    }

    public void setLastAnalyzed(String lastAnalyzed) {
        this.lastAnalyzed = lastAnalyzed;
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
}
