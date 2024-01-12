import React, { useEffect, useState } from 'react';
import fetcher from '../api';
import { IoStar } from "react-icons/io5";

const Reviews = ({ hotel_id }) => {
    const [allReviewByHotel, setAllReviewByHotel] = useState([])
    const getAllReviewByHotel = async () => {
        const data = {
            hostId: hotel_id,
        }
        try {
            const result = await fetcher.post("/api/review/get-review-by-hotel", data);
            setAllReviewByHotel(result?.data?.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllReviewByHotel();
    }, [])

    return (
        <div className='mb-10'>
            {
                allReviewByHotel.map(review => <div id={review?._id} tabIndex={0} className="rounded-box collapse collapse-open border border-base-200 bg-base-50 mb-8">

                    <div className="collapse-title flex items-center">
                        <div className=' bg-[#dfdede] w-16 py-2 rounded-lg flex items-center'>
                            <IoStar className='text-yellow-400 font-bold ml-2 mr-1' />
                            <span className='font-bold'>{review?.rating}</span>
                        </div>
                        <div className='ml-3 font-semibold'>
                            By {review?.guest_name}
                        </div>
                    </div>
                    <div className="collapse-content mt-[-10px]">
                        <p>{review?.feedback}</p>
                    </div>
                    {/* <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-accent">{review?.feedback}</div>
                    </div> */}
                </div>)
            }

        </div>

    );
};

export default Reviews;