package com.ecoaudit.forensics.controller;

import com.ecoaudit.forensics.dto.ApiResponse;
import com.ecoaudit.forensics.dto.InvestigationDto;
import com.ecoaudit.forensics.dto.InvestigationRequest;
import com.ecoaudit.forensics.service.InvestigationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/investigations")
public class InvestigationController {

    private final InvestigationService investigationService;

    public InvestigationController(InvestigationService investigationService) {
        this.investigationService = investigationService;
    }

    @GetMapping
    public ApiResponse<List<InvestigationDto>> getAllInvestigations() {
        return ApiResponse.success(investigationService.getAllInvestigations());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<InvestigationDto> createInvestigation(@Valid @RequestBody InvestigationRequest request) {
        return ApiResponse.success(investigationService.createInvestigation(request), "Investigation created successfully");
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<InvestigationDto> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String notes = body.get("notes");
        return ApiResponse.success(investigationService.updateStatus(id, status, notes), "Status updated successfully");
    }
}
