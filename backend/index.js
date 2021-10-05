import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { userRoutes } from "./routes/user.js";

mongoose.connect('mongodb://127.0.0.1:27017/crud',(err) => {
    if(!err){
        console.log('MongoDB connected');
    }
    else{
        console.log("MongoDB error");
    }
})

//Middle-wares
app.use(bodyParser.json());

app.use("/api", userRoutes);


const port = 8000;
//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});