const mongoose = require("mongoose");

module.exports = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URI || "mongodb://localhost/notes_app",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			}
		);
		console.log("Mongodb connected");
	} catch (error) {
		console.log(error.message);
	}
};
