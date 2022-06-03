package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.domain.Photograph;
import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.domain.PropertyDepartment;
import com.example.agile.realstate.realstate.domain.PropertyType;
import com.example.agile.realstate.realstate.dto.PropertyDto;
import com.example.agile.realstate.realstate.dto.request.PropertyRequest;
import com.example.agile.realstate.realstate.dto.response.PropertyResponse;
import com.example.agile.realstate.realstate.mapper.PropertyMapper;
import com.example.agile.realstate.realstate.service.IPhotographService;
import com.example.agile.realstate.realstate.service.IPropertyService;
import com.example.agile.realstate.realstate.utils.PhotographBuilder;
import com.example.agile.realstate.realstate.utils.PhotographValidator;
import com.example.agile.realstate.realstate.utils.PropertyValidator;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CreatePropertyUseCase {
    private final IPropertyService propertyService;

    private final IPhotographService photographService;

    private final PropertyMapper propertyMapper;

    private final PropertyValidator propertyValidator;
    private final PhotographValidator photographValidator;

    public CreatePropertyUseCase(IPropertyService propertyService, IPhotographService photographService,
                                 PropertyMapper propertyMapper, PropertyValidator propertyValidator,
                                 PhotographValidator photographValidator) {
        this.propertyService = propertyService;
        this.photographService = photographService;
        this.propertyMapper = propertyMapper;
        this.propertyValidator = propertyValidator;
        this.photographValidator = photographValidator;
    }

    public PropertyResponse execute(PropertyRequest propertyRequest) {
        propertyValidator.validate(propertyRequest);
        Property property = new Property();
        property.setTitle(propertyRequest.getTitle());
        property.setDescription(propertyRequest.getDescription());
        property.setPropertyType(PropertyType.valueOf(propertyRequest.getType()
                .toUpperCase().replace(" ", "_")));


        property.setPropertyDepartment(PropertyDepartment.valueOf(propertyRequest.getDepartment()
                .toUpperCase().replace(" ", "_")));
        property.setPrice(propertyRequest.getPrice());
        property.setAddress(propertyRequest.getAddress());
        property.setZone(propertyRequest.getZone());
        photographValidator.validatePhotograph(propertyRequest.getMultipartFile());
        Property propertySaved = propertyService.save(property);
        if (propertyRequest.getMultipartFile() != null) {
            photographService.save(buildPhotograph(propertyRequest.getMultipartFile(), propertySaved));
        }
        return new PropertyResponse(buildDto(propertySaved));
    }

    private PropertyDto buildDto(Property property) {
        return propertyMapper.propertyToPropertyDto(property);
    }

    private Photograph buildPhotograph(MultipartFile multipartFile, Property property) {
        return new PhotographBuilder().buildPhotograph(multipartFile, property);
    }
}
