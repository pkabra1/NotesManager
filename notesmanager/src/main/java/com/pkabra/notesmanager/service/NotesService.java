package com.pkabra.notesmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pkabra.notesmanager.model.NoteContent;
import com.pkabra.notesmanager.repository.NotesRepository;

@Service
public class NotesService {

	@Autowired
	private NotesRepository repo;

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	public List<NoteContent> getAllNotes() {
		return repo.findAll();
	}

	public List<NoteContent> getAllUserNotes(Long userId) {
		return repo.findByUserId(userId);
	}

	public NoteContent addNote(NoteContent note) {
		note.setId(sequenceGeneratorService.generateSequence(NoteContent.SEQUENCE_NAME));
		System.out.println("Title is: " + note.getTitle());
		System.out.println("Content is: " + note.getContent());
		return repo.insert(note);
	}

	public NoteContent updateNote(NoteContent note) {
		return repo.save(note);
	}
}
