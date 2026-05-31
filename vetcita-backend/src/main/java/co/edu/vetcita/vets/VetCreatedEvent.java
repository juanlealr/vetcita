package co.edu.vetcita.vets;

public record VetCreatedEvent(
    String firstName,
    String lastName,
    String email,
    String phone,
    String password,
    String identificationType,
    String identificationNumber
) {}
