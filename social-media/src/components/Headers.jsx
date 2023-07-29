import { Link,NavLink,useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UnAuth } from "../features/userSlice";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";


export default function Headers() {
    const path = useLocation().pathname

    const [cookies, setCookies, removeCookie] = useCookies(['access-token'])
    const token = (cookies['access-token']) ? cookies['access-token'] : undefined;
    const [isValidToken, setIsValidToken] = useState(false)
    const navigate = useNavigate()
    // console.log(cookies)

    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        return value
    })
    const dispatch = useDispatch()
    function handleLogout(e) {
        dispatch(UnAuth({login:false}))
        removeCookie('access-token', { path: '/' });
        window.location.reload()
    }
    function sendRequest() {
        navigate("/submit")
      }

    const notLoggedInNavElements = (
        <>
            <NavLink to={"/login"} state={{redirectLink:path}}>Login</NavLink>
            <NavLink to={"/signup"} state={{redirectLink:path}}>Signup</NavLink>
        </>
    )
    const loggedInNavElements = (
        <>
            <span>{user.username}</span>
            <button onClick={sendRequest} className="bg-blue-500 text-white transition-all duration-300 ease-in-out font-bold py-1 px-3 rounded flex items-center hover:px-4 text-lg "><Link to={"/submit"}>+</Link></button>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
    return (
        <header >
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <Link className="site-logo" to={"/"}><h1 className=" text-lg font-semibold hover:text-teal-700">Socu</h1></Link>
                {
                    token ? loggedInNavElements : notLoggedInNavElements
                }


            </nav>
        </header>
    )
}