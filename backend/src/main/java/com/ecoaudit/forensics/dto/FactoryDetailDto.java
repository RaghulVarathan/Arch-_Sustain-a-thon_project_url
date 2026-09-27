package com.ecoaudit.forensics.dto;

import com.ecoaudit.forensics.entity.AnalysisResult;
import com.ecoaudit.forensics.entity.Factory;
import com.ecoaudit.forensics.entity.Measurement;
import com.ecoaudit.forensics.entity.PowerConsumption;

import java.util.List;

public class FactoryDetailDto {
    private Factory factory;
    private AnalysisResult latestAnalysis;
    private List<Measurement> recentMeasurements;
    private List<PowerConsumption> recentPower;

    public FactoryDetailDto() {
    }

    public FactoryDetailDto(Factory factory, AnalysisResult latestAnalysis,
                            List<Measurement> recentMeasurements, List<PowerConsumption> recentPower) {
        this.factory = factory;
        this.latestAnalysis = latestAnalysis;
        this.recentMeasurements = recentMeasurements;
        this.recentPower = recentPower;
    }

    public Factory getFactory() {
        return factory;
    }

    public void setFactory(Factory factory) {
        this.factory = factory;
    }

    public AnalysisResult getLatestAnalysis() {
        return latestAnalysis;
    }

    public void setLatestAnalysis(AnalysisResult latestAnalysis) {
        this.latestAnalysis = latestAnalysis;
    }

    public List<Measurement> getRecentMeasurements() {
        return recentMeasurements;
    }

    public void setRecentMeasurements(List<Measurement> recentMeasurements) {
        this.recentMeasurements = recentMeasurements;
    }

    public List<PowerConsumption> getRecentPower() {
        return recentPower;
    }

    public void setRecentPower(List<PowerConsumption> recentPower) {
        this.recentPower = recentPower;
    }
}
