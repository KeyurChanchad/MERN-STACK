import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GraphQLScalarType, Kind } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

//configure dotenv for access .env variables
dotenv.config();
const uri = process.env.URI;
const port = process.env.PORT;

const app = express();

//For ignore warning in console
mongoose.set('strictQuery' , false);
//connect to mongodb
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology : true});

const db = mongoose.connection.once('open', ()=>{
    console.log('Mongodb connected successfully.');
});

//User's schema and model
const userschema = new mongoose.Schema({}, {strict: false});
const users = new mongoose.model("users", userschema);
const allUsers = await users.find();

//Form's schema and model
const formschema = new mongoose.Schema({}, {strict: false});
const forms = new mongoose.model("forms", formschema);
const allForms = await forms.find();

//Appointment schema and model
const appointmentschema = new mongoose.Schema({}, {strict: false});
const appointments = new mongoose.model("appointments", appointmentschema);
const allAppointments = await appointments.find();




//define schema and query
// primitive data Int, Float, String, Boolean and ID. For JSON and Date you need to define your own custom scalar types
const typeDefs = `#graphql
    scalar JSON

    type User{
        _id : ID,
        name : JSON!
        email : String!,
        profile_pic : String,
        userRole : String,
        firebase_UID : String,
        createAt : String,
        updatedAt : String
    }
   
    type Form{
        _id : ID,
        name : String!,
        settings : JSON,
        attachments : JSON,
        createdBy : JSON,
        formKey : String,
        _live : Boolean,
        createAt : String,
        updatedAt : String
    }

    type Appointment{
        _id : ID,
        name : String!,
        slots : JSON,
        createdBy : JSON,
        formDetails : JSON
    }
    
    type Query{
        users : [User],

        forms : [Form],

        appointments : [Appointment]
    }
`;

const resolvers = {
    JSON: GraphQLJSON,

    Query : {
        users : (parent, args, context, info) => context.users,

        forms : (parent, args, context, info) => context.forms,

        appointments : (parent, args, context, info) => context.appointments,

    }
};

const raoForms = makeExecutableSchema({typeDefs, resolvers});

const data = {
    users : allUsers,
    forms : allForms,
    appointments : allAppointments,
}

//Endpoints
app.get("/", (req, res)=>{
    res.send("Home page of rao forms");
})

app.use("/graphql", 
    graphqlHTTP({
        schema : raoForms,
        context : data,
        graphiql : true
    })
);


app.listen(port, ()=>{
    console.log(`🚀 🚀 server listen at http://localhost:${port}`);
})
