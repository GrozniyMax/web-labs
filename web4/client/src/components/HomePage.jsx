import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/auth/login');
    }, []);

    return <div>Redirecting...</div>;
}
