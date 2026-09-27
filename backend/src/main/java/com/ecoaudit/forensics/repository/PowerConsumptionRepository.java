package com.ecoaudit.forensics.repository;

import com.ecoaudit.forensics.entity.PowerConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PowerConsumptionRepository extends JpaRepository<PowerConsumption, Long> {
    List<PowerConsumption> findByFactoryIdOrderByTimestampAsc(String factoryId);
}
