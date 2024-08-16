// TODO: /signup and /login API

const express = require("express");
const { registerUser, loginUser, deleteUserAccount } = require("../controller/userController");
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

// delete user
router.delete("/deleteaccount" ,protect, deleteUserAccount)




module.exports = router;
