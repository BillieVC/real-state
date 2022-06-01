package com.example.agile.realstate.realstate.common;

import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.StandardCharsets;

@Component
@AllArgsConstructor
public class Message {
    private final ResourceBundleMessageSource messageSource;

    private String decodeText(String input) throws IOException {
        CharsetDecoder charsetDecoder = StandardCharsets.UTF_8.newDecoder();
        charsetDecoder.onMalformedInput(CodingErrorAction.IGNORE);

        return new BufferedReader(
                new InputStreamReader(
                        new ByteArrayInputStream(input.getBytes()), charsetDecoder)).readLine();
    }

    public String getMessage(String code) {
        try {
            return decodeText(
                    messageSource.getMessage(code, null, LocaleContextHolder.getLocale())
            );}
        catch (IOException ex){
            return messageSource.getMessage(code, null, LocaleContextHolder.getLocale());
        }
    }
}
