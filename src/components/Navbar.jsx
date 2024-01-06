import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import profile from './../assets/images/profile.png'
import location from './../assets/images/location.png'
import icon from './../assets/images/icon.png'
import search from './../assets/images/search.png'


const Navbar = ({ children }) => {
  const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'));
  console.log('hhhh', loginUserInfo?._id)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    navigate("/login");
    window.location.reload();
  }
  return (
    <div class="fixed top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
      <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div class="relative flex h-16 justify-between">
          <div class="flex flex-1 items-stretch justify-start">
            <Link class="flex flex-shrink-0 items-center" to='/'>
              <img class="block h-28 w-auto" src={icon} />
            </Link>
          </div>
          <div class="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            {
              loginUserInfo?._id ?
                <><a class="text-gray-700 hover:text-indigo-700 text-sm font-medium" href='#' onClick={() => handleLogout()}>Logout</a>
                 {loginUserInfo?.role === 'Host' &&
                     <Link to='/host-dashboard' class="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ">Host Dashboard
                     </Link>}
                     {/* <Link to='/host-dashboard' class="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ">Booking List
                     </Link> */}
                  </>
                :
                <>
                  <Link class="text-gray-700 hover:text-indigo-700 text-sm font-medium" to='/login'>Login</Link>
                  <Link class="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm "
                    to="/signup">Sign up
                  </Link>
                </>

            }

          </div>
        </div>
      </div>
    </div>
    // <div className="navbar bg-base-100">
    //   <div className="navbar-start ml-5">
    //     <NavLink to='/'>
    //       <img className='w-56 img-fluid' alt="icon" src={icon} />
    //     </NavLink>
    //   </div>
    //   {/* <div className="navbar-center">

    //     <div class="flex items-center justify-center">
    //       <div class="flex border-2 rounded">
    //         <input type="text" class="px-4 py-2 w-80" placeholder="Search Hotels, homes,etc..." />
    //         <button class="flex items-center justify-center px-4 border-l">
    //           <img alt="profile" src={location} />
    //           <h1 className='px-2 font-mono'>Location</h1>
    //           <img alt="seach" src={search} />

    //         </button>
    //       </div>
    //     </div>
    //   </div> */}
    //   <div className="navbar-end mt-[-40px] mr-10">

    //     <div className="dropdown dropdown-end">
    //       {
    //         loginUserInfo?._id ?
    //           <>
    //             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    //               <div className="w-10 rounded-full">

    //                 <img alt="profile" src={profile} />
    //               </div>
    //             </label>
    //             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
    //               <li>
    //                 <a className="justify-between">
    //                   Profile
    //                   <span className="badge">New</span>
    //                 </a>
    //               </li>
    //               {loginUserInfo?.role === 'Host' &&
    //                 <Link to='/host-dashboard' className="ml-4">Host Dashboard
    //                 </Link>

    //               }
    //               <li onClick={() => handleLogout()}><a>Logout</a></li>
    //             </ul>
    //           </>
    //           :
    //           <NavLink to='/login'>
    //             <a>Login</a>
    //           </NavLink>
    //       }


    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;