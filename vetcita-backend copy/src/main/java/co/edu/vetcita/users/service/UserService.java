package co.edu.vetcita.users.service;

import co.edu.vetcita.users.domain.User;
import co.edu.vetcita.users.dto.UpdateUserRequestDTO;
import co.edu.vetcita.users.dto.UserResponseDTO;
import co.edu.vetcita.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponseDTO getCurrentUser(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return UserResponseDTO.from(user);
    }

    public UserResponseDTO updateCurrentUser(String email, UpdateUserRequestDTO request) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getIdentificationType() != null) {
            user.setIdentificationType(request.getIdentificationType());
        }
        if (request.getIdentificationNumber() != null) {
            user.setIdentificationNumber(request.getIdentificationNumber());
        }

        userRepository.save(user);
        return UserResponseDTO.from(user);
    }
}
