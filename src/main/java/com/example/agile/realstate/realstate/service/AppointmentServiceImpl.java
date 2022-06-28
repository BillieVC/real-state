package com.example.agile.realstate.realstate.service;

import com.example.agile.realstate.realstate.domain.Appointment;
import com.example.agile.realstate.realstate.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements IAppointmentService{
    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAllByPropertyId(Long propertyId) {
        return appointmentRepository.findAllByProperty_Id(propertyId);
    }
}
