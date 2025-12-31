package com.ems.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Role;
import com.ems.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    long countByRole(Role role);
    boolean existsByRole(Role role);
}
