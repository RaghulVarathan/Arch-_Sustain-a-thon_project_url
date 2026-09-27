package com.ecoaudit.forensics.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Instant;

@Entity
@Table(name = "measurements")
public class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "factory_id", nullable = false, length = 50)
    private String factoryId;

    @Column(name = "parameter_name", nullable = false, length = 50)
    private String parameterName;

    @Column(name = "param_value", nullable = false)
    private Double value;

    @Column(name = "unit", nullable = false, length = 30)
    private String unit;

    @Column(name = "measurement_date", nullable = false)
    private LocalDate measurementDate;

    @Column(name = "measurement_time", nullable = false)
    private LocalTime measurementTime;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public Measurement() {
    }

    public Measurement(String factoryId, String parameterName, Double value, String unit,
                       LocalDate measurementDate, LocalTime measurementTime) {
        this.factoryId = factoryId;
        this.parameterName = parameterName;
        this.value = value;
        this.unit = unit;
        this.measurementDate = measurementDate;
        this.measurementTime = measurementTime;
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

    public String getParameterName() {
        return parameterName;
    }

    public void setParameterName(String parameterName) {
        this.parameterName = parameterName;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public LocalDate getMeasurementDate() {
        return measurementDate;
    }

    public void setMeasurementDate(LocalDate measurementDate) {
        this.measurementDate = measurementDate;
    }

    public LocalTime getMeasurementTime() {
        return measurementTime;
    }

    public void setMeasurementTime(LocalTime measurementTime) {
        this.measurementTime = measurementTime;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
