package com.ecoaudit.forensics.repository;

import com.ecoaudit.forensics.entity.Investigation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestigationRepository extends JpaRepository<Investigation, Long> {
    List<Investigation> findByOrderByCreatedAtDesc();
    List<Investigation> findByFactoryIdOrderByCreatedAtDesc(String factoryId);
}
