import React, { useEffect, useState } from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { GrTransaction } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { MdHomeWork } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import fetcher from '../api';
import { toast } from 'react-toastify';
// import totalUrl from '../utils/totalUrl';

const DashboardHome = () => {
    const [userlist, setUserlsit] = useState([]);
    const [hostlist, setHostlsit] = useState([]);
    const [urllists, setUrllsits] = useState([]);
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        (async () => {
            const result = await fetcher.get("/api/user/list"
            )
            setUserlsit(result?.data?.result)
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const result = await fetcher.get("/api/user/hostlist"
            )
            setHostlsit(result?.data?.result)
        })();
    }, []);
  


    const handleDeleteUser = async(user, index)=>{
        await fetcher.post(`/api/user/delete-user/${user?._id}`
        ).then((result)=>{
            toast.success("User deleted successfully!", {
                position: 'top-center'
            })
            const updatedUsers = [...userlist];
            updatedUsers.splice(index, 1);
            setUserlsit(updatedUsers);
        }).catch((error)=>{
            console.log(error);
        })
        
    }
    useEffect(() => {
        token && (async () => {
            const result = await fetcher.get("sapi/admin/url/all-url", {
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
                            <span className="text-2xl font-semibold">{userlist?.length}+</span>
                            <span className="text-gray-400 text-lg">Total User</span>
                        </div>
                    </div>

                </div>
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-80">
                    <div className="flex items-start gap-4 mb-6">
                        <div className='flex items-center h-full p-3 rounded-full bg-orange-500'><GrUserAdmin className='text-3xl text-white' /></div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold">{hostlist?.length}+</span>
                            <span className="text-gray-400 text-lg">Total Host</span>
                        </div>
                    </div>

                </div>
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-80">
                    <div className="flex items-start gap-4 mb-6">
                        <div className='flex items-center h-full p-3 rounded-full bg-pink-500'><MdHomeWork
                            className='text-3xl text-white' /></div>
                        <div className="flex flex-col"> 2000+
                            {/* <span className="text-2xl font-semibold">{expiredUrl}</span> */}
                            <span className="text-gray-400 text-lg">Total Resident</span>
                        </div>
                    </div>

                </div>
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg w-80">
                    <div className="flex items-start gap-4 mb-6">
                        <div className='flex items-center h-full p-3 rounded-full bg-pink-500'><GrTransaction className='text-3xl text-white' /></div>
                        <div className="flex flex-col">2500+
                            {/* <span className="text-2xl font-semibold">{expiredUrl}</span> */}
                            <span className="text-gray-400 text-lg">Total Booking</span>
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
                                <th>Serial</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is Banned</th>
                                <th>Adress</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                userlist?.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <th>{user?.fullname}</th>
                                        <td>{user?.email}</td>
                                        <td>{user?.isBanned === false ? 'Yes' : 'No'}</td>
                                        <td>{user?.address}</td>
                                        <td className='text-2xl text-red-700 cursor-pointer' onClick={()=>handleDeleteUser(user,index)}><MdDelete /></td>
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