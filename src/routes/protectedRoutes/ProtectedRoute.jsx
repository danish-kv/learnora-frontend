import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, role }) => {
    const currentRole = useSelector((state) => state.auth?.role);
    const location = useLocation();

    console.log('role', role);
    console.log('current role', currentRole );
    
    

    if (!currentRole) {
        if (location.pathname.startsWith('/tutor')) {
            return <Navigate to='/login'  />;
        } else if (location.pathname.startsWith('/admin')) {
            return <Navigate to='/admin/login'  />;
        }
    }
     else if (currentRole != role) {
        return <Navigate to='/unauthorized'  />;
    }

    return element;
};

export default ProtectedRoute;
