import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../api';
import { toast } from 'react-toastify';
import ResidentInfoByHost from '../authentication/Resident-Info-by-Host';


const AddResident = () => {
    const userInfo = JSON.parse(localStorage.getItem('loginUser'));
    console.log('user',userInfo)
    const { register, handleSubmit, reset } = useForm();
    const imageStorageKey = '1c47ecbac30f9168913be4c44e47e86f'

    const uploadImage = async (url, formData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Uploaded image:', result);


            return result;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const onSubmit = async (data) => {
        const { image1, image2, image3, image4, longitude, latitude, ...otherData } = data

        console.log(otherData)
        const images = [data.image1[0], data.image2[0], data.image3[0], data.image4[0]];
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        const uploadedResults = [];

        const uploadNextImage = async (index) => {
            if (index < images.length) {
                const formData = new FormData();
                formData.append('image', images[index]);

                try {
                    const result = await uploadImage(url, formData);
                    uploadedResults.push(result.data.url);
                    // Upload the next image
                    await uploadNextImage(index + 1);
                } catch (error) {
                    // Handle error, stop uploading if needed
                }
            } else {
                // All images have been uploaded, do something with uploadedResults
                console.log('All images uploaded:', uploadedResults);
            }
        };
        // Start uploading the first image
        await uploadNextImage(0);

        setTimeout(async () => {
            otherData.img1 = uploadedResults[0]
            otherData.img2 = uploadedResults[1]
            otherData.img3 = uploadedResults[2]
            otherData.img4 = uploadedResults[3]
            otherData.location = {
                type: "Point",
                coordinates: [Number(longitude), Number(latitude)]
            }
            otherData.host_info = userInfo?.data?._id;
            otherData.host_name = userInfo?.data?.fullname;

            console.log(otherData)

            const url = '/api/resident/create'
            const result = await fetcher.post(url, otherData);
            toast.success("Successfully Added in the List!", {
                position: 'top-center'
            })
        }, [1500])
    };

    return (
        <div className="w-full">
            <div className='flex justify-between mx-12 py-3'>
                <div>Add Hotel/House</div>
                <div>
                    <input type="checkbox" id="add-hotel-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="add-hotel-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Banner Image 1</span>
                                    </label>
                                    <input multiple type="file" className="file-input file-input-bordered file-input-accent "   {...register("image1", {
                                        required: {
                                            value: true,
                                        }
                                    })} />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Banner Image 2</span>
                                    </label>
                                    <input type="file" className="file-input file-input-bordered file-input-accent "   {...register("image2", {
                                        required: {
                                            value: true,
                                        }
                                    })} />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Banner Image 3</span>
                                    </label>
                                    <input type="file" className="file-input file-input-bordered file-input-accent "   {...register("image3", {
                                        required: {
                                            value: true,
                                        }
                                    })} />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Banner Image 4</span>
                                    </label>
                                    <input type="file" className="file-input file-input-bordered file-input-accent "   {...register("image4", {
                                        required: {
                                            value: true,
                                        }
                                    })} />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        {...register("resident_name")}
                                        className="input input-bordered kbd" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Description</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="description"
                                        {...register("description")}
                                        className="input input-bordered kbd h-24" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="address"
                                        {...register("address")}
                                        className="input input-bordered kbd" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Resident Type</span>
                                    </label>
                                    <select {...register("resident_type")} className="select select-bordered ">
                                                <option>Hotel</option>
                                                <option>Bachelor Room</option>
                                                <option>Flat</option>
                                            </select>
                                </div>
                                <div className="form-control">
                                    <div className='grid grid-cols-2 gap-12'>
                                        <div>
                                            <label className="label">
                                                <span className="label-text ">Price</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Price"
                                                {...register("price")}
                                                className="input input-bordered kbd" />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="label-text ">Price Type</span>
                                            </label>
                                            <select {...register("price_type")} className="select select-bordered w-full max-w-xs kbd">
                                                <option>Per Night</option>
                                                <option>Per Month</option>
                                            </select>
                                            {/* <input
                                                type="text"
                                                placeholder="Price Type"
                                                {...register("price_type")}
                                                className="input input-bordered kbd" /> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="form-control">
                                    <div className='grid grid-cols-2 gap-12'>
                                        <div>
                                            <label className="label">
                                                <span className="label-text ">Email</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                {...register("email")}
                                                className="input input-bordered kbd" />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="label-text ">Contact</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contact"
                                                {...register("contact_number")}
                                                className="input input-bordered kbd" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-control">
                                    <div className='grid grid-cols-2 gap-12'>
                                        <div>
                                            <label className="label">
                                                <span className="label-text ">Longitude</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Longitude"
                                                {...register("longitude")}
                                                className="input input-bordered kbd" />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="label-text ">Latitude</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Latitude"
                                                {...register("latitude")}
                                                className="input input-bordered kbd" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-control mt-6">
                                    <button
                                        type='submit'
                                        className="btn  text-white">Create Resident</button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
                <div className='mt-10 ml-2'>
                    <label htmlFor="my-modal-6" className="btn btn-outline btn-primary">Create Resident</label>
                </div>
            </div>
            <div className='mx-12 p-1 mb-10 font-serif'>
                <ResidentInfoByHost/>
            </div>
        </div>
    );
};

export default AddResident;