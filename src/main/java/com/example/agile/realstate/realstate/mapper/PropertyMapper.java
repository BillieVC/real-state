package com.example.agile.realstate.realstate.mapper;

import com.example.agile.realstate.realstate.domain.Property;
import com.example.agile.realstate.realstate.dto.PropertyDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PropertyMapper {
    PropertyDto propertyToPropertyDto(Property property);
}
