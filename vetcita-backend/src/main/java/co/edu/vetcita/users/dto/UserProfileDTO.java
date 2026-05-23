package co.edu.vetcita.users.dto;

import co.edu.vetcita.users.domain.IdentificationType;
import co.edu.vetcita.users.domain.Role;
import co.edu.vetcita.users.domain.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private IdentificationType identificationType;
    private String identificationNumber;
    private Role role;

    public static UserProfileDTO from(User user) {
        return UserProfileDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .identificationType(user.getIdentificationType())
                .identificationNumber(user.getIdentificationNumber())
                .role(user.getRole())
                .build();
    }
}
