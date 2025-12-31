package com.ems.dto;

import jakarta.validation.constraints.*;

public class CreateEmployeeRequest {
	
	@NotBlank(message = "Name is required")
	private String name;

	@Email(message = "Invalid email format")
	@NotBlank(message = "Email is required")
	private String email;

	@NotBlank(message = "Password is required")
	private String password;

	@NotBlank(message = "Department is required")
	private String department;

	@NotBlank(message = "Designation is required")
	private String designation;

	@NotNull(message = "Salary is required")
	@Positive(message = "Salary must be greater than zero")
	private Double salary;


    // getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
}
