import React, { useState } from 'react';
import forgetImg from './../assets/images/Forgot password.gif'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import fetcher from '../api';

const ForgetPass = () => {
    const [usertoken,setUsertoken]=useState("")
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const result = await fetcher.post("api/user/reset-pass-req", data);
        localStorage.setItem("accessToken", result?.data?.data?.token)
        setUsertoken(result?.data?.data?.token);
        // reset();
    };
    return (
        <div className='bg-gray-300 pb-28'>
        <div className='mt-20 mx-40'>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className='w-1/2'><img className='w-3/4' src={forgetImg} alt="login" /></figure>
                <div className="card-body mt-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                         <div className="form-control">
                            <label className="label">
                                <span className="label-text ">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                {...register("email")}
                                className="input input-bordered kbd" />
                        </div> 
                      
                        <div className="form-control mt-6">
                            <button
                                type='submit'
                                className="btn btn-primary text-white">Submit</button>
                        </div>
                        <label className="label">
                               {usertoken && <Link to='/reset-pass' className="label-text-alt link text-sm link-hover"> Reset Password
                                </Link>}
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ForgetPass;