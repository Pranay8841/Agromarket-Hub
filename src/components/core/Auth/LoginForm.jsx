import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate))
  }

  return (
    <form 
    onSubmit={handleOnSubmit}
    className='mt-6 flex w-full flex-col gap-y-4'>
      <label className='w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-white'>
          Email Address <sup className='text-pink-200'>*</sup>
        </p>

        <input type="text"
          name="email"
          required
          value={email}
          onChange={handleOnChange}
          placeholder='Enter Email Address'
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
          }}
          className='w-full border border-richblue-400 rounded-[0.5rem] bg-main p-[12px] text-richblack-700'
        />
      </label>

      <label className='relative'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-white'>
          Password <sup className='text-pink-200'>*</sup>
        </p>

        <input type={showPassword ? "text" : "password"}
          name="password"
          required
          value={password}
          onChange={handleOnChange}
          placeholder='Enter Password'
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
          }}
          className='w-full border border-richblue-400 rounded-[0.5rem] bg-main p-[12px] pr-12 text-richblack-700'
        />

        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-3 top-[38px] z-[10] cursor-pointer'
        >
          {
            showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#54433a" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#54433a" />
            )
          }
        </span>

        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-richblue-400 py-[8px] px-[12px] font-bold text-white border border-richblue-300"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
