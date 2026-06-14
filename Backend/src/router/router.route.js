import { Router } from 'express';
import {
    registeruser, userprofile, loginuser, logoutuser,
}
    from "../controller/user.controller.js";
import userValidation from '../middleware/validation.middleware.js';
import {
    postcreated, postliked, allpost,postunliked
} from '../controller/post.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();


// These are User routes 
router.route("/register").post(userValidation, registeruser);
router.route("/login").post(loginuser);
router.route("/makeprofile").put(upload.fields([{
    name: "avatar", maxCount: 1
}]), authMiddleware, userprofile);
router.route("/logout").post(authMiddleware, logoutuser);


// These are post routes    
router.route("/").get(authMiddleware, allpost);
router.route("/postcreated").post(upload.fields([{
    name: "coverimage", maxCount: 1
}]), authMiddleware, postcreated);

router.route("/postliked/:id").put(authMiddleware, postliked);
router.route("/postunliked/:id").put(authMiddleware, postunliked);
export default router;