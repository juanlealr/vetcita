package co.edu.vetcita.services.dto;

import java.math.BigDecimal;

public record MedicalServiceRequest(
    String name,
    String description,
    BigDecimal price,
    Integer estimatedDurationMinutes
) {}
