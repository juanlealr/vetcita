package co.edu.vetcita.appointments.repository;

import co.edu.vetcita.appointments.domain.Appointment;
import co.edu.vetcita.appointments.domain.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByClientIdOrderByAppointmentDateDescAppointmentTimeDesc(Long clientId);
    
    List<Appointment> findByVetIdAndAppointmentDateAndStatusNot(
            Long vetId,
            LocalDate date,
            AppointmentStatus status
    );
    
    @Query("SELECT a.appointmentTime FROM Appointment a " +
           "WHERE a.vetId = :vetId AND a.appointmentDate = :date " +
           "AND a.status <> 'CANCELLED' " +
           "AND (:excludeId IS NULL OR a.id <> :excludeId)")
    List<LocalTime> findOccupiedTimesByVetAndDateExcluding(
            @Param("vetId") Long vetId,
            @Param("date") LocalDate date,
            @Param("excludeId") Long excludeId);
    
    @Query("SELECT CASE WHEN COUNT(a) = 0 THEN true ELSE false END " +
           "FROM Appointment a " +
           "WHERE a.vetId = :vetId AND a.appointmentDate = :date AND a.appointmentTime = :time " +
           "AND a.status <> 'CANCELLED' " +
           "AND a.id <> :excludeId")
    boolean isTimeSlotAvailableExcludingSelf(
            @Param("vetId") Long vetId,
            @Param("date") LocalDate date,
            @Param("time") LocalTime time,
            @Param("excludeId") Long excludeId);

        List<Appointment> findByVetIdOrderByAppointmentDateAscAppointmentTimeAsc(Long vetId);
}