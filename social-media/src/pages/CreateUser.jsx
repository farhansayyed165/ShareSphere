import React, { useState } from 'react';
import { createUser, loginUser } from '../api/userApi'; 
import Cookies from 'universal-cookie';



const CreateUser = () => {
    const cookies = new Cookies();
    const [userDetail, setUserDetail] = useState({fullname:"", username:"",password:"", confirmPassword:"",email:"",gender:""})
    console.log(cookies.get('b-token')); 
    
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
        console.log(userDetail)
        createUser(userDetail)
        .then(res =>{
            const loginData = {email:res.user.email, password:res.user.password}
            loginUser(loginData)
            .then(res=>{
                cookies.set('b-token', res, { path: '/' , sameSite:"none"});
                console.log(cookies.get('b-token')); 
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
