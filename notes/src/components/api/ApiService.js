import { apiClient } from "./ApiClient";

export const getAllNotes = () => {
    return apiClient.get("/allNotes");
}

export const getUserNotes = (id) => {
    return apiClient.get(`/allUserNotes/${id}`);
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

export const updateUserNote = (note, id) => {
    return apiClient.put(`/update/note/${id}`, note, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}