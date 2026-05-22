package co.edu.vetcita.users.service;

import co.edu.vetcita.security.JwtService;
import co.edu.vetcita.users.domain.PasswordResetToken;
import co.edu.vetcita.users.domain.Role;
import co.edu.vetcita.users.domain.User;
import co.edu.vetcita.users.dto.AuthResponseDTO;
import co.edu.vetcita.users.dto.ForgotPasswordRequestDTO;
import co.edu.vetcita.users.dto.LoginRequestDTO;
import co.edu.vetcita.users.dto.RegisterRequestDTO;
import co.edu.vetcita.users.dto.ResetPasswordRequestDTO;
import co.edu.vetcita.users.repository.PasswordResetTokenRepository;
import co.edu.vetcita.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;

    public AuthResponseDTO register(RegisterRequestDTO request) {
        
        var user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .phone(request.getPhone())
            .identificationType(request.getIdentificationType())
            .identificationNumber(request.getIdentificationNumber())
            .role(Role.CLIENT) 
            .active(true)
            .build();

        userRepository.save(user);

        Map<String, Object> extraClaims = Map.of(
            "userId", user.getId(),
            "role", user.getRole().name()
        );
        var jwtToken = jwtService.generateToken(extraClaims, user);
        
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponseDTO login(LoginRequestDTO request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        Map<String, Object> extraClaims = Map.of(
            "userId", user.getId(),
            "role", user.getRole().name()
        );
        var jwtToken = jwtService.generateToken(extraClaims, user);
        
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                // .photoUrl(user.getPhotoUrl())
                .build();
    }

    public String requestPasswordReset(ForgotPasswordRequestDTO request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        tokenRepository.findByUser(user)
            .ifPresent(existing -> tokenRepository.delete(existing));
        
            String token = java.util.UUID.randomUUID().toString();
        var resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusMinutes(15))
                .build();

        tokenRepository.save(resetToken);

        try {
            emailService.sendPasswordResetEmail(user.getEmail(), token);
        } catch (Exception e) {

            throw new RuntimeException("No se pudo enviar el correo de recuperación");
        }
        
        return "Enlace de recuperación enviado a su correo electrónico";
    }

    public String resetPassword(ResetPasswordRequestDTO request) {
        var resetToken = tokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (resetToken.isExpired() || resetToken.isUsed()) {
            throw new RuntimeException("El token ha expirado o ya fue utilizado");
        }

        var user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        resetToken.setUsed(true);
        tokenRepository.save(resetToken);

        return "Contraseña actualizada exitosamente";
    }
}
