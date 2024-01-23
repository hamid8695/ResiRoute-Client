import React, { useEffect, useState } from 'react';
import fetcher from '../api';

const CustomerBookingInfo = () => {
    const [bookingList, setBookingList] = useState([]);
    const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'));

    console.log('login', loginUserInfo)
    const getBookingList = async () => {
        const data = {
            guest_id: loginUserInfo?.data?._id
        }
        try {
            const result = await fetcher.post('/api/booking/list-by-guest', data);
            setBookingList(result?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBookingList();
    }, []);
    console.log('booking', bookingList)
    return (
        <div className='mt-28 h-screen mx-32'>

            <div className='flex justify-center w-full'>
                <div className="overflow-x-auto" >
                    <table className="table ">
                        <thead>
                            <tr>
                                <th className='w-48'></th>
                                <th className='w-48'>Hotel Name</th>

                                <th className='w-48'>Email</th>
                                <th className='w-48'>Total Member</th>
                                <th className='w-48'>Payment Status</th>
                                <th className='w-48'>Booking Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookingList?.map((booking, index) => (
                                    <tr id={booking?._id}>
                                        <th>{index + 1}</th>
                                        <td>{booking?.hotel_id?.resident_name
                                        }</td>
                                        <td>{booking?.email}</td>
                                        <td>{booking?.number_of_member}</td>
                                        <td class={booking?.payment_status ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
                                            {booking?.payment_status ? 'Paid' : 'Pending'}
                                        </td>


                                        <td>{booking?.date_of_booking}</td>


                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerBookingInfo;