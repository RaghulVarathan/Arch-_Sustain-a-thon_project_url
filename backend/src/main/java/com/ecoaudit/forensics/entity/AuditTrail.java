package com.ecoaudit.forensics.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "audit_trail")
public class AuditTrail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "factory_id", length = 50)
    private String factoryId;

    @Column(name = "analysis_id")
    private Long analysisId;

    @Column(name = "action", nullable = false, length = 100)
    private String action;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    @Column(name = "performed_by", length = 150)
    private String performedBy = "SYSTEM";

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public AuditTrail() {
    }

    public AuditTrail(String factoryId, Long analysisId, String action, String details, String performedBy) {
        this.factoryId = factoryId;
        this.analysisId = analysisId;
        this.action = action;
        this.details = details;
        this.performedBy = performedBy != null ? performedBy : "SYSTEM";
        this.createdAt = Instant.now();
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

    public Long getAnalysisId() {
        return analysisId;
    }

    public void setAnalysisId(Long analysisId) {
        this.analysisId = analysisId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
