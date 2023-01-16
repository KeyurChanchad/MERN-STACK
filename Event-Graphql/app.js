import express from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

const app = express();

var events = [];
const port = process.env.PORT;

app.get('/graphql', 
    graphqlHTTP({
        schema : buildSchema(`
            type Event{
                _id : ID!,
                title : String!,
                description : String!,
                price : Float!,
                date : String!
            }
            
            type RootQuery {
                events : [Event!]!
            }

            input EventInput {
                title : String!,
                description : String!,
                price : Float!,
                date : String!
            }

            type RootMutation {
                createEvent(eventInput: EventInput): Event
            }

             schema {
                query : RootQuery,
                mutation : RootMutation,
             }
        `),

        rootValue : {
            events : ()=>{
                return events
            },
            createEvent : (args)=>{
                const event = {
                    title : args.EventInput.title,
                    description : args.EventInput.description,
                    price : args.EventInput.price,
                    date : args.EventInput.date
                }
                events.push(event);
                return event;
            }
        },
        graphiql : true
    })
)

app.listen(port, ()=>{
    console.log(`Event app listen at http://localhost:${port}`);
})