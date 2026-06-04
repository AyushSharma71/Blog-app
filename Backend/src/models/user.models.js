import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    bio:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
},{timestamps:true})

export const User= mongoose.model("User",userSchema);