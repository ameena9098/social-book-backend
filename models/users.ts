import { Schema, model } from 'mongoose';

interface IUser {
    id: String,
    username: String,
    email: String,
    bio: String,
    profileImage: String,
    followers: Array<String>,
    followings: Array<String>
}

const UserSchema = new Schema<IUser>({
    id: String,
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
    followers: { type: [ String ] },
    followings: { type: [ String ] },
});

const User = model<IUser>('users', UserSchema);

export default User;