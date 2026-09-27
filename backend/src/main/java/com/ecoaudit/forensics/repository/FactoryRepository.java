package com.ecoaudit.forensics.repository;

import com.ecoaudit.forensics.entity.Factory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactoryRepository extends JpaRepository<Factory, String> {
}
