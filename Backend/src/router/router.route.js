import {Router} from 'express';
import {registeruser} from "../controller/user.controller.js";
const router=Router();

router.route("/user").post(registeruser);
export default router;