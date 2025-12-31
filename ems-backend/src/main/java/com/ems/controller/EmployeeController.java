package com.ems.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.dto.ChangePasswordRequest;
import com.ems.dto.EmployeeJobDetailsResponse;
import com.ems.dto.EmployeePersonalDetailsRequest;
import com.ems.dto.EmployeePersonalDetailsResponse;
import com.ems.service.EmployeePersonalDetailsService;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    private EmployeePersonalDetailsService personalDetailsService;

	public EmployeeController(EmployeePersonalDetailsService personalDetailsService) {
		
		this.personalDetailsService = personalDetailsService;
	}
	
	@GetMapping("/job-details")
	public EmployeeJobDetailsResponse getJobDetails(Authentication authentication) {
	    return personalDetailsService.getJobDetails(authentication.getName());
	}
	
	@GetMapping("/personal-details")
	public EmployeePersonalDetailsResponse getMyPersonalDetails(
			Authentication authentication
			) {
		String email = authentication.getName();
		return personalDetailsService.getMyPersonalDetails(email);
	}
	
	@PutMapping("/personal-details")
	public String saveOrUpdatePersonalDetails(
			@RequestBody EmployeePersonalDetailsRequest request,
			Authentication auth
			) {
		String email = auth.getName();
		personalDetailsService.saveOrUpdateMyPersonalDetails(email, request);
		return "Personal details saved successfully";
	}
    
	@PutMapping("/change-password")
	public String changePassword(@RequestBody ChangePasswordRequest request,
	                             Authentication authentication) {

	    String email = authentication.getName();
	    personalDetailsService.changeMyPassword(
	            email,
	            request.getOldPassword(),
	            request.getNewPassword()
	    );

	    return "Password updated successfully";
	}

}
