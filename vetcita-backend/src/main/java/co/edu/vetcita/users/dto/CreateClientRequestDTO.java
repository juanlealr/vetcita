package co.edu.vetcita.users.dto;

import co.edu.vetcita.users.domain.IdentificationType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateClientRequestDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private IdentificationType identificationType;
    private String identificationNumber;
}
