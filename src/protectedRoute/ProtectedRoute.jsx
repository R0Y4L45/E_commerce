import React, { useContext } from 'react'
import { Navigate } from "react-router-dom"
import Context from '../ContextWrapper';
import LogIn from '../logIn/LogIn';

const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(Context);

    if (!auth)
        return <Navigate to="/login" element={<LogIn />} replace />

    return children
};

export default ProtectedRoute;