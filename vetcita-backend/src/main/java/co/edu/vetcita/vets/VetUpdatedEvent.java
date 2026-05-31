package co.edu.vetcita.vets;

public record VetUpdatedEvent(
    String email,
    Boolean isActive,
    String phone
) {}
