package com.pkabra.notesmanager.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pkabra.notesmanager.model.NoteContent;

@Repository
public interface NotesRepository extends MongoRepository<NoteContent, Long> {

	public List<NoteContent> findByUserId(Long id);

}
