import db from "./config/db.js";
import bcrypt from "bcryptjs";

const resetCommander = async () => {
    try {
        const passwordHash = await bcrypt.hash(
            "CommandPass123!",
            10
        );

        const result = await db.query(
            `
            UPDATE users
            SET
                password_hash = $1,
                role = 'BASE_COMMANDER',
                base_id = 1
            WHERE username = 'commander_alpha'
            RETURNING id, username, role, base_id
            `,
            [passwordHash]
        );

        if (result.rows.length === 0) {
            console.log("commander_alpha was not found");
        } else {
            console.log(
                "Commander user updated successfully:"
            );

            console.log(result.rows[0]);
        }
    } catch (error) {
        console.error(
            "Failed to update commander:",
            error
        );
    } finally {
        await db.end();
    }
};

resetCommander();