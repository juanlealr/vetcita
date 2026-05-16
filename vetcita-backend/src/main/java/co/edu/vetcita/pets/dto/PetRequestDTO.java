package co.edu.vetcita.pets.dto;

import co.edu.vetcita.pets.domain.Gender;
import co.edu.vetcita.pets.domain.Species;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record PetRequestDTO(
    @NotBlank(message = "El nombre es obligatorio") String name,
    @NotNull(message = "El género es obligatorio") Gender gender,
    @NotNull(message = "La especie es obligatoria") Species species,
    @NotBlank(message = "La raza es obligatoria") String breed,
    @NotBlank(message = "El color es obligatorio") String color,
    @NotNull(message = "La fecha de nacimiento es obligatoria") LocalDate birthDate,
    @NotNull(message = "El peso es obligatorio") @Positive(message = "El peso debe ser mayor a 0") Double weightKg,
    Boolean isNeutered
) {}
