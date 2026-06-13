import jwt from "jsonwebtoken";
import { Apierror } from "../utils/Apierror.js";

const authMiddleware = async (req,res,next) =>{
    const token = req.cookies.token;
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