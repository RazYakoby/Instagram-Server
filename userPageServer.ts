import express, { Request, Response } from 'express';
import { GetUserPost, GetUserPostNStatus, SetMemoryStories, GetMyMemoryStories, MyStoryMemoryExists, SetStutus, GetSatus, UpdatepushFollowers, UpdatepushFollowing, UpdatepullFollowers, UpdatepullFollowing, MyStatusExists, UpdateFollowersUser, UpdateFollowingUser, PushToFollowersUser, PushToFollowingUser, GetFollowers, GetFollowing, PullToFollowersUser, PullToFollowingUser } from './mongoDB';
import { error } from 'console';

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

router.post("/setstatus", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        await SetStutus(username);
        res.status(200).send("status uploading successfully");
    }
    catch (error){
        console.error('Error uploading story:', error);
    }
})

router.post("/getstatus", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const status = await GetSatus(username);
        res.status(200).send(status);
        console.log("status: ", status);
    }
    catch(error) {
        console.error('Error fetching my status:', error);
    }
})

router.post("/updatefollowers", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const result = await UpdatepushFollowers(username, 1);
        if (result.matchedCount === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send("Followers count updated successfully!");
        }
    } catch (error) {
        console.error('Error in /updatefollowers:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/updatefollowing", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const result = await UpdatepushFollowing(username, 1);
        if (result.matchedCount === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send("Following count updated successfully!");
        }
    } catch (error) {
        console.error('Error in /updatefollowing:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/updatepullfollowers", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const result = await UpdatepullFollowers(username, 1);
        if (result.matchedCount === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send("Followers count updated successfully!");
        }
    } catch (error) {
        console.error('Error in /updatefollowers:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/updatepullfollowing", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const result = await UpdatepullFollowing(username, 1);
        if (result.matchedCount === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send("Following count updated successfully!");
        }
    } catch (error) {
        console.error('Error in /updatefollowing:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/updatefollowersuser", async (req: Request, res: Response) => {
    try {
        const { username, user } = req.body;
        const result = await UpdateFollowersUser(username, user);
        console.log(result);
            res.status(200).send("User updated successfully!");
        
    } catch (error) {
        console.error('Error in /updateuserfollowers:', error);
        res.status(500).send('followers Server Error');
    }
});

router.post("/updatefollowingsuser", async (req: Request, res: Response) => {
    try {
        const { username, user } = req.body;
        const result = await UpdateFollowingUser(username, user);
        console.log(result);
            res.status(200).send("User updated successfully!");
        
    } catch (error) {
        console.error('Error in /updateuserfollowers:', error);
        res.status(500).send('followers Server Error');
    }
});

router.post("/pushtofollowersuser", async (req: Request, res: Response) => {
    try {
        const { username, user } = req.body;
        const result = await PushToFollowersUser(username, user);
        console.log(result);
            res.status(200).send("User push updated successfully!");
    } catch (error) {
        console.error('Error in /updateuserfollowing:', error);
        res.status(500).send('push Server Error');
    }
});

router.post("/pushtofollowinguser", async (req: Request, res: Response) => {
    try {
        const { username, user } = req.body;
        const result = await PushToFollowingUser(username, user);
        console.log(result);
            res.status(200).send("User push updated successfully!");
    } catch (error) {
        console.error('Error in /updateuserfollowing:', error);
        res.status(500).send('push Server Error');
    }
});

router.post("/getfollowers", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const status = await GetFollowers(username);
        res.status(200).send(status);
        console.log(status);
        console.log("status: ", status);
    }
    catch(error) {
        console.error('Error fetching my status:', error);
    }
})

router.post("/getfollowing", async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const status = await GetFollowing(username);
        res.status(200).send(status);
        console.log(status);
        console.log("status: ", status);
    }
    catch(error) {
        console.error('Error fetching my status:', error);
    }
})

router.post("/pulltofollowersuser", async (req: Request, res: Response) => {
    try {
        const { username, user } = req.body;
        const result = await PullToFollowersUser(username, user);
        console.log(result);
            res.status(200).send("User push updated successfully!");
    } catch (error) {
        console.error('Error in /updateuserfollowing:', error);
        res.status(500).send('push Server Error');
    }
});

router.post("/pulltofollowinguser", async (req: Request, res: Response) => {
    try {
        const { username, user } = req.body;
        const result = await PullToFollowingUser(username, user);
        console.log(result);
            res.status(200).send("User push updated successfully!");
    } catch (error) {
        console.error('Error in /updateuserfollowing:', error);
        res.status(500).send('push Server Error');
    }
});

export const userPageServer = router;

