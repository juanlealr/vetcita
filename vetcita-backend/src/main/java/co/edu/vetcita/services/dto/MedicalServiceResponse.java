package co.edu.vetcita.services.dto;

import java.math.BigDecimal;

public record MedicalServiceResponse(
    Long id,
    String name,
    String description,
    BigDecimal price,
    Integer estimatedDurationMinutes,
    boolean isActive
) {}
