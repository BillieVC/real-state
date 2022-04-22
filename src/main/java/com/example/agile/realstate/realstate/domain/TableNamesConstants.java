package com.example.agile.realstate.realstate.domain;

public class TableNamesConstants {
    static class PropertiesTable {
        static final String NAME = "properties_table";

        static class Id {
            static final String NAME = "properties_id";
        }

        static class Title {
            static final String NAME = "properties_title";
            static final int LENGTH = 25;
        }

        static class Description {
            static final String NAME = "properties_description";
            static final int LENGTH = 250;
        }

        static class Type {
            static final String NAME = "properties_type";
        }

        static class Department {
            static final String NAME = "properties_department";
        }

        static class Status{
            static final String NAME = "properties_status";
        }

        static class Zone {
            static final String NAME = "properties_zone";
            static final int LENGTH = 50;
        }

        static class Price {
            static final String NAME = "properties_price";
        }

        static class Address {
            static final String NAME = "properties_address";
            static final int LENGTH = 150;
        }

        static class PublicationDate {
            static final String NAME = "properties_publication_date";
        }
    }

    static class PhotographsTable {
        static final String NAME = "photographs_table";
        static class Id{
            static final String NAME = "photographs_id";
        }
        static class MimeType{
            static final String NAME = "photographs_mime_type";
        }
        static class Name{
            static final String NAME = "photographs_name";
        }
        static class Size{
            static final String NAME = "photographs_size";
        }
        static class Vale{
            static final String NAME = "photographs_value";
        }
        static class Property{
            static final String NAME = "photographs_property_id";
        }
    }
}
