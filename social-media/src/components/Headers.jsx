import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GrClose } from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'
import {FaSearch} from "react-icons/fa"
import { GrAdd, } from 'react-icons/gr'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function Headers({ open, close, handleLogout, token, user, render, hamburg, setHamburg }) {
    const [search, setSearch] = useState()
    const path = useLocation().pathname

    // console.log(cookies)
    const openSearch = () => { setSearch(true) }
    const closeSearch = () => { setSearch(false) }

    function openSlider() {
        setHamburg(true)
        document.body.style.overflow = 'hidden';
    }

    return (
        <>
            <header className="sticky w-full top-0 z-50 shadow-md bg-white ">
                <nav className="flex items-center justify-evenly px-4 sm:py-[2px] shadow-black-sm lg:px-8 sticky top-0 border-b-2 py-3" aria-label="Global">
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
                        <FaSearch className="mx-1" size={18}/>
                    </button>
                    {
                        render
                    }       
                    <RxHamburgerMenu size={30} className={`${hamburg ? "hidden" : "inline-bloxk"} sm:hidden absolute top-0 right-0 z-[100] mr-3 mt-3`} onClick={openSlider} />
                    

                </nav>
            </header>

            <div className={`${search ? "sticky top-0 left-0" : "hidden"}  mt-3 z-50 w-full bg-white shadow text-gray-600 flex sm:hidden items-center sm:justify-self-center justify-center `}>
                <button type="button" onClick={closeSearch} className="absolute z-10 left-0 ml-[4vw] border-2 rounded-full border-main-orange p-2 bg-red-300 " >
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