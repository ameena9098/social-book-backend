import { Schema, model } from 'mongoose';

interface IPost {
    id: String,
    userId: String,
    Username: String,
    postImage: String,
    description: String,
    profileImage: String,
    datePublished: Date,
    likes: [String],
    comments: [{
        commentId: String,
        userId: String,
        username: String,
        profileImage: String,
        commentText: String,
        date: Date,
        likes: [String],
    }],
}

const PostSchema = new Schema<IPost>({
    id: String,
    userId:  { type: String, required: true },
    Username:  { type: String, required: true },
    postImage:  { type: String, required: true },
    description:  { type: String, required: true },
    profileImage:  { type: String, required: true },
    datePublished:  { type: Date, required: true },
    likes: [String],
    comments: [{
        commentId: String,
        userId: String,
        username: String,
        profileImage: String,
        commentText: String,
        date: Date,
        likes: [String],
    }],
    
});

const Post = model<IPost>('users', PostSchema);

export default Post;