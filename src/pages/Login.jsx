import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from "../assets/Secure login.gif"

function Login() {
    return (
        <Template
            title="Welcome to Agromarket Hub - a Farmer's Market"
            desc1="Discover everything you need for successful farming."
            desc2="Quality products and resources to support your agriculture journey."
            image={loginImg}
            formType="login"
        />
    )
}

export default Login
