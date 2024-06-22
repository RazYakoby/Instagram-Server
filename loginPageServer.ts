import express, { Request, Response, query } from 'express';
import { GetUsers, GetUser, UserExist, SetUser, UpdatePassword } from './mongoDB';

// Home.js 
// Importing express module 
const router=express.Router();

router.get("/", async (req:Request,res:Response,next)=>{ 
    res.send(await GetUsers());
    next();
}); 

router.get("/users", async (req:Request,res:Response,next)=>{ 
    const {username, password} = req.query;
    res.send(await GetUser(username as string, password as string));
    next();
}); 

router.post("/signup", async (req:Request,res:Response,next)=>{
    const {username, password} = req.body;
    if(await UserExist(username)){
        res.status(500).send(`user with name ${username} already exists`);
    } else {
        const setUser = await SetUser(username, password);
        res.status(200).send("User created succesfully");
    }

    next();
})

router.post("/loginpage", async (req: Request, res:Response, next) => {
    const {username, password} = req.body;
    const users = await GetUser(username, password);
    if (users.length > 0) {
        res.status(200).send("User logged in succesfully!");
    }
    else{
        res.status(500).send("Wrong credentials");
    }

    next();
})

router.post("/forgotpassword", async (req: Request, res:Response, next) => {
    const {username, password, newpassword} = req.body;
    const users = await GetUser(username, password);
    if (users.length > 0) {
        await UpdatePassword(username, password, newpassword);
        res.status(200).send("password updated in succesfully!");
    }
    else{
        res.status(500).send("Wrong credentials");
    }

    next();
})

// Importing the router 
export const loginPageServer = router;