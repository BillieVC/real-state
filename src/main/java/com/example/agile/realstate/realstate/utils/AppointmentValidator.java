package com.example.agile.realstate.realstate.utils;

import com.example.agile.realstate.realstate.common.Message;
import com.example.agile.realstate.realstate.exception.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class AppointmentValidator {
    private final Message message;

    public AppointmentValidator(Message message) {
        this.message = message;
    }

    public void validateDate(Date date) {
        Calendar tomorrowDate = Calendar.getInstance();
        tomorrowDate.setTime(new Date());
        tomorrowDate.add(Calendar.DAY_OF_YEAR, 1);
        tomorrowDate.set(Calendar.HOUR_OF_DAY, 0);

        Calendar requestDate = Calendar.getInstance();
        requestDate.setTime(date);

        if (requestDate.before(tomorrowDate)) {
            throw new BadRequestException(message.getMessage("invalid.appointment.date"));
        }
    }
}
