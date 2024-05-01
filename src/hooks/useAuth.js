'use client';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function useAuthCheck() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);


    useEffect(() => {
        setLoading(true);
        let token = Cookies.get('token');
        let userRole = Cookies.get('role');
        if (!token || !userRole) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
            setRole(userRole);
        }
        setLoading(false);
    }, []);

    // handle logout
    const logout = () => {
        setIsAuthenticated(false);
        setLoading(false);
        localStorage.clear()
    };

    return {
        isAuthenticated,
        role,
        user,
        loading,
        logout,
    };
}
