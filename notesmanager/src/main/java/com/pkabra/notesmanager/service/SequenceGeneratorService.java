package com.pkabra.notesmanager.service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.pkabra.notesmanager.model.DatabaseSequence;

@Service
public class SequenceGeneratorService {

	@Autowired
	private MongoOperations mongoOperations;

	public String generateSequence(String seqName) {
		FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true).upsert(true);

		DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
				new Update().inc("seq", 1), options, DatabaseSequence.class);
		long seq = counter != null ? counter.getSeq() : 10;
		return String.valueOf(seq);
	}
}
