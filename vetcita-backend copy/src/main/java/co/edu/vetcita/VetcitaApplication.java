package co.edu.vetcita;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class VetcitaApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        dotenv.entries().forEach(e -> 
            System.setProperty(e.getKey(), e.getValue())
        );
		SpringApplication.run(VetcitaApplication.class, args);
		System.out.println("MAIL_USER: '" + dotenv.get("MAIL_USERNAME") + "'");
System.out.println("MAIL_PASS: '" + dotenv.get("MAIL_PASSWORD") + "'");
	}

}
