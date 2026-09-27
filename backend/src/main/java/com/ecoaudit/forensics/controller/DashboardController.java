package com.ecoaudit.forensics.controller;

import com.ecoaudit.forensics.dto.ApiResponse;
import com.ecoaudit.forensics.dto.DashboardSummaryDto;
import com.ecoaudit.forensics.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ApiResponse<DashboardSummaryDto> getSummary() {
        return ApiResponse.success(dashboardService.getSummary());
    }
}
