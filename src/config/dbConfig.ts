import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// Establish MongoDB connection
const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        const connectionDetails = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;

        console.log(`MongoDB connected: ${connectionDetails}`);
    } catch (error) {
        console.error(`Database connection error: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectToDatabase;