package com.pkabra.notesmanager.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.pkabra.notesmanager.model.Role;
import com.pkabra.notesmanager.model.User;
import com.pkabra.notesmanager.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) {
		// Check if admin user already exists
		if (!userRepository.existsByEmail("admin@admin.com")) {
			User adminUser = new User();
			adminUser.setEmail("admin@admin.com");
			adminUser.setPassword(passwordEncoder.encode("admin"));
			adminUser.setRole(Role.ROLE_ADMIN);
			userRepository.save(adminUser);
			System.out.println("Admin user created successfully!");
		}
	}
}