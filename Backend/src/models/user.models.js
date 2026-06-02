import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    userName:{
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
        required:true,
    },
    bio:{
        type:String,
    },
    role:{
        enum:["user","admin"],
        default:"user",
    },
},{timestamps:true})

export const User= mongoose.model("User",userSchema);