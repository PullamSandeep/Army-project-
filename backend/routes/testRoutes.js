import express from "express";
import {
  authenticateToken,
} from "../middlewares/authMiddleware.js";
import {
  authorizeRoles,
} from "../middlewares/rbacMiddleware.js";

const router = express.Router();

router.get(
  "/protected",
  authenticateToken,
  (req, res) => {
    res.json({
      message: "You successfully accessed a protected route.",
      user: req.user,
    });
  }
);

router.get(
  "/admin-only",
  authenticateToken,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin. You have access.",
      user: req.user,
    });
  }
);

export default router;