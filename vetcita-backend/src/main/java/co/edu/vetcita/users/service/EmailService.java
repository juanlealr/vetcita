package co.edu.vetcita.users.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String resetUrl = "http://localhost:4200/reset-password?token=" + resetToken;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("juancalero112006@gmail.com"); 
        message.setTo(toEmail);
        message.setSubject("Recuperación de Contraseña - Vetcita");
        message.setText("Hola,\n\n" +
                "Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva:\n\n" +
                resetUrl + "\n\n" +
                "Este enlace expirará en 15 minutos.\n" +
                "Si no solicitaste este cambio, por favor ignora este correo.");

        mailSender.send(message);
    }

    @Async
    public void sendWelcomeEmail(String toEmail, String firstName, String temporaryPassword) {
        String loginUrl = "http://localhost:4200/login";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("juancalero112006@gmail.com");
        message.setTo(toEmail);
        message.setSubject("¡Bienvenido a Vetcita! - Activa tu cuenta");
        message.setText("Hola " + firstName + ",\n\n" +
                "Tu cuenta ha sido creada exitosamente por el administrador de la veterinaria.\n\n" +
                "Para ingresar a nuestro sistema y gestionar tus citas o mascotas, utiliza los siguientes datos de acceso:\n" +
                "▪ Usuario: " + toEmail + "\n" +
                "▪ Contraseña temporal: " + temporaryPassword + "\n\n" +
                "Puedes iniciar sesión desde el siguiente enlace:\n" +
                loginUrl + "\n\n" +
                "⚠️ NOTA IMPORTANTE: Por motivos de seguridad, el sistema te solicitará cambiar esta contraseña obligatoriamente en tu primer inicio de sesión.");

        mailSender.send(message);
    }
}