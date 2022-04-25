package com.example.agile.realstate.realstate.dto.response;

import com.example.agile.realstate.realstate.constant.ResponseConstant.StatusCodeResponse;
import com.example.agile.realstate.realstate.dto.PropertyDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyResponse extends CommonResponse{
    private PropertyDto propertyDto;

    public PropertyResponse(PropertyDto propertyDto) {
        super(StatusCodeResponse.SUCCESS_CODE, StatusCodeResponse.SUCCESS_MSG);
        this.propertyDto = propertyDto;
    }
}
