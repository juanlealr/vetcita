package co.edu.vetcita.pets.repository;

import co.edu.vetcita.pets.domain.Pet;
import co.edu.vetcita.pets.domain.Species;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByOwnerId(Long ownerId);
    boolean existsByOwnerIdAndNameIgnoreCaseAndSpecies(Long ownerId, String name, Species species);
    int countByOwnerId(Long ownerId);
}
