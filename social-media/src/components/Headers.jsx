import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { UnAuth } from "../features/userSlice";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import NavDropDown from "./user/NavDropDown";
import { GrAdd, GrClose } from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'


export default function Headers() {
    const path = useLocation().pathname
    const [search, setSearch] = useState()
    const [cookies, setCookies, removeCookie] = useCookies(['access-token'])
    const token = (cookies['access-token']) ? cookies['access-token'] : undefined;
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
            <NavLink to={"/login"} state={{ redirectLink: path }} >Login</NavLink>
            <NavLink to={"/signup"} state={{ redirectLink: path }}>Signup</NavLink>
        </>
    )
    const loggedInNavElements = (
        <>
            <Link to={"/submit"} >
                <button onClick={sendRequest} title="Create a Post" className="bg-transperant text-black  border-main-orange border-2 font-bold p-2 mt-1 m-0 rounded flex items-center justify-center text-xl "><GrAdd /></button>
            </Link>
            <NavDropDown user={user} handleLogout={handleLogout} />
        </>
    )
    const openSearch = () => { setSearch(true) }
    const closeSearch = () => { setSearch(false) }
    return (
        <>
            <header className="sticky top-0 z-40 shadow-md bg-white">
                <nav className="flex items-center justify-evenly px-4 py-[2px] shadow-black-sm lg:px-8 sticky top-0 border-b-2" aria-label="Global">
                    <Link className="site-logo flex justify-self-start" to={"/"}><h1 className=" text-lg font-semibold hover:text-teal-700">Socu</h1></Link>
                    <div className="absolute  text-gray-600 sm:flex sm:relative  items-center sm:justify-self-center justify-center hidden" >
                        <input
                            className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search" />
                        <button type="submit" className="absolute flex items-center justify-center right-0 top-0 mt-3 mr-2">
                            <BsSearch className="flex items-center justify-center mt-[5px] " size={18} />
                        </button>
                    </div>
                    <button type="button"
                        className="sm:hidden flex items-center justify-center justify-self-start ring-2 p-1 rounded-sm ring-main-orange "
                        onClick={openSearch} >
                        <BsSearch className="mx-1" />
                    </button>
                    {
                        token ? loggedInNavElements : notLoggedInNavElements
                    }


                </nav>
            </header>

            <div className={`${search ? "sticky top-0 left-0" : "hidden"}  mt-3 z-50 w-full bg-white shadow text-gray-600 flex sm:hidden items-center sm:justify-self-center justify-center `}>
                <button type="button" onClick={closeSearch} className="absolute z-10 left-0 ml-[4vw] border-2 rounded-full border-main-orange p-1 bg-red-300 " >
                    <GrClose size={20} />
                </button>

                <div className="relative flex justify-evenly w-9/10">
                    <input
                        className="border-2 border-gray-300 bg-white h-10 pl-2 w-3/4 mr-1 pr-8 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" />
                    <button type="submit" className="absolute flex items-center justify-center right-0 top-0 mt-3 mr-[4vw]">
                        <BsSearch className="flex items-center justify-center mt-[5px] " size={18} color="#F9A826" />
                    </button>
                </div>
            </div>
        </>
    )
}