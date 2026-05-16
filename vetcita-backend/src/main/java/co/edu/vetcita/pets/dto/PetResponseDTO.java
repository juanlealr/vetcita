package co.edu.vetcita.pets.dto;

import co.edu.vetcita.pets.domain.Gender;
import co.edu.vetcita.pets.domain.Species;
import java.time.LocalDate;

public record PetResponseDTO(
    Long id,
    String name,
    Gender gender,
    Species species,
    String breed,
    String color,
    LocalDate birthDate,
    Double weightKg,
    Boolean isNeutered
) {}
