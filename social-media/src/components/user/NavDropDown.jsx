import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function NavDropDown({ user, handleLogout }) {
    const [show, setShow] = useState(false);
    // return (
    //     <>
    //         <button  onClick={()=>{setShow(!show)}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    //             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
    //         </svg></button>

    //         <div id="dropdown" className={`${show ? " ": "hidden"} absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    //             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
    //                 <li>
    //                     <Link to={`/${user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
    //                 </li>
    //                 <li>
    //                     <Link to={"/submit"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
    //                 </li>
    //                 <li>
    //                 <button type="submit" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleLogout} role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
    //                 </li>
    //                 <li>
    //                     <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
    //                 </li>
    //             </ul>
    //         </div>
    //     </>
    // )
    return (
        <div className="relative text-left min-w-[100px] max-h-[50px]" onClick={() => { setShow(!show) }}>
            <div className="w-full">
                <button type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md border-main-orange border-[2px] bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <img src={user.avatar} alt={`${user.fullname}'s profile picture`} className='w-8 h-8 rounded-full object-cover mr-1 shadow' />

                    <svg className="-mr-1 h-5 w-5 text-main-orange" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className={`${show ? 'absolute' : 'hidden'} w-full overflow-hidden z-50 right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="" role="none">
                    <Link to={`/${user.username}`}>
                        <span className="text-gray-700 block px-4 py-2 z-50 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Profile</span>
                    </Link>
                    <Link>
                        <span className="text-gray-700 block px-4 py-2 z-50 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Settings</span>
                    </Link>
                        <button type="submit" className="text-gray-700 block w-[400px] px-4 py-2 text-left text-sm" onClick={handleLogout} role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                </div>
            </div>
        </div>

    )
}

export default NavDropDown