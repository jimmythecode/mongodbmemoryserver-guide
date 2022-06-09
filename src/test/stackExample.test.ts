import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { IPost, Post } from "../models/Post";

let mongo: any;
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  jest.setTimeout(20000)
  await mongo.stop();
  await mongoose.connection.close();
});


describe('post test', () => {
  it('can be created correctly', async () => {
      // expect that two assertios will be made
      expect.assertions(2)
      // create new post model instance
      const post: IPost = new Post()
      // set some test properties
      post.title = 'Test title'
      post.content = 'Test content'
      // save test post to in-memory db
      await post.save()
      // find inserted post by title
      const postInDb = await Post.findOne({title: 'Test title'}).exec()
      console.log('Post document from memory-db', postInDb)
      // check that title is expected
      expect(postInDb?.title).toEqual('Test title')
      // check that content is expected
      expect(postInDb?.content).toEqual('Test content')
  });
});