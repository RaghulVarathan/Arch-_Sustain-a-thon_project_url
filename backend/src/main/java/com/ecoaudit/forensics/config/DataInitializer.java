package com.ecoaudit.forensics.config;

import com.ecoaudit.forensics.entity.AnalysisResult;
import com.ecoaudit.forensics.entity.Factory;
import com.ecoaudit.forensics.entity.Investigation;
import com.ecoaudit.forensics.entity.Measurement;
import com.ecoaudit.forensics.entity.PowerConsumption;
import com.ecoaudit.forensics.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final FactoryRepository factoryRepository;
    private final AnalysisResultRepository analysisResultRepository;
    private final InvestigationRepository investigationRepository;
    private final MeasurementRepository measurementRepository;
    private final PowerConsumptionRepository powerConsumptionRepository;

    public DataInitializer(FactoryRepository factoryRepository,
                           AnalysisResultRepository analysisResultRepository,
                           InvestigationRepository investigationRepository,
                           MeasurementRepository measurementRepository,
                           PowerConsumptionRepository powerConsumptionRepository) {
        this.factoryRepository = factoryRepository;
        this.analysisResultRepository = analysisResultRepository;
        this.investigationRepository = investigationRepository;
        this.measurementRepository = measurementRepository;
        this.powerConsumptionRepository = powerConsumptionRepository;
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public void run(String... args) {
        if (factoryRepository.count() == 0) {
            Factory f1 = new Factory("FAC-001", "AeroChem Specialty Organics", "Manali Industrial Area, Chennai", "Chemical Manufacturing", "CTO-CHE-2024-8841");
            Factory f2 = new Factory("FAC-002", "Brahmaputra Pulp & Paper Ltd", "Cachar Industrial Estate, Assam", "Pulp & Paper", "CTO-PAP-2023-1029");
            Factory f3 = new Factory("FAC-003", "Apex Tannery & Leatherworks", "Ranipet SIPCOT, Tamil Nadu", "Tannery / Leather", "CTO-TAN-2024-4412");
            Factory f4 = new Factory("FAC-004", "Vanguard Dyeing & Textile Mills", "Tirupur Textile Hub, Tamil Nadu", "Textiles & Dyeing", "CTO-TEX-2024-9031");

            factoryRepository.saveAll(List.of(f3, f1, f4, f2));

            // FAC-003: Apex Tannery (CRITICAL)
            AnalysisResult ar3 = new AnalysisResult("FAC-003", 89.0, 84.0, 91.0, 88.1, "CRITICAL",
                    "[\"Repetitive identical TSS values across shift logs\", \"Biological kinetics inconsistent with aeration tank temperature\", \"Effluent volume reported without corresponding pump power draw\"]",
                    "{\"isolation_forest\": \"Zero variance detected across consecutive 72-hour TSS logs at exactly 45.0 mg/L.\", \"biological_pattern\": \"Secondary clarifier digestion kinetics fail standard Arrhenius temperature dependence.\", \"power_correlation\": \"Negative correlation (r = -0.68) between primary pump kWh and reported cubic meter discharge.\"}");
            ar3.setImpactSeverity("CRITICAL");
            ar3.setImpactHeadline("Critical – 85,000 people affected – 28% oxygen loss – Investigate Immediately.");
            ar3.setAffectedPopulation(85000L);
            ar3.setRiverOxygenLossPct(28.0);
            ar3.setOxygenDepletionMgL(2.02);
            ar3.setPollutionExcessKgDay(676.4);
            ar3.setRecommendedAction("Deploy rapid mobile water quality inspection team to Palar River Basin (River Km 3.5 intake). Initiate unannounced physical audit of secondary clarifier and power sub-meter.");
            ar3.setReceivingWaterbody("Palar River Basin - Sub-reach 7");

            // FAC-001: AeroChem Organics (HIGH)
            AnalysisResult ar1 = new AnalysisResult("FAC-001", 82.0, 71.0, 88.0, 80.5, "HIGH",
                    "[\"Unusual multivariate BOD/COD ratio variance\", \"Inconsistent dissolved oxygen vs aeration pattern\", \"Sub-meter power deficit during peak discharge reporting\"]",
                    "{\"isolation_forest\": \"Multivariate clustering observed near regulatory threshold bounds (BOD at 29.2-29.8 mg/L against 30.0 limit).\", \"biological_pattern\": \"Observed COD removal rate deviated by 38% from stoichiometric oxygen uptake reference curves.\", \"power_correlation\": \"ETP blower electricity consumption flatlined while reported hydraulic wastewater throughput increased by 42%.\"}");
            ar1.setImpactSeverity("HIGH");
            ar1.setImpactHeadline("High – 62,000 people affected – 22% oxygen loss – High Priority Field Verification.");
            ar1.setAffectedPopulation(62000L);
            ar1.setRiverOxygenLossPct(22.5);
            ar1.setOxygenDepletionMgL(1.66);
            ar1.setPollutionExcessKgDay(412.0);
            ar1.setRecommendedAction("Issue statutory 48-hour data clarification notice. Verify continuous effluent DO probes and inspect downstream municipal abstraction point.");
            ar1.setReceivingWaterbody("Kosasthalaiyar River Reach - Basin 3A");

            // FAC-004: Vanguard Dyeing (MODERATE)
            AnalysisResult ar4 = new AnalysisResult("FAC-004", 45.0, 52.0, 48.0, 48.0, "MODERATE",
                    "[\"Occasional diurnal timing deviations in pH reporting\", \"Mild seasonal temperature lag\"]",
                    "{\"isolation_forest\": \"Slight clustering during weekend shift handovers.\", \"biological_pattern\": \"Biological treatment kinetics within expected parameters.\", \"power_correlation\": \"Minor lag in variable frequency drive response curve.\"}");
            ar4.setImpactSeverity("MODERATE");
            ar4.setImpactHeadline("Moderate – 38,000 people affected – 12% oxygen loss – Scheduled Verification.");
            ar4.setAffectedPopulation(38000L);
            ar4.setRiverOxygenLossPct(12.0);
            ar4.setOxygenDepletionMgL(0.82);
            ar4.setPollutionExcessKgDay(145.0);
            ar4.setRecommendedAction("Schedule routine sensor calibration check during upcoming weekly compliance cycle.");
            ar4.setReceivingWaterbody("Noyyal River - Tirupur Downstream");

            // FAC-002: Brahmaputra Pulp (LOW)
            AnalysisResult ar2 = new AnalysisResult("FAC-002", 12.0, 18.0, 15.0, 14.7, "LOW",
                    "[\"Stable biological kinetics\", \"Normal power-to-throughput correlation\"]",
                    "{\"isolation_forest\": \"All effluent parameters follow standard stochastic distribution.\", \"biological_pattern\": \"Aeration basin kinetics match pilot empirical calibration curve (R² = 0.94).\", \"power_correlation\": \"Strong positive correlation (r = 0.91) between aeration wattage and organic loading.\"}");
            ar2.setImpactSeverity("LOW");
            ar2.setImpactHeadline("Low Impact – Baseline Assimilative Capacity Preserved (0 downstream risk) – Routine Monitoring.");
            ar2.setAffectedPopulation(0L);
            ar2.setRiverOxygenLossPct(2.1);
            ar2.setOxygenDepletionMgL(0.17);
            ar2.setPollutionExcessKgDay(0.0);
            ar2.setRecommendedAction("Maintain continuous automated telemetry surveillance.");
            ar2.setReceivingWaterbody("Brahmaputra Tributary - Reach C4");

            analysisResultRepository.saveAll(List.of(ar3, ar1, ar4, ar2));

            Investigation inv1 = new Investigation("FAC-003", "HIGH", "UNDER_REVIEW", "Zero-variance TSS reporting and inverse power-to-discharge correlation requiring physical sensor audit", "Preliminary review indicates potential sensor bypass or calibration lock. Field inspection scheduled.", "Officer K. Venkatesh");
            Investigation inv2 = new Investigation("FAC-001", "MEDIUM", "PENDING", "Power deficit during high-volume discharge periods", "Requested sub-meter utility logs from State Electricity Board.", "Analyst S. Priya");

            investigationRepository.saveAll(List.of(inv1, inv2));

            // Initial measurements
            measurementRepository.save(new Measurement("FAC-001", "BOD", 29.4, "mg/L", LocalDate.now(), LocalTime.of(0, 0)));
            measurementRepository.save(new Measurement("FAC-001", "COD", 140.0, "mg/L", LocalDate.now(), LocalTime.of(0, 0)));
            measurementRepository.save(new Measurement("FAC-001", "BOD", 29.5, "mg/L", LocalDate.now(), LocalTime.of(4, 0)));
            measurementRepository.save(new Measurement("FAC-001", "COD", 138.0, "mg/L", LocalDate.now(), LocalTime.of(4, 0)));

            powerConsumptionRepository.save(new PowerConsumption("FAC-001", Instant.now().minusSeconds(14400), 42.0, "SMART_METER"));
            powerConsumptionRepository.save(new PowerConsumption("FAC-001", Instant.now(), 41.5, "SMART_METER"));
        }
    }
}
