import express, { Request, Response, query } from 'express';
import { GetUserPost } from './mongoDB';

const router=express.Router();

router.get("/", async (req: Request, res: Response, next) => { 
    const {username} = req.query;
    console.log(username);
    const posts = await GetUserPost(username as string);
    res.send(posts);
    next();
}); 

router.post("/userposts", async (req: Request, res: Response, next) => {
    const {username} = req.body;
    console.log(username);
    const post = await GetUserPost(username);
    res.status(200).send(post);
    next();
})

export const userPageServer = router;