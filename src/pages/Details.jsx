import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetcher from '../api';

import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import Reviews from '../components/reviews';
import BookingModel from '../components/Booking-Model';

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [saveResident, setSaveResident] = useState({})
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


    const [currentRating, setCurrentRating] = useState(0)
    const ratingChanged = (rating) => {
        setCurrentRating(rating)
    }
    const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'));
    const handleFeedback = async (e) => {
        e.preventDefault();
        const review = {
            guest_name: loginUserInfo?.data?.fullname,
            feedback: e.target.feedback.value,
            rating: currentRating,
            hotel_id: saveResident?._id
        }


        try {
            const url = '/api/review/create'
            const result = await fetcher.post(url, review);
            console.log(result);
            toast.success(result?.data?.message, {
                position: 'top-center'
            })
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: 'top-center'
            })
        }

        e.target.reset();
    }


    const mapouterStyle = {
        position: 'relative',
        textAlign: 'right',
        height: '709px',
        width: '724px',
    };

    const gmapCanvasStyle = {
        overflow: 'hidden',
        background: 'none',
        height: '709px',
        width: '724px',
        borderRadius: '50px'
    };
    const [selectedLocation, setSelectedLocation] = useState('Bangladesh'
    );

    useEffect(() => {
        setSelectedLocation(saveResident?.address)
    }, [saveResident])

    console.log(saveResident?.address)

    return (
        <div className='mt-24'>

<div class="bg-white dark:bg-gray-800  h-full py-6 sm:py-8 lg:py-12">
    <div class="mx-36 max-w-screen-2xl px-4 md:px-8">
        <div class="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
            <div class="flex items-center gap-2">
                <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">{saveResident?.resident_name}</h2>

                <p class="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
                {saveResident?.address}
                </p>
            </div>

           
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                <img src={saveResident?.img1} loading="lazy" alt="Photo by Minh Pham" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">1</span>
            </a>

            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                <img src={saveResident?.img2} loading="lazy" alt="Photo by Magicle" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">2</span>
            </a>

            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                <img src={saveResident?.img3} loading="lazy" alt="Photo by Martin Sanchez" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">3</span>
            </a>

            <a href="#"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                <img src={saveResident?.img4} loading="lazy" alt="Photo by Lorenzo Herrera" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">4</span>
            </a>
        </div>
    </div>
</div>
          


            <div class="px-2 pb-32 pt-48 w-full flex justify-center">
                <div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
                    <div class="lg:w-1/2">
                        <div className="mapouter lg:scale-110 h-80 bg-cover lg:h-full rounded-none border lg:rounded-lg" >
                            <iframe
                                loading="lazy"
                                width="100%" height="480"
                                id="gmap_canvas"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                    selectedLocation
                                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                            ></iframe>
                            <a href="https://embedgooglemap.net/124/"></a>
                        </div>
                    </div>
                    <div class="py-12 px-6 lg:px-20 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
                        <h2 class="text-3xl text-gray-800 font-bold">
                        {saveResident?.resident_name}
                        </h2>
                        <p class="mt-4 text-gray-600">
                            {saveResident?.description}
                        </p>
                        <div class=" py-4">
                            <h3 class="text-lg font-medium text-gray-900">Contact </h3>
                            <p class="mt-1 text-gray-600">🤵 Host: {saveResident?.host_name
                            }</p>
                            <p class="mt-1 text-gray-600">✉ Email: {saveResident?.email
                            }</p>
                            <p class="mt-1 text-gray-600">☎ Phone: {saveResident?.contact_number
                            }</p>
                        </div>
                        <span class="text-3xl sm:text-4xl font-bold text-orange-600">৳{saveResident?.price
                        }</span> / Night
                        <div class="mt-8">
                            <a href="#" class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded" onClick={() => navigate(`/booking-hotel/${id}`)}>Book Now</a>
                        </div>
                    </div>
                </div>
            </div>



            <div className='mb-32'>
                <h1 className='mt-12 text-center font-bold text-3xl'>Your Feedback</h1>

                <div className='flex justify-center'>
                    <div className="mt-8  stack">
                        <div className="card shadow-2xl shadow-black text-primary-content">
                            <div className="card-body">
                                <div className='flex justify-center'>
                                    <ReactStars
                                        size={40}
                                        isHalf={true}
                                        activeColor='goldenrod'
                                        onChange={ratingChanged}
                                    />
                                </div>
                                <form onSubmit={handleFeedback}>
                                    <textarea name='feedback' className=" bg-gray-400 text-white placeholder:text-white textarea  w-96" placeholder="Please add your feedback here"></textarea><br />

                                    <input className='w-full btn-sm btn btn-primary mt-3' type="submit" value="Add Feedback" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='mx-48 mt-8'>
                {saveResident?._id && <Reviews hotel_id={saveResident?._id} />}
            </div> */}

        </div>

    );
};

export default HotelDetails;