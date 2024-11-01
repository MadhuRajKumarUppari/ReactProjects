// server.js
const express = require('express');
const axios = require('axios');
const app = express();

const CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/auth/github/callback';

app.get('/auth/github', (req, res) => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    res.redirect(githubAuthURL);
});

app.get('/auth/github/callback', async (req, res) => {
    const { code } = req.query;
    const tokenResponse = await axios.post(`https://github.com/login/oauth/access_token`, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
    }, {
        headers: { Accept: 'application/json' }
    });

    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${accessToken}` }
    });

    // Send the user data to your frontend
    res.redirect(`http://localhost:3000?user=${encodeURIComponent(JSON.stringify(userResponse.data))}`);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));


export default CLIENT_ID="Ov23lioQQpkNQm5ZUk5z";