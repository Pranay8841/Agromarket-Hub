import React, { useEffect, useRef, useState } from "react";
import { NavbarLinks } from "../../data/NavbarLinks";
import { Link, matchPath, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineCaretDown } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs"
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import logo from "../../assets/Logos/Logo White 1.png";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { VscDashboard } from "react-icons/vsc";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        // console.log(res)
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className={`flex h-16 items-center justify-center border-b-[1px] border-b-richblue-300 ${location.pathname !== "/" ? "bg-richblue-700" : ""} transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={250} height={32} loading="lazy" />
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-700">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Products" ? (
                  <>
                    <button className='relative' onClick={() => setOpen(true)}>
                      <div className='flex items-center gap-x-1'>
                        <p className="text-sm text-white">{link.title}</p>
                        <AiOutlineCaretDown className="text-sm text-white" />
                      </div>

                      {
                        open && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-white overflow-hidden rounded-md bg-white"
                            ref={ref} >
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks.length ? (
                              <>
                                {subLinks
                                  ?.filter(
                                    (subLink) => subLink?.products?.length > 0
                                  )
                                  ?.map((subLink, i) => (
                                    <Link
                                      to={`/category/${subLink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      className="flex w-full items-center gap-x-1 py-[10px] px-[30px] font-bold text-richblack-700  hover:text-richblack-900"
                                      key={i}
                                    >
                                      <p>{subLink.name}</p>
                                    </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </div>
                        )
                      }
                    </button>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-6 md:flex">
          {user &&
            user?.accountType !== ACCOUNT_TYPE.DEALER &&
            user?.accountType !== ACCOUNT_TYPE.SHOP_KEEPER && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-white" />

                {
                  totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblue-400 text-center text-xs font-bold text-white border border-richblue-300">
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblue-300 bg-richblue-400 px-[12px] py-[8px] text-white">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblue-300 bg-richblue-400 px-[12px] py-[8px] text-white">
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
  );
};

export default Navbar;
