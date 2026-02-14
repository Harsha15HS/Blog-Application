import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDb from './connectDB.js';
import userRouter from './routes/user.js'
import blogsRouter from './routes/blogs.js';
import commentRoutes from "./routes/comment.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';


connectDb();
const app = express();
app.use(express.json())
app.use(cookieParser());
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'https://blog-frontend.vercel.app'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
app.use("/users", userRouter);
app.use("/blogs", blogsRouter);
app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 8282;

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})

