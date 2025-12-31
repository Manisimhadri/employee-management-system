package com.ems;

import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EmsBackendApplication {
	
//	@Bean
//	CommandLineRunner run(PasswordEncoder encoder) {
//	    return args -> {
//	        System.out.println("Encrypted password: " + encoder.encode("admin123"));
//	        System.out.println("Encrypted password: " + encoder.encode("emp123"));
//	    };
//	}

	public static void main(String[] args) {
		SpringApplication.run(EmsBackendApplication.class, args);
	}

}
