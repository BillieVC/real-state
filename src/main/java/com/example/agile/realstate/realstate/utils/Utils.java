package com.example.agile.realstate.realstate.utils;

public final class Utils {
    private Utils() {
        throw new IllegalStateException("Must not have constructor It is a utility class");
    }

    private static boolean isNull(Object value){
        return value == null;
    }

    public static boolean isNullOrEmpty(Object value){
        if(isNull(value)){
            return true;
        } else if( value instanceof String ){
            return value.toString().trim().isEmpty();
        } else {
            return false;
        }
    }
}
