import { React, useState, useEffect } from "react"
import { loginUser } from "../api/userApi"


export default function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    function handleSubmit(e) {
        e.preventDefault()
        loginUser(loginData)
        .then(res=>console.log(res))
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