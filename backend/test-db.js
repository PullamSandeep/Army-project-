import db from "./config/db.js";

const testDatabase = async () => {
    try {
        const result = await db.query(
            "SELECT NOW() AS current_time"
        );

        console.log("Database connected!");
        console.log(result.rows[0]);

        process.exit(0);
    } catch (error) {
        console.error("Database connection failed:");
        console.error(error);

        process.exit(1);
    }
};

testDatabase();