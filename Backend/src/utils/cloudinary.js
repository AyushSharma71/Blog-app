import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";



cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.api_secret,
});


const uploadImage = async (filePath) => {
    try {
       const result= await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })
        console.log("file uploaded successfully");
        return result;
    }
    catch (error) {
        if (filePath && fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
        }
        console.log("Error in file uploading", error);
        throw error;
    }
}

const destroyImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("file deleted successfully");
        return result;
    }
    catch (error) {
        console.log("Error in file deleting", error);
        throw error;
    }
}

const destroyVideo = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: "video" });
        console.log("video deleted successfully");
        return result;
    }
    catch (error) {
        console.log("Error in video deleting", error);
        throw error;
    }
}

export {uploadImage, destroyImage, destroyVideo};