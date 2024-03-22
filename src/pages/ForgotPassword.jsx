import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordResetToken } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"

const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth);

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ?
                    (
                        <div className="spinner"></div>
                    ) :
                    (
                        <div className="max-w-[500px] p-4 lg:p-8">
                            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white text-center">
                                {
                                    !emailSent ? "Reset Your Password" : "Check Your Email"
                                }
                            </h1>

                            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-200">
                                {!emailSent
                                    ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                    : `We have sent the reset email to ${email}`}
                            </p>

                            <form onSubmit={handleOnSubmit}>
                                {
                                    !emailSent && (
                                        <label className="w-full">
                                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                                                Email Address <sup className="text-pink-200">*</sup>
                                            </p>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email address"
                                                className='w-full border border-richblue-400 rounded-[0.5rem] bg-main p-[12px] pr-12 text-richblack-700'
                                            />
                                        </label>
                                    )
                                }
                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-[8px] bg-richblue-400 py-[12px] px-[12px] font-bold text-white border border-richblue-300"
                                >
                                    {!emailSent ? "Sumbit" : "Resend Email"}
                                </button>
                            </form>

                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/login">
                                    <p className="flex items-center gap-x-2 text-blue-100">
                                        <BiArrowBack /> Back To Login
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ForgotPassword
