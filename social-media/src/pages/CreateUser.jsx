import React, { useState } from 'react';
import { createUser, loginUser } from '../api/userApi'; 
import { useLocation,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Auth} from '../features/userSlice'
import { useCookies } from 'react-cookie';



const CreateUser = () => {
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(['access-token', 'refresh-token'])
    const [userDetail, setUserDetail] = useState({fullname:"", username:"",password:"", confirmPassword:"",email:"",gender:""})
    const redirectToPreviousPage = useLocation().state?.redirectLink ? useLocation().state.redirectLink:"/";
    const dispatch = useDispatch();
    
    function handleSubmit(e){
        e.preventDefault();
        if(!userDetail.fullname || !userDetail.username || !userDetail.password || !userDetail.confirmPassword || !userDetail.email || !userDetail.gender){
            return console.log("Error! All feilds are mandatory")   
        }
        if(!(userDetail.email.split('@'))){
            return console.log("email sahi kar")
        }
        if(userDetail.password != userDetail.confirmPassword){
            return console.log("password sahi kar")
        }
        createUser(userDetail)
        .then(res =>{
            const loginData = {email:res.user.email, password:res.user.password}
            loginUser(loginData)
            .then(res=>{
                setCookies('access-token',res.accessToken, {path:'/',sameSite:"strict"})
                const {fullname, email, password, avatar, gender, username, _id} = res.user
                dispatch(Auth({fullname, email, password, avatar, username,_id, login:true}))
                navigate(redirectToPreviousPage)
            })
        })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUserDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div>
            <h1>Create your account!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder='fullname'
                onChange={handleChange}
                value={userDetail.fullname}
                name='fullname'
                />
                <input 
                type="text"
                placeholder='username'
                onChange={handleChange}
                value={userDetail.username}
                name='username'
                />
                <input 
                type="email"
                placeholder='email'
                onChange={handleChange}
                value={userDetail.email}
                name='email'
                />


                  <label htmlFor="gender">Gender:</label>
                <select name="gender" id='gender' value={userDetail.gender} onChange={handleChange}>
                    <option value="">Please select one…</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="other">Other</option>
                    <option value="prefer not to answer">Perfer not to Answer</option>
                </select>

                <input 
                type="password"
                placeholder='password'
                onChange={handleChange}
                value={userDetail.password}
                name='password'
                />
                <input 
                type="password"
                placeholder='confirmPassword'
                onChange={handleChange}
                value={userDetail.confirmPassword}
                name='confirmPassword'
                />
                

                <button>Submit</button>
            </form>


        </div>
    );
}

export default CreateUser;
