import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import "./db/db_connection.js";
import allForms from './schema/mongodb/liveForm.js';
import typeDefs from './schema/graphql/Form.js';
import resolvers from './resolvers/resolvers.js'

//configure dotenv for access .env variables
dotenv.config();
const port = process.env.PORT;

const app = express();

const FormSchema = makeExecutableSchema({typeDefs, resolvers});

const data = {
    allForms
}

//Endpoints
app.get('/', (req, res)=>{
    res.send("Home page");
});

app.use('/graphql', 
    graphqlHTTP({
        schema : FormSchema,
        context : data,
        graphiql : true
    })
);

app.listen(port, ()=>{
    console.log(`🚀 🚀 server listen at http://localhost:${port}`);
})




