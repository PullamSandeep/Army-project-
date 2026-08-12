import db from "./config/db.js";
import bcrypt from "bcrypt";

const seedUsers = async () => {
    try {
        const adminPassword = await bcrypt.hash(
            "AdminPass123!",
            10
        );

        const commanderPassword = await bcrypt.hash(
            "CommandPass123!",
            10
        );

        const logisticsPassword = await bcrypt.hash(
            "LogisticsPass123!",
            10
        );

        // Admin
        await db.query(
            `
            INSERT INTO users
                (username, password_hash, role, base_id)
            VALUES
                ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            `,
            [
                "admin_user",
                adminPassword,
                "ADMIN",
                null
            ]
        );

        // Base Commander
        await db.query(
            `
            INSERT INTO users
                (username, password_hash, role, base_id)
            VALUES
                ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            `,
            [
                "commander_alpha",
                commanderPassword,
                "BASE_COMMANDER",
                1
            ]
        );

        // Logistics Officer
        await db.query(
            `
            INSERT INTO users
                (username, password_hash, role, base_id)
            VALUES
                ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            `,
            [
                "logistics_officer",
                logisticsPassword,
                "LOGISTICS_OFFICER",
                1
            ]
        );

        console.log("Users created successfully!");

    } catch (error) {
        console.error("User seeding failed:", error);
    } finally {
        await db.end();
    }
};

seedUsers();