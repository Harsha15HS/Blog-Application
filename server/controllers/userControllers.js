import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const SECRET_CODE = process.env.JWT_SECRET;
const craeteJWTToken = (user)=>{
    const token = jwt.sign({
        userID: user._id,
        email: user.email,
        role: user.role,

    }, SECRET_CODE,{expiresIn: "1hr"})
    return token;
}
const createRefresh =(user)=>{
    const token = jwt.sign({
        userID: user._id,
        email: user.email,
        role : user.role
    }, SECRET_CODE, {expiresIn: "20hr"})
    return token;
}
const handleRegister = async (req, res)=>{
    try{
    const body = req.body;
    console.log("Register request body:", body); 
    if(body.username && body.email && body.password && body.role){
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = new User({username:body.username, email:body.email, password:hashedPassword, role:body.role })
        try{
            await user.save();
            return res.status(201).json({message:"User registered",user })
        }catch(err){
            return res.status(400).json({message:"Something went wrong", error: err.message});
        }
    }else{
        return res.status(400).json({message:"All fields are required", received: body});
    }
    }
    catch(err){
        console.log(err);

    }
}


const handleLogin = async (req, res)=>{
    const body = req.body;
    if(body.email && body.password){
        const user = await User.findOne({email:body.email});
        if(!user) return res.status(401).json({message:"Username or Password is wrong"});
        const isMatch = await bcrypt.compare(body.password, user.password);
        if(!isMatch) return res.status(401).json({message: "username or password is wrong"});

        const token = craeteJWTToken(user);
        const refreshToken = createRefresh(user);
        res.cookie("refreshtoken", refreshToken,{
            httpOnly: true,
            secure: false,
            maxAge :9000000,
            sameSite: "strict"
        })

        if(token){
            return res.status(200).json({message:"Login success", token})
        }
        }else{
            return res.status(400).json({message:"All fields are required"})
        }
    }
    const handlerefreshToken = (req, res)=>{
        const token = createRefresh(req.user);
        if(token){
            return res.status(200).json({message:"New token generated", token});
        }else{
            return res.status(400).json({message: "something went wrong"});
        }


    };

export {
    handleRegister, handleLogin , handlerefreshToken
}