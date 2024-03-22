import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

const VerifyEmail = () => {

    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    })

    const handleonSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate,
        ))
    }

    return (
        <div className="grid place-items-center">
            {
                loading ?
                    (
                        <div>
                            <div className="spinner"></div>
                        </div>
                    ) :
                    (
                        <div className="max-w-[500px] p-4 lg:p-8">
                            <h1 className="text-white font-bold text-[1.875rem] leading-[2.375rem] text-center">
                                Verify Email
                            </h1>

                            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-200">
                                A verification code has been sent to you. Enter the code below
                            </p>

                            <form onSubmit={handleonSubmit}>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            placeholder="-"
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                            className="w-[48px] lg:w-[60px] border-[2px] border-richblue-300 bg-main rounded-[0.5rem] text-richblue-700 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-brown-800"
                                        />)}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 6px",
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-richblue-400 py-[12px] px-[12px] rounded-[8px] mt-6 font-bold text-white border border-richblue-300"
                                >
                                    Verify Email
                                </button>
                            </form>

                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/signup">
                                    <p className="text-blue-300 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Signup
                                    </p>
                                </Link>
                                <button
                                    className="flex items-center text-blue-300 gap-x-2"
                                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                                >
                                    <RxCountdownTimer />
                                    Resend it
                                </button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default VerifyEmail
