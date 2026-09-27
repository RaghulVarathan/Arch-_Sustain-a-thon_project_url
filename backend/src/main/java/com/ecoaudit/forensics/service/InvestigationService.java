package com.ecoaudit.forensics.service;

import com.ecoaudit.forensics.dto.InvestigationDto;
import com.ecoaudit.forensics.dto.InvestigationRequest;
import com.ecoaudit.forensics.entity.AuditTrail;
import com.ecoaudit.forensics.entity.Factory;
import com.ecoaudit.forensics.entity.Investigation;
import com.ecoaudit.forensics.exception.ResourceNotFoundException;
import com.ecoaudit.forensics.repository.AuditTrailRepository;
import com.ecoaudit.forensics.repository.FactoryRepository;
import com.ecoaudit.forensics.repository.InvestigationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InvestigationService {

    private final InvestigationRepository investigationRepository;
    private final FactoryRepository factoryRepository;
    private final AuditTrailRepository auditTrailRepository;

    public InvestigationService(InvestigationRepository investigationRepository,
                                FactoryRepository factoryRepository,
                                AuditTrailRepository auditTrailRepository) {
        this.investigationRepository = investigationRepository;
        this.factoryRepository = factoryRepository;
        this.auditTrailRepository = auditTrailRepository;
    }

    @Transactional(readOnly = true)
    public List<InvestigationDto> getAllInvestigations() {
        Map<String, String> factoryNames = factoryRepository.findAll().stream()
                .collect(Collectors.toMap(Factory::getId, Factory::getName, (a, b) -> a));

        return investigationRepository.findByOrderByCreatedAtDesc().stream().map(inv ->
                new InvestigationDto(
                        inv.getId(),
                        inv.getFactoryId(),
                        factoryNames.getOrDefault(inv.getFactoryId(), inv.getFactoryId()),
                        inv.getPriority(),
                        inv.getStatus(),
                        inv.getReason(),
                        inv.getNotes(),
                        inv.getAssignedTo(),
                        inv.getCreatedAt(),
                        inv.getUpdatedAt()
                )
        ).collect(Collectors.toList());
    }

    @Transactional
    public InvestigationDto createInvestigation(InvestigationRequest request) {
        Investigation investigation = new Investigation(
                request.getFactoryId(),
                request.getPriority(),
                "PENDING",
                request.getReason(),
                request.getNotes(),
                request.getAssignedTo()
        );

        Investigation saved = investigationRepository.save(investigation);

        auditTrailRepository.save(new AuditTrail(
                request.getFactoryId(),
                null,
                "CREATE_INVESTIGATION",
                "Formal verification audit initiated: " + request.getReason(),
                "USER"
        ));

        String factoryName = factoryRepository.findById(request.getFactoryId())
                .map(Factory::getName).orElse(request.getFactoryId());

        return new InvestigationDto(
                saved.getId(),
                saved.getFactoryId(),
                factoryName,
                saved.getPriority(),
                saved.getStatus(),
                saved.getReason(),
                saved.getNotes(),
                saved.getAssignedTo(),
                saved.getCreatedAt(),
                saved.getUpdatedAt()
        );
    }

    @Transactional
    public InvestigationDto updateStatus(Long id, String newStatus, String notes) {
        Investigation inv = investigationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Investigation with ID " + id + " not found"));

        inv.setStatus(newStatus);
        if (notes != null && !notes.isBlank()) {
            inv.setNotes(inv.getNotes() != null ? inv.getNotes() + "\n" + notes : notes);
        }
        inv.setUpdatedAt(Instant.now());

        Investigation updated = investigationRepository.save(inv);

        auditTrailRepository.save(new AuditTrail(
                inv.getFactoryId(),
                null,
                "UPDATE_INVESTIGATION_STATUS",
                "Status changed to " + newStatus,
                "USER"
        ));

        String factoryName = factoryRepository.findById(inv.getFactoryId())
                .map(Factory::getName).orElse(inv.getFactoryId());

        return new InvestigationDto(
                updated.getId(),
                updated.getFactoryId(),
                factoryName,
                updated.getPriority(),
                updated.getStatus(),
                updated.getReason(),
                updated.getNotes(),
                updated.getAssignedTo(),
                updated.getCreatedAt(),
                updated.getUpdatedAt()
        );
    }
}
