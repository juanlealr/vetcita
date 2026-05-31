package co.edu.vetcita.vets;

public record VetStatusChangedEvent(
    String email, 
    Boolean isActive
) {}
