package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.VaccinationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VaccinationRecordRepository extends JpaRepository<VaccinationRecord, Long> {
    List<VaccinationRecord> findByPatientId(Long patientId);
}





