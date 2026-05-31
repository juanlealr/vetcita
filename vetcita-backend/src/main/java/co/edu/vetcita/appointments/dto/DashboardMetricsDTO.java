package co.edu.vetcita.appointments.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class DashboardMetricsDTO {
    private long citasDelDia;
    private long proximasCitas;
    private long totalClientes;
    private long totalMascotas;
    private List<AppointmentResponseDTO> citasHoy;
    private List<AppointmentResponseDTO> ultimasCitas;
}
