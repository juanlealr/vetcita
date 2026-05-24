package co.edu.vetcita.appointments.service;

import co.edu.vetcita.appointments.domain.Appointment;
import co.edu.vetcita.appointments.domain.AppointmentStatus;
import co.edu.vetcita.appointments.dto.AppointmentRequestDTO;
import co.edu.vetcita.appointments.dto.AppointmentResponseDTO;
import co.edu.vetcita.appointments.dto.AppointmentUpdateDTO;
import co.edu.vetcita.appointments.repository.AppointmentRepository;
import co.edu.vetcita.pets.PetModuleApi;
import co.edu.vetcita.pets.PetInfo;
import co.edu.vetcita.services.MedicalServiceModuleApi;
import co.edu.vetcita.vets.VetModuleApi;
import co.edu.vetcita.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final JwtService jwtService;
    private final PetModuleApi petModuleApi;
    private final MedicalServiceModuleApi medicalServiceModuleApi;
    private final VetModuleApi vetModuleApi;

    // Horarios estándar (en LocalTime para facilitar operaciones)
    private static final List<LocalTime> STANDARD_TIME_SLOTS = List.of(
            LocalTime.of(8, 0), LocalTime.of(9, 0), LocalTime.of(10, 0), LocalTime.of(11, 0),
            LocalTime.of(14, 0), LocalTime.of(15, 0), LocalTime.of(16, 0)
    );

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    // -------------------------------------------------------------------------
    // Métodos existentes (adaptados para usar LocalTime internamente)
    // -------------------------------------------------------------------------
    public AppointmentResponseDTO createAppointment(AppointmentRequestDTO request, String token) {
        Long clientId = jwtService.extractUserId(token.substring(7));

        List<String> availableTimes = getAvailableTimes(request.getVetId(), request.getDate(), null);
        String requestedTimeStr = request.getTime().format(TIME_FORMATTER);

        if (!availableTimes.contains(requestedTimeStr)) {
            throw new IllegalStateException("Lo sentimos, esta hora ya fue reservada o no es válida.");
        }

        Appointment appointment = Appointment.builder()
                .petId(request.getPetId())
                .clientId(clientId)
                .vetId(request.getVetId())
                .serviceId(request.getServiceId())
                .appointmentDate(request.getDate())
                .appointmentTime(request.getTime())
                .status(AppointmentStatus.SCHEDULED)
                .build();

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return mapToDTO(savedAppointment);
    }

    public List<AppointmentResponseDTO> getMyClientAppointments(String token) {
        Long clientId = jwtService.extractUserId(token.substring(7));
        return appointmentRepository.findByClientIdOrderByAppointmentDateDescAppointmentTimeDesc(clientId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene las horas disponibles para un veterinario y fecha.
     * @param vetId ID del veterinario
     * @param date Fecha de la cita
     * @param excludeAppointmentId ID de cita a excluir (para edición, puede ser null)
     * @return Lista de horas disponibles en formato "HH:mm"
     */
    public List<String> getAvailableTimes(Long vetId, LocalDate date, Long excludeAppointmentId) {
        // Obtener horas ocupadas (excluyendo la cita si se proporciona)
        List<LocalTime> occupiedTimes = appointmentRepository.findOccupiedTimesByVetAndDateExcluding(
                vetId, date, excludeAppointmentId);

        List<String> occupiedStrings = occupiedTimes.stream()
                .map(t -> t.format(TIME_FORMATTER))
                .collect(Collectors.toList());

        return STANDARD_TIME_SLOTS.stream()
                .map(slot -> slot.format(TIME_FORMATTER))
                .filter(time -> !occupiedStrings.contains(time))
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelAppointment(Long appointmentId, String token) {
        Long clientId = jwtService.extractUserId(token.substring(7));

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        if (!appointment.getClientId().equals(clientId)) {
            throw new IllegalStateException("No tienes permiso para cancelar esta cita.");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    // -------------------------------------------------------------------------
    // NUEVO: Actualizar cita (fecha y hora)
    // -------------------------------------------------------------------------
    @Transactional
    public AppointmentResponseDTO updateAppointment(AppointmentUpdateDTO dto, String token) {
        Long clientId = jwtService.extractUserId(token.substring(7));

        // 1. Buscar la cita existente
        Appointment appointment = appointmentRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con id: " + dto.getId()));

        // 2. Verificar que la cita pertenezca al cliente autenticado
        if (!appointment.getClientId().equals(clientId)) {
            throw new IllegalStateException("No tienes permiso para modificar esta cita.");
        }

        // 3. Verificar que la cita no esté cancelada o completada
        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new IllegalStateException("No se puede modificar una cita cancelada.");
        }
        // Si tienes estado COMPLETED, también puedes bloquearlo:
        // if (appointment.getStatus() == AppointmentStatus.COMPLETED) { ... }

        // 4. Validar disponibilidad del nuevo horario (excluyendo la propia cita)
        boolean isAvailable = appointmentRepository.isTimeSlotAvailableExcludingSelf(
                appointment.getVetId(),
                dto.getDate(),
                dto.getTime(),
                dto.getId()
        );
        if (!isAvailable) {
            throw new IllegalStateException("El horario seleccionado no está disponible.");
        }

        // 5. Actualizar fecha y hora
        appointment.setAppointmentDate(dto.getDate());
        appointment.setAppointmentTime(dto.getTime());

        // 6. Guardar cambios
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return mapToDTO(updatedAppointment);
    }

    // -------------------------------------------------------------------------
    // Mapeo de entidad a DTO
    // -------------------------------------------------------------------------
    private AppointmentResponseDTO mapToDTO(Appointment appointment) {
        PetInfo petInfo = petModuleApi.getPetInfo(appointment.getPetId());
        String serviceName = medicalServiceModuleApi.getServiceName(appointment.getServiceId());
        String vetName = vetModuleApi.getVetName(appointment.getVetId());

        return AppointmentResponseDTO.builder()
                .id(appointment.getId())
                .petId(appointment.getPetId())
                .serviceId(appointment.getServiceId())
                .vetId(appointment.getVetId())
                .date(appointment.getAppointmentDate())
                .time(appointment.getAppointmentTime())
                .status(appointment.getStatus())
                .petName(petInfo.name())
                .petSpecies(petInfo.species())
                .serviceName(serviceName)
                .vetName(vetName)
                .build();
    }
}