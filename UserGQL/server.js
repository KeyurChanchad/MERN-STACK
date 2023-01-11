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
app.use(cors());

const URI = process.env.URI;


//For ignore warning
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
        _id : ID!,
        name : String!,
        email : String!,
        contact : String!,
        city : String!
    }

    type Query{
        users : [User],
        user(name: String!): User,
        getuser(id : ID!) : User,
    }
`;

//define users resolvers
const resolvers = {
    Query : {
        users : (obj, args, context, info)  => {return context.users},

        user : function (parent, args, context, info) {
            console.log(args.name);
            return context.users.find((user) => user.name === args.name);
        },

        getuser : function (parent, args, context, info) {
            console.log(args.id);
            return context.users.find((user) => user._id.toString() === args.id);
        },
        
    }
};

//Define Graphql user schema
const UserSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});


    //insert new user in User Model
    const newUser = User({ 
        name: "john", 
        email : "john.dear@gmail.com", 
        contact : "9632587410", 
        city : "Miami"
    });

    //save new user
    newUser.save().then(()=>{
        console.log(`${newUser.name} saved successfully.`);
    }).catch(()=>{
        console.log("User not saved in database");
    })

    const allUsers = await User.find();
    const data = {
        users : allUsers
    }

//Endpoints
app.get('/', (req, res)=>{
    res.send("Home page of the Graphql API");
});

app.use("/alluser", 
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
