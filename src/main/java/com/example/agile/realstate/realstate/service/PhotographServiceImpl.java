package com.example.agile.realstate.realstate.service;

import com.example.agile.realstate.realstate.domain.Photograph;
import com.example.agile.realstate.realstate.repository.PhotographRepository;
import org.springframework.stereotype.Service;

@Service
public class PhotographServiceImpl implements IPhotographService{
    private PhotographRepository photographRepository;

    public PhotographServiceImpl(PhotographRepository photographRepository) {
        this.photographRepository = photographRepository;
    }

    @Override
    public Photograph save(Photograph photograph) {
        return photographRepository.save(photograph);
    }
}
