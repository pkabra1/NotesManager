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

export const deleteUserNote = (id) => {
    console.log("It is hitting delete user note with ID: ", id);
    return apiClient.delete(`/delete/note/${id}`);
}