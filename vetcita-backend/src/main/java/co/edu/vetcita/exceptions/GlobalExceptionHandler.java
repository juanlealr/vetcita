package co.edu.vetcita.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        Map<String, String> response = new HashMap<>();
        
        String errorMessage = ex.getMostSpecificCause().getMessage();
        
        if (errorMessage != null && errorMessage.contains("email")) {
            response.put("message", "Este correo electrónico ya está registrado.");
        } else if (errorMessage != null && errorMessage.contains("phone")) {
            response.put("message", "Este número de teléfono ya está registrado.");
        } else if (errorMessage != null && errorMessage.contains("identification")) {
            response.put("message", "Este documento de identidad ya está registrado.");
        } else {
            response.put("message", "Ya existe un usuario registrado con estos datos.");
        }

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> response = new HashMap<>();
        
        response.put("message", ex.getMessage());
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Correo electrónico o contraseña incorrectos.");
        
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED); 
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<Map<String, String>> handleDisabledException(DisabledException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Esta cuenta ha sido deshabilitada. Contacta al administrador.");
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleAuthenticationException(AuthenticationException ex) {
        Map<String, String> response = new HashMap<>();
        
        response.put("message", "Correo electrónico o contraseña incorrectos.");
        
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}