import jwt from "jsonwebtoken";
import { Apierror } from "../utils/Apierror.js";

const authMiddleware = async (req,res,next) =>{
    const authHeader = req.header("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new Apierror(400,"No token provided");
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        throw new Apierror(401,"No token found");
    }
    try {
        const decodedtoken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedtoken;
        next();
    } catch (error) {
        throw new Apierror(401, "Token is not valid");
    }
}

export default authMiddleware;