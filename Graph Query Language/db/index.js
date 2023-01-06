import mongoose from 'mongoose';

    var allFriends = [];

    //For avoid warning in mongoose 7
    mongoose.set('strictQuery', false);
  
    //connnect to the mongodb database
    mongoose.connect("mongodb://localhost:27017/info", {
      useNewUrlParser : true,
      useUnifiedTopology : true
    });
  
    //For get the info database
    const db = mongoose.connection.once('open', ()=>{
      console.log('Successfully connected to the database.');
    });
  
    var FriendSchema = new mongoose.Schema({
      name : {
          type : String,
          require : true
      }
    });
    
    var Friend = mongoose.model('Friend',FriendSchema);
    
    
    const vishal = new Friend({name : "ABC"});
    const nilesh = new Friend({name : "DGD"});
    
    await vishal.save();
    await nilesh.save();
    
    // Friend.find({name : 'Vishal'}, (err, v)=>{
    //   err ? console.error(err) : console.log(v);
    // })
    
    // Friend.find({name : 'Nilesh'}, (err, n)=>{
    //   err ? console.error(err) : console.log(n);
    // })
  
    allFriends = await Friend.find({});

    export default allFriends
    
