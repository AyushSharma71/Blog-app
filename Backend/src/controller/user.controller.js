import { Apierror } from "../utils/Apierror.js";
import bcrypt from bcrypt;
const registeruser = async (req, res) => {
    /* user details from req.body
       validate the users
       user registered previously or not
       if not,then create user
    */
    try {
        const[fullname,username,email,password]=req.body;

        if([fullname,username,email,password].some((field)=>{
            field?.trim()===""
        })){
            throw new Apierror(400,"All fields are required");
        }

        const existeduser= await User.findone({
            $or :[{email},{username}]
        })

        if(existeduser){
            throw new Apierror(401,"user already exists");
        }
        const hashedpassword= await bcrypt.hash(password,10);
        const user= await User.create({
            fullname,
            username,
            email,
            password:hashedpassword,
        })
    } catch (error) {
        res.status(error.statuscode || 500).json({
            success:false,
            message:error.message || "Internal server error",
        });
    }
}
/** 
 * after register,open profile page and update profile details like avatar,bio,role
 */


export {registeruser};