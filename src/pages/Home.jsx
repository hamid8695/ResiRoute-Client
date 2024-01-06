import React, { useEffect, useState } from 'react';
import fetcher from '../api';
import { useNavigate } from 'react-router-dom';
import location from './../assets/images/location.png'
import search from './../assets/images/search.png'

const Home = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([])
  const [allResident, setAllResident] = useState([])
  const [showMap, setShowMap] = useState(false);
  const getAllResident = async () => {
    try {
      const result = await fetcher.get("/api/resident/all");
      setAllResident(result?.data?.data)
      setItemList(result?.data?.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllResident();
  }, [])

  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = async (e) => {
    setSearchValue(e.target.value);
    setTimeout(async () => {
      try {
        const result = await fetcher.get(`/api/resident/get-resident-by-search?search=${searchValue}`);
        setItemList(result?.data?.data)
      } catch (error) {
        console.log(error);
      }
      if (searchValue?.length < 1) {
        setItemList(allResident)
      }
    }, [2000])
  };



  const [selectedLocation, setSelectedLocation] = useState({
    address: 'Bangla Bazar',
    latitude: 22.3824198,
    longitude: 91.8071228,
  });

  const mapouterStyle = {
    position: 'relative',
    textAlign: 'right',
    height: '680px',
    width: '724px',
  };

  const gmapCanvasStyle = {
    overflow: 'hidden',
    background: 'none',
    height: '680px',
    width: '724px',
  };

  const handleLocationChange = (e) => {
    console.log(selectedLocation?.address)
    setSelectedLocation({ ...selectedLocation, address: e.target.value });
    setTimeout(async () => {
      try {
        const result = await fetcher.get(`/api/resident/get-resident-by-search?search=${selectedLocation.address}`);
        setItemList(result?.data?.data)
        console.log('result ', result);
      } catch (error) {
        console.log(error);
      }
    }, [2000])
  };

  const handleLocationSelect = () => {
    // Perform any additional actions when a location is selected
    console.log('Selected Location:', selectedLocation);
  };
  return (
    <div className='mt-16'>

      <div class="flex flex-1 items-center justify-center p-6">

        {!showMap && <div class="w-full max-w-lg">
          <form class="mt-5 sm:flex sm:items-center">
            <input value={searchValue}
              onChange={handleInputChange} id="q" name="q" class="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Search Hotels, homes,etc." type="search" autofocus="" /><button onClick={() => setShowMap(true)} type="submit" class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              <img alt="profile" src={location} className='mr-2' />
              Location</button>
          </form>
        </div>}
        {
          showMap &&
          <>
            <div class="w-full max-w-lg">
              <form class="mt-5 sm:flex sm:items-center">
                <input id="locationInput" value={selectedLocation.address} onChange={handleLocationChange} name="q" class="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Enter a Location here" type="search" autofocus="" /><button onClick={() => {
                    setShowMap(false);
                    setItemList(allResident);
                    handleLocationSelect();
                  }} type="submit" class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  <img alt="seach" src={search} className='mr-2' />
                  Search</button>
              </form>
            </div>
            <div></div>
          </>
        }

      </div>

   {
    showMap &&  <div className='flex justify-center'>
    <div className="mapouter" style={mapouterStyle}>
        <div className="gmap_canvas rounded-lg" style={gmapCanvasStyle}>
          <iframe
            width="724"
            height="680"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              selectedLocation.address
            )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
          <a href="https://embedgooglemap.net/124/"></a>
          <br />
          <a href="https://www.embedgooglemap.net">embed google map</a>
        </div>
      </div>
    </div>

   }




      <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">


          {
            itemList.map((hotel, index) => (
              <div class="rounded overflow-hidden shadow-lg" onClick={() => navigate(`/hotel-details/${hotel?._id}`)} id={hotel?._id} >

                <a href="#"></a>
                <div class="relative">
                  <a href="#">
                    <img class="w-full h-52"
                      src={hotel.img1}
                      alt="Sunset in the mountains" />
                    <div
                      class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                  </a>
                  <a href="#!">
                    <div
                      class="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                      ৳ {hotel.price}
                    </div>
                  </a>

                  <a href="!#">
                    <div
                      class="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                      <span class="font-bold">Book</span>
                      <small>Now</small>
                    </div>
                  </a>
                </div>
                <div class="px-6 py-4">

                  <a href="#"
                    class="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"> {hotel.resident_name}</a>
                  <p class="text-gray-500 text-sm">
                    {
                      hotel?.description?.length > 25 ? hotel?.description?.substring(0, 30) + '. . . . .' : hotel?.description
                    }
                  </p>
                </div>
                <div class="px-6 py-4 flex flex-row items-center">
                  <span href="#" class="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">

                    <span class="ml-1"></span>{hotel.address
                    }</span>
                </div>
              </div>
            ))}

        </div>
      </div>

    </div>

  );
};

export default Home;




