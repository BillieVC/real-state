package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.common.Message;
import com.example.agile.realstate.realstate.domain.Appointment;
import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.dto.AppointmentDto;
import com.example.agile.realstate.realstate.dto.request.AppointmentRequest;
import com.example.agile.realstate.realstate.dto.response.AppointmentResponse;
import com.example.agile.realstate.realstate.exception.BadRequestException;
import com.example.agile.realstate.realstate.mapper.AppointmentMapper;
import com.example.agile.realstate.realstate.service.IAppointmentService;
import com.example.agile.realstate.realstate.service.IPropertyService;
import com.example.agile.realstate.realstate.utils.AppointmentValidator;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class SaveAppointmentUseCase {
    private final IAppointmentService appointmentService;
    private final IPropertyService propertyService;
    private final Message message;
    private final AppointmentMapper appointmentMapper;
    private final AppointmentValidator appointmentValidator;

    public SaveAppointmentUseCase(IAppointmentService appointmentService, IPropertyService propertyService,
                                  Message message, AppointmentMapper appointmentMapper,
                                  AppointmentValidator appointmentValidator) {
        this.appointmentService = appointmentService;
        this.propertyService = propertyService;
        this.message = message;
        this.appointmentMapper = appointmentMapper;
        this.appointmentValidator = appointmentValidator;
    }

    public AppointmentResponse execute(Long propertyId, AppointmentRequest appointmentRequest) {
        Property property = propertyService.findById(propertyId);
        if (property==null){
            throw new BadRequestException(message.getMessage("invalid.property.id"));
        }
        Appointment appointment = new Appointment();
        appointment.setUserName(appointmentRequest.getUserName());
        appointment.setUserEmail(appointmentRequest.getUserEmail());
        appointment.setUserPhone(appointmentRequest.getUserPhone());
        appointmentValidator.validateDate(appointmentRequest.getDate());
        appointment.setDate(appointmentRequest.getDate());
        appointment.setProperty(property);
        Appointment savedAppointment;
        try {
             savedAppointment = appointmentService.save(appointment);

        }catch (DataIntegrityViolationException e){
            throw new BadRequestException(message.getMessage("duplicated.appointment.date"));
        }
        return new AppointmentResponse(buildResponse(savedAppointment));
    }

    private AppointmentDto buildResponse (Appointment appointment) {
        return appointmentMapper.convertAppointmentToAppointmentDto(appointment);
    }
}
