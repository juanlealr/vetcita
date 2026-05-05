package co.edu.vetcita;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DotenvLoader implements CommandLineRunner {
    
    @Override
    public void run(String... args) throws Exception {
        Dotenv dotenv = Dotenv.configure()
                .directory(".")
                .load();
        
        // Cargar las variables de entorno del archivo .env
        dotenv.entries().forEach(entry -> 
            System.setProperty(entry.getKey(), entry.getValue())
        );
    }
}
