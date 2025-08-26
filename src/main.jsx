import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'

import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleLoginComponent from './GoogleLohinComponent.jsx'
import GitHubLoginComponent from './GithubLoginComponent.jsx'
import FacebookLoginComponent from './FacebookLoginComponent.jsx'
import Veg from './Veg.jsx'
import NonVeg from './NonVeg.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider  store={store}>
  
      <App />
    </Provider>
  </StrictMode>,
)
