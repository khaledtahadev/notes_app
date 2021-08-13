const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		pictureUrl: {
			type: String,
			// required: true,
			default:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
	},
	{ timestamps: true }
);

// middleware before save to hash password
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcryptjs.hash(this.password, 10);
});

// middleware before update to hash new password
userSchema.pre("findOneAndUpdate", async function (next) {
	const password = this.getUpdate().password;
	if (!password) return next();
	this.getUpdate().password = await bcryptjs.hash(password, 10);
});

// match password
userSchema.methods.matchPassword = async function (password) {
	return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
