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

const notesReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case FETCH_NOTES_REQUEST:
			return { ...state, loadingNote: true };

		case FETCH_NOTES_SUCCESS:
			return { loadingNote: false, notes: payload };

		case CREATE_NOTE_SUCCESS:
			return { loadingNote: false, notes: [...state.notes, payload] };

		case UPDATE_NOTE_SUCCESS:
			const updateNotes = state.notes.map(note => {
				return note._id === payload._id ? payload : note;
			});
			return { loadingNote: false, notes: updateNotes };

		case DELETE_NOTE_SUCCESS:
			const deleteNotes = state.notes.filter(note => note._id !== payload._id);
			return { loadingNote: false, notes: deleteNotes };

		case FETCH_NOTES_FAIL:
			return { ...state, loadingNote: false, notes_error: payload };

		case CLEAR_NOTES_ERROR:
			return { ...state, notes_error: null };

		case CLEAR_NOTES:
			return {};

		default:
			return state;
	}
};

export default notesReducer;
