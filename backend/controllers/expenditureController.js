import db from "../config/db.js";

// ============================================
// CREATE EXPENDITURE
// POST /api/expenditures
// ============================================

export const createExpenditure = async (req, res) => {
    try {
        const {
            baseId,
            equipmentTypeId,
            quantity,
            reason
        } = req.body;

        const userId = req.user.userId;

        // Validation
        if (
            !baseId ||
            !equipmentTypeId ||
            !quantity
        ) {
            return res.status(400).json({
                message:
                    "baseId, equipmentTypeId and quantity are required"
            });
        }

        if (Number(quantity) <= 0) {
            return res.status(400).json({
                message:
                    "Quantity must be greater than 0"
            });
        }

        // Base Commander restriction
        if (
            req.user.role === "BASE_COMMANDER" &&
            Number(baseId) !== Number(req.user.baseId)
        ) {
            return res.status(403).json({
                message:
                    "You can only record expenditures for your assigned base"
            });
        }

        // ========================================
        // Calculate available stock
        // ========================================

        const stockQuery = `
            SELECT

                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM purchases
                        WHERE base_id = $1
                        AND equipment_type_id = $2
                    ),
                    0
                )

                +

                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM transfers
                        WHERE destination_base_id = $1
                        AND equipment_type_id = $2
                        AND status = 'COMPLETED'
                    ),
                    0
                )

                -

                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM transfers
                        WHERE source_base_id = $1
                        AND equipment_type_id = $2
                        AND status = 'COMPLETED'
                    ),
                    0
                )

                -

                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM assignments
                        WHERE base_id = $1
                        AND equipment_type_id = $2
                    ),
                    0
                )

                -

                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM expenditures
                        WHERE base_id = $1
                        AND equipment_type_id = $2
                    ),
                    0
                )

                AS available_stock
        `;

        const stockResult = await db.query(
            stockQuery,
            [baseId, equipmentTypeId]
        );

        const availableStock = Number(
            stockResult.rows[0].available_stock
        );

        // ========================================
        // Check sufficient stock
        // ========================================

        if (availableStock < Number(quantity)) {
            return res.status(400).json({
                message:
                    "Insufficient stock",

                availableStock,

                requestedQuantity:
                    Number(quantity)
            });
        }

        // ========================================
        // Insert expenditure
        // ========================================

        const result = await db.query(
            `
            INSERT INTO expenditures
            (
                base_id,
                equipment_type_id,
                quantity,
                reason,
                recorded_by
            )
            VALUES
            ($1, $2, $3, $4, $5)

            RETURNING *
            `,
            [
                baseId,
                equipmentTypeId,
                quantity,
                reason || null,
                userId
            ]
        );

        // ========================================
        // Audit log
        // ========================================

        await db.query(
            `
            INSERT INTO audit_logs
            (
                user_id,
                action,
                details
            )
            VALUES
            ($1, $2, $3)
            `,
            [
                userId,
                "EXPENDITURE",
                `Expended ${quantity} units of equipment type ${equipmentTypeId} at base ${baseId}. Reason: ${reason || "Not specified"}`
            ]
        );

        res.status(201).json({
            message:
                "Expenditure recorded successfully",

            expenditure:
                result.rows[0]
        });

    } catch (error) {

        console.error(
            "Create expenditure error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to create expenditure",

            error:
                error.message
        });
    }
};


// ============================================
// GET EXPENDITURES
// GET /api/expenditures
// ============================================

export const getExpenditures = async (req, res) => {
    try {

        let query = `
            SELECT

                ex.id,

                ex.base_id,

                b.name AS base_name,

                ex.equipment_type_id,

                e.name AS equipment_name,

                e.category,

                ex.quantity,

                ex.reason,

                ex.recorded_by,

                u.username AS recorded_by_username,

                ex.expenditure_date,

                ex.created_at

            FROM expenditures ex

            JOIN bases b
                ON ex.base_id = b.id

            JOIN equipment_types e
                ON ex.equipment_type_id = e.id

            LEFT JOIN users u
                ON ex.recorded_by = u.id
        `;

        const params = [];

        // Base Commander
        // can only see their own base

        if (
            req.user.role ===
            "BASE_COMMANDER"
        ) {

            query += `
                WHERE ex.base_id = $1
            `;

            params.push(
                req.user.baseId
            );
        }

        query += `
            ORDER BY
                ex.created_at DESC
        `;

        const result =
            await db.query(
                query,
                params
            );

        res.status(200).json({

            count:
                result.rows.length,

            expenditures:
                result.rows

        });

    } catch (error) {

        console.error(
            "Get expenditures error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to get expenditures",

            error:
                error.message

        });
    }
};