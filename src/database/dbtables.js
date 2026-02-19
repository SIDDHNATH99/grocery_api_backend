const pool = require("./dbconfig");
const collections = require('./dbcollections')

const CreateTable = async () => {

    try {

        console.log("CreateTable called");

        for (const element of collections) {
            let dbQuery = "";

            if (element === "users") {
                dbQuery = `CREATE TABLE IF NOT EXISTS "${element}" (
                "id" SERIAL PRIMARY KEY,
                "phone" VARCHAR(15) UNIQUE NOT NULL,
                "role" VARCHAR(50) NOT NULL,
                "created_at" TIMESTAMP DEFAULT NOW()
                );`;
            } else if (element === "otp") {
                dbQuery = `CREATE TABLE IF NOT EXISTS "${element}" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
                "otp" VARCHAR(100) NOT NULL,
                "expires_at" TIMESTAMP NOT NULL,
                "used" BOOLEAN DEFAULT FALSE,
                "created_at" TIMESTAMP DEFAULT NOW()
                );`;
            } else if (element === "products") {
                dbQuery = `CREATE TABLE IF NOT EXISTS "${element}" (
                    "id" SERIAL PRIMARY KEY,
                    "name" VARCHAR(50) NOT NULL,
                    "price" VARCHAR(50) NOT NULL,
                    "stock" VARCHAR(50) NOT NULL,
                    "is_active" BOOLEAN DEFAULT TRUE,
                    "created_at" TIMESTAMP DEFAULT NOW()
                )`
            } else {
                console.log(`Skipping table creation for: ${element}`);
                continue;
            }

            let client;
            try {
                client = await pool.connect();
                await client.query(dbQuery);
                console.log(`Table ${element} created or already exists`);
            } catch (error) {
                console.error(`Error creating table ${element}:`, error);
                return false;
            } finally {
                if (client) client.release();
            }
        }

        return true;
    } catch (error) {
        console.error("Error in CreateTable:", error);
        return false;
    }
};

module.exports = CreateTable;
