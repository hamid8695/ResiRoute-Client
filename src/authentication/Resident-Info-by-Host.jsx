import React, { useEffect, useState } from 'react';
import fetcher from '../api';
import { useNavigate } from 'react-router-dom';
const ResidentInfoByHost = ({ loginUserInfo }) => {
    const navigate = useNavigate();
    const [allResident, setAllResident] = useState([])
    const getAllResident = async () => {
        try {
            const data = {
                host_info: loginUserInfo?._id
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
    console.log(allResident)
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
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
                                <th>{index + 1}</th>
                                <th>
                                    <div className="w-44 carousel rounded-box">
                                        <div className="carousel-item w-full">
                                            <img src={resident?.img1} className="w-full" alt="Tailwind CSS Carousel component" />
                                        </div>
                                        <div className="carousel-item w-full">
                                            <img src={resident?.img2} />
                                        </div>
                                        <div className="carousel-item w-full">
                                            <img src={resident?.img3} className="w-full" alt="Tailwind CSS Carousel component" />
                                        </div>
                                        <div className="carousel-item w-full">
                                            <img src={resident?.img4} className="w-full" alt="Tailwind CSS Carousel component" />
                                        </div>
                                    </div>
                                </th>
                                <th>{resident?.resident_name}</th>
                                <td>{resident?.address}</td>
                                <td>{resident?.price}- {resident?.price_type}</td>
                                <td>
                                    <label className="btn btn-sm" onClick={() => navigate(`/booking-info-by-host/${resident?._id}`)}>Booking List</label>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div >
    );
};

export default ResidentInfoByHost;