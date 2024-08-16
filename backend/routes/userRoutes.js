// TODO: /signup and /login API

const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


// signup
router.post('/signup',registerUser)


// login

router.post("/login", loginUser);

// view profile
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});




module.exports = router;
