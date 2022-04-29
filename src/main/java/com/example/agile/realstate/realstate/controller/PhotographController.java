package com.example.agile.realstate.realstate.controller;

import com.example.agile.realstate.realstate.dto.response.GetAllPhotographsByPropertyResponse;
import com.example.agile.realstate.realstate.usecase.GetAllFilesByPropertyUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/photographs")
public class PhotographController {
    @Autowired
    private GetAllFilesByPropertyUseCase getAllFilesByPropertyUseCase;

    @GetMapping("/{propertyId}")
    public GetAllPhotographsByPropertyResponse getAllPhotographsByProperty(
            @PathVariable Long propertyId){
        return getAllFilesByPropertyUseCase.execute(propertyId);
    }
}
