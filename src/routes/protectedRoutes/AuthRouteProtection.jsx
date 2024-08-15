import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRouteProtection = ({ element, redirectTo }) => {
    const role = useSelector((state) => state.auth?.role);
    console.log('role :',role);
    console.log('element :',element);
    console.log('redirect :',redirectTo);
    

    if (role) {
        return <Navigate to={redirectTo} replace />;
    }

    return element;
};

export default AuthRouteProtection;
