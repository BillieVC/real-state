package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.dto.response.GetAllPhotographsByPropertyResponse;
import com.example.agile.realstate.realstate.service.IPhotographService;
import org.springframework.stereotype.Service;

@Service
public class GetAllFilesByPropertyUseCase {
    private final IPhotographService photographService;

    public GetAllFilesByPropertyUseCase(IPhotographService photographService) {
        this.photographService = photographService;
    }

    public GetAllPhotographsByPropertyResponse execute(Long propertyId){
        return new GetAllPhotographsByPropertyResponse(
                photographService.getByPropertyId(propertyId)
        );
    }
}
