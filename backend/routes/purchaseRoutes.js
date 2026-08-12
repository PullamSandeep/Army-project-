import express from "express";

import {
    createPurchase,
    getPurchases
} from "../controllers/purchaseController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

import {
    authorizeRoles
} from "../middlewares/rbacMiddleware.js";

const router = express.Router();


// GET all purchases
router.get(
    "/",
    authenticateToken,
    authorizeRoles(
        "ADMIN",
        "BASE_COMMANDER",
        "LOGISTICS_OFFICER"
    ),
    getPurchases
);


// CREATE purchase
router.post(
    "/",
    authenticateToken,
    authorizeRoles(
        "ADMIN",
        "BASE_COMMANDER",
        "LOGISTICS_OFFICER"
    ),
    createPurchase
);


export default router;