package com.ems.dto;

import java.time.LocalDate;

public class EmployeePersonalDetailsResponse {

    private String aadharNumber;
    private String fatherName;
    private String motherName;
    private LocalDate dateOfBirth;
    private String emergencyContact;
    private String address;

    public EmployeePersonalDetailsResponse(String aadharNumber,
                                           String fatherName,
                                           String motherName,
                                           LocalDate dateOfBirth,
                                           String emergencyContact,
                                           String address) {
        this.aadharNumber = aadharNumber;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.dateOfBirth = dateOfBirth;
        this.emergencyContact = emergencyContact;
        this.address = address;
    }

    public String getAadharNumber() { return aadharNumber; }
    public String getFatherName() { return fatherName; }
    public String getMotherName() { return motherName; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public String getEmergencyContact() { return emergencyContact; }
    public String getAddress() { return address; }
}
