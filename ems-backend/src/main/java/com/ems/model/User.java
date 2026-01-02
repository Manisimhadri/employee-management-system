package com.ems.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false , length = 100)
	private String name;
	
	@Column(nullable = false, unique = true, length = 100)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status = Status.ACTIVE;

	
	@OneToOne(mappedBy = "user" , cascade = CascadeType.ALL)
	private EmployeeDetails employeeDetails;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private EmployeePersonalDetails personalDetails;
}
