import db from "../config/db.js";

export const getDashboard = async (req, res) => {
    try {
        let query = `
            SELECT
                b.id AS base_id,
                b.name AS base_name,

                e.id AS equipment_type_id,
                e.name AS equipment_name,
                e.category,

                COALESCE(p.purchased, 0) AS purchases,

                COALESCE(tin.transfers_in, 0) AS transfers_in,

                COALESCE(tout.transfers_out, 0) AS transfers_out,

                COALESCE(a.assigned, 0) AS assigned,

                COALESCE(ex.expended, 0) AS expended

            FROM bases b

            CROSS JOIN equipment_types e

            LEFT JOIN (
                SELECT
                    base_id,
                    equipment_type_id,
                    SUM(quantity) AS purchased
                FROM purchases
                GROUP BY base_id, equipment_type_id
            ) p
                ON p.base_id = b.id
                AND p.equipment_type_id = e.id

            LEFT JOIN (
                SELECT
                    destination_base_id AS base_id,
                    equipment_type_id,
                    SUM(quantity) AS transfers_in
                FROM transfers
                WHERE status = 'COMPLETED'
                GROUP BY destination_base_id, equipment_type_id
            ) tin
                ON tin.base_id = b.id
                AND tin.equipment_type_id = e.id

            LEFT JOIN (
                SELECT
                    source_base_id AS base_id,
                    equipment_type_id,
                    SUM(quantity) AS transfers_out
                FROM transfers
                WHERE status = 'COMPLETED'
                GROUP BY source_base_id, equipment_type_id
            ) tout
                ON tout.base_id = b.id
                AND tout.equipment_type_id = e.id

            LEFT JOIN (
                SELECT
                    base_id,
                    equipment_type_id,
                    SUM(quantity) AS assigned
                FROM assignments
                GROUP BY base_id, equipment_type_id
            ) a
                ON a.base_id = b.id
                AND a.equipment_type_id = e.id

            LEFT JOIN (
                SELECT
                    base_id,
                    equipment_type_id,
                    SUM(quantity) AS expended
                FROM expenditures
                GROUP BY base_id, equipment_type_id
            ) ex
                ON ex.base_id = b.id
                AND ex.equipment_type_id = e.id
        `;

        const params = [];

        // Base Commander sees only their base
        if (req.user.role === "BASE_COMMANDER") {
            query += `
                WHERE b.id = $1
            `;

            params.push(req.user.baseId);
        }

        query += `
            ORDER BY
                b.id,
                e.id
        `;

        const result = await db.query(
            query,
            params
        );

        const dashboard = result.rows.map(row => {
            const purchases =
                Number(row.purchases);

            const transfersIn =
                Number(row.transfers_in);

            const transfersOut =
                Number(row.transfers_out);

            const assigned =
                Number(row.assigned);

            const expended =
                Number(row.expended);

            const closingBalance =
                purchases +
                transfersIn -
                transfersOut -
                assigned -
                expended;

            return {
                baseId: row.base_id,
                baseName: row.base_name,

                equipmentTypeId:
                    row.equipment_type_id,

                equipmentName:
                    row.equipment_name,

                category:
                    row.category,

                purchases,
                transfersIn,
                transfersOut,
                assigned,
                expended,

                closingBalance
            };
        });

        res.status(200).json({
            count: dashboard.length,
            dashboard
        });

    } catch (error) {
        console.error(
            "Dashboard error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to load dashboard",

            error:
                error.message
        });
    }
};