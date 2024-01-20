import React, { useEffect, useState } from 'react';
import fetcher from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdSystemUpdateAlt } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ResidentInfoByHost = ({ loginUserInfo }) => {
    const navigate = useNavigate();
    const [allResident, setAllResident] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userChoiceHotel, setUserChoiceHotel] = useState('');
    const { register, handleSubmit, reset } = useForm();

    const getAllResident = async () => {
        try {
            const data = {
                host_info: loginUserInfo?.data?._id
            }
            const result = await fetcher.post("/api/resident/get-resident-by-host", data);
            setAllResident(result?.data?.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllResident();
    }, [])


    const handleUpdateResidentPrice = () => {
        Swal.fire({
            title: "Update Price",
            html: `
              You can use <b>bold text</b>,
              <a href="#">links</a>,
              and other HTML tags
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
              <i class="fa fa-thumbs-up"></i> Great!
            `,

        });
    }

    const onSubmit = async (data) => {
        try {
            data.resident_id = userChoiceHotel;
            const url = '/api/resident/update-price'
            const result = await fetcher.post(url, data);
            toast.success(result?.data?.message, {
                position: 'top-center'
            })
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: 'top-center'
            })
        }
    }

    return (


        <div className="overflow-x-auto">

            {
                showModal && <div class="fixed z-50 inset-0 overflow-y-auto">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button type="button" data-behavior="cancel" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <span class="sr-only">Close</span>
                                    <svg class="h-6 w-6" onClick={() => setShowModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">

                                        <MdSystemUpdateAlt className='text-xl' />
                                    </div>

                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                            Update Price
                                        </h3>
                                        <div class="mt-2">
                                            <input  {...register("price")} type="text" placeholder="Type Price" className="input input-bordered input-primary w-full max-w-xs" />
                                        </div>

                                    </div>

                                </div>
                                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button type="button" onClick={() => {
                                        setShowModal(false);

                                    }} data-behavior="cancel" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                
                                
                                 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>

                                    <button type='submit' data-behavior="commit"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  sm:mt-0 sm:w-auto sm:text-sm"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            }

            <table className="table w-full">

                <thead>
                    <tr>
                        <th>No.</th>
                        <th>IMG</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allResident?.map((resident, index) =>
                            <tr key={resident._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={resident?.img1} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {resident?.resident_name}
                                </td>
                                <td>{resident?.address}</td>
                                <td>{resident?.price}- {resident?.price_type}</td>
                                <td><label className="btn btn-sm mr-2" onClick={() => {
                                    setShowModal(true);
                                    setUserChoiceHotel(resident?._id);
                                }

                                }>Update Price</label>
                                    <label className="btn btn-sm" onClick={() => navigate(`/booking-info-by-host/${resident?._id}`)}>Booking List</label></td>
                            </tr>
                        )}
                </tbody>


            </table>
        </div>
    );
};

export default ResidentInfoByHost;