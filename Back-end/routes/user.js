import express from 'express';
import { handleRegister, handleLogin, handlerefreshToken } from '../controllers/userControllers.js';
import { verifyAuth, roleBased, verifyRefresh } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post('/register',handleRegister);
route.post('/login', handleLogin);
route.get('/token', verifyRefresh,handlerefreshToken);


export default route;