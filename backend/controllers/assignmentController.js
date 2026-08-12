import db from "../config/db.js";

export const createAssignment = async (req, res) => {
    try {
        const {
            baseId,
            equipmentTypeId,
            assignedTo,
            quantity
        } = req.body;

        const userId = req.user.userId;

        if (!baseId || !equipmentTypeId || !assignedTo || !quantity) {
            return res.status(400).json({
                message:
                    "baseId, equipmentTypeId, assignedTo and quantity are required"
            });
        }

        if (Number(quantity) <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        // Base Commander can only assign assets from their base
        if (
            req.user.role === "BASE_COMMANDER" &&
            Number(baseId) !== Number(req.user.baseId)
        ) {
            return res.status(403).json({
                message:
                    "You can only assign assets from your assigned base"
            });
        }

        // Calculate available stock
        const stockQuery = `
            SELECT
                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM purchases
                        WHERE base_id = $1
                        AND equipment_type_id = $2
                    ), 0
                )
                +
                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM transfers
                        WHERE destination_base_id = $1
                        AND equipment_type_id = $2
                        AND status = 'COMPLETED'
                    ), 0
                )
                -
                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM transfers
                        WHERE source_base_id = $1
                        AND equipment_type_id = $2
                        AND status = 'COMPLETED'
                    ), 0
                )
                -
                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM assignments
                        WHERE base_id = $1
                        AND equipment_type_id = $2
                    ), 0
                )
                -
                COALESCE(
                    (
                        SELECT SUM(quantity)
                        FROM expenditures
                        WHERE base_id = $1
                        AND equipment_type_id = $2
                    ), 0
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

        if (availableStock < Number(quantity)) {
            return res.status(400).json({
                message: "Insufficient stock",
                availableStock,
                requestedQuantity: Number(quantity)
            });
        }

        // Create assignment
        const result = await db.query(
            `
            INSERT INTO assignments
            (
                base_id,
                equipment_type_id,
                assigned_to,
                quantity,
                assigned_by
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                baseId,
                equipmentTypeId,
                assignedTo,
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
                "ASSIGNMENT",
                `Assigned ${quantity} units of equipment type ${equipmentTypeId} to ${assignedTo} at base ${baseId}`
            ]
        );

        res.status(201).json({
            message: "Assignment created successfully",
            assignment: result.rows[0]
        });

    } catch (error) {
        console.error("Create assignment error:", error);

        res.status(500).json({
            message: "Failed to create assignment",
            error: error.message
        });
    }
};


export const getAssignments = async (req, res) => {
    try {
        let query = `
            SELECT
                a.id,
                a.base_id,
                b.name AS base_name,
                a.equipment_type_id,
                e.name AS equipment_name,
                e.category,
                a.assigned_to,
                a.quantity,
                a.assigned_by,
                u.username AS assigned_by_username,
                a.assignment_date,
                a.created_at
            FROM assignments a

            JOIN bases b
                ON a.base_id = b.id

            JOIN equipment_types e
                ON a.equipment_type_id = e.id

            LEFT JOIN users u
                ON a.assigned_by = u.id
        `;

        const params = [];

        if (req.user.role === "BASE_COMMANDER") {
            query += `
                WHERE a.base_id = $1
            `;

            params.push(req.user.baseId);
        }

        query += `
            ORDER BY a.created_at DESC
        `;

        const result = await db.query(
            query,
            params
        );

        res.status(200).json({
            count: result.rows.length,
            assignments: result.rows
        });

    } catch (error) {
        console.error("Get assignments error:", error);

        res.status(500).json({
            message: "Failed to get assignments",
            error: error.message
        });
    }
};