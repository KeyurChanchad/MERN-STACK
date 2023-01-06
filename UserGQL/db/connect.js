import mongoose from 'mongoose';

mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true});

db = mongoose.connection();
db.on('error', console.error.bind(console, 'Database not connected'));
db.once('open', (req, res)=>{
    console.log("Mongodb connected successfully.");
});
