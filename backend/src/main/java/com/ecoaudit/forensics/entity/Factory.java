package com.ecoaudit.forensics.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "factories")
public class Factory {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "industry", nullable = false, length = 100)
    private String industry;

    @Column(name = "consent_order_id", length = 100)
    private String consentOrderId;

    @Column(name = "contact_person", length = 150)
    private String contactPerson;

    @Column(name = "contact_email", length = 150)
    private String contactEmail;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public Factory() {
    }

    public Factory(String id, String name, String location, String industry, String consentOrderId) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.industry = industry;
        this.consentOrderId = consentOrderId;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getConsentOrderId() {
        return consentOrderId;
    }

    public void setConsentOrderId(String consentOrderId) {
        this.consentOrderId = consentOrderId;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
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
