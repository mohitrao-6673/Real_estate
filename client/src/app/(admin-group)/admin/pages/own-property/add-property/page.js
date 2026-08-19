"use client"


import React, { useEffect, useState } from 'react'
import { ImUpload } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';


export default function page() {

    let token = useSelector((store) => store.userStore.token)
    let router = useRouter()
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    let amenities = [
        'bunglow',
        'wifi',
        'graden',
        'pool',
        'parking',
        'gym',
        'security',
        'power backup',
        'clubhouse'
    ]



    let [images, setImages] = useState([])
    let [previewImage, setPreviewImage] = useState([])
    let [error, setError] = useState('')
    let [loader, setLoader] = useState(false)
    //let [files, setFiles] = useState([])


    const [selectedImages, setSelectedImages] = useState([]);
    // add image worked here
    let handleImageChange = (event) => {
        event.preventDefault()
        let files = Array.from(event.target.files)
        if (event.target.files && event.target.files[0]) {
            const newFile = event.target.files[0];

            // Append the newly selected file to our existing array state
            setSelectedImages((prevImages) => [...prevImages, newFile]);
            // Reset input value so the same image can be re-selected if needed
            event.target.value = '';
        }

        // let files = Array.from(event.target.files)
        if (images.length + files.length > 10) {
            setError(' You Can Add Only Upload Up To 10 Images ')
            return
        }
    }


    // console.log(previewImage)
    // console.log(images)
    //    removeImage worked here
    // let removeImage = (index) => {
    //     setImages((prev) => prev.filter((_, i) => i !== index))
    //     setPreviewImage((prev) => prev.filter((_, i) => i !== index))
    // }

    let removeImage = (indexToRemove) => {
        setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

    // let formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //     formData.append('images', files[i]);
    // }
    // let removeImage = (index) => {
    //     setPreviewImage((prev) => prev.filter((_, i) => i !== index))
    // }

    // 2. Loop through all files and append them to the same key


    // add property worked
    let addProperty = async (event) => {
        event.preventDefault()
        setLoader(true)
        let formData = new FormData(event.target)
        // images.map((img) => {
        //     formData.append('images', img.name)
        // })
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });

        // formData.append('images', item.name);
        // for (let i = 0; i < images.length; i++) {
        //     formData.append('images', images[i]);
        //     // let allImages = +   images[i].name
        // }
        // images.map((img) => {
        //     formData.append('images', img.name)
        // })


        axios.post(`${apiBaseUrl}admin/property/add`, formData, {
            headers: { Authorization: ` Bearer ${token} ` }
        })
            .then((res) => res.data)
            .then((finalres) => {
                try {
                    if (finalres.status) {
                        // console.log(finalres)
                        toast.success(finalres.message, {
                            position: "top-right",
                            autoClose: 500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                            theme: "dark",
                            transition: Flip,
                        });
                        setLoader(false)
                        setTimeout(() => {
                           router.push('/admin/pages/own-property/view-property')
                        }, 500);

                    }
                    else {
                        console.log(res.data.message)
                    }
                }
                catch (error) {
                    console.log(error)
                }
            })
    }


    return (
        <><ToastContainer />

            <section className=' ' suppressHydrationWarning>

                {/* propety -header */}
                <header className='flex  items-center justify-between px-2 sticky
                 top-[53.6px] md:top-0  z-1 text-black bg-indigo-50 ' >
                    <div className=' text-[25px] font-semibold lg:px-6 px-4 py-2  ' >
                        Add Property
                    </div>
                </header>

                {/* form-body */}
                <div className="lg:px-6 px-4 py-4   ">
                    <form encType="multipart/form-data" onSubmit={addProperty} className=' flex flex-col sm:gap-6 gap-4 '  >


                        {/*Property  Title & Description */}
                        <div className='flex flex-col  rounded-[12px] bg-white md:p-4 p-3  ' >
                            <h2 className='text-[18px] w-fit font-bold px-3 border-s-[5px] rounded-[5px] mb-3 ' >
                                Title & Description
                            </h2>

                            {/*Property Title */}

                            <div className=' flex flex-col gap-2 ' >

                                <div className='flex flex-col gap-2 '>
                                    <label className=' text-[16px] font-semibold '>Property Title</label>
                                    <input
                                        type="text"
                                        name="title"

                                        placeholder='Apartment in town' className='input ' fdprocessedid="1zckvr" />
                                </div>


                                {/*property description */}
                                <div className='flex flex-col gap-2 '>
                                    <label className=' text-[16px] font-semibold '>Property Description</label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        placeholder='Describe the property ' className='border-[0.5px] border-[#808080] rounded-[18px]
                               h-[60px] p-[12.8px] text-[14px] outline-none  ' fdprocessedid="dpz6na" />
                                </div>

                            </div>

                        </div>


                        {/*Property Details */}
                        <div className=' flex flex-col bg-white rounded-[12px] md:p-4 p-3 ' >

                            <h2 className='text-[18px] w-fit font-bold px-3 border-s-[5px] rounded-[5px] mb-3 ' >
                                Property Details
                            </h2>

                            <div className='flex flex-col gap-2 ' >

                                <div className=' grid sm:grid-cols-3  grid-cols-1 md:gap-6 gap-2  ' suppressHydrationWarning >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Property Type</label>
                                        <select
                                            className=' input '
                                            name="propertyType"
                                        >
                                            <option>Apartment/Flat </option>
                                            <option>commercial </option>
                                            <option>Penthouse </option>
                                            <option>bunglow </option>
                                        </select>

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Furnishing </label>
                                        <select
                                            className=' input '
                                            name="furnishing"
                                        >
                                            <option> Furnished </option>
                                            <option>Semi Furnished </option>
                                            <option>Unfurnished </option>
                                        </select>

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Listing Status </label>
                                        <select
                                            className=' input '
                                            name="status"
                                        >
                                            <option> Sale </option>
                                        </select>

                                    </div>

                                </div>


                                <div className=' grid md:grid-cols-4 grid-cols-2  sm:gap-6 gap-2 ' >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>BHK</label>
                                        <input
                                            type="number"
                                            name="bhk"
                                            placeholder='bhk' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Bathroom</label>
                                        <input
                                            type="number"
                                            name="bathrooms"
                                            placeholder='bathroom' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Area (Sq.Ft) </label>
                                        <input
                                            type="number"
                                            name="areaSize"
                                            placeholder='area' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '> Price </label>
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder='price' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                </div>



                                <div className=' grid sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-2  ' >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            City </label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder='city' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            Area </label>
                                        <input
                                            type="text"
                                            name="area"
                                            placeholder='area' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            Pincode </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder='pincode' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                </div>
                            </div>

                        </div>





                        {/*amenities */}
                        <div className='flex flex-col  rounded-[12px] bg-white md:p-4 p-3 ' >
                            <h2 className='text-[18px] w-fit font-semibold px-3 border-s-[5px] rounded-[5px] mb-3 ' >
                                Amenities
                            </h2>

                            <div className=' border ' >
                                <select multiple name='ameneties' className='w-full h-full outline-none ' >
                                    {
                                        amenities.map((items, index) => (
                                            <option key={index} >
                                                {items}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>

                        </div>



                        {/* image upload*/}
                        <div className='flex flex-col gap-4 ' >
                            {/* file-input */}
                            <label
                                className="inputfile">
                                <span className='text-[25px] ' >
                                    <ImUpload />
                                </span>
                                <span>
                                    Upload File Here
                                </span>
                                <input
                                    onChange={handleImageChange}
                                    type='file'
                                    multiple
                                    name="images"
                                    id='uploadFile1' className="hidden"
                                    accept='image/*'
                                />
                            </label>

                        </div>

                        {selectedImages.length > 0 && (

                            <div className=' grid grid-cols-6 gap-2 ' >
                                {
                                    selectedImages.map((file, index) => {

                                        
                                        return (
                                            <div key={index} className=' relative  h-[150px] w-[150px] ' >
                                                <img src={URL.createObjectURL(file)} className='h-full w-full object-cover rounded-[18px] ' />

                                                <button
                                                    type='button'
                                                    onClick={() => removeImage(index)}
                                                    className='absolute top-2 right-2  bg-[#432cf3] w-[30px] h-[30px] flex items-center justify-center py-2
                                     rounded-[100%] text-white text-[16px] '

                                                >
                                                    <RiDeleteBin5Fill />
                                                </button>
                                            </div>
                                        )
                                    }


                                    )}


                            </div>
                        )}



                        {/* property status */}
                        {/* <div className='flex flex-col gap-2 bg-white rounded-[18px] p-4 '>
                            <h2 className='text-[18px] w-fit font-bold px-3 border-s-[5px] rounded-[5px] mb-3 ' >Property Status :</h2>

                            <div className='flex items-center gap-4' >

                                <div className='flex items-center gap-3 cursor-pointer'>
                                    <input
                                        type="radio"
                                        className='cursor-pointer'
                                        name='status'
                                        value={1}

                                    />
                                    <span className=' text-[16px] font-semibold ' >Active</span>
                                </div>

                                <div className='flex items-center gap-3 cursor-pointer'>
                                    <input type="radio"
                                        className='cursor-pointer '
                                        name='status'
                                        value={0}
                                    />
                                    <span className=' text-[16px] font-semibold ' >Deactive</span>
                                </div>

                            </div>
                        </div> */}



                        {/* Buttons */}
                        <div className='flex gap-10 mt-[40px] items-center font-semibold ' >
                            <div className='button' >
                                {
                                    loader ?
                                        <button type="button" className="cursor-pointer flex items-center justify-center gap-2   " >
                                            <span className='spinner' >
                                            </span>
                                            <span>
                                                Processing…
                                            </span>
                                        </button>
                                        :
                                        <button type='submit' className=' cursor-pointer  ' fdprocessedid="9aljcb" >
                                            Submit
                                        </button>
                                }
                            </div>

                            <button type='reset' className='button ' fdprocessedid="2fqn2">
                                Cancel
                            </button>

                        </div>

                    </form>

                </div >
            </section >
        </>
    )
}






{/* <div className='grid grid-cols-5 gap-5 font-semibold ' >
    <div
        className={`amenities    `}  >
        <input type='checkbox' className='cursor-pointer  ' name='pool' />
        <label className='cursor-pointer' >Pool</label>
    </div>
    <div className=' amenities  '>
        <input type='checkbox' name='parking' />
        <label>Parking</label>
    </div>
    <div className=' amenities  '>
        <input type='checkbox' name='gym' />
        <label>Gym</label>
    </div>
    <div className=' amenities  '>
        <input type='checkbox' name='security' />
        <label>Security</label>
    </div>
    <div className=' amenities  '>
        <input type='checkbox' name='wifi' />
        <label>Wifi</label>
    </div>
    <div className=' amenities  '>
        <input type='checkbox' name='poweBackup' />
        <label>Power Backup</label>
    </div>
    <div className=' amenities  '>
        <input type='checkbox' name='clubHouse' />
        <label>Club House</label>
    </div>
    <div className=' amenities  '>
        <input type='checkbox' name='garden' />
        <label>Garden</label>
    </div>
</div> */}

