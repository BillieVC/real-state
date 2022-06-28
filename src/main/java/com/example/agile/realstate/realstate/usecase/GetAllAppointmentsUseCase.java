package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.domain.Appointment;
import com.example.agile.realstate.realstate.dto.response.GetAllAppointmentsResponse;
import com.example.agile.realstate.realstate.mapper.AppointmentMapper;
import com.example.agile.realstate.realstate.service.IAppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAllAppointmentsUseCase {
    private final IAppointmentService appointmentService;
    private final AppointmentMapper appointmentMapper;

    public GetAllAppointmentsUseCase(IAppointmentService appointmentService,
                                     AppointmentMapper appointmentMapper) {
        this.appointmentService = appointmentService;
        this.appointmentMapper = appointmentMapper;
    }

    public GetAllAppointmentsResponse execute(Long propertyId) {
        List<Appointment> appointmentList = appointmentService.getAllByPropertyId(propertyId);
        return new GetAllAppointmentsResponse(appointmentMapper
                .appointmentListToAppointmentDtoList(appointmentList));
    }
}
