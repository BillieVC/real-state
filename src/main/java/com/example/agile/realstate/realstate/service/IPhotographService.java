package com.example.agile.realstate.realstate.service;

import com.example.agile.realstate.realstate.domain.Photograph;

import java.util.List;

public interface IPhotographService {
    Photograph save(Photograph photograph);
    List<Photograph>getByPropertyId(Long propertyId);
    Photograph findById(Long id);
}
