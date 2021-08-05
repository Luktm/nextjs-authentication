import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb+srv://luk1993:4dSCKp7DhWaQyykl@cluster0.chpu7.mongodb.net/auth-demo?retryWrites=true&w=majority');
    return client;
}