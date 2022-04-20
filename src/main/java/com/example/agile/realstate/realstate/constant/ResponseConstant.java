package com.example.agile.realstate.realstate.constant;

public class ResponseConstant {

    public static class StatusCodeResponse {
        public static final String SUCCESS_CODE = "200";
        public static final String SUCCESS_MSG = "Success";

        private StatusCodeResponse() {
            throw new IllegalStateException("Failed");
        }
    }

    public static class DeleteCodeResponse {
        public static final String SUCCESS_CODE = "202";
        public static final String SUCCESS_MSG = "Deleted Success";

        private DeleteCodeResponse() {
            throw new IllegalStateException("Failed");
        }
    }

}
