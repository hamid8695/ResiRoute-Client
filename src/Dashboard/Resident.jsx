import React, { useEffect, useState } from 'react';
import fetcher from '../api';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


const Resident = () => {
    const [allResident, setAllResident] = useState([])
    const getAllResident = async () => {
        try {
            const result = await fetcher.get("/api/resident/all");
            setAllResident(result?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllResident();
    }, [])
    return (
        <div>
            <h1 className='text-lg p-2 ml-8 font-semibold'>All Hotel/House List:</h1>
            <table class="min-w-full divide-y divide-gray-200 mx-16">
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Img</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resident Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">{
                    allResident.slice(10)?.map((hotel, index) => (
                        <tr id={index}>
                            <td class="px-6 py-4 whitespace-nowrap">{index+1}</td>
                            <td class="px-6 py-4 whitespace-nowrap"> <div class="flex-shrink-0 h-10 w-10">
                                <img class="h-10 w-12" src={hotel?.img1} alt="" />
                            </div></td>
                            <td class="px-6 py-4 whitespace-nowrap">{hotel?.resident_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{hotel?.host_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{hotel?.address}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {
                                    hotel?.is_active ?
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span> : 
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Banned</span>
                                }
                               
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                            <button className='text-2xl text-green-500'><CiEdit /></button>
                                <button className='text-2xl text-red-600 ml-4'><MdDelete /></button>
                            </td>
                        </tr>
                    ))
                }
                   
                </tbody>
            </table>
        </div>
    );
};

export default Resident;