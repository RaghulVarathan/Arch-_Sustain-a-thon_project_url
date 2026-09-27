package com.ecoaudit.forensics.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "power_consumption")
public class PowerConsumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "factory_id", nullable = false, length = 50)
    private String factoryId;

    @Column(name = "reading_timestamp", nullable = false)
    private Instant timestamp;

    @Column(name = "total_kwh", nullable = false)
    private Double totalKwh;

    @Column(name = "source", length = 50)
    private String source = "SMART_METER";

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public PowerConsumption() {
    }

    public PowerConsumption(String factoryId, Instant timestamp, Double totalKwh, String source) {
        this.factoryId = factoryId;
        this.timestamp = timestamp;
        this.totalKwh = totalKwh;
        this.source = source != null ? source : "SMART_METER";
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

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Double getTotalKwh() {
        return totalKwh;
    }

    public void setTotalKwh(Double totalKwh) {
        this.totalKwh = totalKwh;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
