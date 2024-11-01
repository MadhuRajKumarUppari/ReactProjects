import React, { useEffect, useState } from 'react';

function GitHubLoginComponent() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userData = urlParams.get('user');
        if (userData) {
            setUser(JSON.parse(decodeURIComponent(userData)));
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5173/auth/github';
    };

    return (
        <div>
            {user ? (
                <p>Welcome, {user.login}!</p>
            ) : (
                <button onClick={handleLogin}>Login with GitHub</button>
            )}
        </div>
    );
}

export default GitHubLoginComponent;
