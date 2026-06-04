import { Router } from 'express';
import {
    registeruser, userprofile, loginuser,logoutuser,
}
    from "../controller/user.controller.js";
import { upload } from '../middleware/multer.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/makeprofile/:id").put(upload.fields([{
    name: "avatar", maxCount: 1
}]), authMiddleware, userprofile);
router.route("/logout/:id").post(authMiddleware,logoutuser);



export default router;