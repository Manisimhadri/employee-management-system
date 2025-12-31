package com.ems.dto;

public class EmployeeResponse {
	
	private Long id;
    private String name;
    private String email;
    private String role;
    private String department;
    private String designation;
    private Double salary;
	public EmployeeResponse(Long id, String name, String email, String role, String department, String designation,
			Double salary) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.role = role;
		this.department = department;
		this.designation = designation;
		this.salary = salary;
	}
	
	//all getters
	public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getDepartment() { return department; }
    public String getDesignation() { return designation; }
    public Double getSalary() { return salary; }
    
    

}
