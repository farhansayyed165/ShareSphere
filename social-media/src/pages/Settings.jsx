import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, Link } from 'react-router-dom'
import { getUser } from '../api/userApi'
import { useState } from 'react'
import EditProfile from '../components/user/editProfile'



export function loader(e) {
  return e
}

function Settings() {
  const user = useOutletContext().user
  const token = useOutletContext().token
  const [userData, setUserData] = useState("")
  const [editProfile, setEditProfile] = useState("")
  const [sections, setSections] = useState({ profile: true, account: false, sub: false })
  const checkbox = useRef()
  useEffect(() => {
    getUser(user.username)
      .then(res => {
        console.log(res)
        setUserData(res)
      })
  }, [])

  function profileChange(e) {
    setSections({ profile: true, account: false, sub: false })
  }
  function accountChange(e) {
    setSections({ profile: false, account: true, sub: false })
  }
  function subChange(e) {
    setSections({ profile: false, account: false, sub: true })
  }
  function handleToggleCheckbox() {
    checkbox.current.checked = !checkbox.current.checked
  }
  return (
    <>

      <main className='w-full flex flex-col items-center'>
        <section className='w-[90%] flex flex-col items-start'>
          <nav className='font-[karla] text-xl flex w-[90%] mt-4'>
            <div className={` ${sections.profile ? "bottom-shadow" : ""}  mx-5 searchToggle text-center cursor-pointer transition-all duration-150 `} name="profile" onClick={profileChange}>
              <h1>Profile</h1>
              <span className={`block h-[2px] mt-1 ${sections.profile ? "bg-main-orange" : ""} w-full rounded-md transition-all duration-200 ease-in-out`}></span>
            </div>
            <div className={`${sections.account ? "bottom-shadow" : ""} mx-5  searchToggle text-center cursor-pointer transition-all duration-150 `} name="account" onClick={accountChange}>
              <h1>Account</h1>
              <span className={`block h-[2px] mt-1 ${sections.account ? "bg-main-orange" : ""} w-full rounded-md transition-all duration-200 ease-in-out`}></span>
            </div>
            <div className={` ${sections.sub ? "bottom-shadow" : ""} mx-5  searchToggle text-center cursor-pointer  transition-all duration-150`} name="sub" onClick={subChange}>
              <h1>Subscription</h1>
              <span className={`block h-[2px] mt-1 ${sections.sub ? "bg-main-orange" : ""} w-full rounded-md  transition-all duration-200 ease-in-out`}></span>
            </div>
          </nav>
          <section className='w-[90%] mt-10'>


            {
              sections.profile &&
              <div className=' w-2/3 '>
                <div className='my-7'>
                  <h3 className='font-semibold text-lg mb-2'>Name</h3>
                  <h4>{userData?.fullname}</h4>
                </div>
                <div className='my-7'>
                  <h3 className='font-semibold text-lg mb-2'>Email Address </h3>
                  <h4>
                    {userData?.email}
                  </h4>
                </div>
                <div className='my-7'>
                  <h3 className='font-semibold text-lg mb-2'>Gender</h3>
                  <h4>{userData?.gender}</h4>
                </div>
                <button type='button' className='p-2 bg-blue-600 rounded shadow-blue-800 hover:bg-blue-800 shadow text-white font-semibold'>Saved</button>
              </div>
            }
            {sections.account &&

              <div className="w-2/3">
                {editProfile && <EditProfile showEdit={editProfile} setOff={setEditProfile} data={userData} token={token}></EditProfile>}
                <h1>Account Settings</h1>
                <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-700 rounded"></hr>

                
                <div>
                  <p className="font-semibold text-lg mb-2">Private my account</p>
                  <input type="checkbox" value="" class="sr-only" ref={checkbox} />
                  <span onClick={handleToggleCheckbox} className="checkboxSet after:content-[''] "></span>
                </div>

                <button type='button' onClick={() => { setEditProfile(true) }} className='p-2 bg-main-orange rounded shadow-darker-orange hover:bg-darker-orange shadow text-white font-semibold'>Edit Profile</button>

                <button className="bg-red-500 text-white p-2   rounded font-bold text-lg uppercase font-[Karla]">Delete Account</button>
              </div>
            }
            {sections.profile && <form ></form>}
          </section>
        </section>
      </main>
    </>
  )
}

export default Settings