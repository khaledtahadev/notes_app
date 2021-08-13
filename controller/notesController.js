const mongoose = require("mongoose");
const Note = require("../models/Note");
const Joi = require("joi");
const ApiError = require("../utils/ApiError");

//@desc       GET Logged in user notes
//@access   	private
exports.getNotes = async (req, res, next) => {
	const userId = req.userInfo._id;
	try {
		const notes = await Note.find({ user: userId })
			.select("-__v")
			.lean()
			.exec();
		res.json(notes);
	} catch (error) {
		next(ApiError.badRequest(error.message));
	}
};

exports.getNoteById = async (req, res, next) => {
	const note_id = req.params.id;
	// check validation noteId params is required
	if (!note_id || !mongoose.Types.ObjectId.isValid(note_id))
		return next(ApiError.badRequest("invalid note id"));

	// get Note by its id
	try {
		const note = await Note.findById(note_id).select("-__v").lean().exec();
		if (!note) return res.status(404).json({ message: "Note not found" });
		res.json(note);
	} catch (error) {
		next(ApiError.badRequest(error.message));
	}
};

//@desc     Create Note for logged in user
//@access   private
exports.createNote = async (req, res, next) => {
	const noteFields = req.body;
	// check validation note fields
	const noteSchema = Joi.object({
		title: Joi.string().required(),
		content: Joi.string().required(),
		category: Joi.string().required(),
	});
	const noteValidate = noteSchema.validate(noteFields);
	if (noteValidate.error)
		return next(ApiError.badRequest(noteValidate.error.details[0].message));

	// create note with its user id created
	noteFields.user = req.userInfo._id;
	try {
		const newNote = await Note.create(noteFields);
		res.json(newNote);
	} catch (error) {
		next(ApiError.badRequest(error.message));
	}
};

//@desc     updated Note for logged in user
//@access   private
exports.updateNote = async (req, res, next) => {
	const note_id = req.params.id;
	const noteFields = req.body;

	// check validation noteId params is required
	if (!note_id || !mongoose.Types.ObjectId.isValid(note_id))
		return next(ApiError.badRequest("invalid note id"));

	// check validation note fields at least one is present
	const noteSchema = Joi.object({
		title: Joi.string(),
		content: Joi.string(),
		category: Joi.string(),
	}).or("title", "content", "category");
	const noteValidate = noteSchema.validate(noteFields);
	if (noteValidate.error)
		return next(ApiError.badRequest(noteValidate.error.details[0].message));

	try {
		// check if note is exists and user is owner and update
		const note = await Note.findOneAndUpdate(
			{
				_id: note_id,
				user: req.userInfo._id,
			},
			noteFields,
			{ new: true }
		)
			.select("-__v")
			.exec();

		if (!note) return next(ApiError.badRequest("note not found"));

		res.json(note);
	} catch (error) {
		next(ApiError.badRequest(error.message));
	}
};

//@desc      Delete Note for logged in user
//@access    private
exports.deleteNotById = async (req, res, next) => {
	const note_id = req.params.id;
	// check validation noteId params is required
	if (!note_id || !mongoose.Types.ObjectId.isValid(note_id))
		return next(ApiError.badRequest("invalid note_id"));

	try {
		// check if noteId is exists and user is owner and removed
		const note = await Note.findOneAndRemove({
			_id: note_id,
			user: req.userInfo._id,
		}).exec();

		if (!note) return next(ApiError.badRequest("note not found"));

		res.json(note);
	} catch (error) {
		next(ApiError.badRequest(error.message));
	}
};
