package com.example.agile.realstate.realstate.repository;

import com.example.agile.realstate.realstate.domain.Photograph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotographRepository extends JpaRepository<Photograph, Long> {
}
