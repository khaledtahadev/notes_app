const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	// check if token exists in header authorization
	let token = req.headers.authorization;

	if (!token && !token?.startsWith("Bearer"))
		return next(ApiError.unAuthorized());

	token = token.split(" ")[1];

	// verify token
	try {
		const decodeToken = jwt.verify(token, process.env.JWT_SECRET); // throw an error if token is invalid
		req.userInfo = decodeToken;
		next();
	} catch (error) {
		next(ApiError.invalidToken());
	}
};
