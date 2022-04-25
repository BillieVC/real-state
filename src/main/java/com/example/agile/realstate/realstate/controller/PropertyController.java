package com.example.agile.realstate.realstate.controller;

import com.example.agile.realstate.realstate.dto.request.PropertyRequest;
import com.example.agile.realstate.realstate.dto.response.PropertyResponse;
import com.example.agile.realstate.realstate.usecase.CreatePropertyUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/properties")
public class PropertyController {
    @Autowired
    private CreatePropertyUseCase createPropertyUseCase;

    @RequestMapping(value = "/save", method = POST,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public PropertyResponse saveProperty(@ModelAttribute PropertyRequest propertyRequest) {
        return createPropertyUseCase.execute(propertyRequest);
    }
}
