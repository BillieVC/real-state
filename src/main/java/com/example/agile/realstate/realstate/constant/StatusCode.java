package com.example.agile.realstate.realstate.constant;

public enum StatusCode {
    INTERNAL_EXCEPTION("1001"),
    API_EXCEPTION("1002"),
    FILE_SYSTEM_IO_EXCEPTION("1003"),
    CRYPTO_EXCEPTION("1004"),
    DBEXCEPTION("1005"),
    NETWORK_EXCEPTION("1006"),
    HTTP_EXCEPTION("1007"),
    CONSUMER_RETRYABLE_EXCEPTION("1008"),
    CONSUMER_SKIPPABLE_EXCEPTION("1009"),
    BAD_REQUEST_EXCEPTION("1010"),
    SECURITY_BAD_REQUEST_EXCEPTION("10101"),
    WORKFLOW_BAD_REQUEST_EXCEPTION("10102"),
    RESOURCE_NOT_FOUND_EXCEPTION("1011"),
    FORBIDDEN_EXCEPTION("1012"),
    FATAL_ERROR("2001"),
    API_ERROR("2002"),
    CRYPTO_ERROR("2004"),
    DB_ERROR("2005"),
    NETWORK_ERROR("2006"),
    HTTP_ERROR("2007"),
    CONSUMER_FATAL_ERROR("2008");

    private final String statusCode;

    StatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String get() {
        return this.statusCode;
    }

}
