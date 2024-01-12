import React, { useEffect, useState } from 'react';
import fetcher from '../api';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingList = () => {

    const { id } = useParams();
    const [bookingList, setBookingList] = useState([])
    const getBookingList = async () => {
        const data = {
            hotel_id: id
        }
        try {
            const result = await fetcher.post('/api/booking/list-by-host', data);
            setBookingList(result?.data?.data)
            console.log(result)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBookingList();
    }, [])
    const handleConfirmBooking = async (contact, name, date) => {
        const url = `http://bulksmsbd.net/api/smsapi?api_key=1BE8YeI3VyOoktNnr7xO&type=text&number=01859168695&senderid=iTrading&message=Hello ${name}, Your Booking is Confirmed!. Your Booking Date is ${date}`
        await axios({
            url: url,
            method: 'get',
        });
    }
    return (
        <div className='mt-24'>
            {/* <h3 className="font-bold text-lg">Booking  List </h3> */}
            <div className='flex justify-center w-full'>
                <div className="overflow-x-auto" >
                    <table className="table ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='w-48'></th>
                                <th className='w-48'>Guest Name</th>
                                <th className='w-48'>Contact</th>
                                <th className='w-48'>Email</th>
                                <th className='w-48'>Booking Date</th>
                                <th className='w-48'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookingList?.map((booking, index) => (
                                    <tr id={booking?._id}>
                                        <th>{index + 1}</th>
                                        <td>{booking?.guest_name
                                        }</td>
                                        <td>{booking?.contact}</td>
                                        <td>{booking?.email}</td>
                                        <td>{booking?.date_of_booking}</td>
                                        <td><button className="btn btn-xs btn-outline btn-secondary" onClick={() => handleConfirmBooking(booking?.contact, booking?.guest_name, booking?.date_of_booking
                                        )}>Confirm Booking</button></td>

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

export default BookingList;