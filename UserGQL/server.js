import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import connect from './db/connect';
import User from './models/UserModel.js';

//configure dotenv for access .env variable
dotenv.config();

const app = express();
const URI = process.env.URI;

mongoose.set("strictQuery" ,false);
mongoose.connect(URI, { useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database not connected'));
db.once('open', (req, res)=>{
    console.log("Mongodb connected successfully.");
});


// define typedefs
const typeDefs = `
    type User{
        id : ID!,
        name : String!,
        email : String!,
        contact : String!,
        city : String!
    }

    type Query{
        users : [User]
    }
`;

//define users resolvers
const resolvers = {
    Query : {
        users : (obj, args, context, info) => context.users
    },
}

//Define Graphql user schema
const UserSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//insert new user in User Model
const newUser = User({
    name : "Dhrumil",
    email : "dhrumilgandhi.rao@gmail.com",
    contact : "1234567890",
    city : "Ahmedabad"
});
//save new user
newUser.save().then()

const allUsers = await User.find();
console.log(allUsers);
const data = {
    users : allUsers
}
//Endpoints
app.get('/', (req, res)=>{
    res.send("Home page of the Graphql API");
});

app.use("/graphql", 
    graphqlHTTP({
        schema : UserSchema,
        context : data,
        graphiql : true
    })
);

//Listen on this API
app.listen(process.env.PORT, ()=>{
    console.log(`Server listen at http://localhost:${process.env.PORT}`);
});
