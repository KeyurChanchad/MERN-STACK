import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id : {
        type : String
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    contact : {
        type : String,
        require : true
    },
    city : {
        type : String,
        require : true
    }
});

const User = mongoose.model("User", UserSchema);

// const newUser = new User({
//     name : "Keyur",
//     email : "keyurchanchad.rao@gmail.com",
//     contact : "7202055029",
//     city : "Amreli"
// });

// newUser.save((error, data)=>{
//     error ? console.error("Internal Server Errror!") : console.log(`${newUser.name} inserted successfully.`);
// });

// module.exports = { User }
export default User;