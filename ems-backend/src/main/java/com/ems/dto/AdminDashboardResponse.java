package com.ems.dto;

import java.util.Map;

public class AdminDashboardResponse {
	
	private long totalEmployees;
	private double totalSalary;
	private Map<String,Long> departmentWiseCount;
	
	public AdminDashboardResponse(long totalEmployees, double totalSalary,
			Map<String,Long> departmentWiseCount) {
		
		this.departmentWiseCount = departmentWiseCount;
		this.totalEmployees = totalEmployees;
		this.totalSalary = totalSalary;
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
