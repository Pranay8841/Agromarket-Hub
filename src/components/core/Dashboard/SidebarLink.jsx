import React from 'react';
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath(route, location.pathname);
    };

    if (!Icon) {
        console.error(`Icon "${iconName}" not found`);
        // You can choose to render a placeholder or default icon here
        return null;
    }

    return (
        <NavLink to={link.path}
        className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)
            ? "bg-richblue-400 text-white border border-richblue-300 rounded-md"
            : "bg-opacity-0 text-richblack-200"
            } transition-all duration-200`}
        >
            {/* <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-brown-600 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span> */}
            <div className="flex items-center gap-x-2">
                <Icon className='text-lg' />
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
};

export default SidebarLink;
