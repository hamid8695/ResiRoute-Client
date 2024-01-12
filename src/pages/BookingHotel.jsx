import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../api';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BookingHotel = () => {
    const { id } = useParams();
    const [saveResident, setSaveResident] = useState({})
    const [date, setDate] = useState(new Date());
    const { register, handleSubmit, reset } = useForm();
    const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'));
    const getAResident = async () => {
        try {
            const result = await fetcher.get(`/api/resident/single/${id}`);
            setSaveResident(result?.data?.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAResident();
    }, [])


    const onSubmit = async (data) => {
        const dataObj = {
            hotel_id: saveResident?._id,
            guest_name: loginUserInfo?.data?.fullname,
            date_of_booking: format(date, 'PP'),
            email: loginUserInfo?.data?.email,
            price: saveResident?.price,
            contact: data?.contact,
            number_of_member: data?.number_of_member
        }
        await fetcher.post("/api/booking/payment", dataObj)
            .then((result) => {
                window.location.replace(result.data.url)
                console.log(result);
                toast.success("Your booking request is sent to Host. Please confirm your payment!", {
                    position: 'top-center'
                })
            }).catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className='mt-28'>
            

            <div class="flex flex-wrap justify-center mt-10 max-w-4xl mx-auto">

                <div class="p-4 max-w-sm">
                    <div className='mr-7'>
                        <div className='pt-8  card shrink-0 w-full max-w-sm shadow-lg bg-base-100'>
                            <div className="badge badge-primary badge-outline ml-6 p-4">{date ? format(date, 'PP') : "Please Pick a Date"}</div>

                            <DayPicker mode='single' selected={date} onSelect={setDate} />
                        </div>
                    </div>
                </div>

                <div class="p-4 max-w-sm mt-8">
                    <div className="card shrink-0 w-full max-w-sm shadow-lg bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                            <div className="badge badge-primary badge-outline p-4">Price: {saveResident?.price}</div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Number of Member</span>
                                </div>
                                <input type="text" placeholder="Number of Member" className="input input-bordered w-72 max-w-xs"  {...register("number_of_member")} />
                            </div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Contact Number</span>
                                </div>
                                <input type="text" placeholder="contact" className="input input-bordered w-72 max-w-xs"  {...register("contact")} />
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default BookingHotel;