import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_CODE = process.env.JWT_SECRET;

const verifyAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET_CODE);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: err.message
        });
    }
};
const roleBased = (role=[])=>{
    return (req, res, next)=>{
        if(!role.includes(req.user.role)){
            return res.status(403).json({message:"Access denied"});
        }
        next();
    }
}
const verifyRefresh = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshtoken;

        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh token missing" });
        }

        const decoded = jwt.verify(refreshToken, SECRET_CODE);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};


    


export{
    verifyAuth,
    roleBased,
    verifyRefresh
}