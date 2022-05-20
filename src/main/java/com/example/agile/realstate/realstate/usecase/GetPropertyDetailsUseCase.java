package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.common.Message;
import com.example.agile.realstate.realstate.domain.Photograph;
import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.dto.PropertyDto;
import com.example.agile.realstate.realstate.dto.response.PropertyDetailsResponse;
import com.example.agile.realstate.realstate.exception.BadRequestException;
import com.example.agile.realstate.realstate.mapper.PropertyMapper;
import com.example.agile.realstate.realstate.service.IPhotographService;
import com.example.agile.realstate.realstate.service.IPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetPropertyDetailsUseCase {
    @Autowired
    private Message message;

    @Autowired
    private IPropertyService propertyService;

    @Autowired
    private IPhotographService photographService;

    @Autowired
    private PropertyMapper propertyMapper;

    public PropertyDetailsResponse execute(Long propertyId) {
        Property property = propertyService.findById(propertyId);
        if (property == null) {
            throw new BadRequestException(message.getMessage("invalid.property.id"));
        }
        PropertyDto propertyDto = propertyMapper.propertyToPropertyDto(property);
        List<Photograph> photographs = photographService.getByPropertyId(propertyId);
        return new PropertyDetailsResponse(propertyDto, photographs);
    }
}
