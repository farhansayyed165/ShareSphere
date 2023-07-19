import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UnAuth } from "../features/userSlice";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

export default function Headers() {
    const user = useSelector((state) => {
        const value = state.user.user? state.user.user:state.user
        return value})
    // const state = useSelector((state)=>state)
    // console.log(state)
    const [cookies, setCookies,removeCookie] = useCookies(['access-token'])
    const token = cookies['access-token']
    const dispatch = useDispatch()
    function handleLogout(e) {
        dispatch(UnAuth())
        removeCookie('access-token',{path:'/'});
        window.location.reload()
    }
    console.log(user)
    const notLoggedInNavElements = <><Link to={"/login"}>Login</Link><Link to={"/signup"}>Signup</Link></>
    const loggedInElements = <><span>{user.username}</span><button onClick={handleLogout}>Logout</button></>
    return (
        <header >
            <nav style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="site-logo" to={"/"}>Socu</Link>
                {
                    token ? loggedInElements: notLoggedInNavElements
                }
                
                
            </nav>
        </header>
    )
}