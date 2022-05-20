package com.example.agile.realstate.realstate.dto;

import com.example.agile.realstate.realstate.domain.PropertyDepartment;
import com.example.agile.realstate.realstate.domain.PropertyStatus;
import com.example.agile.realstate.realstate.domain.PropertyType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PropertyDto {
    private Long id;
    private Double price;
    private String title;
    private String description;
    private PropertyType propertyType;
    private PropertyDepartment propertyDepartment;
    private String zone;
    private Date publicationDate;
    private PropertyStatus status;
    private String address;
}
