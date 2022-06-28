package com.example.agile.realstate.realstate.dto.response;

import com.example.agile.realstate.realstate.dto.AppointmentDto;
import com.example.agile.realstate.realstate.constant.ResponseConstant.StatusCodeResponse;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
public class GetAllAppointmentsResponse extends CommonResponse {
    private List<AppointmentDto> appointmentDtoList;

    public GetAllAppointmentsResponse(List<AppointmentDto> appointmentDtoList) {
        super(StatusCodeResponse.SUCCESS_CODE, StatusCodeResponse.SUCCESS_MSG);
        this.appointmentDtoList = appointmentDtoList;
    }
}
