import express, { Request, Response } from 'express';
import { GetUsers, GetUser, UserExist, SetUser, UpdatePassword } from './mongoDB';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => { 
    try {
        const users = await GetUsers();
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}); 

router.get("/users", async (req: Request, res: Response) => { 
    try {
        const { username, password } = req.query;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }
        const user = await GetUser(username as string, password as string);
        res.send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
}); 

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }
        if (await UserExist(username)) {
            res.status(400).send(`User with name ${username} already exists`);
        } else {
            await SetUser(username, password);
            res.status(200).send("User created successfully");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/loginpage", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }
        const users = await GetUser(username, password);
        if (users.length > 0) {
            res.status(200).send("User logged in successfully!");
        } else {
            res.status(401).send("Wrong credentials");
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/forgotpassword", async (req: Request, res: Response) => {
    try {
        const { username, password, newpassword } = req.body;
        if (!username || !password || !newpassword) {
            return res.status(400).send('Username, password, and new password are required');
        }
        const users = await GetUser(username, password);
        if (users.length > 0) {
            await UpdatePassword(username, password, newpassword);
            res.status(200).send("Password updated successfully!");
        } else {
            res.status(401).send("Wrong credentials");
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Internal Server Error');
    }
});

export const loginPageServer = router;
