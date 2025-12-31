package com.ems.repository;

import com.ems.model.EmployeePersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeePersonalDetailsRepository
        extends JpaRepository<EmployeePersonalDetails, Long> {

    Optional<EmployeePersonalDetails> findByUserId(Long userId);
}
