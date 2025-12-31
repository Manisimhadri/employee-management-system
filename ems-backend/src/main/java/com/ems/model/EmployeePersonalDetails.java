package com.ems.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "employee_personal_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeePersonalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 12)
    private String aadharNumber;

    private String fatherName;
    private String motherName;

    private LocalDate dateOfBirth;
    private String emergencyContact;
    private String address;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
}
