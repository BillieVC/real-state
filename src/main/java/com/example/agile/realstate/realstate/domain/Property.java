package com.example.agile.realstate.realstate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = TableNamesConstants.PropertiesTable.NAME)
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = TableNamesConstants.PropertiesTable.Id.NAME)
    private Long id;

    @Column(name = TableNamesConstants.PropertiesTable.Title.NAME,
            length = TableNamesConstants.PropertiesTable.Title.LENGTH)
    private String title;

    @Column(name = TableNamesConstants.PropertiesTable.Description.NAME,
            length = TableNamesConstants.PropertiesTable.Description.LENGTH)
    private String description;

    @Column(name = TableNamesConstants.PropertiesTable.Type.NAME)
    @Enumerated(EnumType.STRING)
    private PropertyType propertyType;

    @Column(name = TableNamesConstants.PropertiesTable.Department.NAME)
    @Enumerated(EnumType.STRING)
    private PropertyDepartment propertyDepartment;

    @Column(name = TableNamesConstants.PropertiesTable.Status.NAME)
    @Enumerated(EnumType.STRING)
    private PropertyStatus status;

    @Column(name = TableNamesConstants.PropertiesTable.Zone.NAME,
            length = TableNamesConstants.PropertiesTable.Zone.LENGTH)
    private String zone;

    @Column(name = TableNamesConstants.PropertiesTable.Price.NAME)
    private Double price;

    @Column(name = TableNamesConstants.PropertiesTable.Address.NAME,
            length = TableNamesConstants.PropertiesTable.Address.LENGTH)
    private String address;

    @Temporal(TemporalType.DATE)
    @Column(name = TableNamesConstants.PropertiesTable.PublicationDate.NAME)
    private Date publicationDate;

    @PrePersist
    void onPrePersist(){
        this.publicationDate= new Date();
        this.status=PropertyStatus.OFFERED;
    }
}
