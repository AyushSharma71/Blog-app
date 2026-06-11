import { Apierror } from "../utils/Apierror.js";
import { Post,Like } from "../models/post.model.js";
import { uploadImage } from "../utils/cloudinary.js";

const postcreated = async(req,res)=>{
    try {
        const {title,content} = req.body;
        const coverimagelocal = req.file?.path || req.file?.coverimage?.[0]?.path;
        
        if(!coverimagelocal){
            throw new Apierror(400,"Cover image is required");
        }
        const coverimage = await uploadImage(coverimagelocal);
        
        const coverimageurl= coverimage?.secure_url||coverimage?.url||coverimage;
        if(!coverimage){
            throw new Apierror(401,"Error in coverimage uploading");
        }
        const userId=req.user?.id;
        const createdpost = await Post.create({
            title,
            content,
            author:userId,
            coverimage:coverimageurl,
        })
        return res.json({success:true,createdpost});
    } catch (error) {
        res.status(error.statuscode ||500).json({
            success:false,
            message:error.message||"Internal server error"
        })
    }
}

export {
    postcreated,
}