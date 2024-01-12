import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from './../assets/images/icon.png'


const Navbar = ({ children }) => {
  const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'));
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
              loginUserInfo?.data?._id ?
                <><a class="text-gray-700 hover:text-indigo-700 text-sm font-medium" href='#' onClick={() => handleLogout()}>Logout</a>
                 {loginUserInfo?.data?.role === 'Host' &&
                     <Link to='/host-dashboard' class="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ">Host Dashboard
                     </Link>}
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
  );
};

export default Navbar;