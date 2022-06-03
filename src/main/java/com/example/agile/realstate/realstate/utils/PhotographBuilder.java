package com.example.agile.realstate.realstate.utils;

import com.example.agile.realstate.realstate.domain.Photograph;
import com.example.agile.realstate.realstate.domain.Property;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class PhotographBuilder {
    public Photograph buildPhotograph(MultipartFile multipartFile, Property property) {
        Photograph photograph = new Photograph();
        photograph.setName(multipartFile.getOriginalFilename());
        photograph.setMimeType(multipartFile.getContentType());
        photograph.setSize(multipartFile.getSize());
        photograph.setProperty(property);
        try {
            photograph.setValue(multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return photograph;
    }
}
