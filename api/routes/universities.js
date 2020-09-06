const express = require("express");
const router = express.Router();
const universityController = require("../controllers/universityController");
const checkAuth = require("../middleware/checkAuth");

// CRUD endpoints

router.get("/", universityController.fetchUniversities);
router.post("/new", universityController.addUniversity);
router.put("/update/:id", universityController.updateUniversity);
router.delete("/delete/:id", universityController.deleteUniversity);

//Export

module.exports = router;
