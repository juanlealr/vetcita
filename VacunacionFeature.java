// ============================================================
// ENTIDADES (domain/entity layer)
// ============================================================

// --- Patient.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String identification;

    private String name;
    private LocalDate birthDate;
    private String gender;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    private List<VaccinationRecord> records;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    private List<Diagnosis> diagnoses;
}


// --- Vaccine.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String laboratorio;
    private String tipo; // viral, bacteriana, ARN, etc.
    private String description;

    @OneToMany(mappedBy = "vacuna", cascade = CascadeType.ALL)
    private List<Dose> dosis;

    @OneToMany(mappedBy = "vacuna", cascade = CascadeType.ALL)
    private List<Contraindication> contraindicaciones;

    @ManyToMany
    @JoinTable(
        name = "vacuna_enfermedad",
        joinColumns = @JoinColumn(name = "vacuna_id"),
        inverseJoinColumns = @JoinColumn(name = "enfermedad_id")
    )
    private List<Disease> preventedDiseases;
}


// --- Dose.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int doseNumber;
    private int recommendedIntervalDays;
    private String description;

    @ManyToOne
    @JoinColumn(name = "vacuna_id")
    private Vaccine vacuna;
}


// --- Contraindication.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contraindication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String tipo;    // edad, alergia, enfermedad preexistente
    private String criterio; // valor de referencia (ej: "<2 años", "alergia a huevo")

    @ManyToOne
    @JoinColumn(name = "vacuna_id")
    private Vaccine vacuna;
}


// --- VaccinationRecord.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate administrationDate;
    private String administeredDose;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Patient paciente;

    @ManyToOne
    @JoinColumn(name = "vacuna_id", nullable = false)
    private Vaccine vacuna;

    @ManyToOne
    @JoinColumn(name = "profesional_id", nullable = false)
    private Professional profesional;

    @ManyToOne
    @JoinColumn(name = "centro_salud_id", nullable = false)
    private HealthCenter centroSalud;
}


// --- Professional.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialty;
    private String license;

    @ManyToOne
    @JoinColumn(name = "centro_salud_id")
    private HealthCenter centroSalud;
}


// --- HealthCenter.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String careLevel; // primario, secundario, terciario

    @OneToMany(mappedBy = "centroSalud")
    private List<Professional> profesionales;
}


// --- Disease.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String riskLevel; // bajo, medio, alto
}


// --- Diagnosis.java ---
package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diagnosis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaDiagnostico;
    private String estado; // activo, recuperado, crónico

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Patient paciente;

    @ManyToOne
    @JoinColumn(name = "enfermedad_id")
    private Disease enfermedad;
}


// ============================================================
// DTOs
// ============================================================

// --- VaccinationRecordRequest.java ---
package com.salud.vacunacion.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationRecordRequest {
    private Long patientId;
    private Long vaccineId;
    private Long professionalId;
    private Long healthCenterId;
    private String administeredDose;
    private LocalDate administrationDate;
}


// --- VaccinationRecordResponse.java ---
package com.salud.vacunacion.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationRecordResponse {
    private Long id;
    private String pacienteNombre;
    private String vacunaNombre;
    private String profesionalNombre;
    private String centroSaludNombre;
    private String administeredDose;
    private LocalDate administrationDate;
}


// ============================================================
// EXCEPCIÓN DE CONTRAINDICACIÓN
// ============================================================

// --- ContraindicationException.java ---
package com.salud.vacunacion.exception;

public class ContraindicationException extends RuntimeException {
    public ContraindicationException(String message) {
        super(message);
    }
}


// ============================================================
// REPOSITORIOS (repository layer)
// ============================================================

// --- PacienteRepository.java ---
package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByIdentificacion(String identification);
}


// --- VacunaRepository.java ---
package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacunaRepository extends JpaRepository<Vaccine, Long> {}


// --- RegistroVacunacionRepository.java ---
package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.VaccinationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegistroVacunacionRepository extends JpaRepository<VaccinationRecord, Long> {
    List<VaccinationRecord> findByPacienteId(Long patientId);
}


// --- ProfesionalRepository.java ---
package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.Professional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfesionalRepository extends JpaRepository<Professional, Long> {}


// --- CentroSaludRepository.java ---
package com.salud.vacunacion.repository;

import com.salud.vacunacion.domain.HealthCenter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CentroSaludRepository extends JpaRepository<HealthCenter, Long> {}


// ============================================================
// SERVICIO (service layer)
// ============================================================

// --- VaccinationService.java ---
package com.salud.vacunacion.service;

