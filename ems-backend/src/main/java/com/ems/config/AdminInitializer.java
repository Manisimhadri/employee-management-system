package com.ems.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ems.model.Role;
import com.ems.model.User;
import com.ems.repository.UserRepository;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createDefaultAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            boolean adminExists = userRepository.existsByRole(Role.ADMIN);

            if (!adminExists) {
                User admin = new User();
                admin.setName("Super Admin");
                admin.setEmail("admin@ems.com");
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);

                System.out.println("✅ Default Admin Created");
                System.out.println("📧 Email: admin@ems.com");
                System.out.println("🔑 Password: Admin@123");
            }
        };
    }
}
