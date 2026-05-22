package co.edu.vetcita.appointments.service;

import co.edu.vetcita.appointments.domain.Appointment;
import co.edu.vetcita.appointments.domain.AppointmentStatus;
import co.edu.vetcita.appointments.dto.AppointmentRequestDTO;
import co.edu.vetcita.appointments.dto.AppointmentResponseDTO;
import co.edu.vetcita.appointments.repository.AppointmentRepository;

import co.edu.vetcita.pets.PetModuleApi;
import co.edu.vetcita.pets.PetInfo;
import co.edu.vetcita.services.MedicalServiceModuleApi;
import co.edu.vetcita.vets.VetModuleApi;
import co.edu.vetcita.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    private static final List<String> STANDARD_HOURS = List.of(
            "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
    );

    public AppointmentResponseDTO createAppointment(AppointmentRequestDTO request, String token) {
        Long clientId = jwtService.extractUserId(token.substring(7));

        List<String> availableTimes = getAvailableTimes(request.getVetId(), request.getDate());
        String requestedTimeStr = request.getTime().toString(); 

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

    public List<String> getAvailableTimes(Long vetId, LocalDate date) {
        List<Appointment> bookedAppointments = appointmentRepository
                .findByVetIdAndAppointmentDateAndStatusNot(vetId, date, AppointmentStatus.CANCELLED);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        List<String> bookedTimes = bookedAppointments.stream()
                .map(app -> app.getAppointmentTime().format(formatter))
                .toList();

        return STANDARD_HOURS.stream()
                .filter(time -> !bookedTimes.contains(time))
                .collect(Collectors.toList());
    }
    
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
