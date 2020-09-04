const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");

// login

router.post("/login", userController.login);

// logout

router.get("/logout", checkAuth, userController.logout);

//Export

module.exports = router;
