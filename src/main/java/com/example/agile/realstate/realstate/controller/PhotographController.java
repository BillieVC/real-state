package com.example.agile.realstate.realstate.controller;

import com.example.agile.realstate.realstate.dto.response.GetAllPhotographsByPropertyResponse;
import com.example.agile.realstate.realstate.dto.response.PropertyDetailsResponse;
import com.example.agile.realstate.realstate.usecase.AddPhotosUseCase;
import com.example.agile.realstate.realstate.usecase.GetAllFilesByPropertyUseCase;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/photographs")
public class PhotographController {
    private final GetAllFilesByPropertyUseCase getAllFilesByPropertyUseCase;

    private final AddPhotosUseCase addPhotosUseCase;

    public PhotographController(GetAllFilesByPropertyUseCase getAllFilesByPropertyUseCase,
                                AddPhotosUseCase addPhotosUseCase) {
        this.getAllFilesByPropertyUseCase = getAllFilesByPropertyUseCase;
        this.addPhotosUseCase = addPhotosUseCase;
    }

    @GetMapping("/{propertyId}")
    public GetAllPhotographsByPropertyResponse getAllPhotographsByProperty(
            @PathVariable Long propertyId) {
        return getAllFilesByPropertyUseCase.execute(propertyId);
    }

    @PostMapping(value = "/addPhotos/{propertyId}")
    public PropertyDetailsResponse addPhotos(@PathVariable("propertyId") Long propertyId,
                                             @RequestParam("photos") MultipartFile[] multipartFiles) {
        return addPhotosUseCase.execute(propertyId, multipartFiles);
    }
}
