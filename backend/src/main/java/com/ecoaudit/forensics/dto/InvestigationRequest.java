package com.ecoaudit.forensics.dto;

import jakarta.validation.constraints.NotBlank;

public class InvestigationRequest {

    @NotBlank(message = "Factory ID is required")
    private String factoryId;

    @NotBlank(message = "Priority is required")
    private String priority; // 'LOW', 'MEDIUM', 'HIGH', 'URGENT'

    @NotBlank(message = "Reason is required")
    private String reason;

    private String notes;
    private String assignedTo;

    public InvestigationRequest() {
    }

    public String getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(String factoryId) {
        this.factoryId = factoryId;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }
}
