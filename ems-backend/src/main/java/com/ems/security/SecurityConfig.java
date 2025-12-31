package com.ems.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtUtil jwtUtil)
            throws Exception {

        http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            // ✅ ALLOW PREFLIGHT REQUESTS
            .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()

            // ✅ PUBLIC ENDPOINTS
            .requestMatchers("/auth/**", "/ping").permitAll()

            // ✅ ROLE-BASED
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .requestMatchers("/employee/**").hasRole("EMPLOYEE")

            .anyRequest().authenticated()
        )
            .addFilterBefore(
                new JwtAuthenticationFilter(jwtUtil),
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
