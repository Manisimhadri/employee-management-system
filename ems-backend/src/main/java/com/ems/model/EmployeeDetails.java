package com.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String department;
    private String designation;
    private Double salary;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore   // 🔥 ADD THIS
    private User user;
}
