import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import User from "../models/users.js";
const MONGODB = 'mongodb+srv://ameenabaneesp:ameena@cluster0.zrjcsnc.mongodb.net/?retryWrites=true&w=majority';
const typeDefs = `#graphql
 
  type User{
    _id: String,
    username : String,
    email : String,
    bio : String,
    profileImage : String,
    followers : [String],
    followings : [String],
  }

  input UserInput{
    username : String,
    email : String,
    bio : String,
    profileImage : String,
    followers : String,
    followings : String,
  }

   type Query{
    getUser(ID: ID!) : User!
    getUsers(limit : Int) : [User]
   }

   type Mutation {
     createUser(userInput: UserInput) : String!
     updateUser(ID : ID!, userInput : UserInput): String!
     deleteUser(ID : ID!) :  String!
   }
`;
const resolvers = {
    Query: {
        async getUser(_, { ID }) {
            return await User.findById(ID);
        },
        async getUsers(_, { limit }) {
            return await User.find().limit(limit);
        }
    },
    Mutation: {
        async createUser(_, { userInput: { username, email, bio, profileImage, followers, followings } }) {
            const res = await new User({ username, email, bio, profileImage, followers, followings }).save();
            return res._id;
        },
        async updateUser(_, { ID, userInput: { username, email, bio, profileImage, followers, followings } }) {
            await User.updateOne({ _id: ID }, { $set: { username, email, bio, profileImage, followers, followings } });
            return ID;
        },
        async deleteUser(_, { ID }) {
            await User.deleteOne({ _id: ID });
            return ID;
        }
    }
};
await connect(MONGODB);
const server = new ApolloServer({
    typeDefs, resolvers
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`server is ready at ${url}`);
