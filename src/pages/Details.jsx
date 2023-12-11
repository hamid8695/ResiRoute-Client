import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../api';

const HotelDetails = () => {
    const { id } = useParams();
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
    console.log(saveResident)
    return (
        <div>
            <div className='text-center mt-8'>

                <h1 className='text-3xl font-mono'>{saveResident?.resident_name}</h1>
                <h1 className='text-md underline font-mono'>{saveResident?.address}</h1>
            </div>
            <div className='flex justify-center'>

                <div className="mt-8 carousel carousel-center rounded-box w-9/12 h-96">
                    <div className="carousel-item w-1/3">
                        <img src={saveResident?.img1} alt="Pizza" />
                    </div>
                    <div className="carousel-item w-1/3">
                        <img src={saveResident?.img2} alt="Pizza" />
                    </div>
                    <div className="carousel-item w-1/3">
                        <img src={saveResident?.img3} alt="Pizza" />
                    </div>
                    <div className="carousel-item w-1/3">
                        <img src={saveResident?.img4} alt="Pizza" />
                    </div>

                   
                </div>
            </div>
            <div className='mx-48 mt-8'>

<h1 className='text-3xl font-mono'>Price Range: {saveResident?.price_range
}</h1>
</div>
        </div>

    );
};

export default HotelDetails;