import com.salud.vacunacion.domain.*;
import com.salud.vacunacion.dto.*;
import com.salud.vacunacion.exception.ContraindicationException;
import com.salud.vacunacion.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccinationService {

    private final PacienteRepository pacienteRepository;
    private final VacunaRepository vacunaRepository;
    private final ProfesionalRepository profesionalRepository;
    private final CentroSaludRepository centroSaludRepository;
    private final RegistroVacunacionRepository registroRepository;

    @Transactional
    public VaccinationRecordResponse registerVaccination(VaccinationRecordRequest request) {

        Patient paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Vaccine vacuna = vacunaRepository.findById(request.getVacunaId())
                .orElseThrow(() -> new RuntimeException("Vaccine not found"));

        Professional profesional = profesionalRepository.findById(request.getProfesionalId())
                .orElseThrow(() -> new RuntimeException("Professional no encontrado"));

        HealthCenter centro = centroSaludRepository.findById(request.getCentroSaludId())
                .orElseThrow(() -> new RuntimeException("Health center not found"));

        // Verificar contraindicaciones
        verifyContraindications(paciente, vacuna);

        // Crear y guardar el registro
        VaccinationRecord registro = new VaccinationRecord();
        registro.setPaciente(paciente);
        registro.setVacuna(vacuna);
        registro.setProfesional(profesional);
        registro.setCentroSalud(centro);
        registro.setDosisAdministrada(request.getDosisAdministrada());
        registro.setFechaAplicacion(request.getFechaAplicacion());

        VaccinationRecord guardado = registroRepository.save(registro);

        return toResponse(guardado);
    }

    /**
     * Verifica si el paciente tiene alguna contraindicación para la vacuna.
     * Lanza ContraindicationException si se detecta alguna.
     */
    private void verifyContraindications(Patient paciente, Vaccine vacuna) {
        List<Contraindication> contraindicaciones = vacuna.getContraindicaciones();
        List<Diagnosis> diagnoses = paciente.getDiagnosticos();

        for (Contraindication c : contraindicaciones) {
            if ("enfermedad_preexistente".equals(c.getTipo())) {
                boolean tieneEnfermedad = diagnoses.stream()
                        .anyMatch(d -> d.getEstado().equals("activo")
                                && d.getEnfermedad().getNombre()
                                        .equalsIgnoreCase(c.getCriterio()));
                if (tieneEnfermedad) {
                    throw new ContraindicationException(
                            "El paciente tiene una contraindicación activa: " + c.getDescripcion());
                }
            }
            // Aquí se pueden añadir más tipos de verificación (edad, alergias, etc.)
        }
    }

    public List<VaccinationRecord> getPatientHistory(Long patientId) {
        return registroRepository.findByPacienteId(patientId);
    }

    private VaccinationRecordResponse toResponse(VaccinationRecord r) {
        return new VaccinationRecordResponse(
                r.getId(),
                r.getPaciente().getNombre(),
                r.getVacuna().getNombre(),
                r.getProfesional().getNombre(),
                r.getCentroSalud().getNombre(),
                r.getDosisAdministrada(),
                r.getFechaAplicacion()
        );
    }
}


// ============================================================
// CONTROLADOR (controller layer)
// ============================================================

// --- VaccinationController.java ---
package com.salud.vacunacion.controller;

import com.salud.vacunacion.dto.*;
import com.salud.vacunacion.exception.ContraindicationException;
import com.salud.vacunacion.service.VaccinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/records/vacunacion")
@RequiredArgsConstructor
public class VaccinationController {

    private final VaccinationService vacunacionService;

    /**
     * POST /api/records/vacunacion
     * Registra la aplicación de una vacuna a un paciente.
     */
    @PostMapping
    public ResponseEntity<?> registerVaccination(@RequestBody VaccinationRecordRequest request) {
        try {
            VaccinationRecordResponse response = vacunacionService.registerVaccination(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ContraindicationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * GET /api/records/vacunacion/paciente/{id}
     * Obtiene el historial de vacunación de un paciente.
     */
    @GetMapping("/paciente/{id}")
    public ResponseEntity<?> patientHistory(@PathVariable Long id) {
        return ResponseEntity.ok(vacunacionService.getPatientHistory(id));
    }
}


// ============================================================
// MANEJADOR GLOBAL DE EXCEPCIONES
// ============================================================

// --- GlobalExceptionHandler.java ---
package com.salud.vacunacion.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ContraindicationException.class)
    public ResponseEntity<String> handleContraindication(ContraindicationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntime(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}


// ============================================================
// application.properties (src/main/resources)
// ============================================================
/*
spring.datasource.url=jdbc:postgresql://localhost:5432/vacunacion_db
spring.datasource.username=postgres
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
*/


// ============================================================
// pom.xml dependencies (key fragments)
// ============================================================
/*
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
*/

