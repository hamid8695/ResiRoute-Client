import React from 'react';
import { useForm } from 'react-hook-form';
import fetcher from '../api';
import ResidentInfoByHost from './Resident-Info-by-Host';
import { toast } from 'react-toastify';
const HostDashboardInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('loginUser'));
    const { register, handleSubmit, reset } = useForm();
    const imageStorageKey = '1c47ecbac30f9168913be4c44e47e86f'
    const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'));

    const uploadImage = async (url, formData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    };

    const onSubmit = async (data) => {
        const { image1, image2, image3, image4, longitude, latitude, ...otherData } = data
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
                    await uploadNextImage(index + 1);
                } catch (error) {
                    console.log(error)
                }
            } else {
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

            const url = '/api/resident/create'
            const result = await fetcher.post(url, otherData);
            toast.success("Successfully Added in the List!", {
                position: 'top-center'
            })
            console.log(result)
        }, [1500])



    };
    return (
        <div className="w-full mt-10">
            <div className='flex justify-between mx-12 py-3'>
                <div>
                    <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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
                <div>

                <dialog id="my_modal_4" className="modal">
                    {console.log('saddddddddddddddddddddd')}
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
                </div>
                <div className='mt-10 ml-2'>
                    <label htmlFor="my-modal-6" className="btn btn-outline btn-primary">Create Resident</label>
                </div>
            </div>
            <div className='mx-12 p-1 mb-10 font-serif'>
                <ResidentInfoByHost loginUserInfo={loginUserInfo}/>
            </div>
        </div>

    );
};

export default HostDashboardInfo;