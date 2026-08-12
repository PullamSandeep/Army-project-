import db from "../config/db.js";

/*
    CREATE TRANSFER

    POST /api/transfers
*/
export const createTransfer = async (req, res) => {
    const client = await db.connect();

    try {
        const {
            sourceBaseId,
            destinationBaseId,
            equipmentTypeId,
            quantity
        } = req.body;

        const userId = req.user.userId;

        // -----------------------------
        // Validation
        // -----------------------------

        if (
            !sourceBaseId ||
            !destinationBaseId ||
            !equipmentTypeId ||
            !quantity
        ) {
            return res.status(400).json({
                message:
                    "sourceBaseId, destinationBaseId, equipmentTypeId and quantity are required"
            });
        }

        if (Number(quantity) <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        if (
            Number(sourceBaseId) ===
            Number(destinationBaseId)
        ) {
            return res.status(400).json({
                message:
                    "Source and destination bases cannot be the same"
            });
        }

        // -----------------------------
        // RBAC Base restriction
        // -----------------------------

        if (
            req.user.role === "BASE_COMMANDER" &&
            Number(sourceBaseId) !== Number(req.user.baseId)
        ) {
            return res.status(403).json({
                message:
                    "You can only transfer assets from your assigned base"
            });
        }

        // -----------------------------
        // Start transaction
        // -----------------------------

        await client.query("BEGIN");

        // -----------------------------
        // Check source stock
        // -----------------------------

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

        const stockResult = await client.query(
            stockQuery,
            [sourceBaseId, equipmentTypeId]
        );

        const availableStock = Number(
            stockResult.rows[0].available_stock
        );

        // -----------------------------
        // Check sufficient stock
        // -----------------------------

        if (availableStock < Number(quantity)) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                message: "Insufficient stock",
                availableStock,
                requestedQuantity: Number(quantity)
            });
        }

        // -----------------------------
        // Create transfer
        // -----------------------------

        const transferResult = await client.query(
            `
            INSERT INTO transfers
            (
                source_base_id,
                destination_base_id,
                equipment_type_id,
                quantity,
                status,
                initiated_by
            )
            VALUES
            ($1, $2, $3, $4, 'COMPLETED', $5)

            RETURNING *
            `,
            [
                sourceBaseId,
                destinationBaseId,
                equipmentTypeId,
                quantity,
                userId
            ]
        );

        const transfer =
            transferResult.rows[0];

        // -----------------------------
        // Audit log
        // -----------------------------

        const details =
            `Transferred ${quantity} units of equipment type ${equipmentTypeId} ` +
            `from base ${sourceBaseId} to base ${destinationBaseId}`;

        await client.query(
            `
            INSERT INTO audit_logs
            (
                user_id,
                action,
                details
            )
            VALUES
            ($1, 'TRANSFER', $2)
            `,
            [
                userId,
                details
            ]
        );

        // -----------------------------
        // Commit transaction
        // -----------------------------

        await client.query("COMMIT");

        res.status(201).json({
            message:
                "Transfer completed successfully",

            transfer
        });

    } catch (error) {

        // Rollback if anything fails
        await client.query("ROLLBACK");

        console.error(
            "Transfer error:",
            error
        );

        res.status(500).json({
            message:
                "Transfer failed",
            error:
                error.message
        });

    } finally {

        client.release();
    }
};


/*
    GET TRANSFERS

    GET /api/transfers
*/
export const getTransfers = async (req, res) => {

    try {

        let query = `
            SELECT

                t.id,

                t.source_base_id,
                sb.name AS source_base_name,

                t.destination_base_id,
                db.name AS destination_base_name,

                t.equipment_type_id,
                e.name AS equipment_name,
                e.category,

                t.quantity,
                t.status,

                t.initiated_by,
                u.username AS initiated_by_username,

                t.transfer_date,
                t.created_at

            FROM transfers t

            JOIN bases sb
                ON t.source_base_id = sb.id

            JOIN bases db
                ON t.destination_base_id = db.id

            JOIN equipment_types e
                ON t.equipment_type_id = e.id

            LEFT JOIN users u
                ON t.initiated_by = u.id
        `;

        const params = [];

        // Base Commander
        // can only see their base's transfers

        if (
            req.user.role ===
            "BASE_COMMANDER"
        ) {

            query += `
                WHERE
                    t.source_base_id = $1
                    OR
                    t.destination_base_id = $1
            `;

            params.push(
                req.user.baseId
            );
        }

        query += `
            ORDER BY
                t.created_at DESC
        `;

        const result =
            await db.query(
                query,
                params
            );

        res.status(200).json({

            count:
                result.rows.length,

            transfers:
                result.rows

        });

    } catch (error) {

        console.error(
            "Get transfers error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to get transfers",

            error:
                error.message

        });
    }
};