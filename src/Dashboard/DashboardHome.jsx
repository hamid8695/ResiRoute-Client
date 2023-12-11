import React, { useEffect, useState } from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import fetcher from '../api';
// import totalUrl from '../utils/totalUrl';

const DashboardHome = () => {

    const [userlist, setUserlsit] = useState([]);
    const [urllists, setUrllsits] = useState([]);
    // const [count, expiredUrl] = totalUrl(urllists);
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        token && (async () => {
            const result = await fetcher.get("api/admin/users/list", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserlsit(result?.data?.data)
        })();
    }, []);
    useEffect(() => {
        token && (async () => {
            const result = await fetcher.get("api/admin/url/all-urls", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUrllsits(result?.data?.data)
        })();
    }, []);

    return (
        <div className="w-full">
            <div className='my-5 ml-12 text-xl text-gray-900 font-semibold font-serif'>
                Welcome To Admin Dashboard
            </div>
            <div className='flex justify-around font-serif'>
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-80">
                    <div className="flex items-start gap-4 mb-6">
                        <div className='flex items-center h-full p-3 rounded-full bg-primary'><HiUserGroup className='text-3xl text-white' /></div>
                        <div className="flex flex-col">
                            {/* <span className="text-2xl font-semibold">{userlist?.length}</span> */}
                            <span className="text-gray-400 text-lg">Total User</span>
                        </div>
                    </div>

                </div>
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-80">
                    <div className="flex items-start gap-4 mb-6">
                        <div className='flex items-center h-full p-3 rounded-full bg-orange-500'><AiOutlineShoppingCart className='text-3xl text-white' /></div>
                        <div className="flex flex-col">
                            {/* <span className="text-2xl font-semibold">{count}</span> */}
                            <span className="text-gray-400 text-lg">Total Url</span>
                        </div>
                    </div>

                </div>
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-80">
                    <div className="flex items-start gap-4 mb-6">
                        <div className='flex items-center h-full p-3 rounded-full bg-pink-500'><BiPackage className='text-3xl text-white' /></div>
                        <div className="flex flex-col">
                            {/* <span className="text-2xl font-semibold">{expiredUrl}</span> */}
                            <span className="text-gray-400 text-lg">Total Expired Url</span>
                        </div>
                    </div>

                </div>

            </div>
            <div className='mx-12 p-1 my-10 font-serif'>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>User Type</th>
                                <th>Email</th>
                                <th>Daily Limit</th>
                                <th>Creation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userlist?.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <th>{user?.fullname}</th>
                                        <td>{!user?.isAdmin && "User"}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.dailyLimit}</td>
                                        <td>{user?.createdAt.slice(0, 10)}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default DashboardHome;