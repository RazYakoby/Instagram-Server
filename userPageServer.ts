import express, { Request, Response } from 'express';
import { GetUserPost, GetUserPostNStatus, SetMemoryStories, GetMyMemoryStories, MyStoryMemoryExists } from './mongoDB';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => { 
    try {
        const { username } = req.query;
        if (!username) {
            res.status(400).send('Username query parameter is required');
            return;
        }
        const posts = await GetUserPost(username as string);
        res.status(200).send(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).send('Internal Server Error');
    }
}); 

router.post("/userposts", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(400).send('Username is required');
            return;
        }
        const post = await GetUserPost(username);
        res.status(200).send(post);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/userpostsnstatus", async (req: Request, res: Response) => {
    try {
        const { src } = req.body;
        if (!src) {
            res.status(400).send('Source is required');
            return;
        }
        const postNStatus = await GetUserPostNStatus(src);
        res.status(200).send(postNStatus);
    } catch (error) {
        console.error('Error fetching user post and status:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/mymemorystories", async (req: Request, res: Response) => {
    try {
        const { username, src, storyTitle } = req.body;
        if (!username || !src) {
            res.status(400).send('Username and source are required');
            return;
        }
        await SetMemoryStories(username, src, storyTitle);
        res.status(200).send("Story uploaded successfully");
    } catch (error) {
        console.error('Error uploading story:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/getmymemorystories", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(400).send('Username is required');
            return;
        }
        const stories = await GetMyMemoryStories(username);
        res.status(200).send(stories);
    } catch (error) {
        console.error('Error fetching my stories:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/mystoryMemoryexists", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const exists = await MyStoryMemoryExists(username);
        res.status(200).send(exists ? "User logged in successfully!" : "User not found");
    } catch (error) {
        console.error('Error checking if my story exists:', error);
        res.status(500).send('Internal Server Error');
    }
});

export const userPageServer = router;

