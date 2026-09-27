package com.ecoaudit.forensics.dto;

import java.time.Instant;

public class InvestigationDto {
    private Long id;
    private String factoryId;
    private String factoryName;
    private String priority;
    private String status;
    private String reason;
    private String notes;
    private String assignedTo;
    private Instant createdAt;
    private Instant updatedAt;

    public InvestigationDto() {
    }

    public InvestigationDto(Long id, String factoryId, String factoryName, String priority, String status,
                            String reason, String notes, String assignedTo, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.factoryId = factoryId;
        this.factoryName = factoryName;
        this.priority = priority;
        this.status = status;
        this.reason = reason;
        this.notes = notes;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(String factoryId) {
        this.factoryId = factoryId;
    }

    public String getFactoryName() {
        return factoryName;
    }

    public void setFactoryName(String factoryName) {
        this.factoryName = factoryName;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
