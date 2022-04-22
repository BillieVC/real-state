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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CreatePropertyUseCase {
    @Autowired
    private IPropertyService propertyService;

    @Autowired
    private IPhotographService photographService;

    @Autowired
    private PropertyMapper propertyMapper;

    public PropertyResponse execute(PropertyRequest propertyRequest) {
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
        Property propertySaved = propertyService.save(property);

        photographService.save(buildPhotograph(propertyRequest.getMultipartFile(), propertySaved));
        return new PropertyResponse(buildDto(propertySaved));
    }

    private PropertyDto buildDto(Property property) {
        return propertyMapper.propertyToPropertyDto(property);
    }

    private Photograph buildPhotograph(MultipartFile multipartFile, Property property) {
        Photograph photograph = new Photograph();
        photograph.setName(multipartFile.getOriginalFilename());
        photograph.setMimeType(multipartFile.getContentType());
        photograph.setSize(multipartFile.getSize());
        photograph.setProperty(property);
        try {
            photograph.setValue(multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return photograph;
    }
}
