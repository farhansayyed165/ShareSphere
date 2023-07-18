import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './features/user.js'
import { CookiesProvider } from 'react-cookie'

const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>


  </React.StrictMode>

)
