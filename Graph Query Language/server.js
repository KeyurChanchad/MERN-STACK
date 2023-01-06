import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';
import allFriends from './db/index.js'




const app = express();
const port = 4000;


mongoose.set('strictQuery', false);

// In-memory data store
const data = {
    friends : allFriends,
  }


// Schema 
const typeDefs = `
  type Friend{
    id : ID!,
    name : String!
  }

  type Query{
    friends : [Friend]
}`;

//functions that are called to execute a field and produce a value.
const resolvers = {
    // friends resolver function
    // Query is the entry point into the GraphQL server
    Query : {
        //context is database entry point and It is often used as the connection between the GraphQL server and a database.
        friends : (obj, args, context, info) => context.friends,
    },
};

//The makeExecutableSchema function creates a complete schema that you can pass into the GraphQL endpoint.
const executableSchema = makeExecutableSchema({ 
    typeDefs, 
    resolvers,
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

// Entrypoint
app.use(
    '/graphql',
    graphqlHTTP({
      schema: executableSchema,
      context: data,
      graphiql: true,
    })
  )

app.get('/', (req, res)=>{
    res.send("Please contact Rao information technology.");
});

app.listen(port, ()=>{
    console.log(`Server listen at http://localhost:${port}`);
});
