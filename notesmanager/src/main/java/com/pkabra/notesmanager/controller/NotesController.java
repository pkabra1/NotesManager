package com.pkabra.notesmanager.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pkabra.notesmanager.model.NoteContent;
import com.pkabra.notesmanager.service.NotesService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NotesController {

	@Autowired
	private NotesService notesService;

	@GetMapping(value = "/")
	public void redirect(HttpServletResponse response) throws IOException {
		response.sendRedirect("/swagger-ui/index.html");
	}

	@GetMapping("/allNotes")
	public List<NoteContent> getAllNotes() {
		return notesService.getAllNotes();
	}

	@GetMapping("/allUserNotes/{userId}")
	public List<NoteContent> getUserNotes(@PathVariable Long userId) {
		return notesService.getAllUserNotes(userId);
	}

	@PostMapping("/addNote")
	public NoteContent addUserNote(@RequestBody NoteContent content) {
		return notesService.addNote(content);
	}
	
	@GetMapping("/note/{noteId}")
	public NoteContent getNote(@PathVariable String noteId) {
		return notesService.getNote(noteId);
	}
	
	@DeleteMapping("/delete/note/{noteId}")
	public void deleteUserNote(@PathVariable String noteId) {
		notesService.deleteNote(noteId);
	}
}
