const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, projectId, dueDate, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const task = await Task.create({
      title, description, assignedTo, projectId, dueDate,
      status: status || "Todo",
      createdBy: req.user._id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const filter = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};
    const tasks = await Task.find(filter)
      .populate("projectId", "name")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: "Done" });
    const inProgress = await Task.countDocuments({ status: "In Progress" });
    const todo = await Task.countDocuments({ status: "Todo" });
    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" },
    });
    res.json({ totalTasks: total, completedTasks: completed, inProgressTasks: inProgress, todoTasks: todo, overdueTasks: overdue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};