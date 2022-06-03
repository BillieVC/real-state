package com.example.agile.realstate.realstate.service;

import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyServiceImpl implements IPropertyService {
    private final PropertyRepository propertyRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Override
    public Property save(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public List<Property> getAll() {
        return propertyRepository.findAll();
    }

    @Override
    public Property findById(Long id) {
        return propertyRepository.findById(id).orElse(null);
    }
}
