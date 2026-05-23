package co.edu.vetcita.users.dto;

import co.edu.vetcita.users.domain.IdentificationType;
import lombok.Data;

@Data
public class UpdateProfileDTO {
    private String firstName;
    private String lastName;
    private String phone;
    private IdentificationType identificationType;
    private String identificationNumber;
}
