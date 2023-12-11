import React, { useEffect, useState } from 'react';
import banner from './../assets/images/home_banner.jpg'
import fetcher from '../api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [allResident,setAllResident]=useState([])
const getAllResident = async()=>{
  try {
    const result = await fetcher.get("/api/resident/all");
    setAllResident(result?.data?.data)
   
} catch (error) {
   console.log(error);
}
}
  useEffect(()=>{
    getAllResident();
  },[])
  console.log(allResident)
  return (
    <div class="grid grid-cols-3 gap-4 ml-20">
   
{
  allResident.map((hotel, index)=>(
    <div onClick={() => navigate(`/hotel-details/${hotel?._id}`) } id={index} className="card w-96 bg-base-100 shadow-xl mb-10 cursor-pointer">
    <figure><img src={hotel.img1} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">
       {hotel.resident_name}
        <div className="badge badge-secondary">Book Now</div>
      </h2>
      <p>{hotel.desc}</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">5 Star</div> 
        <div className="badge badge-outline">{hotel.price_range
}</div>
      </div>
    </div>
  </div>
  ))
}

  </div>
  );
};

export default Home;