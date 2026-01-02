package com.ems.service;

import java.util.List;


import com.ems.dto.AdminDashboardResponse;
import com.ems.dto.CreateEmployeeRequest;
import com.ems.dto.EmployeePersonalDetailsResponse;
import com.ems.dto.EmployeeResponse;
import com.ems.model.Status;

public interface AdminService {
	
	
	AdminDashboardResponse getDashboardData();
	
	void createEmployee(CreateEmployeeRequest request);
	
	List<EmployeeResponse> getAllEmployees();
	
	EmployeeResponse getEmployeeById(Long id);
	
	void updateEmployee(Long id, CreateEmployeeRequest request);
	
	void deleteEmployee(Long id);
	
	EmployeePersonalDetailsResponse getEmployeePersonalDetails(Long employeeId);
	
	List<EmployeeResponse> getEmployeesByStatus(Status status);
	
	void restoreEmployee(Long id);


}
