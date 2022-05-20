package com.example.agile.realstate.realstate.exception;

import com.example.agile.realstate.realstate.constant.StatusCode;
import com.example.agile.realstate.realstate.dto.response.CommonResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<CommonResponse> unknownException(Exception ex) {
        return new ResponseEntity<>(new CommonResponse(StatusCode.INTERNAL_EXCEPTION.get(),
                ex.getMessage()),
                new HttpHeaders(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(value = {BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<CommonResponse> badRequestException(BadRequestException ex) {
        return new ResponseEntity<>(new CommonResponse(StatusCode.BAD_REQUEST_EXCEPTION.get(),
                ex.getMessage()),
                new HttpHeaders(),
                HttpStatus.BAD_REQUEST);
    }

}
