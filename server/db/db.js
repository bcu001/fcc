import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const mongoURI = `${process.env.MONGO_URI}/fcc`;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        const db = mongoose.connection.name;
        console.log("MongoDB Connected sucessfully!", db);

    } catch (error) {
        console.error("Database Connection Error:", error.message);
    }
}

export default connectDB;
