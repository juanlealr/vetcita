package co.edu.vetcita.appointments.dto;

import co.edu.vetcita.appointments.domain.AppointmentStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private Long petId;
    private Long serviceId;
    private Long vetId;
    private LocalDate date;
    private LocalTime time;
    private AppointmentStatus status;
    private String petName;
    private String petSpecies;
    private String serviceName;
    private String vetName;
    private String clientName;
    private String clientPhone;
}