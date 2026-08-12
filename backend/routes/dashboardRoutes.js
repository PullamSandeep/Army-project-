import express from "express";

import {
    getDashboard
} from "../controllers/dashboardController.js";

import {
    authenticateToken
} from "../middlewares/authMiddleware.js";

import {
    authorizeRoles
} from "../middlewares/rbacMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    authorizeRoles(
        "ADMIN",
        "BASE_COMMANDER",
        "LOGISTICS_OFFICER"
    ),
    getDashboard
);

export default router;