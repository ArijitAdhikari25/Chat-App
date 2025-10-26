import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/auth.message.js"

import path from "path";

import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {app,server} from "./lib/socket.js"


dotenv.config()

const PORT=process.env.PORT;
const __dirname =path.resolve();



app.use(express.json()); //extract the json data
app.use(cookieParser()); // to allow to parse the cookie and comes in 1st before the app.use("/api/auth",authRoutes)
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));


app.use("/api/auth",authRoutes)  // for authintication (1)
app.use("/api/messages",messageRoutes)  //for message

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));
    

    app.get(/.*/, (req, res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
    });
}


server.listen(PORT,()=>{
    console.log("Server is listening on port:" +PORT);
    connectDB()
})