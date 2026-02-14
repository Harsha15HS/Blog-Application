import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = ()=>{
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogserver").then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        console.log(err);
    })
}
export default connectDb;