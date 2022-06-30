package com.example.agile.realstate.realstate.controller;

import com.example.agile.realstate.realstate.dto.request.AppointmentRequest;
import com.example.agile.realstate.realstate.dto.response.AppointmentResponse;
import com.example.agile.realstate.realstate.dto.response.GetAllAppointmentsResponse;
import com.example.agile.realstate.realstate.usecase.GetAllAppointmentsUseCase;
import com.example.agile.realstate.realstate.usecase.SaveAppointmentUseCase;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final SaveAppointmentUseCase saveAppointmentUseCase;
    private final GetAllAppointmentsUseCase getAllAppointmentsUseCase;

    public AppointmentController(SaveAppointmentUseCase saveAppointmentUseCase, GetAllAppointmentsUseCase getAllAppointmentsUseCase) {
        this.saveAppointmentUseCase = saveAppointmentUseCase;
        this.getAllAppointmentsUseCase = getAllAppointmentsUseCase;
    }

    @PostMapping(value = "/save/{propertyId}")
    public AppointmentResponse save (@PathVariable("propertyId") Long propertyId,
                                     @RequestBody AppointmentRequest appointmentRequest) {
        return saveAppointmentUseCase.execute(propertyId, appointmentRequest);
    }

    @GetMapping(value = "/{propertyId}")
    public GetAllAppointmentsResponse getAll(@PathVariable("propertyId") Long propertyId) {
        return getAllAppointmentsUseCase.execute(propertyId);
    }
}
