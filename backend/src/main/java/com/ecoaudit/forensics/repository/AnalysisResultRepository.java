package com.ecoaudit.forensics.repository;

import com.ecoaudit.forensics.entity.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {
    Optional<AnalysisResult> findFirstByFactoryIdOrderByComputedAtDesc(String factoryId);
    List<AnalysisResult> findByOrderByOverallSignalScoreDesc();
    long countByStatusIn(List<String> statuses);
}
