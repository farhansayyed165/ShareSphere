import React, { useState } from 'react';
import { createUser, loginUser } from '../api/userApi';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from '../features/userSlice'
import { useCookies } from 'react-cookie';
import { credentialsLogin } from '../utils/loginUser';
import {ReactComponent as SignupSVG} from '../assets/Join.svg'
import {AiOutlineArrowLeft} from 'react-icons/ai'




const CreateUser = () => {
    const [navigateTo, setNavigateTo] = useOutletContext()
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(['access-token', 'refresh-token'])
    const [userDetail, setUserDetail] = useState({ fullname: "", username: "", password: "", confirmPassword: "", email: "", gender: "" })
    const redirectToPreviousPage = useLocation().state?.redirectLink ? useLocation().state.redirectLink : "/";
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        if (!userDetail.fullname || !userDetail.username || !userDetail.password || !userDetail.confirmPassword || !userDetail.email || !userDetail.gender) {
            return console.log("Error! All feilds are mandatory")
        }
        if (!(userDetail.email.split('@'))) {
            return console.log("email sahi kar")
        }
        if (userDetail.password != userDetail.confirmPassword) {
            return console.log("password sahi kar")
        }
        setNavigateTo(redirectToPreviousPage)
        createUser(userDetail)
            .then(res => {
                const loginData = { email: res.user.email, password: res.user.password }
                credentialsLogin(loginData, setCookies, dispatch, Auth, navigate, redirectToPreviousPage);
            })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUserDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function navigateBack(){
        navigate(-1)
    }   
    return (
        <div className='flex  bg-slate-800 h-screen'>
            <button type="button" onClick={navigateBack} className="rounded-full bg-white absolute top-0 left-0 p-5 border-2 border-[#F9A826] m-8 mt-10 ml-10"><AiOutlineArrowLeft/></button>
            <div className='w-1/2 m-8 border-2 mr-0 border-r-0 bg-slate-300 flex items-center justify-center'>
                <SignupSVG className='w-full m-0 '></SignupSVG>
            </div>
            <div className='w-1/2 flex flex-col items-center border-2 ml-0 m-8 border-l-0 bg-white'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center translate-y-6 w-9/10  p-2'>
                    <h1 className='text-center font-semibold text-xl mb-2'>Welcome!</h1>
                    <p className='mb-7 text-center'>Join our community of creators and innovators! Sign up today to unlock a world of possibilities. Start your journey with us and let's build something amazing together!</p>
                    <input
                        type="text"
                        placeholder='Name'
                        onChange={handleChange}
                        value={userDetail.fullname}
                        name='fullname'
                        className='w-9/10'
                    />
                    <input
                        type="text"
                        placeholder='Username'
                        onChange={handleChange}
                        value={userDetail.username}
                        name='username'
                        className="w-9/10"
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        onChange={handleChange}
                        value={userDetail.email}
                        name='email'
                        className="w-9/10"
                    />


                    <label htmlFor="gender" className='w-9/10 mt-2'>Gender:</label>
                    <select
                        name="gender" id='gender'
                        value={userDetail.gender}
                        onChange={handleChange}
                        className='w-9/10 p-2 bg-white border-2 border-gray-500 mb-2'
                    >
                        <option value="">Please select one…</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-Binary</option>
                        <option value="other">Other</option>
                        <option value="prefer not to answer">Perfer not to Answer</option>
                    </select>

                    <input
                        type="password"
                        placeholder='Password'
                        onChange={handleChange}
                        value={userDetail.password}
                        name='password'
                        className="w-9/10"
                    />
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        onChange={handleChange}
                        value={userDetail.confirmPassword}
                        name='confirmPassword'
                        className="w-9/10"
                    />


                    <button className='px-4 py-2 border-darker-orange bg-main-orange border-2 text-white rounded mt-5'>Submit</button>
                </form>
            </div>


        </div>
    );
}

export default CreateUser;
