package co.edu.vetcita.appointments.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequestDTO {

    @NotNull(message = "El ID de la mascota es obligatorio")
    private Long petId;

    @NotNull(message = "El ID del veterinario es obligatorio")
    private Long vetId;

    @NotNull(message = "El ID del servicio es obligatorio")
    private Long serviceId;

    @NotNull(message = "La fecha es obligatoria")
    @FutureOrPresent(message = "La fecha de la cita no puede estar en el pasado")
    private LocalDate date;

    @NotNull(message = "La hora es obligatoria")
    private LocalTime time;
}
