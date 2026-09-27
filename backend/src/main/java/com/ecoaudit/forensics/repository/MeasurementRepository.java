package com.ecoaudit.forensics.repository;

import com.ecoaudit.forensics.entity.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    List<Measurement> findByFactoryIdOrderByMeasurementDateAscMeasurementTimeAsc(String factoryId);
    long countByFactoryId(String factoryId);
}
