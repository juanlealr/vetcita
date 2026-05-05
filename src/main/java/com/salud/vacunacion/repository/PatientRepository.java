package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByidentification(String identification);
}





