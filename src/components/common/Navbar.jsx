import React, { useState } from 'react'
import { NavbarLinks } from '../../data/NavbarLinks'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import logo from "../../assets/Logos/Logo White 1.png"
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../utils/constants'

const Navbar = () => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const [loading, seLoading] = useState(false);

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className='flex h-16 items-center justify-center border-b-[1px] border-b-richblue-300 transition-all duration-200'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Logo" width={250} height={32} loading='lazy' />
                </Link>

                {/* Navigation Links */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-white font-bold'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Our Products" ?
                                            (
                                                <div>
                                                    Our Products
                                                </div>
                                            ) :
                                            (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ?
                                                        "text-white" :
                                                        "text-richblack-400"}`}
                                                    >
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login / Signup / Dashboard */}
                <div className='hidden items-center gap-x-6 md:flex'>
                    {user && user?.accountType !== ACCOUNT_TYPE.DEALER && user?.accountType !== ACCOUNT_TYPE.SHOP_KEEPER && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className='text-2xl text-white' />

                            <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblue-400 text-center text-xs font-bold text-white border border-richblue-300'>
                                1
                            </span>
                        </Link>
                    )}

                    {token === null && (
                        <Link to='/login'>
                            <button className='rounded-[8px] border border-richblue-300 bg-richblue-400 px-[12px] py-[8px] text-white'>
                                Log In
                            </button>
                        </Link>
                    )}

                    {token === null && (
                        <Link to='/signup'>
                            <button className='rounded-[8px] border border-richblue-300 bg-richblue-400 px-[12px] py-[8px] text-white'>
                                Sign Up
                            </button>
                        </Link>
                    )}

                    {token !== null && <ProfileDropDown />}
                </div>

                <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={24} fill="#FFFFFF" />
                </button>
            </div>
        </div>
    )
}

export default Navbar
