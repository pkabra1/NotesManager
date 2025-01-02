import { apiClient } from "./ApiClient";

export const getAllNotes = () => {
    return apiClient.get("/allNotes");
}

export const addNote = (note) => {
    return apiClient.post("/addNote", note, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}