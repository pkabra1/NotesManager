package com.pkabra.notesmanager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
public class MongoConfig {

	@Bean
	public MappingMongoConverter mappingMongoConverter(MongoDatabaseFactory mongoDatabaseFactory,
			MongoMappingContext mongoMappingContext) {
		MappingMongoConverter converter = new MappingMongoConverter(new DefaultDbRefResolver(mongoDatabaseFactory),
				mongoMappingContext);
		// Disable the _class field
		converter.setTypeMapper(new DefaultMongoTypeMapper(null));
		return converter;
	}
}
