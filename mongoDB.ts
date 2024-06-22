import {Collection, MongoClient} from 'mongodb';
const userName = ""
const password = ""
const clusterUrl = "localhost:27017"; 
const dbUrl = "mongodb://localhost:27017/";//`mongodb+srv://${userName}:${password}@${clusterUrl}/test?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

async function GetCollection(collectionName:string) {
    await client.connect();
    const collection = await client.db("users").collection(collectionName);
    await client.close();
    return collection;
}

export async function UserExist(userName: string): Promise<boolean> {
    const userCollection = await GetCollection("User");
    await client.connect();
    const users = await userCollection.find({"name":userName}).toArray();
    await client.close();
    return users.length > 0; 
}

export async function UpdatePassword(userName: string, password:string, newPassword:string) {
    const userCollection = await GetCollection("User");
    await client.connect();
    const users = await userCollection.updateOne({"name":userName, "password":password}, {$set: {"password":newPassword}});
    await client.close();
    return users; 
}

export async function SetUser(userName:string, password:string) {
    const userCollection = await GetCollection("User");
    await client.connect();
    const users = await userCollection.insertOne({"name":userName, "password":password});
    await client.close();
    return users; 
}

export async function GetUser(userName:string, password:string) {
    const userCollection = await GetCollection("User");
    await client.connect();
    const users = await userCollection.find({"name":userName, "password":password}).toArray();
    await client.close();
    return users;
}

export async function GetUsers() {
    const userCollection = await GetCollection("User");
    await client.connect();
    const users = await userCollection.find({}).toArray();
    await client.close();
    return users;
}