package com.example.agile.realstate.realstate.repository;

import com.example.agile.realstate.realstate.domain.Photograph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotographRepository extends JpaRepository<Photograph, Long> {
    List<Photograph>findByPropertyId(Long propertyId);
}
