package com.example.agile.realstate.realstate.utils;

import com.example.agile.realstate.realstate.common.Message;
import com.example.agile.realstate.realstate.domain.PropertyDepartment;
import com.example.agile.realstate.realstate.domain.PropertyType;
import com.example.agile.realstate.realstate.dto.request.PropertyRequest;
import com.example.agile.realstate.realstate.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PropertyValidator {
    @Autowired
    private Message message;

    public void validate(PropertyRequest propertyRequest) {
        if (Utils.isNullOrEmpty(propertyRequest.getTitle())) {
            throw new BadRequestException(message.getMessage("title.required"));
        }
        if (Utils.isNullOrEmpty(propertyRequest.getDescription())) {
            throw new BadRequestException(message.getMessage("description.required"));
        }
        if (Utils.isNullOrEmpty(propertyRequest.getZone())) {
            throw new BadRequestException(message.getMessage("zone.required"));
        }
        if (Utils.isNullOrEmpty(propertyRequest.getAddress())) {
            throw new BadRequestException(message.getMessage("address.required"));
        }
        if (Utils.isNullOrEmpty(propertyRequest.getPrice())) {
            throw new BadRequestException(message.getMessage("price.required"));
        }
        validateType(propertyRequest.getType());
        validateDepartment(propertyRequest.getDepartment());
        validateData(propertyRequest);
    }

    private void validateDepartment(String department) {
        try {
            PropertyDepartment.valueOf(department);
        }catch (IllegalArgumentException e){
            throw new BadRequestException(message.getMessage("department.invalid.value")+ Arrays.toString(PropertyDepartment.values()));
        }
    }

    private void validateType(String type) {
        try {
            PropertyType.valueOf(type);
        }catch (IllegalArgumentException e){
            throw new BadRequestException(message.getMessage("type.invalid.value")+ Arrays.toString(PropertyType.values()));
        }
    }

    private void validateData(PropertyRequest propertyRequest) {
        if (propertyRequest.getTitle().length() < 4 || propertyRequest.getTitle().length() > 25) {
            throw new BadRequestException(message.getMessage("invalid.title.length"));
        }

        if (propertyRequest.getDescription().length() < 10 || propertyRequest.getDescription().length() > 250) {
            throw new BadRequestException(message.getMessage("invalid.description.length"));
        }

        if (propertyRequest.getZone().length() < 5 || propertyRequest.getZone().length() > 50) {
            throw new BadRequestException(message.getMessage("invalid.zone.length"));
        }

        if (propertyRequest.getAddress().length() < 5 || propertyRequest.getAddress().length() > 150) {
            throw new BadRequestException(message.getMessage("invalid.address.length"));
        }
    }

}
