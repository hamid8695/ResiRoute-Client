import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { GrUserAdmin } from "react-icons/gr";
import { MdHomeWork } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem("Credentials");
            navigate("/admin-login");
            window.location.reload();
    }

    const allMenu = [
        { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
        { name: "Host", link: "/dashboard/host", icon: GrUserAdmin },
        { name: "Resident", link: "/dashboard/resident", icon: MdHomeWork },
        // { name: "Booking", link: "/dashboard/add", icon: GrTransaction },
        { name: "Logout", link: "/login", icon: BiLogOut, margin: true },
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