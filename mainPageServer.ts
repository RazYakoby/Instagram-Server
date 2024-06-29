import express, { Request, Response, query } from 'express';
import { GetPost, SetPost } from './mongoDB';

const router=express.Router();

router.get("/", async (req: Request, res: Response, next) => { 
    const posts = await GetPost();
    res.send(posts);
    next();
});

router.post("/postupload", async (req:Request,res:Response,next) => {
    const {username, src} = req.body;
    await SetPost(username, src);
    res.status(200).send("Post uploaded succesfully");
    next();
})

router.post("/mainpage", async (req: Request, res: Response, next) => {
    const posts = await GetPost();
    res.send(posts);
    next();
})

export const mainPageServer = router;