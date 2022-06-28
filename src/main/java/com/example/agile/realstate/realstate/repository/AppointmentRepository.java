package com.example.agile.realstate.realstate.repository;

import com.example.agile.realstate.realstate.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository <Appointment, Long> {
    List<Appointment> findAllByProperty_Id(Long propertyId);
}
