import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../api';
import { toast } from 'react-toastify';


const AddResident = () => {
   const userInfo =JSON.parse(localStorage.getItem('loginUser'));
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async(data)=>{
        data.host_info = userInfo?._id;
        data.host_name = userInfo?.fullname;
        try {
            const result = await fetcher.post("/api/resident/create", data);
            console.log(result);
            toast.success(result?.data?.message, {
                position: 'top-center'
            })
            navigate("/");
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: 'top-center'
            })
        }
    }

    return (
        <div className="w-full">
            <div className='flex justify-between mx-12 py-3'>
                <div>Add Hotel/House</div>
                <div>
                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <form 
                        onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    {...register("resident_name")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">Description</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="description"
                                    {...register("description")}
                                    className="input input-bordered kbd h-24" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text ">Address</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="address"
                                    {...register("address")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text ">Image 1</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Image 1"
                                    {...register("img1")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text ">Image 2</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Image 2"
                                    {...register("img2")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text ">Image 3</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Image 3"
                                    {...register("img3")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text ">Image 4</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Image 4"
                                    {...register("img4")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text ">Number Of Room</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Number Of Room"
                                    {...register("numberOfRooms")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text ">Price of Range</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Price of Range"
                                    {...register("price_range")}
                                    className="input input-bordered kbd" />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type='submit'
                                    className="btn  text-white">Create Resident</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='mt-10 ml-2'>
                <label htmlFor="my-modal-6" className="btn btn-outline btn-primary">Create Admin</label>
            </div>
            </div>
            <div className='mx-12 p-1 mb-10 font-serif'>
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
                            {/* {
                                userlist?.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <th>{user?.fullname}</th>
                                        <td>{!user?.isAdmin && "User"}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.dailyLimit}</td>
                                        <td>{user?.createdAt.slice(0, 10)}</td>
                                    </tr>)
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddResident;