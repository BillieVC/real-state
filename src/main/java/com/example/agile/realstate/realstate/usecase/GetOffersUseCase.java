package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.service.IPropertyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetOffersUseCase {
    private final IPropertyService propertyService;

    public GetOffersUseCase(IPropertyService propertyService) {
        this.propertyService = propertyService;
    }

    public List<Property> execute() {
        return propertyService.getAll();
    }

}
