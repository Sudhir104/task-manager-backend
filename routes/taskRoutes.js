const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, getDashboardStats } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createTask);
router.get("/dashboard", authMiddleware, getDashboardStats);
router.get("/", authMiddleware, getTasks);
router.patch("/:id", authMiddleware, updateTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;