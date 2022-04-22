package com.example.agile.realstate.realstate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = TableNamesConstants.PhotographsTable.NAME)
public class Photograph {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = TableNamesConstants.PhotographsTable.Id.NAME)
    private Long id;

    @Column(name = TableNamesConstants.PhotographsTable.MimeType.NAME)
    private String mimeType;

    @Column(name = TableNamesConstants.PhotographsTable.Name.NAME)
    private String name;

    @Column(name = TableNamesConstants.PhotographsTable.Size.NAME)
    private Long size;

    @Column(name = TableNamesConstants.PhotographsTable.Vale.NAME)
    @Lob
    private byte[] value;

    @ManyToOne
    @JoinColumn(name = TableNamesConstants.PhotographsTable.Property.NAME,
            referencedColumnName = TableNamesConstants.PropertiesTable.Id.NAME)
    private Property property;
}
