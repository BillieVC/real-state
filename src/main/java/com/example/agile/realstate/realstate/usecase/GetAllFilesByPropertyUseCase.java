package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.dto.response.GetAllPhotographsByPropertyResponse;
import com.example.agile.realstate.realstate.service.IPhotographService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetAllFilesByPropertyUseCase {
    @Autowired
    private IPhotographService photographService;

    public GetAllPhotographsByPropertyResponse execute(Long propertyId){
        return new GetAllPhotographsByPropertyResponse(
                photographService.getByPropertyId(propertyId)
        );
    }
}
