package co.edu.vetcita.vets.repository;

import co.edu.vetcita.vets.domain.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface VetRepository extends JpaRepository<Vet, Long> {

    @Query("SELECT v FROM Vet v JOIN v.serviceIds s WHERE v.isActive = true AND s = :serviceId")
    List<Vet> findVetsByServiceId(@Param("serviceId") Long serviceId);
    
    Optional<Vet> findByEmail(String email);
}