package co.edu.vetcita.pets.service;

import co.edu.vetcita.pets.domain.Pet;
import co.edu.vetcita.pets.dto.PetRequestDTO;
import co.edu.vetcita.pets.dto.PetResponseDTO;
import co.edu.vetcita.pets.repository.PetRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;

    @Transactional
    public PetResponseDTO registerPet(Long ownerId, PetRequestDTO request) {
        if (petRepository.existsByOwnerIdAndNameIgnoreCaseAndSpecies(ownerId, request.name(), request.species())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, 
                "Ya tienes un " + request.species().name().toLowerCase() + " llamado " + request.name() + " registrado.");
        }
        Pet pet = Pet.builder()
                .ownerId(ownerId)
                .name(request.name())
                .gender(request.gender())
                .species(request.species())
                .breed(request.breed())
                .color(request.color())
                .birthDate(request.birthDate())
                .weightKg(request.weightKg())
                .isNeutered(request.isNeutered() != null ? request.isNeutered() : false)
                .build();

        Pet savedPet = petRepository.save(pet);
        return mapToResponseDTO(savedPet);
    }

    @Transactional(readOnly = true)
    public List<PetResponseDTO> getMyPets(Long ownerId) {
        return petRepository.findByOwnerId(ownerId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private PetResponseDTO mapToResponseDTO(Pet pet) {
        return new PetResponseDTO(
                pet.getId(), pet.getName(), pet.getGender(), pet.getSpecies(),
                pet.getBreed(), pet.getColor(), pet.getBirthDate(),
                pet.getWeightKg(), pet.getIsNeutered()
        );
    }
}
