package com.pkabra.notesmanager.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public ResponseEntity<?> getAllNotes() {
		return ResponseEntity.ok(notesService.getAllNotes());
	}

	@GetMapping("/allUserNotes/{userId}")
	public ResponseEntity<?> getUserNotes(@PathVariable Long userId) {
		return ResponseEntity.ok(notesService.getAllUserNotes(userId));
	}

	@PostMapping("/addNote")
	public ResponseEntity<?> addUserNote(@RequestBody NoteContent content) {
		return ResponseEntity.ok(notesService.addNote(content));
	}

	@GetMapping("/note/{noteId}")
	public ResponseEntity<?> getNote(@PathVariable String noteId) {
		return ResponseEntity.ok(notesService.getNote(noteId));
	}

	@DeleteMapping("/delete/note/{noteId}")
	public ResponseEntity<Void> deleteUserNote(@PathVariable String noteId) {
		notesService.deleteNote(noteId);
		return ResponseEntity.noContent().build(); // Respond with HTTP 204 No Content
	}

	@PutMapping("/update/note/{noteId}")
	public ResponseEntity<?> updateUserNote(@RequestBody NoteContent note, @PathVariable String noteId) {
		return ResponseEntity.ok(notesService.updateNote(note, noteId));
	}
}
