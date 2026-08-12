import db from "../config/db.js";

export const createPurchase = async (req, res) => {
    try {
        const {
            baseId,
            equipmentTypeId,
            quantity
        } = req.body;

        const userId = req.user.userId;

        if (!baseId || !equipmentTypeId || !quantity) {
            return res.status(400).json({
                message: "baseId, equipmentTypeId and quantity are required"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        // Base Commander can only purchase for their own base
        if (
            req.user.role === "BASE_COMMANDER" &&
            Number(baseId) !== Number(req.user.baseId)
        ) {
            return res.status(403).json({
                message: "You can only access your assigned base"
            });
        }

        const result = await db.query(
            `
            INSERT INTO purchases
            (
                base_id,
                equipment_type_id,
                quantity,
                purchased_by
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                baseId,
                equipmentTypeId,
                quantity,
                userId
            ]
        );

        // Audit log
        await db.query(
            `
            INSERT INTO audit_logs
            (
                user_id,
                action,
                details
            )
            VALUES ($1, $2, $3)
            `,
            [
                userId,
                "PURCHASE",
                `Purchased ${quantity} units of equipment type ${equipmentTypeId} for base ${baseId}`
            ]
        );

        res.status(201).json({
            message: "Purchase created successfully",
            purchase: result.rows[0]
        });

    } catch (error) {
        console.error("Create purchase error:", error);

        res.status(500).json({
            message: "Failed to create purchase",
            error: error.message
        });
    }
};


export const getPurchases = async (req, res) => {
    try {
        let query = `
            SELECT
                p.id,
                p.base_id,
                b.name AS base_name,
                p.equipment_type_id,
                e.name AS equipment_name,
                e.category,
                p.quantity,
                p.purchase_date,
                p.purchased_by,
                u.username AS purchased_by_username
            FROM purchases p

            JOIN bases b
                ON p.base_id = b.id

            JOIN equipment_types e
                ON p.equipment_type_id = e.id

            LEFT JOIN users u
                ON p.purchased_by = u.id
        `;

        const params = [];

        // Base Commander restriction
        if (req.user.role === "BASE_COMMANDER") {
            query += ` WHERE p.base_id = $1`;
            params.push(req.user.baseId);
        }

        query += ` ORDER BY p.created_at DESC`;

        const result = await db.query(query, params);

        res.status(200).json({
            count: result.rows.length,
            purchases: result.rows
        });

    } catch (error) {
        console.error("Get purchases error:", error);

        res.status(500).json({
            message: "Failed to get purchases",
            error: error.message
        });
    }
};