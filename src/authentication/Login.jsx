import React, { useEffect, useState } from 'react';
import loginImg from './../assets/images/login.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import fetcher from '../api';
import { toast } from 'react-toastify';
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';

const Login = () => {
    const [show, setShow] = useState(true)
    const navigate = useNavigate();
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const url = '/api/user/login'
            const result = await fetcher.post(url, data);
            console.log(result);
            // localStorage.setItem("accessToken", result?.data?.data?.token);
            // navigate(from, { replace: true });
            toast.success(result?.data?.message, {
                position: 'top-center'
            })
            navigate("/");
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: 'top-center'
            })
        }
    };

    return (
        <div className='bg-gray-300 flex justify-center pt-16'>
            <div class="min-h-screen">
                <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-[#57E4A5] to-[#B7DA64] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                        <div class="max-w-md mx-auto font-serif">
                            <div>
                                <h1 class="text-2xl font-semibold">Login</h1>
                            </div>
                            <div class="divide-y divide-gray-200">
                                <form  onSubmit={handleSubmit(onSubmit)} class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input {...register("email")} autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div class="relative">
                                        <input   {...register("password")} autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div class="relative">
                                        <button type='submit'  class="bg-gradient-to-r from-[#57E4A5] to-[#B7DA64] text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="w-full flex justify-center">
                            {/* <span>Continue with Google</span> */}
                            <p>Don't have an account?
                                    <Link to='/signup' className="label-text-alt link text-sm link-hover"> Sign Up Here
                                    </Link>
                                </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;