package com.example.agile.realstate.realstate.dto.request;

import com.example.agile.realstate.realstate.domain.Photograph;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class PropertyRequest {
    private Double price;
    private String title;
    private String description;
    private String type;
    private String department;
    private String zone;
    private String address;
    @Nullable
    private MultipartFile multipartFile;
}
