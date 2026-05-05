package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineRepository extends JpaRepository<Vaccine, Long> {
}





