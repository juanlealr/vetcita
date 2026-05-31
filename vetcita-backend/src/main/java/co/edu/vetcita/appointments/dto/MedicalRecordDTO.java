package co.edu.vetcita.appointments.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class MedicalRecordDTO {
    private Long id;
    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String diagnosis;
    private String treatment;
    private String observations;
    private String vetNotes;
}