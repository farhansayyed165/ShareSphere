import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function NavDropDown({ user, handleLogout }) {
    const [show, setShow] = useState(false);
    return (
        <div class="relative inline-block text-left" onClick={() => { setShow(!show) }}>
            <div>
                <button type="button" class="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <img src={user.avatar} alt={`${user.fullname}'s profile picture`} className='w-8 h-8 rounded-full object-cover mr-1 shadow' />
                    <span className='mr-3'>{user.fullname}</span>
                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div class={`${show ? 'absolute' : 'hidden'} right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                    <Link to={`/${user.username}`}>
                        <span class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Profile</span>
                    </Link>
                    <Link>
                        <span class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Settings</span>
                    </Link>
                        <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" onClick={handleLogout} role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                </div>
            </div>
        </div>

    )
}

export default NavDropDown