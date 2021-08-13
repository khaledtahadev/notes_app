import * as api from "../../api";
import {
	FETCH_NOTES_REQUEST,
	FETCH_NOTES_SUCCESS,
	FETCH_NOTES_FAIL,
	CREATE_NOTE_SUCCESS,
	UPDATE_NOTE_SUCCESS,
	DELETE_NOTE_SUCCESS,
	CLEAR_NOTES_ERROR,
	CLEAR_NOTES,
} from "../types";
import { logout } from "./user";

export const getUserNotes = () => async dispatch => {
	try {
		dispatch({ type: FETCH_NOTES_REQUEST });
		const { data } = await api.getUserNotes();
		dispatch({ type: FETCH_NOTES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_NOTES_FAIL, payload: error.response.data.message });
		if (error.response.status === 401) {
			dispatch(logout());
			dispatch(clearNotes());
		}
	}
};

export const createNote = (noteData, handleClose) => async dispatch => {
	try {
		dispatch({ type: FETCH_NOTES_REQUEST });
		const { data } = await api.createNote(noteData);
		dispatch({ type: CREATE_NOTE_SUCCESS, payload: data });
		handleClose();
	} catch (error) {
		dispatch({ type: FETCH_NOTES_FAIL, payload: error.response.data.message });
		handleClose();
		if (error.response.status === 401) {
			dispatch(logout());
			dispatch(clearNotes());
		}
	}
};

export const updateNote = (noteId, noteData, handleClose) => async dispatch => {
	try {
		dispatch({ type: FETCH_NOTES_REQUEST });
		const { data } = await api.updateNote(noteId, noteData);
		dispatch({ type: UPDATE_NOTE_SUCCESS, payload: data });
		handleClose();
	} catch (error) {
		dispatch({ type: FETCH_NOTES_FAIL, payload: error.response.data.message });
		handleClose();
		if (error.response.status === 401) {
			dispatch(logout());
			dispatch(clearNotes());
		}
	}
};

export const deleteNote = noteId => async dispatch => {
	try {
		dispatch({ type: FETCH_NOTES_REQUEST });
		const { data } = await api.deleteNote(noteId);
		dispatch({ type: DELETE_NOTE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_NOTES_FAIL, payload: error.response.data.message });
		if (error.response.status === 401) {
			dispatch(logout());
			dispatch(clearNotes());
		}
	}
};

export const clearNotes = () => {
	return { type: CLEAR_NOTES };
};

export const clearNoteError = () => {
	return { type: CLEAR_NOTES_ERROR };
};
