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
        <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 relative">
            {
                allReviewByHotel.map(review =>
                    <div id={review?._id} class="bg-gray-200 rounded-lg p-8 text-center md:w-1/3">
                        <p class="font-bold uppercase"> {review?.guest_name}</p>
                        <p class="text-xl font-light italic text-gray-700">{review?.feedback}</p>
                        <div class="flex items-center justify-center space-x-2 mt-4">

                            {(() => {
                                let items = [];
                                for (let i = 0; i <= review?.rating; i++) {
                                    items.push(<div key={i} class="flex items-center justify-center space-x-2 mt-4">
                                        <svg class="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" stroke="currentColor">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                            </path>
                                        </svg>
                                    </div>);
                                }
                                return items;
                            })()}

                        </div>
                    </div>

                )
            }

        </div>

    );
};

export default Reviews;