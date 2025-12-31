package com.ems.service;

import com.ems.dto.EmployeeJobDetailsResponse;
import com.ems.dto.EmployeePersonalDetailsRequest;
import com.ems.dto.EmployeePersonalDetailsResponse;

public interface EmployeePersonalDetailsService {

    EmployeePersonalDetailsResponse getMyPersonalDetails(String email);

    void saveOrUpdateMyPersonalDetails(String email,
                                       EmployeePersonalDetailsRequest request);
    
    void changeMyPassword(String email, String oldPassword, String newPassword);

    EmployeeJobDetailsResponse getJobDetails(String email);
}
