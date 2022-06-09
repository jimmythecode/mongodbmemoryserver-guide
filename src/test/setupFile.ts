import mongoose from 'mongoose';

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  const mongoURI = process.env['MONGO_URI'];
  if (mongoURI === undefined)
    throw new Error("process.env['MONGO_URI'] is undefined in the mongodb-memory-server setupFile.ts");
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect();
});
