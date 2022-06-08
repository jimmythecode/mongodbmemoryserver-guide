// test/post.test.ts
import { IPost, Post } from '../models/Post';
import * as dbHandler from './utils/db';

beforeAll(async () => {
    await dbHandler.connect()
});

afterEach(async () => {
    await dbHandler.clearDatabase()
});

afterAll(async () => {
    await dbHandler.closeDatabase()
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