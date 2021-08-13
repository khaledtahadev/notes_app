const ApiError = require("../utils/ApiError");

exports.notFound = (req, res, next) => {
	return next(ApiError.notFound());
};

exports.errorHandler = (error, req, res, next) => {
	if (error instanceof ApiError) {
		return res.status(error.code).json({ message: error.message });
	}
	res.status(500).json({ message: error });
};
