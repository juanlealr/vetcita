package co.edu.vetcita.users.service;

import co.edu.vetcita.users.domain.User;
import co.edu.vetcita.users.dto.UpdateProfileDTO;
import co.edu.vetcita.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Transactional
    public User updateProfile(Long userId, UpdateProfileDTO dto) {
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getIdentificationType() != null) user.setIdentificationType(dto.getIdentificationType());
        if (dto.getIdentificationNumber() != null) user.setIdentificationNumber(dto.getIdentificationNumber());

        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(Long userId, String newPassword) {
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
