import { Apierror } from "../utils/Apierror.js";
import { Post,Like } from "../models/post.model.js";
import { uploadImage } from "../utils/cloudinary.js";

const postcreated = async(req,res)=>{
    try {
        const userId=req.user?.id;
        const {title,content,status="draft"} = req.body;
        
        if([title,content].some((field)=>field==="")){
            throw new Apierror(400,"All fields are required");
        }

        const coverimagelocal = req.file?.path || req.files?.coverimage?.[0]?.path;
        
        if(!coverimagelocal){
            throw new Apierror(400,"Cover image is required");
        }
        const coverimage = await uploadImage(coverimagelocal);
        
        const coverimageurl= coverimage?.secure_url||coverimage?.url||coverimage;
        if(!coverimage){
            throw new Apierror(500,"Error in coverimage uploading");
        }
        const createdpost = await Post.create({
            title,
            content,
            author:userId,
            coverimage:coverimageurl,
            status,        
        })
        return res.json({success:true,createdpost});
    } catch (error) {
        res.status(error.statuscode ||500).json({
            success:false,
            message:error.message||"Internal server error"
        })
    }
}

const postliked = async(req,res)=>{
    try {
        const userId=req.user?.id;
        const postId=req.params.id; 

        const updatedpost = await Post.findByIdAndUpdate(
            postId,
            {$addToSet:{likescount:userId}},
            {new:true,runValidators:true});

        if(!updatedpost){
            throw new Apierror(404,"Post not found");
        }
        return res.json({success:true,updatedpost});
    } catch (error) {
        res.status(error.statuscode ||500).json({
            success:false,
            message:error.message||"Internal server error"
        })
    }
}

const postunliked = async(req,res)=>{
    try {
        const userId=req.user?.id;
        const postId=req.params.id;
        
        const updatedpost = await Post.findByIdAndUpdate(
            postId,
            {$pull:{likescount:userId}},
            {new:true,runValidators:true});
        if(!updatedpost){
            throw new Apierror(404,"Post not found");
        }
        return res.json({success:true,updatedpost});
    }   catch (error) { 
        res.status(error.statuscode ||500).json({
            success:false,
            message:error.message||"Internal server error"
        })
    }
}

const allpost = async(req,res)=>{
    try {
        const posts = await Post.find().populate("author","name email");
        return res.json({success:true,posts});
    } catch (error) {
        res.status(error.statuscode ||500).json({
            success:false,
            message:error.message||"Internal server error"
        })
    }
}
export {
    postcreated,
    postliked,
    postunliked,
    allpost
}