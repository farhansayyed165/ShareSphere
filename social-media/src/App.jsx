import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import CreateUser from './pages/CreateUser'
import Profile from './pages/Profile'
import Submit from './pages/Submit'
import Post from './pages/Post'
import Auth from './components/Auth'
import WillNotLoadIfLoggedIn from './components/NotRequired'
import UsernameError from './components/error/UsernameError'
import { loader as profileLoader } from './pages/Profile'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<h1>Hello world</h1>} />

    <Route element={<WillNotLoadIfLoggedIn />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<CreateUser />} />
    </Route>


    <Route path=':username' element={<Profile />} errorElement={<UsernameError/>} loader={profileLoader}></Route>
    <Route element={<Auth />} >
      <Route path='submit' element={<Submit />} />
    </Route>

    <Route path='posts'>
      <Route path=':postId' element={<Post />} />
    </Route>
    <Route path='/logout' element></Route>
  </Route>
))


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}


export default App
