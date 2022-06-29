package com.example.agile.realstate.realstate.mapper;

import com.example.agile.realstate.realstate.domain.Appointment;
import com.example.agile.realstate.realstate.dto.AppointmentDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    AppointmentDto convertAppointmentToAppointmentDto(Appointment appointment);
    List<AppointmentDto> appointmentListToAppointmentDtoList (List<Appointment> appointmentList);
}
