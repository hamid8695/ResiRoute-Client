import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { ImLink } from 'react-icons/im';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiBillLine } from 'react-icons/ri';

const Dashboard = () => {

    const [open, setOpen] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
    }

    const allMenu = [
        { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
        { name: "Url", link: "/dashboard/add", icon: ImLink },
        // { name: "Package", link: "/dashboard/package", icon: FiPackage },
        // { name: "Admin", link: "/dashboard/all-admin", icon: MdOutlineAdminPanelSettings, margin: true },
        // { name: "Bill", link: "/", icon: RiBillLine },
        // { name: "Profile", link: "/dashboard/profile", icon: CgProfile },
        // { name: "Logout", link: "/login", icon: BiLogOut, margin: true },
        // { name: "Back Home", link: "/", icon: AiOutlineHome },
    ]
    
    return (
        <section className='flex'>
            <div className={`bg-black ${open ? "w-72" : "w-16"} duration-500 min-h-screen text-gray-100 px-4`}>
                <div className='py-3 flex justify-end'>
                    <HiMenuAlt3
                        size={26}
                        className='cursor-pointer'
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className='mt-4 flex flex-col gap-4 relative font-serif'>
                    {
                        allMenu?.map((menu, i) => (
                            <Link onClick={menu?.name==="Logout" && (handleLogout) } to={menu?.link} key={i} className={`${menu?.margin && "mt-5"} flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}>
                                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                <h2
                                    style={{ transitionDelay: `${i + 3}00ms` }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-32 overflow-hidden"}`}>{menu?.name}</h2>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Outlet />
        </section>
    );
};

export default Dashboard;