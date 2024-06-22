// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { loginPageServer } from './loginPageServer';
import cors from 'cors';

const app = express();
const PORT = 3100;

app.use(bodyParser.json());
app.use(cors());
app.use("/login", loginPageServer);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});