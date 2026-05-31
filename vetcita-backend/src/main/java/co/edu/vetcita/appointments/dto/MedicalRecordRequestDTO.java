package co.edu.vetcita.appointments.dto;

import lombok.Data;

@Data
public class MedicalRecordRequestDTO {
    private String diagnosis;
    private String treatment;
    private String observations;
    private String vetNotes;
}