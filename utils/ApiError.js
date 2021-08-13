class ApiError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	static unAuthorized() {
		return new ApiError(401, "User is not authorized, no token");
	}

	static invalidToken() {
		return new ApiError(401, "invalid token");
	}

	static notFound() {
		return new ApiError(404, "sorry route it's not exists");
	}

	static badRequest(message) {
		return new ApiError(400, message);
	}

	static internalServer(message) {
		return new ApiError(500, message);
	}
}

module.exports = ApiError;
