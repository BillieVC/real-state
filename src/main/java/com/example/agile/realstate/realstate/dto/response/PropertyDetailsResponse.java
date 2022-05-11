package com.example.agile.realstate.realstate.dto.response;

import com.example.agile.realstate.realstate.domain.Photograph;
import com.example.agile.realstate.realstate.dto.PropertyDto;
import lombok.Getter;
import lombok.Setter;
import com.example.agile.realstate.realstate.constant.ResponseConstant.StatusCodeResponse;

import java.util.List;

@Getter
@Setter
public class PropertyDetailsResponse extends CommonResponse {
    private PropertyDto propertyDto;
    private List<Photograph> photos;

    public PropertyDetailsResponse(PropertyDto propertyDto,
                                   List<Photograph> photos) {
        super(StatusCodeResponse.SUCCESS_CODE, StatusCodeResponse.SUCCESS_MSG);
        this.propertyDto = propertyDto;
        this.photos = photos;
    }
}
