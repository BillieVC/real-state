package com.example.agile.realstate.realstate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = TableNamesConstants.AppointmentsTable.NAME)
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = TableNamesConstants.AppointmentsTable.Id.NAME, nullable = false)
    private Long id;

    @Column(name = TableNamesConstants.AppointmentsTable.UserName.NAME, length = 50)
    private String userName;

    @Column(name = TableNamesConstants.AppointmentsTable.UserEmail.NAME, nullable = false)
    private String userEmail;

    @Column(name = TableNamesConstants.AppointmentsTable.UserPhone.NAME)
    private Long userPhone;

    @Column(name = TableNamesConstants.AppointmentsTable.Date.NAME, unique = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @ManyToOne
    @JoinColumn(name = TableNamesConstants.AppointmentsTable.Property.NAME,
            referencedColumnName = TableNamesConstants.PropertiesTable.Id.NAME)
    private Property property;

}
