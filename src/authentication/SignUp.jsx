import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import fetcher from '../api/index';
import { toast } from 'react-toastify';

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const { confirm_password, ...othersData } = data
        const result = await fetcher.post("/api/user/create", othersData);
        toast.success(result?.data?.message, {
            position: 'top-center'
        })
        navigate("/login");
        reset();
    };
    return (
        <div className='bg-gray-300 flex justify-center pt-28'>
            <div class="min-h-screen">
                <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-[#57E4A5] to-[#B7DA64] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                        <div class="max-w-md mx-auto font-serif">
                            <div>
                                <h1 class="text-2xl font-semibold">Signup</h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input {...register("fullname")} autocomplete="off" id="fullname" name="fullname" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Full Name" />
                                        <label for="fullname" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Full Name</label>
                                    </div>
                                    <div class="relative">
                                        <input {...register("email")} autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div class="relative">
                                        <input   {...register("password")} autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div class="relative">
                                        <input   {...register("confirm_password")} autocomplete="off" id="confirm-password" name="confirm-password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Confirm Password" />
                                        <label for="confirm-password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                                    </div>
                                    <div class="relative">
                                        <button type='submit' class="bg-gradient-to-r from-[#57E4A5] to-[#B7DA64] text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="join grid grid-cols-2">
                            <Link to='/admin-signup'>
                                <button className="join-item btn btn-outline">Host SignUp</button>
                            </Link>
                            <button className="join-item btn btn-outline"><Link to='/login'> Login </Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;