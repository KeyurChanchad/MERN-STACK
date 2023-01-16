import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import "./db/db_connection.js";
import allForms from './schema/mongodb/Form.js';
import allAppointments from './schema/mongodb/Appointment.js';
import allFormSubmissions from './schema/mongodb/FormSubmission.js';
import typeDefs from './schema/graphql/TypeDefs.js';
import resolvers from './resolvers/Resolvers.js'

//configure dotenv for access .env variables
dotenv.config();
const port = process.env.PORT;

const app = express();

const FormSchema = makeExecutableSchema({typeDefs, resolvers});

const data = { allForms, allAppointments, allFormSubmissions }

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




