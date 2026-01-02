package com.ems.service;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ems.repository.EmployeeDetailsRepository;
import com.ems.repository.UserRepository;
import com.ems.dto.*;
import com.ems.exception.BadRequestException;
import com.ems.exception.ResourceNotFoundException;
import com.ems.model.*;
import com.ems.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.ems.model.EmployeePersonalDetails;

@Service
public class AdminServiceImpl implements AdminService{

	private final UserRepository userRepository;
    private final EmployeeDetailsRepository employeeDetailsRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmployeePersonalDetailsRepository employeePersonalDetailsRepository;

    public AdminServiceImpl(UserRepository userRepository,
                            EmployeeDetailsRepository employeeDetailsRepository,
                            EmployeePersonalDetailsRepository employeePersonalDetailsRepository,
                            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.employeeDetailsRepository = employeeDetailsRepository;
        this.employeePersonalDetailsRepository = employeePersonalDetailsRepository;
        this.passwordEncoder = passwordEncoder;
    }

	
	
	//  -------- DASHBOARD -------------
    @Override
    public AdminDashboardResponse getDashboardData() {

        long totalEmployees = userRepository.countByRole(Role.EMPLOYEE);

        Double salarySum = employeeDetailsRepository.getTotalSalary();
        double totalSalary = salarySum != null ? salarySum : 0;

        List<Object[]> deptData = employeeDetailsRepository.countEmployeesByDepartment();
        Map<String, Long> deptCountMap = new HashMap<>();
        
        long activeCount = userRepository.countByStatus(Status.ACTIVE);
        long inactiveCount = userRepository.countByStatus(Status.INACTIVE);


        if (deptData != null) {
            for (Object[] row : deptData) {
                String department = (String) row[0];

                // 🔥 THIS IS THE CRITICAL FIX
                Number countNumber = (Number) row[1];
                deptCountMap.put(department, countNumber.longValue());
            }
        }

        return new AdminDashboardResponse(
                totalEmployees,
                totalSalary,
                deptCountMap,
                activeCount,
                inactiveCount
        );
    	//return new AdminDashboardResponse(0, 0, new HashMap<>());
    }


	
	//--------------- CREATE ---------------
	@Override
	public void createEmployee(CreateEmployeeRequest request) {
		if(userRepository.existsByEmail(request.getEmail())) {
			throw new BadRequestException("Email already exists");

		}
		
		User user = new User();
		
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(Role.EMPLOYEE);
		
		User savedUser = userRepository.save(user);
		
		EmployeeDetails empDetails = new EmployeeDetails();
		empDetails.setDepartment(request.getDepartment());
		empDetails.setDesignation(request.getDesignation());
		empDetails.setSalary(request.getSalary());
		empDetails.setUser(savedUser);
		
		employeeDetailsRepository.save(empDetails);
		
	}
	

    // ---------- READ ALL ----------
	@Override
	public List<EmployeeResponse> getAllEmployees() {

	    List<User> users = userRepository.findByStatus(Status.ACTIVE);

	    return users.stream().map(user -> {
	        EmployeeDetails d = user.getEmployeeDetails();

	        return new EmployeeResponse(
	                user.getId(),
	                user.getName(),
	                user.getEmail(),
	                user.getRole().name(),
	                d != null ? d.getDepartment() : null,
	                d != null ? d.getDesignation() : null,
	                d != null ? d.getSalary() : null
	        );
	    }).toList();
	}


    // ---------- READ ONE ----------
    @Override
    public EmployeeResponse getEmployeeById(Long id) {
    	User user = userRepository.findById(id)
    			.orElseThrow(()-> new ResourceNotFoundException("Employee not found"));

    	
    	EmployeeDetails d = user.getEmployeeDetails();

        return new EmployeeResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                d != null ? d.getDepartment() : null,
                d != null ? d.getDesignation() : null,
                d != null ? d.getSalary() : null
        );
    }
    
    // ---------- UPDATE ----------
    @Override
    public void updateEmployee(Long id, CreateEmployeeRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        
        EmployeeDetails details = user.getEmployeeDetails();
        if(details != null) {
        	details.setDepartment(request.getDepartment());
        	details.setDesignation(request.getDesignation());
        	details.setSalary(request.getSalary());
        	employeeDetailsRepository.save(details);
        }
    }
    
    // ---------- DELETE ----------
    @Override
    public void deleteEmployee(Long id) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        user.setStatus(Status.INACTIVE);

        userRepository.save(user);
    }

    
    
    @Override
    public EmployeePersonalDetailsResponse getEmployeePersonalDetails(Long employeeId) {
    	User user = userRepository.findById(employeeId)
    			.orElseThrow(()-> new ResourceNotFoundException("Employee Not Found"));
    	
    	if(user.getRole() != Role.EMPLOYEE) {
    		throw new ResourceNotFoundException("Employee Not Found");
    	}
    	
    	EmployeePersonalDetails details = employeePersonalDetailsRepository.findByUserId(user.getId())
    			.orElseThrow(()-> new ResourceNotFoundException("Personal details not found"));
    	
    	return new EmployeePersonalDetailsResponse(
    			details.getAadharNumber(),
    			details.getFatherName(),
    			details.getMotherName(),
    			details.getDateOfBirth(),
    			details.getEmergencyContact(),
    			details.getAddress()
    			
    			);
    			
    }
    
    @Override
    public List<EmployeeResponse> getEmployeesByStatus(Status status) {

        List<User> users = userRepository.findByStatus(status);

        return users.stream().map(user -> {
            EmployeeDetails d = user.getEmployeeDetails();

            return new EmployeeResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole().name(),
                    d != null ? d.getDepartment() : null,
                    d != null ? d.getDesignation() : null,
                    d != null ? d.getSalary() : null
            );
        }).toList();
    }

    @Override
    public void restoreEmployee(Long id) {

        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        user.setStatus(Status.ACTIVE);
        userRepository.save(user);
    }

}
