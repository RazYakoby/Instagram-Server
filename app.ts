// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { loginPageServer } from './loginPageServer';
import { mainPageServer } from './mainPageServer';
import { userPageServer } from './userPageServer';
import cors from 'cors';
import { error } from 'console';

const app = express();
const PORT = 3100;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use("/login", loginPageServer);
app.use("/main", mainPageServer);
app.use("/user", userPageServer);

/*app.use(bodyParser.json());
app.use(cors());
app.use("/login", loginPageServer);
app.use("/uploadPost", mainPageServer); */

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});