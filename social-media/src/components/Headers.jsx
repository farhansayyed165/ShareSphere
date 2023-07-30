import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UnAuth } from "../features/userSlice";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import NavDropDown from "./user/NavDropDown";
import {GrAdd} from 'react-icons/gr'


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
        dispatch(UnAuth({ login: false }))
        removeCookie('access-token', { path: '/' });
        window.location.reload()
    }
    function sendRequest() {
        navigate("/submit")
    }

    const notLoggedInNavElements = (
        <>
            <NavLink to={"/login"} state={{ redirectLink: path }}>Login</NavLink>
            <NavLink to={"/signup"} state={{ redirectLink: path }}>Signup</NavLink>
        </>
    )
    const loggedInNavElements = (
        <div className="ml-6 flex min-w-1/3 justify-between justify-self-stretch">
            <Link to={"/submit"} >
                <button onClick={sendRequest} className="bg-transperant text-black  border-slate-400 border-2 font-bold p-2 mt-1 m-0 rounded flex items-center justify-center text-xl "><GrAdd/></button>
            </Link>
            <NavDropDown user={user} handleLogout={handleLogout} />
        </div>
    )
    return (
        <header className="sticky top-0 z-50 shadow-sm  bg-slate-100 ">
            <nav className="flex items-center justify-around p-4 shadow-black-sm lg:px-8 sticky top-0 border-b-2" aria-label="Global">
                <Link className="site-logo" to={"/"}><h1 className=" text-lg font-semibold hover:text-teal-700">Socu</h1></Link>
                <div class="relative m-2 flex items-center justify-center border-gray-400 mx-3 py-1 border-2 rounded" data-te-input-wrapper-init>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 mx-1 ml-2">

                    <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd" />
                </svg>
                    <input
                        type="search"
                        class="flex peer justify-center items-center min-h-[auto] w-full rounded bg-transparent px-3  leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-grey-500 dark:peer-focus:text-primary mb-1"
                        id="exampleSearch2"
                        placeholder="Type query" />
                    {/* <label
                        htmlFor="exampleSearch2"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-primary"
                    >Search</label> */}
                </div>
                {
                    token ? loggedInNavElements : notLoggedInNavElements
                }


            </nav>
        </header>
    )
}