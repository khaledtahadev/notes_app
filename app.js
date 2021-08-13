const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const userRouter = require("./routes/userRouter");
const notesRouter = require("./routes/notesRouter");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const PORT = process.env.PORT || 5001;

// start express app
const app = express();

// connect to database
connectDB();

// data parsing middleware
app.use(express.json());

// routers
app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

// -------------deployment-----------------------

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "frontend", "build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running ....");
	});
}
// -------------deployment-----------------------

// errors middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
