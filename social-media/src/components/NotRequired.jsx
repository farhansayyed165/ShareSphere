import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'


function WillNotLoadIfLoggedIn() {
    const user = useSelector((state)=>{
        const data = state.user.user ? state.user.user : null
        return data
    })
    if(user.login){
        return <Navigate to={"/"} state={{message:"already logged in"}}/>
    }
    else{
        return (
          <Outlet/>
        )
    }
    
}

export default WillNotLoadIfLoggedIn