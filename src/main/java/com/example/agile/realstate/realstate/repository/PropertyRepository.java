package com.example.agile.realstate.realstate.repository;

import com.example.agile.realstate.realstate.domain.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
