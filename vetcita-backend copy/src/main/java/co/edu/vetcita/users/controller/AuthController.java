package co.edu.vetcita.users.controller;

import co.edu.vetcita.users.dto.AuthResponseDTO;
import co.edu.vetcita.users.dto.ForgotPasswordRequestDTO;
import co.edu.vetcita.users.dto.LoginRequestDTO;
import co.edu.vetcita.users.dto.RegisterRequestDTO;
import co.edu.vetcita.users.dto.ResetPasswordRequestDTO;
import co.edu.vetcita.users.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @RequestBody RegisterRequestDTO request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @RequestBody LoginRequestDTO request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequestDTO request) {
        return ResponseEntity.ok(authService.requestPasswordReset(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequestDTO request) {
        return ResponseEntity.ok(authService.resetPassword(request));
    }
    
}
