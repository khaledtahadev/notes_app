import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	CLEAR_USER_ERROR,
} from "../types";

const userLocalStorage = JSON.parse(localStorage.getItem("user_notes_app"));

const initState = userLocalStorage ? userLocalStorage : {};

const userReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loadingUser: true };

		case USER_LOGIN_SUCCESS:
			return { loadingUser: false, token: payload.token };

		case USER_LOGIN_FAIL:
			return { ...state, loadingUser: false, loginError: payload };

		case USER_LOGOUT:
			return {};

		case CLEAR_USER_ERROR:
			return { loginError: null };

		default:
			return state;
	}
};

export default userReducer;
