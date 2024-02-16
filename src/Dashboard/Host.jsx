import React, { useEffect, useState } from 'react';
import fetcher from '../api';
import { MdDelete } from "react-icons/md";
const Host = () => {

    const [hostlist, setHostlsit] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await fetcher.get("/api/user/hostlist"
            )
            setHostlsit(result?.data?.result)
        })();
    }, []);
  

    const handleDeleteHost = async(host, index)=>{
        await fetcher.post(`/api/user/delete-host/${host?._id}`
        ).then((result)=>{
            toast.success("Host deleted successfully!", {
                position: 'top-center'
            })
            const updatedUsers = [...hostlist];
            updatedUsers.splice(index, 1);
            setHostlsit(updatedUsers);
        }).catch((error)=>{
            console.log(error);
        })
        
    }
    return (
        <div>
        <h1 className='text-lg p-2 ml-8 font-semibold'>All Host List:</h1>
        <table class="min-w-full divide-y divide-gray-200 mx-16">
            <thead>
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Banned</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adress</th>
                    
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">{
                hostlist?.slice(0,10).map((host, index) => (
                    <tr id={index}>
                        <td class="px-6 py-4 whitespace-nowrap">{index+1}</td>
                        
                        <td class="px-6 py-4 whitespace-nowrap">{host?.fullname}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{host?.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{host?.isBanned === false ? 'No' : 'Yes'}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{host?.address}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button className='text-2xl text-red-600 ml-4' onClick={()=>handleDeleteHost(host,index)}><MdDelete /></button>
                        </td>
                    </tr>
                ))
            }
               
            </tbody>
        </table>
    </div>
    );
};

export default Host;