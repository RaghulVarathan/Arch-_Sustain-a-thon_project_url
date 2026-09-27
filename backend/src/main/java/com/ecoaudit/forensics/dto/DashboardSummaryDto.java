package com.ecoaudit.forensics.dto;

import java.util.Map;

public class DashboardSummaryDto {
    private long totalFactories;
    private long recordsAnalyzed;
    private long anomaliesDetected;
    private long requiresVerification;
    private Map<String, Long> statusDistribution;

    // Environmental Impact Aggregates
    private long totalAffectedPopulation;
    private long criticalOxygenLossAlerts;
    private double totalExcessPollutionKgDay;
    private long highImpactCount;

    public DashboardSummaryDto() {
    }

    public DashboardSummaryDto(long totalFactories, long recordsAnalyzed, long anomaliesDetected,
                               long requiresVerification, Map<String, Long> statusDistribution) {
        this.totalFactories = totalFactories;
        this.recordsAnalyzed = recordsAnalyzed;
        this.anomaliesDetected = anomaliesDetected;
        this.requiresVerification = requiresVerification;
        this.statusDistribution = statusDistribution;
    }

    public DashboardSummaryDto(long totalFactories, long recordsAnalyzed, long anomaliesDetected,
                               long requiresVerification, Map<String, Long> statusDistribution,
                               long totalAffectedPopulation, long criticalOxygenLossAlerts,
                               double totalExcessPollutionKgDay, long highImpactCount) {
        this.totalFactories = totalFactories;
        this.recordsAnalyzed = recordsAnalyzed;
        this.anomaliesDetected = anomaliesDetected;
        this.requiresVerification = requiresVerification;
        this.statusDistribution = statusDistribution;
        this.totalAffectedPopulation = totalAffectedPopulation;
        this.criticalOxygenLossAlerts = criticalOxygenLossAlerts;
        this.totalExcessPollutionKgDay = totalExcessPollutionKgDay;
        this.highImpactCount = highImpactCount;
    }

    public long getTotalFactories() {
        return totalFactories;
    }

    public void setTotalFactories(long totalFactories) {
        this.totalFactories = totalFactories;
    }

    public long getRecordsAnalyzed() {
        return recordsAnalyzed;
    }

    public void setRecordsAnalyzed(long recordsAnalyzed) {
        this.recordsAnalyzed = recordsAnalyzed;
    }

    public long getAnomaliesDetected() {
        return anomaliesDetected;
    }

    public void setAnomaliesDetected(long anomaliesDetected) {
        this.anomaliesDetected = anomaliesDetected;
    }

    public long getRequiresVerification() {
        return requiresVerification;
    }

    public void setRequiresVerification(long requiresVerification) {
        this.requiresVerification = requiresVerification;
    }

    public Map<String, Long> getStatusDistribution() {
        return statusDistribution;
    }

    public void setStatusDistribution(Map<String, Long> statusDistribution) {
        this.statusDistribution = statusDistribution;
    }

    public long getTotalAffectedPopulation() {
        return totalAffectedPopulation;
    }

    public void setTotalAffectedPopulation(long totalAffectedPopulation) {
        this.totalAffectedPopulation = totalAffectedPopulation;
    }

    public long getCriticalOxygenLossAlerts() {
        return criticalOxygenLossAlerts;
    }

    public void setCriticalOxygenLossAlerts(long criticalOxygenLossAlerts) {
        this.criticalOxygenLossAlerts = criticalOxygenLossAlerts;
    }

    public double getTotalExcessPollutionKgDay() {
        return totalExcessPollutionKgDay;
    }

    public void setTotalExcessPollutionKgDay(double totalExcessPollutionKgDay) {
        this.totalExcessPollutionKgDay = totalExcessPollutionKgDay;
    }

    public long getHighImpactCount() {
        return highImpactCount;
    }

    public void setHighImpactCount(long highImpactCount) {
        this.highImpactCount = highImpactCount;
    }
}
