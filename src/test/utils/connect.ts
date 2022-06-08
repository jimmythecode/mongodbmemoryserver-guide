// test/db.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

/**
 * Connect to mock memory db.
 */
export const connect = async () => {
    const mongo = await MongoMemoryServer.create();
    mongo.getUri();
};
/**
 * Close db connection
 */
export const disconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}