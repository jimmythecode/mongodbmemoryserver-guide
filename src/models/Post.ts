import mongoose, { Document, Model } from 'mongoose'

export interface IPost extends Document {
    title: string
    content: string
}

const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
})

export const Post: Model<IPost> = mongoose.model('Post', postSchema)