package com.ems.service;

import com.ems.model.User;

import java.util.Optional;

public interface UserService {

    User findByEmail(String email);

    User saveUser(User user);
}
