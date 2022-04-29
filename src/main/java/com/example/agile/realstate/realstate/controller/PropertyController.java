package com.example.agile.realstate.realstate.controller;

import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.dto.request.PropertyRequest;
import com.example.agile.realstate.realstate.dto.response.PropertyResponse;
import com.example.agile.realstate.realstate.usecase.CreatePropertyUseCase;
import com.example.agile.realstate.realstate.usecase.GetOffersUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

@RestController
@RequestMapping("/properties")
public class PropertyController {
    @Autowired
    private CreatePropertyUseCase createPropertyUseCase;

    @Autowired
    private GetOffersUseCase getOffersUseCase;
    
    @RequestMapping(value = "/save", method = POST,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public PropertyResponse saveProperty(@ModelAttribute PropertyRequest propertyRequest) {
        return createPropertyUseCase.execute(propertyRequest);
    }
    
    @RequestMapping(value = "/offers", method = GET )
    public List<Property> getOffers(){
    	return getOffersUseCase.execute();
    }


}
