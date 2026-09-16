import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();

app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
}
));
app.use(express.urlencoded({extended:true}));   
app.use(express.json());
app.use(cookieParser());


import userrouter from "./router/router.route.js";
app.use("/api/v1",userrouter);

// http://localhost:5000/api/v1/register
export {app};