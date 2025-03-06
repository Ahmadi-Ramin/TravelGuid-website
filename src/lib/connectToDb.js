import { MongoClient } from 'mongodb';

// Set up the connection to MongoDB
let client;
let db;

const connectToDb = async () => {
    if (db) return db;  // Return the cached database connection if it's already available

    if (!client) {
        client = new MongoClient(process.env.DATABASE_URL);  // Make sure you have your URI in .env
        await client.connect();
    }

    db = client.db();  // Choose the database
    return db;
};

export default connectToDb;
