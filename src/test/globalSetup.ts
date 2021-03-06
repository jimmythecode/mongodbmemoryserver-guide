import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import config from './utils/config';

export = async function globalSetup() {
  if (config.Memory) { // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  // The following is to make sure the database is clean before an test starts
  // @ts-ignore config.Database isn't in file? I wonder if it's generated after?
  await mongoose.connect(`${process.env.MONGO_URI}/${config.DataBase}`, { });
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};