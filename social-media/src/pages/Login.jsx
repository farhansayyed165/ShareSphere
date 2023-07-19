import { React, useState } from "react"
import { loginUser as loginUserDetails } from "../api/userApi"
import {useCookies} from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from '../features/userSlice';
import { redirect, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user.user)
    const [cookies, setCookies] = useCookies(['access-token', 'refresh-token'])
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(useLocation().state?.message)
    const redirectToPreviousPage = useLocation().state?.redirectLink ? useLocation().state.redirectLink:"/"
    async function handleSubmit(e) {
        e.preventDefault()
        try{
            const response = await loginUserDetails(loginData, cookies['access-token'])
            setCookies('access-token',response.accessToken, {path:'/',sameSite:"strict"})

            const {fullname, email, password, avatar, gender, username, _id} = response.user

            dispatch(Auth({fullname, email, password, avatar, username,_id, login:true}))
            navigate(redirectToPreviousPage)

        }catch(err){
            console.log(err)
        }
        
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function closePopup(){
        setMessage(undefined)
    }
    return (
        <>
            <div>
                <div style={{display:message ? "flex": "none",alignSelf:"center" }}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <h2>{message}</h2>
                        <br />
                        <button onClick={closePopup}>OK</button>
                    </div>
                </div>
                <h1>Sign in your account!</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        value={loginData.email}
                        name='email'
                    />

                    <input
                        type="password"
                        onChange={handleChange}
                        placeholder="password"
                        value={loginData.password}
                        name='password'
                    />

                    <button>Log in</button>
                </form>
            </div>
        </>
    )
}

/*
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        value={loginData.email}
                    />

                    <input
                        type="password"
                        onChange={handleChange}
                        placeholder="password"
                        value={loginData.password}
                    />

                    <button>Log in</button>
                </form>
*/