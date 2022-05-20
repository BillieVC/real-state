package com.example.agile.realstate.realstate.utils;

import com.example.agile.realstate.realstate.common.Message;
import com.example.agile.realstate.realstate.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Objects;

@Service
public class PhotographValidator {
    @Autowired
    private Message message;
    private final String[] IMG_TYPES = {"image/jpeg", "image/jpg", "image/png"};

    public void validatePhotograph(MultipartFile multipartFile) {
        if(multipartFile==null){
            return;
        }

        if (Arrays.stream(IMG_TYPES).noneMatch(s -> Objects.equals(multipartFile.getContentType(), s))) {
            throw new BadRequestException(message.getMessage("invalid.image.format"));
        }

        long SIZE_LIMIT = 5000000L;
        if(multipartFile.getSize()> SIZE_LIMIT){
            System.out.println(multipartFile.getSize());
            throw new BadRequestException(message.getMessage("invalid.image.size"));
        }
    }
}
