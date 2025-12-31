package com.ems.service;

import com.ems.exception.ResourceNotFoundException;
import com.ems.model.User;
import com.ems.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
        		.orElseThrow(()-> new ResourceNotFoundException("USer nort found"));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
