import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import fetcher from '../api';
import { toast } from 'react-toastify';
const BookingDetails = ({ loginUserInfo, bookingHotel }) => {
    const [date, setDate] = useState(new Date());
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const dataObj = {
            hotel_id: bookingHotel?._id,
            guest_name: loginUserInfo?.data?.fullname,
            date_of_booking: format(date, 'PP'),
            email: loginUserInfo?.data?.email,
            price: bookingHotel?.price,
            contact: data?.contact,
            number_of_member: data?.number_of_member
        }
        console.log(dataObj)


        const result = await fetcher.post("/api/booking/create", dataObj);
        console.log('dataaaaa',result)
        toast.success(result?.data?.message, {
            position: 'top-center'
        })
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <h3 className="font-bold text-lg text-center">Booking  for hotel {bookingHotel?.resident_name}</h3>
                        <div className=' flex justify-center rounded-lg border-gray-500'>
                            <div className='mt-4  '>
                                <kbd className="kbd ml-6">{date ? format(date, 'PP') : "Please Pick a Date"}</kbd>
                                <DayPicker mode='single' selected={date} onSelect={setDate} />

                            </div>

                        </div>
                        <div className='flex justify-center mt-3'>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <label className="form-control ">
                                    <div className="label">
                                        <span className="label-text">Number of Member</span>
                                    </div>
                                    <input type="text" placeholder="Number of Member" className="input input-bordered w-full max-w-xs"  {...register("number_of_member")} />

                                </label>
                                <label className="form-control ">
                                    <div className="label">
                                        <span className="label-text">Contact Number</span>
                                    </div>
                                    <input type="text" placeholder="contact" className="input input-bordered w-full max-w-xs"  {...register("contact")} />

                                </label>
                                <div class="relative my-3">
                                    <button type='submit' className="btn btn-active  btn-md  btn-secondary">Confirm Booking</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default BookingDetails;