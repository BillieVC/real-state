package com.example.agile.realstate.realstate.service;

import com.example.agile.realstate.realstate.domain.Photograph;
import com.example.agile.realstate.realstate.repository.PhotographRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotographServiceImpl implements IPhotographService {
    private final PhotographRepository photographRepository;

    public PhotographServiceImpl(PhotographRepository photographRepository) {
        this.photographRepository = photographRepository;
    }

    @Override
    public Photograph save(Photograph photograph) {
        return photographRepository.save(photograph);
    }

    @Override
    public List<Photograph> getByPropertyId(Long propertyId) {
        return photographRepository.findByPropertyId(propertyId);
    }

    @Override
    public Photograph findById(Long id) {
        return photographRepository.findById(id).orElse(null);
    }
}
