package com.pkabra.notesmanager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pkabra.notesmanager.jwt.JwtService;
import com.pkabra.notesmanager.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;
	private final UserService userService;

	@Autowired
	public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService) {
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
		this.userService = userService;
	}

	/**
	 * Endpoint to handle login requests.
	 *
	 * @param loginRequest - Contains the email and password of the user.
	 * @return JWT token if authentication is successful.
	 */
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		// Authenticate the user
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		// Load user details and generate token
		UserDetails userDetails = userService.loadUserByUsername(loginRequest.getEmail());
		String token = jwtService.generateToken(userDetails);

		// Return the token in the response
		Map<String, Object> response = new HashMap<>();
		response.put("token", token);
		response.put("user", userDetails);
		return ResponseEntity.ok(response);
	}

	/**
	 * Endpoint to handle user registration.
	 *
	 * @param registerRequest - Contains the email and password of the new user.
	 * @return Success message if registration is successful.
	 */
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
		// Register the user in the database
		userService.register(registerRequest.getEmail(), registerRequest.getPassword());

		// Generate a token for the newly registered user
		UserDetails userDetails = userService.loadUserByUsername(registerRequest.getEmail());
		String token = jwtService.generateToken(userDetails);

		// Return success message and token in the response
		Map<String, Object> response = new HashMap<>();
		response.put("message", "User registered successfully");
		response.put("token", token);
		return ResponseEntity.ok(response);
	}

	// DTO for login request
	public static class LoginRequest {
		private String email;
		private String password;

		// Getters and setters
		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}

	// DTO for register request
	public static class RegisterRequest {
		private String email;
		private String password;

		// Getters and setters
		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}
}
