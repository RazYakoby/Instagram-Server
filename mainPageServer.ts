import express, { Request, Response } from 'express';
import { GetMyStories, GetPost, GetStories, MyStoryExists, SetPost, SetStories, UsersStoryExists } from './mongoDB';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => { 
    try {
        const posts = await GetPost();
        res.send(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/postupload", async (req: Request, res: Response) => {
    try {
        const { username, src } = req.body;
        await SetPost(username, src);
        res.status(200).send("Post uploaded successfully");
    } catch (error) {
        console.error('Error uploading post:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/mainpage", async (req: Request, res: Response) => {
    try {
        const posts = await GetPost();
        res.send(posts);
    } catch (error) {
        console.error('Error fetching posts for mainpage:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/userstories", async (req: Request, res: Response) => {
    try {
        const { username, src } = req.body;
        console.log(username + ", " + src);
        await SetStories(username, src);
        res.status(200).send("Story uploaded successfully");
    } catch (error) {
        console.error('Error uploading story:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/getuserstories", async (req: Request, res: Response) => {
    try {
        const { users } = req.body;
        const stories = await GetStories(users);
        res.send(stories);
    } catch (error) {
        console.error('Error fetching user stories:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/getmystories", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const stories = await GetMyStories(username);
        res.send(stories);
    } catch (error) {
        console.error('Error fetching my stories:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/mystoryexists", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const exists = await MyStoryExists(username);
        res.status(200).send(exists ? "User logged in successfully!" : "User not found");
    } catch (error) {
        console.error('Error checking if my story exists:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/userstoryexists", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const exists = await UsersStoryExists(username);
        res.status(200).send(exists ? "User logged in successfully!" : "User not found");
    } catch (error) {
        console.error('Error checking if user story exists:', error);
        res.status(500).send('Internal Server Error');
    }
});

export const mainPageServer = router;
