import express from "express";

const router = express.Router();

// Example route
router.get("/api", (req, res) => {
  res.json({ message: "Hello from API!" });
});

export default router;