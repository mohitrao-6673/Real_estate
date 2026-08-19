"use client"


import React, { useEffect, useState } from 'react'
import { ImUpload } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';



export default function page() {
    let token = useSelector((store) => store.userStore.token)
    let [images, setImages] = useState([])
    let [previewImage, setPreviewImage] = useState([])
    let [error, setError] = useState('')
    let [loader, setLoader] = useState(false)
    let router = useRouter()
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let { id } = useParams()


    //   property edit worked
    let [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        city: '',
        area: '',
        pincode: '',
        propertyType: 'apartment/flat',
        bhk: '',
        bathrooms: '',
        areaSize: '',
        furnishing: 'unfurnished',
        ameneties: [],
        status: 'sale',
    })

    const [existingImages, setExistingImages] = useState([]);
    let [newImages, setNewImages] = useState([])
    // add image worked here
    let handleImageChange = (event) => {
        event.preventDefault()
        let files = Array.from(event.target.files)
        if (event.target.files && event.target.files[0]) {
            const newFile = event.target.files[0];

            // Append the newly selected file to our existing array state
            setNewImages((prevImages) => [...prevImages, newFile]);
            // Reset input value so the same image can be re-selected if needed
            event.target.value = '';

        }

        // let files = Array.from(event.target.files)
        if (images.length + files.length > 10) {
            setError(' You Can Add Only Upload Up To 10 Images ')
            return
        }
    }

    //    removeImage worked here
    let removeExistingImage = (indexToRemove) => {
        setExistingImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };
    let removeNewImage = (indexToRemove) => {
        setNewImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };



    let getSetValue = (event) => {
        let inputName = (event.target.name)
        let inputValue = (event.target.value)
        let oldData = { ...formData }
        oldData[inputName] = inputValue
        setFormData(oldData)
    }


    useEffect(() => {
        axios.post(`${apiBaseUrl}admin/property/edit/${id}`,)
            .then((res) => res.data)
            .then((finalRes) => {

                setFormData({
                    title: finalRes.data.title,
                    description: finalRes.data.description,
                    price: finalRes.data.price,
                    city: finalRes.data.city,
                    area: finalRes.data.area,
                    pincode: finalRes.data.pincode,
                    propertyType: finalRes.data.propertyType,
                    bhk: finalRes.data.bhk,
                    bathrooms: finalRes.data.bathrooms,
                    areaSize: finalRes.data.areaSize,
                    furnishing: finalRes.data.furnishing,
                    ameneties: [finalRes.data.ameneties],
                    status: finalRes.data.status,
                })

                let allImages = finalRes.data.images
                let Imgs = allImages.map((img, i) => {
                    //  console.log(`${apiBaseUrl}${img}`)
                    return `${apiBaseUrl}${img}`
                })
                setExistingImages(Imgs)
            })
    }, [id])


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


    // property updated worked here
    let propertyUpdated = (event) => {
        event.preventDefault()
        setLoader(true)
        let formData = new FormData(event.target)
        newImages.forEach((image) => {
            formData.append('images', image);
        });
        axios.put(`${apiBaseUrl}admin/property/update/${id} `, formData)
            .then((res) => {
                if (res.data.status) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 1000,
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
                    }, 1000);
                }
                else {
                    console.log(res.data.message)
                }
            })
    }



    return (
        <><ToastContainer />



            <section className='  ' >
                {/* propety -header */}
                <header className='flex  items-center justify-between px-2 sticky
                 top-[53.6px] md:top-0  z-1 text-black bg-indigo-50 ' >
                    <div className=' text-[25px] font-semibold lg:px-6 px-4 py-2  ' >
                        Update Property
                    </div>
                </header>

                {/* form-body */}
                <div className="  lg:px-6 px-4 py-4 ">
                    <form onSubmit={propertyUpdated} encType="multipart/form-data" className=' flex flex-col gap-6'  >


                        {/*Property  Title & Description */}
                        <div className='flex flex-col  rounded-[12px] bg-white p-4  ' >
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
                                        onChange={getSetValue}
                                        value={formData.title}
                                        placeholder='Apartment in town' className='input ' fdprocessedid="1zckvr" />
                                </div>


                                {/*property description */}
                                <div className='flex flex-col gap-2 '>
                                    <label className=' text-[16px] font-semibold '>Property Description</label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        onChange={getSetValue}
                                        value={formData.description}
                                        placeholder='Describe the property ' className='border-[0.5px] border-[#808080] rounded-[18px]
                               h-[60px] p-[12.8px] text-[14px] outline-none  ' fdprocessedid="dpz6na" />
                                </div>

                            </div>

                        </div>


                        {/*Property Details */}
                        <div className=' flex flex-col bg-white rounded-[12px] p-4 ' >

                            <h2 className='text-[18px] w-fit font-bold px-3 border-s-[5px] rounded-[5px] mb-3 ' >
                                Property Details
                            </h2>

                            <div className='flex flex-col gap-2 ' >

                                <div className=' grid sm:grid-cols-3  grid-cols-1 md:gap-6 gap-2   ' >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Property Type</label>
                                        <select
                                            className=' input '
                                            name="propertyType"
                                            onChange={getSetValue}
                                            value={formData.propertyType}
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
                                            onChange={getSetValue}
                                            value={formData.furnishing}
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
                                            onChange={getSetValue}
                                            value={formData.status}
                                        >
                                            <option> Sale </option>
                                        </select>

                                    </div>

                                </div>


                                <div className=' grid md:grid-cols-4 grid-cols-2  sm:gap-6 gap-2' >

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>BHK</label>
                                        <input
                                            type="number"
                                            name="bhk"
                                            onChange={getSetValue}
                                            value={formData.bhk}
                                            placeholder='bhk' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Bathroom</label>
                                        <input
                                            type="number"
                                            name="bathrooms"
                                            onChange={getSetValue}
                                            value={formData.bathrooms}
                                            placeholder='bathroom' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>Area (Sq.Ft) </label>
                                        <input
                                            type="number"
                                            name="areaSize"
                                            onChange={getSetValue}
                                            value={formData.areaSize}
                                            placeholder='area' className='input ' fdprocessedid="1zckvr" />

                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '> Price </label>
                                        <input
                                            type="number"
                                            name="price"
                                            onChange={getSetValue}
                                            value={formData.price}
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
                                            onChange={getSetValue}
                                            value={formData.city}
                                            placeholder='city' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            Area </label>
                                        <input
                                            type="text"
                                            name="area"
                                            onChange={getSetValue}
                                            value={formData.area}
                                            placeholder='area' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                    <div className='flex flex-col gap-2 '>
                                        <label className=' text-[16px] font-semibold '>
                                            Pincode </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            onChange={getSetValue}
                                            value={formData.pincode}
                                            placeholder='pincode' className='input ' fdprocessedid="1zckvr" />

                                    </div>

                                </div>
                            </div>

                        </div>





                        {/*amenities */}
                        <div className='flex flex-col  rounded-[12px] bg-white p-4  ' >
                            <h2 className='text-[18px] w-fit font-semibold px-3 border-s-[5px] rounded-[5px] mb-3 ' >
                                Amenities
                            </h2>

                            <div className=' w-[200px] border-2 ' >

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
                                    type="file"
                                    name="images"
                                    onChange={handleImageChange}
                                    multiple
                                    id='uploadFile1' className="hidden"
                                    accept='image/*'
                                />
                            </label>
                        </div>



                        <div className=' grid grid-cols-6 gap-2 ' >

                            {/* existing images */}
                            {
                                existingImages.map((src, index) => {
                                    return (
                                        <div key={index} className=' relative  h-[150px] w-[150px] ' >
                                            <img src={src} className='h-full w-full object-cover rounded-[18px] ' />

                                            <button
                                                type='button'
                                                onClick={() => removeExistingImage(index)}
                                                className='absolute top-2 right-2  bg-[#432cf3] w-[30px] h-[30px] flex items-center justify-center py-2
                                                            rounded-[100%] text-white text-[16px] '

                                            >
                                                <RiDeleteBin5Fill />
                                            </button>
                                        </div>
                                    )
                                }
                                )
                            }



                            {/* new images */}
                            {
                                newImages.map((src, index) => {
                                    console.log(src)
                                    return (
                                        <div key={index} className=' relative  h-[150px] w-[150px] ' >
                                            <img src={URL.createObjectURL(src)} className='h-full w-full object-cover rounded-[18px] ' />

                                            <button
                                                type='button'
                                                onClick={() => removeNewImage(index)}
                                                className='absolute top-2 right-2  bg-[#432cf3] w-[30px] h-[30px] flex items-center justify-center py-2
                                                            rounded-[100%] text-white text-[16px] '

                                            >
                                                <RiDeleteBin5Fill />
                                            </button>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>






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
                        <div className='flex gap-10 mt-[40px] items-center font-semibold ' suppressHydrationWarning >
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
                                            Update
                                        </button>
                                }
                            </div>
                            <button type='reset' className='button ' fdprocessedid="2fqn2">
                                Cancel
                            </button>

                        </div>



                    </form>

                </div>
            </section>
        </>
    )
}










