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
  const [editData, setEditData] = useState()
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" })
  const [sections, setSections] = useState({ profile: true, account: false, sub: false })
  const checkbox = useRef()
  useEffect(() => {
    getUser(user.username)
      .then(res => {
        console.log(res)
        setUserData(res)
        setEditData(res)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev =>
    ({
      ...prev,
      [name]: value
    })
    )
  }
  function handleSubmit(e) {

  }
  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswords(prev =>
    ({
      ...prev,
      [name]: value
    })
    )
  }

  function handlePasswordSubmit(e) {

  }

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
    setSections({ profile: false, account: true, sub: false })
    console.log(checkbox.current.checked)
  }
  // console.log(editData)
  return (
    <>

      <main className='w-full flex flex-col items-center'>
        {/* NAV */}
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

            {/* PROFILE SECTION */}
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


            {/* ACCOUNTS SECTION */}
            {sections.account &&

              <div className="[width:max(300px, 66vw)]">
                <h1>Account Settings</h1>
                <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-700 rounded"></hr>

                {/* PRIVATE ACCOUNT */}
                <div className='mb-8 flex justify-between items-center  w-full sm:w-2/3'>
                  <p className="font-semibold text-lg ">Private my account</p>
                  <div>
                    <input type="checkbox" value="" classname="hidden absolute w-0 overflow-hidden" ref={checkbox} style={{ display: "none" }} />
                    <div onClick={handleToggleCheckbox} className={`h-[40px] ${checkbox.current?.checked ? "bg-orange-500" : "bg-main-orange "} transition-all duration-[250ms] w-[90px] shadow-inner shadow-md flex items-center p-0.5 rounded-3xl relative`}>
                      <div className={`${checkbox.current?.checked ? "translate-x-[52px]" : ""} mx-[2px] transition-all duration-300 w-[30px] p-1 h-[80%] bg-white rounded-full absolute shadow-lg`}></div>
                    </div>
                  </div>
                </div>

                {/* EDIT FORM */}
                <h2 className='text-xl font-[Karla] '>Edit</h2>
                <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-400 sm:w-2/3 w-full  rounded"></hr>
                <form className="w-2/3 mb-10" onSubmit={handleSubmit}>
                  <div className='flex flex-col items-center pr-6  mb-2 relative'>
                    <div className='avatar cursor-pointer'>
                      <img src={userData.avatar} className="w-16 rounded-full" alt="" />
                      <p className='absolute top-0 mt-7 text-white z-10 text-center avatar-text w-16'>Change</p>
                    </div>
                    <p className=''>Avatar</p>
                  </div>
                  <p className='mt-2 mb-0'>Name</p>
                  <input type="text" name="fullname" placeholder='Name' className='w-full my-0 mb-5' value={editData.fullname} onChange={handleChange} />
                  <p className='mt-2 mb-0'>Username</p>
                  <input type="text" name="username" placeholder='Username' className='w-full my-0 mb-5' value={editData.username} onChange={handleChange} />
                  <p className='mt-2 mb-0'>Email</p>
                  <input type="email" name="email" placeholder='Email' className='w-full my-0 mb-5' value={editData.email} onChange={handleChange} />

                  <label htmlFor="gender" className='w-full'>Gender:</label>
                  <select name="gender" id='gender' value={editData.gender} onChange={handleChange} className='w-full  p-2 bg-gray-100 border-2 border-gray-500 mb-4 rounded  '>
                    <option value="" className='font-Karla'>Please select one…</option>
                    <option value="female" className='font-Karla'>Female</option>
                    <option value="male" className='font-Karla'>Male</option>
                    <option value="non-binary" className='font-Karla'>Non-Binary</option>
                    <option value="other" className='font-Karla'>Other</option>
                    <option value="prefer not to answer" className='font-Karla'>Perfer not to Answer</option>
                  </select>

                  <button type='submit' className=' bg-main-orange text-white font-[Karla] text-xl rounded-md p-2 '>Save</button>
                </form>

                {/* CHANGE PASSWORD  */}
                <h2 className='text-xl font-[Karla] '>Change Password</h2>
                <hr className="h-px mb-5 mt-2 bg-gray-200 border-0 dark:bg-gray-400 sm:w-2/3 w-full  rounded"></hr>
                <form classname="w-2/3" style={{ width: "66.66666%" }}>
                  <p className='mt-2 mb-0'>Current Password</p>
                  <input type="password" name="current" placeholder='Current Password' className='w-full my-0 mb-5' value={passwords.current} onChange={handlePasswordChange} />
                  <p className='mt-2 mb-0'>New Password</p>
                  <input type="password" name="new" placeholder='New Password' className='w-full my-0 mb-5' value={passwords.new} onChange={handlePasswordChange} />
                  <p className='mt-2 mb-0'>Confirm Password</p>
                  <input type="password" name="confirm" placeholder='Confirm New Password' className='w-full my-0 mb-5' value={passwords.confirm} onChange={handlePasswordChange} />
                  <button type="submit" className=' bg-main-orange text-white font-[Karla] text-xl rounded-md p-2'>Set Password</button>
                </form>

                {/* DELETE ACCOUNT  */}
                <h2 className='text-xl font-[Karla] mt-10'>Delete</h2>
                <hr className="h-px mb-5 mt-2 bg-red-400 border-0 sm:w-2/3 w-full  rounded"></hr>

                <button type='button' className="bg-red-500 text-white block p-2 mb-9 rounded font-bold text-lg uppercase font-[Karla]">Delete Account</button>
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