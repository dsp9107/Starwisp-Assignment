const express = require("express");
const router = express.Router();
const universityController = require("../controllers/universityController");
const checkAuth = require("../middleware/checkAuth");

// CRUD endpoints

router.get("/", checkAuth, universityController.fetchUniversities);
router.post("/new", checkAuth, universityController.addUniversity);
router.put("/update/:id", checkAuth, universityController.updateUniversity);
router.delete("/delete/:id", checkAuth, universityController.deleteUniversity);

//Export

module.exports = router;
