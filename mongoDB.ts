import {Collection, MongoClient} from 'mongodb';
const clusterUrl = "localhost:27017"; 
const dbUrl = "mongodb://localhost:27017/";//`mongodb+srv://${userName}:${password}@${clusterUrl}/test?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

export async function UserExist(userName: string): Promise<boolean> {
    await client.connect();
    const userCollection = await client.db("users").collection("User");
    const users = await userCollection.find({"name":userName}).toArray();
    await client.close();
    return users.length > 0; 
}

export async function UpdatePassword(userName: string, password:string, newPassword:string) {
    await client.connect();
    const userCollection = await client.db("users").collection("User");
    const users = await userCollection.updateOne({"name":userName, "password":password}, {$set: {"password":newPassword}});
    await client.close();
    return users; 
}

export async function SetUser(userName:string, password:string) {
    await client.connect();
    const userCollection = await client.db("users").collection("User");
    const users = await userCollection.insertOne({"name":userName, "password":password});
    await client.close();
    return users; 
}

export async function GetUser(userName:string, password:string) {
    await client.connect();
    const userCollection = await client.db("users").collection("User");
    const users = await userCollection.find({"name":userName, "password":password}).toArray();
    await client.close();
    return users;
}

export async function GetUsers() {
    await client.connect();
    const userCollection = await client.db("users").collection("User");
    const users = await userCollection.find({}, { projection: { _id: 0, name: 1} }).toArray();
    await client.close();
    return users.map(user => ({ name: user.name }));
}

export async function SetPost(userName:string, src:string) {
    await client.connect();
    const postCollection = await client.db("users").collection("Posts");
    const posts = await postCollection.insertOne({"name":userName, "post":src});
    await client.close();
    return posts;
}

export async function GetPost() {
    await client.connect();
    const userCollection = await client.db("users").collection("Posts");
    const posts = await userCollection.find({}, { projection: { _id: 0, post: 1 , name: 1} }).toArray();
    await client.close();
    return posts.map(doc => ({ src: doc.post, name: doc.name }));
}

export async function GetUserPost(username:string) {
    await client.connect();
    const userCollection = await client.db("users").collection("Posts");
    const posts = await userCollection.find({name: username}, { projection: { _id: 0, post: 1 } }).toArray();
    await client.close();
    return posts.map(doc => doc.post);
}

export async function GetUserPostNStatus(src:string) {
    await client.connect();
    const userCollection = await client.db("users").collection("Posts");
    const posts = await userCollection.find({post: src}, { projection: { _id: 0, post: 1 , name: 1} }).toArray();
    await client.close();
    return posts.map(doc => ({ src: doc.post, name: doc.name }));
}

export async function SetStories(username: string, src: string) {
    await client.connect();
    const storyCollection = await client.db("users").collection("Stories");
    const stories = await storyCollection.insertOne({"username": username, "story": src});
    await client.close();
    return stories;
}

export async function GetStories(username: string) {
    await client.connect();
    const storyCollection = await client.db("users").collection("Stories");
    const stories = await storyCollection.find(
        { "username": { $ne: username } },
        { projection: { _id: 0, username: 1, story: 1 } } // Exclude _id and username from the result
    ).toArray();
    await client.close();
    return stories.map(doc => ({ username: doc.username, story: doc.story }));
}

export async function GetMyStories(username: string) {
    await client.connect();
    const storyCollection = await client.db("users").collection("Stories");
    const stories = await storyCollection.find({"username": username}, { projection: { _id: 0, username: 1 , story: 1} }).toArray();
    await client.close();
    return stories.map(doc => ({ username: doc.username, story: doc.story }));
}

export async function MyStoryExists(username:string) {
    await client.connect();
    const storyCollection = await client.db("users").collection("Stories");
    const stories = await storyCollection.find({"username": username}).toArray();
    await client.close();
    return stories.length > 0;
}

export async function UsersStoryExists(username:string) {
    await client.connect();
    const storyCollection = await client.db("users").collection("Stories");
    const stories = await storyCollection.find({"username": { $ne: username }}).toArray();
    await client.close();
    return stories.length > 0;
}

export async function SetMemoryStories(username: string, src: string, storyTitle: string) {
    await client.connect();
    const storyCollection = await client.db("users").collection("StoriesMemory");
    const stories = await storyCollection.insertOne({"username": username, "story": src, "storyTitle": storyTitle});
    await client.close();
    return stories;
}

export async function GetMyMemoryStories(username: string) {
    try {
        await client.connect();
        const storyCollection = await client.db("users").collection("StoriesMemory");

        const stories = await storyCollection.find(
            { "username": username },
            { projection: { _id: 0, username: 1, story: 1, storyTitle: 1 } }
        ).toArray();

        await client.close();

        return stories.map(doc => ({
            username: doc.username,
            story: doc.story,
            storyTitle: doc.storyTitle 
        }));
    } catch (error) {
        console.error('Error fetching my stories:', error);
        return [];
    }
}


export async function MyStoryMemoryExists(username:string) {
    try {
        await client.connect();
        const storyCollection = client.db("users").collection("StoriesMemory");
        const stories = await storyCollection.find({ "username": username }).toArray();
        await client.close();
        const exists = stories.length > 0;
        console.log(`MyStoryMemoryExists for ${username}:`, exists);
        return exists;
    } catch (error) {
        console.error('Error in MyStoryMemoryExists:', error);
        await client.close(); // Ensure the client is closed in case of an error
        return false;
    }
}

