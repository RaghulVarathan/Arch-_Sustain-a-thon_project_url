package com.ecoaudit.forensics.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "investigations")
public class Investigation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "factory_id", nullable = false, length = 50)
    private String factoryId;

    @Column(name = "priority", nullable = false, length = 30)
    private String priority; // 'LOW', 'MEDIUM', 'HIGH', 'URGENT'

    @Column(name = "status", nullable = false, length = 30)
    private String status = "PENDING"; // 'PENDING', 'UNDER_REVIEW', 'VERIFIED', 'CLOSED'

    @Column(name = "reason", nullable = false, length = 500)
    private String reason;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "assigned_to", length = 150)
    private String assignedTo;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public Investigation() {
    }

    public Investigation(String factoryId, String priority, String status, String reason, String notes, String assignedTo) {
        this.factoryId = factoryId;
        this.priority = priority;
        this.status = status != null ? status : "PENDING";
        this.reason = reason;
        this.notes = notes;
        this.assignedTo = assignedTo;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
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
