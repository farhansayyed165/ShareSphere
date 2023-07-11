import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter(createRoutesFromElements(
          <Route path='/' element={<Layout />}>
            <Route index element={<h1>Hello world</h1>} />

            <Route path="login" element={<Login/>}>

            </Route>
            <Route path="/signup" >

            </Route>
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
