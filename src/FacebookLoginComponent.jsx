import React, { useEffect, useState } from 'react';

function FacebookLoginComponent() {
    const [userName, setUserName] = useState(null); // State to store the user's name

    useEffect(() => {
        // Initialize the SDK
        window.fbAsyncInit = function() {
            FB.init({
                appId: '811556444338098', // Replace with your Facebook App ID
                cookie: true,
                xfbml: true,
                version: 'v12.0' // Replace with the current version of your API
            });

            FB.AppEvents.logPageView();
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    // Check the login state
    const checkLoginState = () => {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    };

    // Handle the response from Facebook
    const statusChangeCallback = (response) => {
        if (response.status === 'connected') {
            fetchUserInfo(); // Fetch user information if logged in
        } else {
            console.log('Not authenticated');
            setUserName(null); // Clear user name if not logged in
        }
    };

    // Fetch user information from Facebook
    const fetchUserInfo = () => {
        FB.api('/me', { fields: 'name' }, function(response) {
            setUserName(response.name); // Set the user's name in state
        });
    };

    // Function to handle Facebook Login Button
    const handleLoginClick = () => {
        FB.login(checkLoginState, { scope: 'public_profile,email' });
    };

    return (
        <div>
            {userName ? (
                <p>Welcome, {userName}!</p> // Display the user's name if logged in
            ) : (
                <button onClick={handleLoginClick}>Login with Facebook</button>
            )}
        </div>
    );
}

export default FacebookLoginComponent;