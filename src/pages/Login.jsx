import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from "../assets/IMG_20231030_134646 (2).jpg"

function Login() {
    return (
        <Template
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            image={loginImg}
            formType="login"
        />
    )
}

export default Login
