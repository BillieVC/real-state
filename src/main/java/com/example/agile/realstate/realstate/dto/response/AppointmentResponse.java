package com.example.agile.realstate.realstate.dto.response;

import com.example.agile.realstate.realstate.dto.AppointmentDto;
import lombok.Getter;
import lombok.Setter;
import com.example.agile.realstate.realstate.constant.ResponseConstant.StatusCodeResponse;

@Getter
@Setter
public class AppointmentResponse extends CommonResponse{
    private AppointmentDto appointmentDto;

    public AppointmentResponse (AppointmentDto appointmentDto) {
        super(StatusCodeResponse.SUCCESS_CODE, StatusCodeResponse.SUCCESS_MSG);
        this.appointmentDto = appointmentDto;
    }
}
