import mongoose from 'mongoose';
import dotenv from 'dotenv';

//configure dotenv for access .env variables
dotenv.config();
const uri = process.env.URI;

//For ignore warning in console
mongoose.set('strictQuery' , false);
//connect to mongodb
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology : true});
const db = mongoose.connection;

db.on('error', ()=>{
    console.log('Failed to connect with mongodb database.');
});

db.once('open', ()=>{
    console.log('Mongodb connected successfully.' );
});