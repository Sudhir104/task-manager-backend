const express = require("express");
const router = express.Router();
const { createProject, getProjects, updateProject, deleteProject, addMember } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("Admin"), createProject);
router.get("/", authMiddleware, getProjects);
router.put("/:id", authMiddleware, roleMiddleware("Admin"), updateProject);
router.delete("/:id", authMiddleware, roleMiddleware("Admin"), deleteProject);
router.post("/:id/members", authMiddleware, roleMiddleware("Admin"), addMember);

module.exports = router;