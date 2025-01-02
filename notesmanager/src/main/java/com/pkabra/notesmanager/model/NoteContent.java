package com.pkabra.notesmanager.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;

@Document(collection = "NoteContent")
@CompoundIndexes({ @CompoundIndex(name = "lastModified_index", def = "{'lastModified': 1}") })
public class NoteContent {

	@Transient
	public static final String SEQUENCE_NAME = "NoteContent_sequence";

	@Id
	private String id;
	private String title;
	private String content;
	private LocalDateTime lastModified;
	private Long userId;

	public NoteContent() {
		super();
	}

	public NoteContent(String id, String title, String content, LocalDateTime lastModified, Long userId) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.lastModified = lastModified;
		this.userId = userId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getLastModified() {
		return lastModified;
	}

	public void setLastModified(LocalDateTime lastModified) {
		this.lastModified = lastModified;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}
