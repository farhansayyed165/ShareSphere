import { React, useState } from "react"
import { loginUser } from "../api/userApi"
// import Cookies from 'universal-cookie';
import {useCookies} from 'react-cookie'



export default function Login() {
    const [cookies, setCookies] = useCookies(['access-token', 'refresh-token'])
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await loginUser(loginData, cookies['access-token'])
        setCookies('access-token',response.accessToken, {path:'/',sameSite:"strict"})
        console.log(response)
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <>
            <div>
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