const User = require("../models/User");
const Joi = require("joi");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

exports.loginUser = async (req, res, next) => {
	const userLoginInfo = req.body;
	// check userLoginInfo validation
	const userLoginSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});
	const userValidate = userLoginSchema.validate(userLoginInfo);
	if (userValidate.error)
		return next(ApiError.badRequest(userValidate.error.details[0].message));

	try {
		// check if user with this credentials is not exists
		let user = await User.findOne({ email: userLoginInfo.email })
			.select("-__v -isAdmin")
			.exec();
		if (!user) return next(ApiError.badRequest("invalid email or password"));

		// check if password correct
		if (!(await user.matchPassword(userLoginInfo.password)))
			return next(ApiError.badRequest("invalid email or password"));

		// generate user token
		user = user.toObject();
		delete user.password;
		res.json({ token: generateToken(user) });
	} catch (error) {
		next(ApiError.badRequest(error.message));
	}
};

exports.registerUser = async (req, res, next) => {
	const userRegisterInfo = req.body;
	// check userRegisterInfo validation
	const userRegisterSchema = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		isAdmin: Joi.boolean(),
		pictureUrl: Joi.string(),
	});

	const userValidate = userRegisterSchema.validate(userRegisterInfo);
	if (userValidate.error)
		return next(ApiError.badRequest(userValidate.error.details[0].message));

	try {
		// check if this user register is exists
		const user = await User.findOne({ email: userRegisterInfo.email });
		if (user) return next(ApiError.badRequest("User is exists"));

		// create user
		const userCreated = await User.create(userRegisterInfo);

		// generate user token and send it
		const newUser = userCreated.toObject();
		delete newUser.password;
		delete newUser.__v;
		delete newUser.isAdmin;

		res.json({ token: generateToken(newUser) });
	} catch (error) {
		next(ApiError.badRequest(error.message));
	}
};

// @access Private
exports.updateProfileUser = async (req, res, next) => {
	const userUpdateInfo = req.body;
	// check userUpdateInfo validation
	const userUpdateSchema = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		pictureUrl: Joi.string(),
		password: Joi.allow(),
	});

	const userValidate = userUpdateSchema.validate(userUpdateInfo);
	if (userValidate.error)
		return next(ApiError.badRequest(userValidate.error.details[0].message));

	if (userUpdateInfo.password === "") delete userUpdateInfo.password;

	try {
		//update user
		const userId = req.userInfo._id;
		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			userUpdateInfo,
			{
				new: true,
			}
		)
			.select("-password -__v -isAdmin")
			.lean()
			.exec();

		res.json({ token: generateToken(updatedUser) });
	} catch (error) {
		console.log(error);
		next(ApiError.badRequest(error.message));
	}
};
