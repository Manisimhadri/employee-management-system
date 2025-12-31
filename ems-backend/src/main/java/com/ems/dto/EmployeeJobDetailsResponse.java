package com.ems.dto;

public class EmployeeJobDetailsResponse {

    private String name;
    private String email;
    private String department;
    private String designation;

    public EmployeeJobDetailsResponse(String name, String email,
                                      String department, String designation) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.designation = designation;
    }

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getDepartment() {
		return department;
	}

	public String getDesignation() {
		return designation;
	}

    // getters
}
