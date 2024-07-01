import express, { Request, Response, query } from 'express';
import { GetUserPost, GetUserPostNStatus } from './mongoDB';

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
    const post = await GetUserPost(username);
    res.status(200).send(post);
    next();
})

router.post("/userpostsnstatus", async (req: Request, res: Response, next) => {
    const {src} = req.body;
    const postNStatus = await GetUserPostNStatus(src);
    res.status(200).send(postNStatus);
    next;
})

export const userPageServer = router;