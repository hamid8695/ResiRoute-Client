import React from 'react';
import { useForm } from 'react-hook-form';
import resetPass from './../assets/images/reset-pass.png'
import { Link } from 'react-router-dom';
import fetcher from '../api';
import { toast } from 'react-toastify';

const ResetPass = () => {
    const { register, handleSubmit, reset } = useForm();
    const token = localStorage.getItem("accessToken")
    const onSubmit = async (data) => {
        const result = await fetcher.post("api/user/set-pass", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(result?.data?.message, {
            position: 'top-center'
        })
    };
    return (
        <div className='bg-gray-300 pb-28'>
        <div className='mt-20 mx-40'>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className='w-1/2'><img className='w-3/4' src={resetPass} alt="login" /></figure>
                <div className="card-body mt-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                         <div className="form-control">
                            <label className="label">
                                <span className="label-text ">Reset Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Reset Password"
                                {...register("password")}
                                className="input input-bordered kbd" />
                        </div> 
                      
                        <div className="form-control mt-6">
                            <button
                                type='submit'
                                className="btn btn-primary text-white">Done</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ResetPass;