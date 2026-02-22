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
                    "stock" INTEGER NOT NULL CHECK (quantity > 0) NOT NULL,
                    "is_active" BOOLEAN DEFAULT TRUE,
                    "created_at" TIMESTAMP DEFAULT NOW()
                )`
            } else if (element === "cart") {
                dbQuery = `CREATE TABLE IF NOT EXISTS "${element}" (
                    "id" SERIAL PRIMARY KEY,
                    "product_id" INTEGER REFERENCES products(id) ON DELETE CASCADE,
                    "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
                    "quantity" INTEGER NOT NULL CHECK (quantity > 0),
                    "created_at" TIMESTAMP DEFAULT NOW(),
                    UNIQUE(user_id, product_id)
                )`
            } else if (element === "orders") {
                dbQuery = `CREATE TABLE IF NOT EXISTS "${element}" (
                    "id" SERIAL PRIMARY KEY,
                    "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
                    "total_amount" INTEGER NOT NULL,
                    "status" VARCHAR(50) NOT NULL,
                    "created_at" TIMESTAMP DEFAULT NOW(),
                    UNIQUE(id)
                )`
            } else if (element === "order_items") {
                dbQuery = `CREATE TABLE IF NOT EXISTS "${element}" (
                    "id" SERIAL PRIMARY KEY,
                    "product_id" INTEGER REFERENCES products(id) ON DELETE CASCADE,
                    "order_id" INTEGER REFERENCES orders(id) ON DELETE CASCADE,
                    "quantity" INTEGER NOT NULL CHECK (quantity > 0),
                    "price_at_purchase" INTEGER NOT NULL CHECK(price_at_purchase > 0),
                    UNIQUE(id)
                )`
            }
            else {
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
