import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    id: String,
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
    followers: { type: [String] },
    followings: { type: [String] },
});
const User = model('users', UserSchema);
export default User;
