package com.example.agile.realstate.realstate.usecase;

import com.example.agile.realstate.realstate.common.Message;
import com.example.agile.realstate.realstate.domain.Photograph;
import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.dto.PropertyDto;
import com.example.agile.realstate.realstate.dto.response.PropertyDetailsResponse;
import com.example.agile.realstate.realstate.exception.BadRequestException;
import com.example.agile.realstate.realstate.mapper.PropertyMapper;
import com.example.agile.realstate.realstate.service.IPhotographService;
import com.example.agile.realstate.realstate.service.IPropertyService;
import com.example.agile.realstate.realstate.utils.PhotographBuilder;
import com.example.agile.realstate.realstate.utils.PhotographValidator;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AddPhotosUseCase {
    private final IPropertyService propertyService;

    private final IPhotographService photographService;

    private final PropertyMapper propertyMapper;

    private final PhotographValidator photographValidator;

    private final Message message;

    public AddPhotosUseCase(IPropertyService propertyService, IPhotographService photographService
            , PropertyMapper propertyMapper, PhotographValidator photographValidator,
                            Message message) {
        this.message = message;
        this.propertyService = propertyService;
        this.photographService = photographService;
        this.propertyMapper = propertyMapper;
        this.photographValidator = photographValidator;
    }

    public PropertyDetailsResponse execute(Long propertyId, MultipartFile[] multipartFiles) {
        Property property = propertyService.findById(propertyId);
        if (property == null) {
            throw new BadRequestException(message.getMessage("invalid.property.id"));
        }
        photographValidator.validatePhotos(multipartFiles);
        List<Photograph> photos = new ArrayList<>();
        Arrays.asList(multipartFiles).forEach(multipartFile -> {
            Photograph photograph = buildPhotograph(multipartFile, property);
            Photograph savedPhoto = photographService.save(photograph);
            photos.add(savedPhoto);
        });
        PropertyDto propertyDto = propertyMapper.propertyToPropertyDto(property);
        return new PropertyDetailsResponse(propertyDto, photos);
    }

    private Photograph buildPhotograph(MultipartFile multipartFile, Property property) {
        return new PhotographBuilder().buildPhotograph(multipartFile, property);
    }
}
