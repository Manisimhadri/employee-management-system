package com.ems.repository;

import com.ems.model.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails, Long> {

    @Query("SELECT SUM(e.salary) FROM EmployeeDetails e")
    Double getTotalSalary();

    @Query("SELECT e.department, COUNT(e) FROM EmployeeDetails e GROUP BY e.department")
    List<Object[]> countEmployeesByDepartment();
}
