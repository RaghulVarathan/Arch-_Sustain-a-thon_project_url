package com.ecoaudit.forensics.controller;

import com.ecoaudit.forensics.dto.ApiResponse;
import com.ecoaudit.forensics.dto.FactoryDetailDto;
import com.ecoaudit.forensics.dto.FactorySummaryDto;
import com.ecoaudit.forensics.service.FactoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/factories")
public class FactoryController {

    private final FactoryService factoryService;
    private final com.ecoaudit.forensics.service.ForensicAnalysisService forensicAnalysisService;
    private final com.ecoaudit.forensics.repository.AuditTrailRepository auditTrailRepository;

    public FactoryController(FactoryService factoryService,
                             com.ecoaudit.forensics.service.ForensicAnalysisService forensicAnalysisService,
                             com.ecoaudit.forensics.repository.AuditTrailRepository auditTrailRepository) {
        this.factoryService = factoryService;
        this.forensicAnalysisService = forensicAnalysisService;
        this.auditTrailRepository = auditTrailRepository;
    }

    @GetMapping
    public ApiResponse<List<FactorySummaryDto>> getAllFactories() {
        return ApiResponse.success(factoryService.getAllFactories());
    }

    @GetMapping("/{id}")
    public ApiResponse<FactoryDetailDto> getFactoryDetail(@PathVariable String id) {
        return ApiResponse.success(factoryService.getFactoryDetail(id));
    }

    @PostMapping("/analyze/{id}")
    public ApiResponse<com.ecoaudit.forensics.entity.AnalysisResult> triggerAnalysis(@PathVariable String id) {
        return ApiResponse.success(forensicAnalysisService.analyzeFactory(id), "Forensic analysis executed successfully");
    }

    @GetMapping("/{id}/audit-trail")
    public ApiResponse<List<com.ecoaudit.forensics.entity.AuditTrail>> getAuditTrail(@PathVariable String id) {
        return ApiResponse.success(auditTrailRepository.findByFactoryIdOrderByCreatedAtDesc(id));
    }
}
