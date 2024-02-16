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
    const [saveResident, setSaveResident] = useState({});
    const [totalMember, setTotalMember]=useState(1)
    const [date, setDate] = useState();
    const [dateCheckOut, setDateCheckOut] = useState();
    const [activeCalender, setActiveCalender]= useState(1)
    const { register, handleSubmit, reset } = useForm();

    const millisecondsInADay = 1000 * 60 * 60 * 24;
   const totalDays=(dateCheckOut-date)/millisecondsInADay;
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
            date_of_checkout: format(dateCheckOut, 'PP'),
            email: loginUserInfo?.data?.email,
            guest_id: loginUserInfo?.data?._id,
            price:  totalDays>1 ? 
                (saveResident?.price*totalMember*totalDays) : (saveResident?.price*totalMember),
            contact: data?.contact,
            number_of_member: data?.number_of_member
        }
        await fetcher.post("/api/booking/payment", dataObj)
            .then((result) => {
                window.location.replace(result.data.url)
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
                            <div className='flex justify-between'>
                            <div className="badge badge-primary badge-outline ml-6 p-4 cursor-pointer" onClick={()=>setActiveCalender(1)}>{date ? format(date, 'PP') : "Check In Date"}</div>
                            <div className="badge badge-primary badge-outline ml-6 p-4 cursor-pointer " onClick={()=>setActiveCalender(2)}>{dateCheckOut ? format(dateCheckOut, 'PP') : "Check Out Date"}</div>
                            </div>
                            {
                                activeCalender ===1 ?
                                <DayPicker mode='single' selected={date} onSelect={setDate} />
                                :
                                <DayPicker mode='single' selected={dateCheckOut} onSelect={setDateCheckOut} />
                            }

                           
                        </div>
                    </div>
                </div>

                <div class="p-4 max-w-sm mt-8">
                    <div className="card shrink-0 w-full max-w-sm shadow-lg bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                            <div className="badge badge-primary badge-outline p-4">Price: {totalDays>1 ? 
                            (saveResident?.price*totalMember*totalDays) : (saveResident?.price*totalMember)}</div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Number of Member</span>
                                </div>
                                <input type="text" placeholder="Number of Member" className="input input-bordered w-72 max-w-xs"   {...register("number_of_member")} onChange={(e)=>setTotalMember(e.target.value)} />
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