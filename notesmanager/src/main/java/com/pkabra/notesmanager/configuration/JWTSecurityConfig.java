package com.pkabra.notesmanager.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.pkabra.notesmanager.jwt.JwtAuthenticationFilter;
import com.pkabra.notesmanager.service.UserService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JWTSecurityConfig {

	private JwtAuthenticationFilter jwtAuthFilter;
	private UserService userService;

	public JWTSecurityConfig(JwtAuthenticationFilter jwtAuthFilter, UserService userService) {
		super();
		this.jwtAuthFilter = jwtAuthFilter;
		this.userService = userService;
	}

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
//				.authorizeHttpRequests(auth -> auth.requestMatchers("/login", "/register").permitAll()
//						.requestMatchers("http://localhost:8080/**", "http://localhost:3000/**").authenticated()
//						.anyRequest().authenticated() // Protect everything else
//				).formLogin(form -> form.loginPage("/login") // Redirect to Spring Security's in-built login page
//						.defaultSuccessUrl("/allNotes", true) // Redirect to /allNotes after successful login
//						.permitAll())
//				.logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/login") // Redirect to login page after
//																							// logout
//						.permitAll())
//				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//		return http.build();
//	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.authorizeHttpRequests(auth -> auth.requestMatchers("/login", "/register").permitAll()
						.requestMatchers("http://localhost:8080/**", "http://localhost:3000/**").authenticated()
						.anyRequest().authenticated() // Protect everything else
				).formLogin(form -> form.permitAll())
				.logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/login") // Redirect to login page after
																							// logout
						.permitAll())
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React app URL
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
