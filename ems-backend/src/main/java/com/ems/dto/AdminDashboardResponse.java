package com.ems.dto;

import java.util.Map;

public class AdminDashboardResponse {
	
	private long totalEmployees;
	private double totalSalary;
	private Map<String,Long> departmentWiseCount;
	private long activeEmployees;
	private long inactiveEmployees;

	
	public AdminDashboardResponse(
	        long totalEmployees,
	        double totalSalary,
	        Map<String, Long> departmentCounts,
	        long activeEmployees,
	        long inactiveEmployees
	) {
	    this.totalEmployees = totalEmployees;
	    this.totalSalary = totalSalary;
	    this.departmentWiseCount = departmentCounts;
	    this.activeEmployees = activeEmployees;
	    this.inactiveEmployees = inactiveEmployees;
	}


	public long getTotalEmployees() {
		return totalEmployees;
	}

	public double getTotalSalary() {
		return totalSalary;
	}

	public Map<String, Long> getDepartmentWiseCount() {
		return departmentWiseCount;
	}
	
	

}
