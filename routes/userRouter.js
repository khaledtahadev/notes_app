const router = require("express").Router();
const {
	loginUser,
	registerUser,
	updateProfileUser,
} = require("../controller/userController");
const authUser = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.patch("/update_profile", authUser, updateProfileUser);

module.exports = router;
