package com.example.agile.realstate.realstate.controller;

import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.dto.request.PropertyRequest;
import com.example.agile.realstate.realstate.dto.response.PropertyDetailsResponse;
import com.example.agile.realstate.realstate.dto.response.PropertyResponse;
import com.example.agile.realstate.realstate.usecase.CreatePropertyUseCase;
import com.example.agile.realstate.realstate.usecase.GetOffersUseCase;
import com.example.agile.realstate.realstate.usecase.GetPropertyDetailsUseCase;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/properties")
public class PropertyController {
    private final CreatePropertyUseCase createPropertyUseCase;

    private final GetOffersUseCase getOffersUseCase;

    private final GetPropertyDetailsUseCase getPropertyDetailsUseCase;

    public PropertyController(CreatePropertyUseCase createPropertyUseCase, GetOffersUseCase getOffersUseCase,
                              GetPropertyDetailsUseCase getPropertyDetailsUseCase) {
        this.createPropertyUseCase = createPropertyUseCase;
        this.getOffersUseCase = getOffersUseCase;
        this.getPropertyDetailsUseCase = getPropertyDetailsUseCase;
    }

    @RequestMapping(value = "/save", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public PropertyResponse saveProperty(@ModelAttribute PropertyRequest propertyRequest) {
        return createPropertyUseCase.execute(propertyRequest);
    }

    @RequestMapping(value = "/offers", method = GET)
    public List<Property> getOffers() {
        return getOffersUseCase.execute();
    }

    @GetMapping("/{propertyId}")
    public PropertyDetailsResponse getDetailsById(@PathVariable("propertyId") Long propertyId) {
        return getPropertyDetailsUseCase.execute(propertyId);
    }
}
