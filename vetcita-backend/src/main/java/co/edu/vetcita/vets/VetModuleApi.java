package co.edu.vetcita.vets;

import co.edu.vetcita.vets.repository.VetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VetModuleApi {

    private final VetRepository vetRepository;

    public String getVetName(Long id) {
        return vetRepository.findById(id)
                .map(vet -> vet.getName())
                .orElse("Veterinario no disponible");
    }
}
