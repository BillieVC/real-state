package com.example.agile.realstate.realstate.usecase;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.service.IPropertyService;

@Service
public class GetOffersUseCase {
    @Autowired
    private IPropertyService propertyService;

	public List<Property> execute() {
		return propertyService.getAll();
	}

}
