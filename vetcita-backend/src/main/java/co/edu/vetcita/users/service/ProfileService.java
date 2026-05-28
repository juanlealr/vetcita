package co.edu.vetcita.users.service;

import co.edu.vetcita.users.domain.Role;
import co.edu.vetcita.users.domain.User;
import co.edu.vetcita.users.dto.CreateClientRequestDTO;
import co.edu.vetcita.users.dto.RegisterRequestDTO;
import co.edu.vetcita.users.dto.UpdateProfileDTO;
import co.edu.vetcita.users.dto.UserProfileDTO;
import co.edu.vetcita.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Transactional
    public User createClient(CreateClientRequestDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("El correo electrónico ya se encuentra registrado");
        }

        var user = User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .identificationType(dto.getIdentificationType())
                .identificationNumber(dto.getIdentificationNumber())
                .role(Role.CLIENT)
                .active(true)
                .password(passwordEncoder.encode(dto.getIdentificationNumber()))
                .mustChangePassword(true) 
                .build();

        User savedUser = userRepository.save(user);

        try {
            emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getFirstName(), dto.getIdentificationNumber());
        } catch (Exception e) {
            System.err.println("❌ No se pudo enviar el correo de bienvenida: " + e.getMessage());
        }

        return savedUser;
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

        user.setMustChangePassword(false); 
        
        userRepository.save(user);
    }

    public List<User> getUsersByRole(Role role) {
        if (role != null) {
            return userRepository.findByRole(role);
        }
        return userRepository.findAll();
    }

    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    @Transactional
    public void toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
        user.setActive(!user.isActive());
        
        userRepository.save(user);
    }

    public List<UserProfileDTO> getAllReceptionists() {
        List<User> receptionists = userRepository.findByRole(Role.RECEPTIONIST);
        return receptionists.stream()
                .map(UserProfileDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserProfileDTO createReceptionist(RegisterRequestDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("El correo electrónico ya se encuentra registrado");
        }

        var receptionist = User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .identificationType(dto.getIdentificationType())
                .identificationNumber(dto.getIdentificationNumber())
                .role(Role.RECEPTIONIST)
                .active(true)
                .password(passwordEncoder.encode(dto.getPassword()))
                .mustChangePassword(true)
                .build();

        User saved = userRepository.save(receptionist);
        return UserProfileDTO.from(saved);
    }

}
