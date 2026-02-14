import React from 'react'
import { Navigate } from 'react-router-dom';

const AuthGate = () => {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="/login" replace />;
    }else{
        return <Navigate to="/home" replace />;
    }
}

export default AuthGate;