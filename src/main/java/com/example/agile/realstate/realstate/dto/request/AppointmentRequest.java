package com.example.agile.realstate.realstate.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AppointmentRequest {
    private String userName;
    private String userEmail;
    private Long userPhone;
    private Date date;
}
