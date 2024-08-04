// src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, Db } from 'mongodb'; // Import MongoClient and Db from mongodb
import { loginPageServer } from './loginPageServer';
import { mainPageServer } from './mainPageServer';
import { userPageServer } from './userPageServer';

const app = express();
const PORT = 3100;

// MongoDB URI and Database Name
const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'mydb'; // Replace with your database name

// Declare a global variable to store the MongoDB client instance and database reference
let client: MongoClient;
let db: Db;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
}

// Middleware to ensure MongoDB connection is established for each request
async function ensureMongoDBConnection(req: Request, res: Response, next: NextFunction) {
    if (!client || !client.isConnected()) {
        await connectToMongoDB(); // Reconnect if connection is closed
    }
    next();
}

// Middleware to close MongoDB connection after each request
function closeMongoDBConnection(req: Request, res: Response, next: NextFunction) {
    if (client && client.isConnected()) {
        client.close();
        console.log('MongoDB connection closed');
    }
}