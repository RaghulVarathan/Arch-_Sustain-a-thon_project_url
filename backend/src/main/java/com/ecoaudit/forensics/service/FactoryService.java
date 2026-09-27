package com.ecoaudit.forensics.service;

import com.ecoaudit.forensics.dto.FactoryDetailDto;
import com.ecoaudit.forensics.dto.FactorySummaryDto;
import com.ecoaudit.forensics.entity.AnalysisResult;
import com.ecoaudit.forensics.entity.Factory;
import com.ecoaudit.forensics.entity.Measurement;
import com.ecoaudit.forensics.entity.PowerConsumption;
import com.ecoaudit.forensics.exception.ResourceNotFoundException;
import com.ecoaudit.forensics.repository.AnalysisResultRepository;
import com.ecoaudit.forensics.repository.FactoryRepository;
import com.ecoaudit.forensics.repository.MeasurementRepository;
import com.ecoaudit.forensics.repository.PowerConsumptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FactoryService {

    private final FactoryRepository factoryRepository;
    private final AnalysisResultRepository analysisResultRepository;
    private final MeasurementRepository measurementRepository;
    private final PowerConsumptionRepository powerConsumptionRepository;

    public FactoryService(FactoryRepository factoryRepository,
                          AnalysisResultRepository analysisResultRepository,
                          MeasurementRepository measurementRepository,
                          PowerConsumptionRepository powerConsumptionRepository) {
        this.factoryRepository = factoryRepository;
        this.analysisResultRepository = analysisResultRepository;
        this.measurementRepository = measurementRepository;
        this.powerConsumptionRepository = powerConsumptionRepository;
    }

    @Transactional(readOnly = true)
    public List<FactorySummaryDto> getAllFactories() {
        List<Factory> factories = factoryRepository.findAll();
        return factories.stream().map(factory -> {
            Optional<AnalysisResult> latestAnalysis = analysisResultRepository.findFirstByFactoryIdOrderByComputedAtDesc(factory.getId());
            Double score = latestAnalysis.map(AnalysisResult::getOverallSignalScore).orElse(0.0);
            String status = latestAnalysis.map(AnalysisResult::getStatus).orElse("LOW");
            String lastAnalyzed = latestAnalysis.map(a -> a.getComputedAt().toString()).orElse(null);
            
            String impactSeverity = latestAnalysis.map(AnalysisResult::getImpactSeverity).orElse("LOW");
            String impactHeadline = latestAnalysis.map(AnalysisResult::getImpactHeadline).orElse("Baseline Conformance");
            Long affectedPopulation = latestAnalysis.map(AnalysisResult::getAffectedPopulation).orElse(0L);
            Double riverOxygenLossPct = latestAnalysis.map(AnalysisResult::getRiverOxygenLossPct).orElse(0.0);
            Double pollutionExcessKgDay = latestAnalysis.map(AnalysisResult::getPollutionExcessKgDay).orElse(0.0);
            String recommendedAction = latestAnalysis.map(AnalysisResult::getRecommendedAction).orElse("Routine Monitoring");
            String receivingWaterbody = latestAnalysis.map(AnalysisResult::getReceivingWaterbody).orElse("Local Receiving Basin");

            return new FactorySummaryDto(
                factory.getId(),
                factory.getName(),
                factory.getLocation(),
                factory.getIndustry(),
                factory.getConsentOrderId(),
                score,
                status,
                latestAnalysis.isPresent() ? 2 : 0,
                lastAnalyzed,
                impactSeverity,
                impactHeadline,
                affectedPopulation,
                riverOxygenLossPct,
                pollutionExcessKgDay,
                recommendedAction,
                receivingWaterbody
            );
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FactoryDetailDto getFactoryDetail(String id) {
        Factory factory = factoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factory with ID " + id + " not found"));

        AnalysisResult latestAnalysis = analysisResultRepository
                .findFirstByFactoryIdOrderByComputedAtDesc(id)
                .orElse(null);

        List<Measurement> measurements = measurementRepository
                .findByFactoryIdOrderByMeasurementDateAscMeasurementTimeAsc(id);

        List<PowerConsumption> power = powerConsumptionRepository
                .findByFactoryIdOrderByTimestampAsc(id);

        return new FactoryDetailDto(factory, latestAnalysis, measurements, power);
    }
}
