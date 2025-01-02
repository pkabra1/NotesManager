package com.pkabra.notesmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SpringBootApplication
public class NotesmanagerApplication {

	@Bean
	public OpenAPI apiInfo() {
		return new OpenAPI().info(new Info().title("Job Listing API").version("1.0")
				.description("API Documentation for Job Listing Application"));
	}

	public static void main(String[] args) {
		SpringApplication.run(NotesmanagerApplication.class, args);
	}

}
