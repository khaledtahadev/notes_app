const router = require("express").Router();
const {
	getNotes,
	getNoteById,
	createNote,
	deleteNotById,
	updateNote,
} = require("../controller/notesController");
const authUser = require("../middleware/authMiddleware");

router.get("/", authUser, getNotes);
router.post("/", authUser, createNote);
router.get("/:id", getNoteById);
router.patch("/:id", authUser, updateNote);
router.delete("/:id", authUser, deleteNotById);

module.exports = router;
