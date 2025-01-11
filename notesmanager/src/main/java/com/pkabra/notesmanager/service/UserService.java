// src/main/java/com/pkabra/notesmanager/service/UserService.java
package com.pkabra.notesmanager.service;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pkabra.notesmanager.model.Role;
import com.pkabra.notesmanager.model.User;
import com.pkabra.notesmanager.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

	private UserRepository userRepository;

	private PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
	}

	public User register(String email, String password) {
		if (userRepository.existsByEmail(email)) {
			throw new RuntimeException("Email already registered");
		}

		User user = new User();
		user.setEmail(email);
		user.setPassword(passwordEncoder.encode(password));

		return userRepository.save(user);
	}

	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public boolean isAdmin(String email) {
		return userRepository.findByEmail(email).map(user -> user.getRole() == Role.ROLE_ADMIN).orElse(false);
	}
}