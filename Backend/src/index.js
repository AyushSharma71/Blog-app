import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});


import { app } from "./app.js";
import { connectDB } from "./db/index.js";


const port = process.env.PORT || 7000;

connectDB()
    .then(() => {

        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        })
    })
    .catch(() => {
        console.log("ERROR!!Server connection failed");
    })