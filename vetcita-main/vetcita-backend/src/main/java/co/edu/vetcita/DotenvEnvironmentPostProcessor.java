package co.edu.vetcita;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class DotenvEnvironmentPostProcessor implements EnvironmentPostProcessor {
    
    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        try {
            // Buscar el archivo .env en la raíz del proyecto
            String projectRoot = Paths.get(".").toAbsolutePath().getParent().toString();
            
            Dotenv dotenv = Dotenv.configure()
                    .directory(projectRoot)
                    .ignoreIfMissing()
                    .load();
            
            // Convertir las variables a un Map
            Map<String, Object> dotenvMap = new HashMap<>();
            dotenv.entries().forEach(entry -> 
                dotenvMap.put(entry.getKey(), entry.getValue())
            );
            
            // Agregar como PropertySource de mayor prioridad
            if (!dotenvMap.isEmpty()) {
                environment.getPropertySources()
                        .addFirst(new MapPropertySource("dotenv", dotenvMap));
            }
        } catch (Exception e) {
            // Si no encuentra el archivo .env, continúa normalmente
        }
    }
}
