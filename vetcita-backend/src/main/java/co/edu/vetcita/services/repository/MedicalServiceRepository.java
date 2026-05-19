package co.edu.vetcita.services.repository;

import co.edu.vetcita.services.domain.MedicalService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalServiceRepository extends JpaRepository<MedicalService, Long> {
    List<MedicalService> findByIsActiveTrue();
}