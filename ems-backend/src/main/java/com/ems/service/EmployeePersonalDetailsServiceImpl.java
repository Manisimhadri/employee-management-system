package com.ems.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.dto.EmployeeJobDetailsResponse;
import com.ems.dto.EmployeePersonalDetailsRequest;
import com.ems.dto.EmployeePersonalDetailsResponse;
import com.ems.exception.BadRequestException;
import com.ems.exception.ResourceNotFoundException;
import com.ems.model.EmployeeDetails;
import com.ems.model.EmployeePersonalDetails;
import com.ems.model.User;
import com.ems.repository.EmployeePersonalDetailsRepository;
import com.ems.repository.UserRepository;

@Service
public class EmployeePersonalDetailsServiceImpl implements EmployeePersonalDetailsService{

	private final UserRepository userRepository;
    private final EmployeePersonalDetailsRepository personalDetailsRepository;
    private final PasswordEncoder passwordEncoder;
    
    
	public EmployeePersonalDetailsServiceImpl(UserRepository userRepository,
			EmployeePersonalDetailsRepository personalDetailsRepository,
			PasswordEncoder passwordEncoder
			) {
		
		this.userRepository = userRepository;
		this.personalDetailsRepository = personalDetailsRepository;
		this.passwordEncoder = passwordEncoder;
	}
    
	@Override
	public EmployeePersonalDetailsResponse getMyPersonalDetails(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(()-> new ResourceNotFoundException("User not found"));
		
		EmployeePersonalDetails details = personalDetailsRepository.findByUserId(user.getId())
				.orElse(null);
		
		if(details == null ) return null;
		
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
    public void saveOrUpdateMyPersonalDetails(
            String email,
            EmployeePersonalDetailsRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        EmployeePersonalDetails details =
                personalDetailsRepository.findByUserId(user.getId())
                        .orElse(new EmployeePersonalDetails());

        details.setUser(user);
        details.setAadharNumber(request.getAadharNumber());
        details.setFatherName(request.getFatherName());
        details.setMotherName(request.getMotherName());
        details.setDateOfBirth(request.getDateOfBirth());
        details.setEmergencyContact(request.getEmergencyContact());
        details.setAddress(request.getAddress());

        personalDetailsRepository.save(details);
    }
	
	@Override
	public void changeMyPassword(String email, String oldPassword, String newPassword) {
		User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));
		
		if(!passwordEncoder.matches(oldPassword, user.getPassword())) {
			throw new BadRequestException("Old password is incorrect");
		}
		
		user.setPassword(passwordEncoder.encode(newPassword));
	    userRepository.save(user);
	}
	
	@Override public EmployeeJobDetailsResponse getJobDetails(String email) {
			User user = userRepository.findByEmail(email) 
					.orElseThrow(() -> new ResourceNotFoundException("User not found")); 
			EmployeeDetails details = user.getEmployeeDetails(); 
			return new EmployeeJobDetailsResponse( user.getName(), user.getEmail(), details.getDepartment(), details.getDesignation() ); }
    
}
