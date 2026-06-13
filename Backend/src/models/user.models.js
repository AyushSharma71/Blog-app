import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
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


userSchema.pre("save", function() {
    if (!this.isModified("password")){
        return;
    }
    const hashedpassword =bcrypt.hash(this.password, 10);
    this.password = hashedpassword;
});

userSchema.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User= mongoose.model("User",userSchema);