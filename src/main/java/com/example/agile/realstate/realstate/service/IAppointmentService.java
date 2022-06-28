package com.example.agile.realstate.realstate.service;

import com.example.agile.realstate.realstate.domain.Appointment;

import java.util.List;

public interface IAppointmentService {
    Appointment save (Appointment appointment);
    List<Appointment> getAllByPropertyId (Long propertyId);
}
