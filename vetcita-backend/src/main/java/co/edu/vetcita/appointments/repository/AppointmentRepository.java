package co.edu.vetcita.appointments.repository;

import co.edu.vetcita.appointments.domain.Appointment;
import co.edu.vetcita.appointments.domain.AppointmentStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByClientIdOrderByAppointmentDateDescAppointmentTimeDesc(Long clientId);

    List<Appointment> findByVetIdAndAppointmentDateAndStatusNot(
        Long vetId, 
        LocalDate date, 
        AppointmentStatus status
    );
}
