package co.edu.vetcita.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "application.security.jwt")
@Data
public class JwtProperties {
    private String secretKey;
    private long expiration;
}
