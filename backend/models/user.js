import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      phno: {
        type: String,
        trim: true,
        unique: true,
      },
      countrycode: {
        type: String,
      },
    },
    {timestamps:true});
    
    const User = mongoose.model("User",userSchema);
    export {User};