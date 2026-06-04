import { Apierror } from "../utils/Apierror.js";
import { User } from "../models/user.models.js";
import { uploadImage } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const registeruser = async (req, res) => {
    /* user details from req.body
       validate the users
       user registered previously or not
       if not,then create user
    */
    try {
        const { fullname, username, email, password } = req.body;

        if ([fullname, username, email, password].some((field) => {
            field?.trim() === ""
        })) {
            throw new Apierror(400, "All fields are required");
        }

        const existeduser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existeduser) {
            throw new Apierror(401, "user already exists");
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullname,
            username: username.toLowerCase(),
            email,
            password: hashedpassword,
        })
        if (!user) {
            throw new Apierror(400, "user not created");
        }
        else {
            res.status(201).json({ "msg": "user created successfully" });
        }
    } catch (error) {
        res.status(error.statuscode || 500).json({
            "msg": "Internal server error"
        });
    }
}


const loginuser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userexist = await User.findOne({ username });

        if (!userexist) {
            throw new Apierror(400, "username does not exists");
        }
        /**isme password jo database mein h aur second wala jo abhi diya ja rha hai  */
        const decodedpass = await bcrypt.compare(password, userexist.password);

        if (decodedpass) {
            const token = jwt.sign(
                { id: userexist._id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_SECRET_EXPIRY }
            )
            res.status(201).json({
                "message": "Login successful",
                token,
                user: {
                    username: userexist.username,
                    email: userexist.email,
                    fullname: userexist.fullname,
                }
            })
        } else {
            throw new Apierror(400, "password is not matching");
        }
    } catch (error) {
        res.status(error.statuscode || 500).json({ message: error.message || "Internal server error" })
    }
}
/** 
 * after login,open profile page and update profile details like avatar,bio,role
 */
const userprofile = async (req, res) => {
    try {
        const { bio, role } = req.body;

        const avatarlocal = req.file?.path
            || req.files?.avatar?.[0]?.path

        if (!avatarlocal) {
            throw new Apierror(400, "avatar is required");
        }
        const avatar = await uploadImage(avatarlocal);
        if (!avatar) {
            throw new Apierror(500, "Error in uploading avatar");
        }

        // kunki jwt se humne id bheja so here using id to fetch the user
        const userId = req.user?.id 
       
        if (!userId) throw new Apierror(401, "Unauthorized");

        // store image URL (Cloudinary returns secure_url)
        const avatarUrl = avatar?.secure_url || avatar?.url || avatar;

        const user = await User.findOneAndUpdate(
            { _id: userId },
            {
                avatar: avatarUrl,
                bio,
                role,
            }, { new: true, runValidators: true });
        return res.json({ success: true, user });
    } catch (error) {
        res.status(error.statuscode || 500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
}

const logoutuser = async(req,res) =>{
    try {
        const userid=req.user.id;
        const user = await User.findOne({
            _id:userid
        });
        if(!user){
            throw new Apierror(401,"logout failed");
        }
        else{
            res.status(200).json({
                message:"Logout successful",
            })
        }

    } catch (error) {
        res.status(error.statuscode||500).json({
            message:error.message||"logout problem",
        })
    }
}

export {
    registeruser,
    userprofile,
    loginuser,
    logoutuser
};