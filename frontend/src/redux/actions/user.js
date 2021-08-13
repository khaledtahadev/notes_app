import * as api from "../../api";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	CLEAR_USER_ERROR,
} from "../types";

export const login = (userCredentials, history) => async dispatch => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await api.login(userCredentials);
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem("user_notes_app", JSON.stringify(data));
		history.push("/");
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
	}
};

export const signup = (userCredentials, history) => async dispatch => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await api.signup(userCredentials);
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem("user_notes_app", JSON.stringify(data));
		history.push("/");
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
	}
};

export const updateUserProfile =
	(userCredentials, setStateUpdate) => async dispatch => {
		try {
			dispatch({ type: USER_LOGIN_REQUEST });
			const { data } = await api.updateUserProfile(userCredentials);
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
			localStorage.setItem("user_notes_app", JSON.stringify(data));
			setStateUpdate({ success: "success updated" });
		} catch (error) {
			const message = error.response.data.message;
			setStateUpdate({ error: message });
			dispatch({ type: USER_LOGIN_FAIL, payload: message });
			if (error.response.status === 401) dispatch(logout()); // we need refresh token to avoid this point
		}
	};

export const logout = () => dispatch => {
	localStorage.removeItem("user_notes_app");
	dispatch({ type: USER_LOGOUT });
};

export const setUserError = message => dispatch => {
	dispatch({ type: USER_LOGIN_FAIL, payload: message });
};

export const clearUserError = () => dispatch => {
	dispatch({ type: CLEAR_USER_ERROR });
};
