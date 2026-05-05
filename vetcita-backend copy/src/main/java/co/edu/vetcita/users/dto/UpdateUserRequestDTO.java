package co.edu.vetcita.users.dto;

import co.edu.vetcita.users.domain.IdentificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequestDTO {
    private String firstName;
    private String lastName;
    private String phone;
    private IdentificationType identificationType;
    private String identificationNumber;
}
