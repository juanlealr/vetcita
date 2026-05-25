package co.edu.vetcita.pets;

import co.edu.vetcita.pets.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PetModuleApi {

    private final PetRepository petRepository;

    public PetInfo getPetInfo(Long id) {
        return petRepository.findById(id)
                .map(pet -> new PetInfo(pet.getName(), pet.getSpecies().name()))
                .orElse(new PetInfo("Mascota eliminada", ""));
    }

    public int countPetsByOwnerId(Long ownerId) {
        return petRepository.countByOwnerId(ownerId);
    }
}
