package com.example.agile.realstate.realstate.dto;

import com.example.agile.realstate.realstate.domain.Property;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AppointmentDto {
    private Long id;
    private String userName;
    private String userEmail;
    private Date date;
    private Property property;
}
