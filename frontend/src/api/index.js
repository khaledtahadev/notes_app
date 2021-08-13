import axios from "axios";

const API = axios.create({ baseURL: "/api" });

// interceptors to add token
API.interceptors.request.use(req => {
	const user_notes_app = localStorage.getItem("user_notes_app");
	if (user_notes_app) {
		req.headers.Authorization = `Bearer ${JSON.parse(user_notes_app).token}`;
	}

	return req;
});

// user endpoints
export const signup = userCredentials => API.post("/users", userCredentials);

export const login = userCredentials =>
	API.post("/users/login", userCredentials);

export const updateUserProfile = userCredentials =>
	API.patch("/users/update_profile", userCredentials);

// notes endpoint
export const getUserNotes = () => API.get("/notes");
export const getNoteById = noteId => API.get(`/notes/${noteId}`);
export const createNote = noteData => API.post("/notes", noteData);
export const updateNote = (noteId, noteData) =>
	API.patch(`/notes/${noteId}`, noteData);
export const deleteNote = noteId => API.delete(`/notes/${noteId}`);
