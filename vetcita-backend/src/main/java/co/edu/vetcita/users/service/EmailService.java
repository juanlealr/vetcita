package co.edu.vetcita.users.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

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
}
