package com.ems.controller;

import jakarta.validation.Valid;

import com.ems.dto.AdminDashboardResponse;
import com.ems.service.AdminService;
import com.ems.dto.CreateEmployeeRequest;
import com.ems.dto.EmployeePersonalDetailsResponse;
import com.ems.dto.EmployeeResponse;
import com.ems.model.Status;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private AdminService adminService;
    
    public AdminController(AdminService adminService) {
    	this.adminService = adminService;
    }
    
    @PostMapping("/employees")
    public String createEmployee(@Valid @RequestBody CreateEmployeeRequest request) {
    	adminService.createEmployee(request);
    	return "Employee Created Successfully";
    }
    
    @GetMapping("/employees")
    public List<EmployeeResponse> getAllEmployees(){
    	return adminService.getAllEmployees();
    }
    
    @GetMapping("/employees/{id}")
    public EmployeeResponse getEmployeeById(@PathVariable Long id) {
    	return adminService.getEmployeeById(id);
    }
    
    @PutMapping("/employees/{id}")
    public String updateEmployee(@PathVariable Long id,
    		@RequestBody CreateEmployeeRequest request
    		) {
    	adminService.updateEmployee(id, request);
    	return "Employee Updated Sucessfully";
    }
    
    @DeleteMapping("/employees/{id}")
    public String deleteEmployee(@PathVariable Long id) {
    	adminService.deleteEmployee(id);
    	return "Employee Deleted Sucessfully";
    }
    
    @GetMapping("/employees/{id}/personal-details")
    public EmployeePersonalDetailsResponse getEmployeePersonalDetails(
    		@PathVariable Long id) {
    	return adminService.getEmployeePersonalDetails(id);
    }
    
    
    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard() {
        return adminService.getDashboardData();
    }

    @GetMapping("/employees/inactive")
    public List<EmployeeResponse> getInactiveEmployees() {
        return adminService.getEmployeesByStatus(Status.INACTIVE);
    }

    @PutMapping("/employees/restore/{id}")
    public String restoreEmployee(@PathVariable Long id) {
        adminService.restoreEmployee(id);
        return "Employee Restored Successfully";
    }

    @DeleteMapping("/employees/permanent/{id}")
    public String permanentlyDeleteEmployee(@PathVariable Long id) {
        adminService.permanentlyDeleteEmployee(id);
        return "Employee permanently deleted";
    }

}
