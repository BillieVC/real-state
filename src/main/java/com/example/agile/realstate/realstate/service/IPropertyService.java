package com.example.agile.realstate.realstate.service;

import com.example.agile.realstate.realstate.domain.Property;

import java.util.List;

public interface IPropertyService {
    Property save(Property property);

    List<Property> getAll();

    Property findById(Long id);
}
