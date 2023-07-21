import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UnAuth } from "../features/userSlice";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { checkToken } from "../utils/checkToken";

export default function Headers() {
    const [cookies, setCookies, removeCookie] = useCookies(['access-token'])
    const token = (cookies['access-token']) ? cookies['access-token'] : undefined;
    const [isValidToken, setIsValidToken] = useState(false)
    
    // console.log(cookies)

    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        return value
    })
    const dispatch = useDispatch()
    function handleLogout(e) {
        dispatch(UnAuth())
        removeCookie('access-token', { path: '/' });
        window.location.reload()
    }

    const notLoggedInNavElements = (
        <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
        </>
    )
    const loggedInNavElements = (
        <>
            <span>{user.username}</span>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
    return (
        <header >
            <nav style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="site-logo" to={"/"}>Socu</Link>
                {
                    token ? loggedInNavElements : notLoggedInNavElements
                }


            </nav>
        </header>
    )
}