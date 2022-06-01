package com.example.agile.realstate.realstate.utils;

import com.example.agile.realstate.realstate.common.Message;
import com.example.agile.realstate.realstate.exception.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Objects;

@Service
public class PhotographValidator {
    private final Message message;
    private final String[] IMG_TYPES = {"image/jpeg", "image/jpg", "image/png"};

    public PhotographValidator(Message message) {
        this.message = message;
    }

    public void validatePhotograph(MultipartFile multipartFile) {
        if (multipartFile == null) {
            return;
        }

        if (Arrays.stream(IMG_TYPES).noneMatch(s -> Objects.equals(multipartFile.getContentType(), s))) {
            throw new BadRequestException(message.getMessage("invalid.image.format"));
        }

        long SIZE_LIMIT = 5000000L;
        if (multipartFile.getSize() > SIZE_LIMIT) {
            throw new BadRequestException(message.getMessage("invalid.image.size"));
        }
    }

    public void validatePhotos(MultipartFile[] multipartFiles) {
        if (multipartFiles == null) {
            return;
        }
        if (multipartFiles.length > 5) {
            throw new BadRequestException(message.getMessage("photos.quantity.exceed"));
        }

        Arrays.asList(multipartFiles).forEach(this::validatePhotograph);
    }
}
