package co.edu.vetcita.users.dto;

import co.edu.vetcita.users.domain.IdentificationType;
import co.edu.vetcita.users.domain.Role;
import co.edu.vetcita.users.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private IdentificationType identificationType;
    private String identificationNumber;
    private Role role;
    private boolean active;

    public static UserResponseDTO from(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .identificationType(user.getIdentificationType())
                .identificationNumber(user.getIdentificationNumber())
                .role(user.getRole())
                .active(user.isEnabled())
                .build();
    }
}
