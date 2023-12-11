import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import profile from './../assets/images/profile.png'
import location from './../assets/images/location.png'
import icon from './../assets/images/resiroute_icon.png'
import search from './../assets/images/search.png'
import useProfile from '../hooks/useProfile';
import useVerify from '../hooks/useVerify';


const Navbar = ({ children }) => {
  const [token] = useVerify();
  const isAdmin = useProfile();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  }
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <NavLink to='/'>
          <img alt="icon" src={icon} />
        </NavLink>
      </div>
      <div className="navbar-center">

        <div class="flex items-center justify-center">
          <div class="flex border-2 rounded">
            <input type="text" class="px-4 py-2 w-80" placeholder="Search Hotels, homes,etc..." />
            <button class="flex items-center justify-center px-4 border-l">
              <img alt="profile" src={location} />
              <h1 className='px-2 font-mono'>Location</h1>
              <img alt="seach" src={search} />

            </button>
          </div>
        </div>
      </div>
      <div className="navbar-end">

        <div className="dropdown dropdown-end">
          <NavLink to='/login'>
            <a>Login</a>
          </NavLink>
          {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
         
          <img alt="profile" src={profile} />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;