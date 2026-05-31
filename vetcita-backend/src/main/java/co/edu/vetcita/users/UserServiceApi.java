package co.edu.vetcita.users;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.edu.vetcita.users.domain.IdentificationType;
import co.edu.vetcita.users.domain.Role;
import co.edu.vetcita.users.domain.User;
import co.edu.vetcita.users.dto.RegisterRequestDTO;
import co.edu.vetcita.users.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceApi {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createUserFromExternalModule(RegisterRequestDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya se encuentra registrado.");
        }

        // Convertir string a enum
        IdentificationType idType;
        try {
            idType = IdentificationType.valueOf(dto.getIdentificationType().toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException("Tipo de documento inválido: " + dto.getIdentificationType());
        }

        User newUser = new User();
        newUser.setEmail(dto.getEmail());
        newUser.setFirstName(dto.getFirstName());
        newUser.setLastName(dto.getLastName());
        newUser.setPhone(dto.getPhone());
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        
        newUser.setIdentificationType(idType);
        newUser.setIdentificationNumber(dto.getIdentificationNumber());
        
        newUser.setRole(Role.VET);
        newUser.setActive(true);

        userRepository.save(newUser);
    }

    public long countTotalClients() {
        return userRepository.countByRole(Role.CLIENT); 
    }

    public String getFullName(Long userId) {
        return userRepository.findById(userId)
                .map(user -> user.getFirstName() + " " + user.getLastName())
                .orElse("Cliente eliminado");
    }

}