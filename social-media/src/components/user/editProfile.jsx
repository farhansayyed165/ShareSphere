import React, { useState, useRef, useEffect } from 'react'
import { updateUser } from '../../api/userApi';
import {ImCross} from 'react-icons/im'

function 
EditProfile({ showEdit, data, token, setOff }) {
    const nameRef = useRef()
    useEffect(()=>{
        nameRef.current.focus()
    },[showEdit])
    const [userDetail, setUserDetail] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prev =>
        ({
            ...prev,
            [name]: value
        })
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateUser(userDetail, token)
            .then(res => {
                console.log(res);
                setOff(false)
                window.location.reload()
            })
    }
    function goBack(e){
        e.preventDefault()
        setOff(false)
    }
    return (
        <div className={showEdit ? "absolute z-50 w-full h-full bg-black/30 rounded top-0 left-0" : "hidden"} >
            <div className={`flex justify-center items-center w-full h-full rounded`}>
                <form onSubmit={handleSubmit} className='bg-white relative w-[40%] rounded'>
                    <button type="button" className='absolute top-0 right-0 z-50 mr-2 mt-2' onClick={goBack}><ImCross size={20}/></button>
                    <div className='flex relative flex-col w-9/10 sm:w-10/12 m-auto p-4 py-10 rounded '>
                        <h1 className='font-semibold font-'>Edit Your Profile </h1>
                        <input
                            type="text"
                            placeholder='fullname'
                            onChange={handleChange}
                            value={userDetail.fullname}
                            name='fullname'
                            className='w-full'
                            ref={nameRef}
                        />
                        <input
                            type="text"
                            placeholder='username'
                            onChange={handleChange}
                            value={userDetail.username}
                            name='username'
                            className='w-full'
                        />
                        <input
                            type="email"
                            placeholder='email'
                            onChange={handleChange}
                            value={userDetail.email}
                            name='email'
                            className='w-full'
                        />


                        <label htmlFor="gender" className='w-full'>Gender:</label>
                        <select name="gender" id='gender' value={userDetail.gender} onChange={handleChange} className='w-full  p-2 bg-white border-2 border-gray-500 mb-2 rounded  '>
                            <option value="" className='font-Karla'>Please select one…</option>
                            <option value="female" className='font-Karla'>Female</option>
                            <option value="male" className='font-Karla'>Male</option>
                            <option value="non-binary" className='font-Karla'>Non-Binary</option>
                            <option value="other" className='font-Karla'>Other</option>
                            <option value="prefer not to answer" className='font-Karla'>Perfer not to Answer</option>
                        </select>
                        <br />
                        <button className='bg-main-orange border-2 mt-2 border-main-orange font-[Karla] active:border-darker-orange uppercase text-white font-bold hover:shadow-md shadow text-md px-4 py-2 rounded outline-none focus:outline-none sm:self-center mb-1 ease-linear transition-all duration-150'>SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile