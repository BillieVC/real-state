package com.example.agile.realstate.realstate.dto.response;

import com.example.agile.realstate.realstate.constant.ResponseConstant;
import com.example.agile.realstate.realstate.domain.Photograph;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetAllPhotographsByPropertyResponse extends CommonResponse {
    private List<Photograph> photographs;

    public GetAllPhotographsByPropertyResponse(List<Photograph> photographs) {
        super(ResponseConstant.StatusCodeResponse.SUCCESS_CODE, ResponseConstant.StatusCodeResponse.SUCCESS_MSG);
        this.photographs = photographs;
    }
}
