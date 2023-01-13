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
    console.log('Mongodb connected successfully.' );
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


const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
      return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // Convert hard-coded AST string to integer and then to Date
        return new Date(parseInt(ast.value, 10));
      }
      // Invalid hard-coded value (not an integer)
      return null;
    },
  });


//define schema and query
// primitive data Int, Float, String, Boolean and ID. For JSON and Date you need to define your own custom scalar types
const typeDefs = `#graphql
    scalar JSON
    scalar Date

    type User{
        _id : ID,
        name : JSON
        email : String,
        profile_pic : String,
        userRole : String,
        firebase_UID : String,
        createAt : Date,
        updatedAt : Date
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
        getUsers(id: ID, email: String): User,
        
        getForms(id: ID, idOfCreated: ID, name: String): [Form],
        
        getAppointments: [Appointment]
    }
    `;

const resolvers = {
    JSON: GraphQLJSON,

    Date: dateScalar,

    Query : {
        getUsers : (parent, args, context, info) => {
            if (args.id) {
                    return context.users.find((user)=> {
                        if( user._id.toString() === args.id){
                            return user
                        }
                    })
            }
            else if(args.email){
                for (let index = 0; index < context.users.length; index++) {
                    const user = context.users[index];
                    if (user.email === args.email) {
                        return context.users[index]
                    }
                }
            }
            else{
                return context.users
            }
        },

        getForms : (parent, args, context, info) => {
            const { id, name, idOfCreated } = args;
            if (id) {
                    return context.forms.find((form, index) =>{
                        if (form._id.toString() === id){
                            return [form];
                        }
                    });
            }
            else if (idOfCreated || name) {
                if (idOfCreated){
                    return context.forms.filter((form) =>{
                        return form.createdBy._id.toString() === idOfCreated
                    })
                }
                else if (name){
                    return context.forms.filter((form) => form.createdBy.name === name )
                }
            }
            else{
                return context.forms
            }

        },

        getAppointments : (parent, args, context, info) => context.appointments,

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
